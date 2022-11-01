(function() {
	"use strict";

	let recipe_list;
	const recipe_select = $("#recipe_select");

	fetch("recipes/list.json")
	.then(response => response.json())
	.then(response => {
		recipe_list = response;
		console.log(recipe_list);
		$("#recipe_select_placeholder_entry").remove();
		for (let i = 0; i < recipe_list.length; i++) {
			recipe_select.append(`<option value="${recipe_list[i].path}">${recipe_list[i].name}</option>`)
		}

		recipe_select.change(function() {
			fetch($("#recipe_select option:selected").val())
			.then(response => response.json())
			.then(recipe => {
				$("#recipe_name").text(recipe.name);
				
				let ings = "<h5>ingredients</h5>";
				for (let key in recipe.ingredients) {
    				ings += `<li><pre>${key} &mdash; ${recipe.ingredients[key]}</pre></li>`;
				};
				$("#recipe_ingredients").html(ings);

				$("#recipe_image").attr("src", recipe.image);
			});
		  });
	});
})();