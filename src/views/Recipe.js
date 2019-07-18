// src/views/Recipe.js
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const Recipe = (...props) => {
	const { handleInputChange, handleTableChange, recipesList, setPageState, setChangeRecipe, location } = props[0];

	useEffect(() => {
		setPageState({page: "details"});
		let index = recipesList.findIndex(x => x._id === location.state._id.toString());
		setChangeRecipe(recipesList[index]);
	}, []);

	// handlers
	function handleTableChanges(event) {
		handleTableChange(event, location.state);
	}

	function handleInputChanges(event) {
		handleInputChange(event, location.state);
	}

	// handlers end

	// find which one we looking at
	let index = recipesList.findIndex(x => x._id === location.state._id.toString());

	const myRecipe = recipesList[index];
	if (myRecipe === null) return <p>Loading ...</p>;
	return (
		<div key={myRecipe._id.toString()} className='container'>
			<Form id='bigform' /*controlId={recipe._id.toString()+".Form"}*/>
				<Form.Group /*controlId={recipe._id.toString()+".ControlInput1"}*/>
					<Form.Label htmlFor='title'>Recipe Title</Form.Label>
					<Form.Control name='title' onChange={handleInputChanges} id='title' value={myRecipe.title} />
					<Form.Label htmlFor='name'>Recipe Name</Form.Label>
					<Form.Control name='name' onChange={handleInputChanges} id='name' value={myRecipe.name} />
					<Form.Label htmlFor='cuisine'>Cuisine</Form.Label>
					<Form.Control name='cuisine' onChange={handleInputChanges} id='cuisine' value={myRecipe.cuisine} as='select'>
						<option>German</option>
						<option>Chinese</option>
						<option>Asian</option>
						<option>French</option>
						<option>Italian</option>
					</Form.Control>
				</Form.Group>
				<Form.Group /*controlId={recipe._id.toString()+".ControlTextarea1"}*/>
					<Form.Label htmlFor='recipe'>Recipe</Form.Label>
					<Form.Control name='recipe' onChange={handleInputChanges} id='recipe' as='textarea' rows='10' value={myRecipe.recipe} />
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
											onChange={handleTableChanges}
										/>
									</td>
									<td>
										<input
											name={(ingredient._id ? ingredient._id : 1) + "#quantity"}
											type='number'
											value={ingredient.quantity}
											onChange={handleTableChanges}
										/>
									</td>
									<td>
										<input
											name={(ingredient._id ? ingredient._id : 1) + "#unit"}
											type='text'
											value={ingredient.unit}
											onChange={handleTableChanges}
										/>
									</td>
								</tr>
							</tbody>
						))}
					</Table>
				</Form.Group>
			</Form>
		</div>
	);
};

export { Recipe };
