// src/views/Recipes.js
import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";
import { Loading } from ".";

var _ = require("underscore");

const Recipes = (...props) => {
	const { handleFilterChange, handleAddRecipe, handleDelete, location, recipesList, filter } = props[0];

	function handleFilterChanges(event) {
		handleFilterChange(event);
	}

	function handleAddRecipes(event) {
		handleAddRecipe(event);
	}

	function handleDeletes(event) {
		handleDelete(event);
	}

	let cardClass = recipe => {
		var sClass = "";

		switch (recipe.cuisine) {
			case "German":
				// code block
				sClass = "card";
				break;
			case "Chinese" || "Asian":
				// code block
				sClass = "card card1";
				break;
			case "French":
				// code block
				sClass = "card card2";
				break;
			case "Italian":
				// code block
				sClass = "card card3";
				break;
			default:
				sClass = "card";
			// code block
		}

		return sClass;
	};

	if (recipesList) {
		return (
			<div className='content-inner'>
				<Form inline>
					<FormControl type='text' placeholder='Search' className=' mr-sm-2' onChange={handleFilterChanges} value={filter} />
				</Form>
				<div className='recipe-cards'>
					{recipesList.map(recipe => (
						<Card className={cardClass(recipe)} key={recipe._id.toString()}>
							<div className='recipe-button'>
								<DropdownButton id='cardButton' className='cardButton' variant='' title='...'>
									<Link to={{ pathname: "/recipe/" + recipe._id.toString(), state: recipe }} className='dropdown-item' role='Button'>
										Go to Details
									</Link>
									<Dropdown.Item eventKey='2' onClick={handleDeletes}>
										Delete
									</Dropdown.Item>
								</DropdownButton>
							</div>
							<Card.Body>
								<Card.Title>{recipe.title}</Card.Title>
								<Card.Subtitle className='mb-2 text-muted'>{recipe.cuisine}</Card.Subtitle>
								<Card.Text>{recipe.recipe}</Card.Text>
							</Card.Body>
						</Card>
					))}
				</div>
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

/*
									<Dropdown.Item
										eventKey={"recipes_det_btn#" + recipe._id.toString()}
										href={{ pathname: "/recipe/" + recipe._id.toString(), state: recipe }}
									>
										Go to Details
									</Dropdown.Item>
									<Dropdown.Item eventKey={"recipes_del_btn#" + recipe._id.toString()} onClick={handleDeletes}>
										Delete
									</Dropdown.Item>

								<Link  to={{ pathname: "/recipe/" + recipe._id.toString(), state: recipe }}>
									<Button variant='info' title='Go to Details'>
										Go to Details
									</Button>
								</Link>
								<Button id={"recipes_del_btn#" + recipe._id.toString()} variant='info' onClick={handleDeletes} title='Delete'>
									Delete
								</Button>

								*/
