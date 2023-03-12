'use strict'
// const simple = require('./handlers/simple')
// const configured = require('./handlers/configured')
// const recipes = require("./handlers/recipes");
const pool = require("./pool");

module.exports = function (app, opts) {

	app
		.get("/recipes", (_, resp) => {
			pool.query(
				"SELECT * FROM recipes",
				(err, results, fields) => {
					if (err) {
						throw err;
					}
					console.log("\n\tERR\n", err, "\n\tFIELDS\n", fields);
					resp.send(results);
					resp.end();
				}
			);
		})
		.get("/recipe/:id", (req, resp) => {
			const id = req.params.id;
			pool.execute(
				"SELECT * FROM recipes WHERE id = ?",
				[id],
				(err, results, fields) => {
					if (err) {
						console.error(err);
						resp.statusCode = 500;
						resp.end("The server encountered an error getting the recipes");
						return;
					}

					if (!results.length) {
						resp.statusCode = 404;
						resp.end("The server could not find that recipe");
						return;
					}

					if (process.env.VERBOSE_OUTPUT === "true") {
						console.log("\n\tERR\n", err, "\n\tFIELDS\n", fields, "\n\tRESULTS\n", results);
					}

					resp.send(results);
					resp.end();
				}
			);
		})
		.post("/recipes", (req, resp) => {
			console.table(req.body.ingredients);
			let {name, ingredients, directions, picture} = req.body;

			if (!name) {
				resp.statusCode = 400;
				resp.end("Failed to add recipe: recipe must have a non-empty name");
				return;
			}
			if (!ingredients || ingredients.length === 0) {
				resp.statusCode = 400;
				resp.end("Failed to add recipe: ingredients must be present and a non-empty array");
				return;
			}

			console.table(ingredients);
			pool.execute(
				"INSERT INTO recipes (name) VALUES(?)",
				[req.body.name],
				(err, results, fields) => {
					if (err || results.affectedRows !== 1) {
						console.error(err);
						resp.statusCode = 500;
						resp.end("The server encountered an error inserting the recipe");
						return;
					}

					if (process.env.VERBOSE_OUTPUT === "true") {
						console.log("\n\tERR\n", err, "\n\tFIELDS\n", fields, "\n\tRESULTS\n", results);
					}
					const recipe_id = results.insertId;
					let left = ingredients.length;
					ingredients.map(e => {
						pool.execute(
							"INSERT INTO ingredients (recipe_id, name) VALUES(?, ?)",
							[recipe_id, e],
							(err, results, fields) => {
								if (--left === 0) {
									resp.statusCode = 200;
									resp.end(String(recipe_id));
								}
							}
						)
					})
				}
			);
		})
		.delete("/recipe/:id", (req, resp) => {
			const recipe_id = req.params.id;
			pool.execute(
				"DELETE FROM recipes WHERE recipes.id = ?",
				[recipe_id],
				(err,results, _) => {
					if (err || results.affectedRows !== 1) {
						console.table(err);
						resp.statusCode = 500;
						resp.end("The server encountered an error deleting the recipe. Perhaps it was already deleted?");
						return;
					}

					resp.status(200).end();
				}
			)
		})
		.put("/recipe/:id", (req, resp) => {
			const recipe_id = req.params.id;
			let {name} = req.body;
			const {ingredients} = req.body;//TODO:  directions, picture
			let changes = [];
			if (name) {
				if (typeof name === "number") {
					name = String(name);
				}
				if (typeof name != "string" || name.length === 0) {
					resp
					.status(400)
					.end("Refused to update recipe #" + recipe_id + ": the new name must be a non-empty string");
					return;
				}
				changes.push(() => {
						pool.execute(
							"UPDATE recipes r SET r.name = ? WHERE r.id = ?",
							[name, recipe_id],
							(err) => {
								if (err) {
									change_error = true;
									resp
									.status(500)
									end(err);
									return;
								}
								if (--incomplete_count === 0) {
									resp.status(200).end();
								}
							}
						);
				});
			}

			if (ingredients) {
				if (! (typeof ingredients === "object" && Array.isArray(ingredients))) {
					resp
					.status(400)
					.end("Refused to update recipe #" + recipe_id + ": ingredients must be an array");
					return;
				}

				if (ingredients.length === 0) {
					resp
					.status(400)
					end("Refused to update recipe #" + recipe_id + ": won't set ingredients to nothing");
					return;
				}

				let delete_finished = false;
				changes.push(() => {
					pool.execute(
						"DELETE FROM ingredients where recipe_id = ?",
						[recipe_id],
						(err) => {
							if (err) {
								change_error = true;
								resp.statusCode = 500;
								resp.end(err);
								return;
							}
						}
					);
					//// no need to check if resp needs to be ended here because we know that there MUST be ingredients to execute queries after this
					incomplete_count--;
					delete_finished = true;
				});
				ingredients.forEach(ingredient => {
					changes.push(() => {
						const j$ = setInterval(() => {
							if (!delete_finished) {return};
							pool.execute(
								"INSERT INTO ingredients (recipe_id, name) VALUES(?, ?)",
								[recipe_id, ingredient],
								(err) => {
									if (err) {
										change_error = true;
										resp
										.status(500)
										.end(err);
										return;
									}
									if (--incomplete_count === 0) {
										resp.status(200).end();
									}
								}
							);
							clearInterval(j$);
					});
					});
				});
			}

			if (changes.length === 0 && !resp.writableEnded) {
				resp.statusCode = 500;
				resp.end("Somebody messed up (it's possible the thing you requested was merely not implemented yet)");
			}
			let incomplete_count = changes.length;
			let change_error = false;
			let el$ = false;
			changes.forEach(change => {
				if (!change_error) {
					change();
				} else if (!el$) {
					console.error(`Recipe updation chain failed! ${incomplete_count} changes were prematurely canceled out of ${changes.left} total`, recipe_id, req.body);
					el$ = true;
				}
			});
		})
	;
}