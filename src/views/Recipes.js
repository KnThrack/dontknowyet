// src/views/Recipes.js
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";
import { Loading } from ".";

var _ = require("underscore");

const Recipes = (...props) => {
	const { handleFilterChange, handleAddRecipe, handleDelete, recipesList, filter, setPageState, pictureList } = props[0];

	useEffect(() => {
		setPageState({ page: "list" });
	}, []);

	function handleFilterChanges(event) {
		handleFilterChange(event);
	}

	function handleDeletes(key, event) {
		handleDelete(key, event);
	}

	let cardClass = recipe => {
		var sClass = "";

		switch (recipe.cuisine) {
			case "German":
				// code block
				sClass = "card";
				break;
			case "Chinese":
				// code block
				sClass = "card card1";
				break;
			case "Asian":
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
					{recipesList.map(function recipes(recipe) {
						// find a picture in the picture list
						const picture_index = _.findIndex(pictureList, { recipe_id: recipe.recipe_id });
						let url = "";
						if (picture_index !== -1) {
							url = pictureList[picture_index].url;
						}
						// pictureList[picture_index].url
						return (
							<Card className={cardClass(recipe)} key={recipe._id.toString()}>
								<Card.Img src={url} alt='Card image' />
								<Card.ImgOverlay>
									<div className='recipe-button'>
										<DropdownButton id='cardButton' className='cardButton' drop='left' variant='' title='...'>
											<Dropdown.Item eventKey={"recipes_del_btn#" + recipe._id.toString()} onSelect={handleDeletes}>
												Delete
											</Dropdown.Item>
										</DropdownButton>
									</div>
									<Link className='cardLink' to={{ pathname: "/recipe/" + recipe._id.toString(), state: recipe }}>
										<Card.Body>
											<Card.Title>{recipe.title}</Card.Title>
											<Card.Subtitle className='mb-2 text-muted'>{recipe.cuisine}</Card.Subtitle>
											<Card.Text>{recipe.recipe}</Card.Text>
										</Card.Body>
									</Link>
								</Card.ImgOverlay>
							</Card>
						);
					})}
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<Loading />
			</div>
		);
	}
};

export { Recipes };

// style={{ width: '18rem' }}

/*
									<Link to={{ pathname: "/recipe/" + recipe._id.toString(), state: recipe }} className='dropdown-item' role='Button'>
										Go to Details
									</Link>

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
