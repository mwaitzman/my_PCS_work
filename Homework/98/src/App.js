import { Component } from 'react';
import './App.css';
import RecipeDetails from './RecipeDetails';
import RecipeList from "./RecipeList";

class App extends Component {
  state = {
    recipes: [
      {
        id: 1,
        name: 'hot dog',
        ingredients: ['hot dog', 'bun', 'ketchup', 'mustard'],
        directions: ['grill hot dog', 'put in bun', 'add desired condiments'],
        picture: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Hot_dog_with_mustard.png'
      },
      {
        id: 2,
        name: 'burger',
        ingredients: ['burger', 'bun', 'ketchup', 'mustard'],
        directions: ['grill burger', 'put in bun', 'add desired condiments'],
        picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSu7ApJIGtV5ad62F-caryj0pJcv-ZimqAHw&usqp=CAU'
      }
    ],
    selectedRecipe: 0
  }

	constructor(props) {
		super(props);
	}

	select_recipe_by_index = (idx) => {
		this.setState({
			selectedRecipe: idx
		});
	}

  render() {
    return (
      <div className="container text-center">

        <h1>PCS Recipes</h1>

        <div>
          <RecipeList
		  recipes={this.state.recipes}
		  select_recipe_by_index={this.select_recipe_by_index}
		  />
        </div>

        <hr/>

        <RecipeDetails recipe={this.state.recipes[this.state.selectedRecipe]}/>

      </div>
    );
  }
}

export default App;
