// src/views/recipes.js
import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";
import { Loading } from "./views";

var _ = require("underscore");

const Recipes = (...props) => {
	const { handleFilterChange, handleAddRecipe, handleDelete, location, recipesList } = props[0];

	function handleFilterChanges(event) {
		handleFilterChange(event);
	}

	function handleAddRecipes(event) {
		handleAddRecipe(event);
	}

	function handleDeletes(event) {
		handleDelete(event);
	}

	if (recipesList) {
		return (
			<div>
				<Form inline>
					<FormControl type='text' placeholder='Search' className=' mr-sm-2' onChange={handleFilterChanges} value={this.props.filter} />
				</Form>
				{recipesList.map(recipe => (
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
							<Button id={"recipes_del_btn#" + recipe._id.toString()} variant='info' onClick={handleDeletes} title='Delete'>
								Delete
							</Button>
						</Card.Body>
					</Card>
				))}
				<Button variant='primary' size='lg' block onClick={handleAddRecipes} title='Add Recipe'>
					Add Recipe
				</Button>
			</div>
		);
	} else {
		return (
			<div>
				<Loading />
				<Button variant='primary' size='lg' block onClick={handleAddRecipes} title='Add Recipe'>
					Add Recipe
				</Button>
			</div>
		);
	}
};

export { Recipes };

// style={{ width: '18rem' }}
