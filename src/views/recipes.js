// src/views/recipes.js
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";

var _ = require("underscore");

class Recipes extends Component {
	constructor(props) {
		super(props);

		this.handleAddRecipe = this.handleAddRecipe.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
	}

	async componentDidMount() {}

	handleFilterChange(event) {
		this.props.handleFilterChange(event);
	}

	handleAddRecipe(event) {
		this.props.handleAddRecipe(event);
	}

	handleDelete(event) {
		this.props.handleDelete(event);
	}

	RecipeList(recipes) {
		if (recipes) {
			return (
				<div>
					<Form inline>
						<FormControl type='text' placeholder='Search' className=' mr-sm-2' onChange={this.handleFilterChange} value={this.props.filter} />
						<Button type='submit'>Submit</Button>
					</Form>
					{recipes.map(recipe => (
						<Card key={recipe._id.toString()}>
							<Card.Body>
								<Card.Title>{recipe.title}</Card.Title>
								<Card.Subtitle className='mb-2 text-muted'>{recipe.cuisine}</Card.Subtitle>
								<Card.Text>{recipe.recipe}</Card.Text>
								<Link to={{ pathname: "/recipe/" + recipe._id.toString(), state: recipe }}>
									<Button variant='info' title='Go to Details'>
										Go to Details
									</Button>
								</Link>
								<Button id={"recipes_del_btn#" + recipe._id.toString()} variant='info' onClick={this.handleDelete} title='Delete'>
									Delete
								</Button>
							</Card.Body>
						</Card>
					))}
					<Button variant='primary' size='lg' block onClick={this.handleAddRecipe} title='Add Recipe'>
						Add Recipe
					</Button>
				</div>
			);
		} else {
			return (
				<div>
					<center>
						<h1>Recipes List</h1>
					</center>
					<center>
						<h1>Loading ...</h1>
					</center>
					<Button variant='primary' size='lg' block onClick={this.handleAddRecipe} title='Add Recipe'>
						Add Recipe
					</Button>
				</div>
			);
		}
	}

	render() {
		return this.RecipeList(this.props.recipesList);
	}
}

export { Recipes };

// style={{ width: '18rem' }}
