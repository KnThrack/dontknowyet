// src/views/recipe.js
import React from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const Recipe = ({ ...props }) => {
	const { handleInputChange, handleSubmit, handleTableChange, handleAddIngredient, handleJoditInputChange, recipesList, state } = props[0];

	// handlers
	function handleAddIngredient(event) {
		handleAddIngredient(event, state);
	}

	function handleTableChange(event) {
		handleTableChange(event, state);
	}

	function handleInputChange(event) {
		handleInputChange(event, state);
	}

	function handleJoditInputChange(event) {
		handleJoditInputChange(event, state);
	}

	function handleSubmit(event) {
		// submit the changes to the backend
		handleSubmit(event, state);
	}
	// handlers end

	// find which one we looking at
	let index = recipesList.findIndex(x => x._id === state._id.toString());

	const myRecipe = recipesList[index];
	if (myRecipe === null) return <p>Loading ...</p>;
	return (
		<div key={myRecipe._id.toString()} className='container'>
			<Form id='bigform' /*controlId={recipe._id.toString()+".Form"}*/>
				<Form.Group /*controlId={recipe._id.toString()+".ControlInput1"}*/>
					<Form.Label htmlFor='title'>Recipe Title</Form.Label>
					<Form.Control name='title' onChange={handleInputChange} id='title' value={myRecipe.title} />
					<Form.Label htmlFor='name'>Recipe Name</Form.Label>
					<Form.Control name='name' onChange={handleInputChange} id='name' value={myRecipe.name} />
					<Form.Label htmlFor='cuisine'>Cuisine</Form.Label>
					<Form.Control name='cuisine' onChange={handleInputChange} id='cuisine' value={myRecipe.cuisine} as='select'>
						<option>German</option>
						<option>Chinese</option>
						<option>Asian</option>
						<option>French</option>
						<option>Italian</option>
					</Form.Control>
				</Form.Group>
				<Form.Group /*controlId={recipe._id.toString()+".ControlTextarea1"}*/>
					<Form.Label htmlFor='recipe'>Recipe</Form.Label>
					<Form.Control name='recipe' onChange={handleInputChange} id='recipe' as='textarea' rows='10' value={myRecipe.recipe} />
				</Form.Group>
				<Form.Group>
					<Table responsive variant='dark'>
						<thead>
							<tr>
								<th>Ingredient</th>
								<th>Quantity</th>
								<th>Unit</th>
							</tr>
						</thead>
						{myRecipe.ingredients.map(ingredient => (
							<tbody key={ingredient._id ? ingredient._id : 1}>
								<tr key={ingredient._id ? ingredient._id : 1}>
									<td>
										<input
											name={(ingredient._id ? ingredient._id : 1) + "#ingredient"}
											type='text'
											value={ingredient.ingredient}
											onChange={handleTableChange}
										/>
									</td>
									<td>
										<input
											name={(ingredient._id ? ingredient._id : 1) + "#quantity"}
											type='number'
											value={ingredient.quantity}
											onChange={handleTableChange}
										/>
									</td>
									<td>
										<input
											name={(ingredient._id ? ingredient._id : 1) + "#unit"}
											type='text'
											value={ingredient.unit}
											onChange={handleTableChange}
										/>
									</td>
								</tr>
							</tbody>
						))}
					</Table>
				</Form.Group>
				<ButtonToolbar>
					<Link to='/'>
						<Button variant='info' title='Go Back'>
							Go Back
						</Button>
					</Link>
					<Button type='submit' variant='primary' onClick={handleSubmit}>
						Submit
					</Button>
					<Button type='button' variant='primary' onClick={handleAddIngredient}>
						Add Ingredient
					</Button>
				</ButtonToolbar>
			</Form>
		</div>
	);
};

export { Recipe };
