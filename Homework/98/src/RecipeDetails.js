import React, { Component } from 'react'
import ListComponent from './ListComponent';

export default class RecipeDetails extends Component {
  state = {
    pictureShowing: true
  }

  togglePicture = () => {
    this.setState({
      pictureShowing: !this.state.pictureShowing
    });
  };

  render() {
    const { name, ingredients, directions, picture } = this.props.recipe;

    const { pictureShowing } = this.state;

    //const ingredientItems = ingredients.map(i => <li>{i}</li>);
    //const directionItems = directions.map(i => <li>{i}</li>);

    return (
      <>
        <h2>{name}</h2>
        {pictureShowing && <img style={{width: '200px', height: '200px'}} src={picture} alt={name} />}
        <br/>
        <button onClick={this.togglePicture} className="button button-secondary">{pictureShowing ? 'hide' : 'show'}</button>
        <ListComponent name="ingredients" items={ingredients} />
        <ListComponent name="directions" items={directions} />
      </>
    );
  }
}
