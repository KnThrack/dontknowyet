// src/views/Recipe.js
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Link } from "react-router-dom";
import "./table.css";

const Recipe = (...props) => {
	const { handleInputChange, handleTableChange, handleChangeIngredient, handleDeleteIngredient, recipesList, setPageState, setChangeRecipe, location } = props[0];

	useEffect(() => {
		setPageState({ page: "details" });
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
					<Table striped='true' bordered='true' hover='true'>
						<Thead>
							<Tr>
								<Th>Ingredient</Th>
								<Th>Quantity</Th>
								<Th>Unit</Th>
								<Th width='50px' />
							</Tr>
						</Thead>
						{myRecipe.ingredients.map(ingredient => (
							<Tbody key={ingredient._id ? ingredient._id : 1}>
								<Tr onClick={handleChangeIngredient} key={ingredient._id ? ingredient._id : 1} id={ingredient._id ? ingredient._id : 1}>
									<Td>{ingredient.ingredient}</Td>
									<Td>{ingredient.quantity}</Td>
									<Td>{ingredient.unit}</Td>
									<Td className='ingredientDeleteCell' width='50px'>
										<img
											id={ingredient._id ? ingredient._id : 1}
											onClick={handleDeleteIngredient}
											src='https://unicons.iconscout.com/release/v1.0.0/svg/multiply.svg'
											alt=''
											width='30'
											height='30'
											className='ingredientDelete-IMG d-inline-block align-center'
										/>
										<Button
											id={ingredient._id ? ingredient._id : 1}
											type='submit'
											className='ingredientDelete-Button'
											variant='primary'
											onClick={handleDeleteIngredient}
										>
											Delete
										</Button>
									</Td>
								</Tr>
							</Tbody>
						))}
					</Table>
				</Form.Group>
			</Form>
		</div>
	);
};

export { Recipe };
