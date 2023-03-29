const express = require('express');
const Mongo = require('mongodb');
const router = express.Router();
const sessionOnlyMiddleware = require('../sessionOnlyMiddleware.js');

module.exports = function (socketIo) {
	router.route('/')
		.get(async (req, res, next) => {
			const thePosts = await global.posts.find().toArray();
			res.send(thePosts);
		})
		.post(sessionOnlyMiddleware, async (req, res, next) => {
			// Should validate post here. Maybe joi??
			req.body.author = req.session.username;
			req.body.date = new Date();
			const result = await global.posts.insertOne(req.body);
			console.log(result);

			if (!result.insertedId) {
				return next(new Error('oops, couldnt insert post'));
			}

			req.body.id = result.insertedId;

			socketIo.emit('post', req.body);

			res.status(201)
				//.location(...)
				.send(req.body);
		});

	router.post("/:id/comments", sessionOnlyMiddleware, async (req, res, next) => {
		let comment = {
			author: req.session.username,
			creation_date: new Date()
		};

		comment.text = String(req.body.text);
		if (comment.text === "") {
			req.status(201).end("invalid comment body: must be a non-empty string");
			return;
		}
		try {
			const result = await global.posts.findOneAndUpdate(
				{_id: new Mongo.ObjectId(req.params.id)},
				{$push: {comments: comment}}
			);

			if (!result.ok) {
				res.status(500).end("Couldn't add comment - does the post exist?");
				return;
			}
	
			socketIo.emit('comment', comment);
	
			res.status(201).end();

		} catch(e){next(e);}
	});

	return router;
};
