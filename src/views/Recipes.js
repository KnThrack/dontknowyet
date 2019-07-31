// src/views/Recipes.js
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Loading, RecipeCard } from ".";

var _ = require("underscore");

const Recipes = (...props) => {
	const { handleFilterChange, handleDelete, recipesList, filter, setPageState, pictureList } = props[0];

	useEffect(() => {
		setPageState({ page: "list" });
	}, []);

	function handleFilterChanges(event) {
		handleFilterChange(event);
	}

	if (recipesList) {
		return (
			<div className='content-inner'>
				<Form inline>
					<FormControl type='text' placeholder='Search' className=' mr-sm-2' onChange={handleFilterChanges} value={filter} />
				</Form>
				<div className='recipe-cards'>
					{recipesList.map(function recipes(recipe) {
						// find a picture in the picture list
						const picture_index = _.findIndex(pictureList, { recipe_id: recipe._id });
						let url = "";
						if (picture_index !== -1) {
							url = pictureList[picture_index].url;
						} else {
						}
						// pictureList[picture_index].url
						return <RecipeCard recipe={recipe} url={url} handleDelete={handleDelete} />;
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
