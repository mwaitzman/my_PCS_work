import React, { Component } from "react";

export default class RecipeList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const recipes = this.props.recipes.map(
			(recipe, idx) => {
				return (<li
				key={recipe.id}
				onClick={
					() => this.props.select_recipe_by_index(idx)
				}>
					{recipe.name}
				</li>)
			}
		);

		return (
		<ul className="bulletless">
			{recipes}
		</ul>
		);
	}
}