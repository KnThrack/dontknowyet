// src/views/Recipes.js
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Loading, RecipeCard } from ".";

var _ = require("underscore");

const Recipes = (...props) => {
	//const { handleFilterChange, handleDelete, recipesList, filter, setPageState, pictureList } = props[0];
	const {
		handleFilterChange,
		handleDelete,
		recipesList,
		filter,
		uploadFiles,
		onFilesAdded,
		successfullUploaded,
		uploadProgress,
		uploading,
		files,
		setFiles,
		setSuccessfullUploaded,
		handleInputChange,
		handleChangeIngredient,
		handleDeleteIngredient,
		pictureList,
		setPageState,
		setChangeRecipe,
		ChangeRecipe,
		location
	} = props[0];

	useEffect(() => {
		setPageState({ page: "list" });
	}, []);

	function handleFilterChanges(event) {
		handleFilterChange(event);
	}

	function makeCardBig(event, recipe) {
		// ok here we need to basically raise a modal with the card we just click and overlay or over the list
		setChangeRecipe(recipe);
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
						return (
							<RecipeCard
								recipe={recipe}
								url={url}
								handleDelete={handleDelete}
								key={recipe._id}
								pictureList={pictureList}
								withform={false}
								makeCardBig={makeCardBig}
								handleInputChange={handleInputChange}
								handleChangeIngredient={handleChangeIngredient}
								handleDeleteIngredient={handleDeleteIngredient}
								setChangeRecipe={setChangeRecipe}
								successfullUploaded={successfullUploaded}
								uploadProgress={uploadProgress}
								uploading={uploading}
								files={files}
								setFiles={setFiles}
								setSuccessfullUploaded={setSuccessfullUploaded}
								onFilesAdded={onFilesAdded}
								uploadFiles={uploadFiles}
								location={location}
							/>
						);
					})}
				</div>
				{recipesList.map(function recipes(recipe) {
					if (ChangeRecipe !== undefined) {
						if (recipe._id === ChangeRecipe._id) {
							return (
								<RecipeCard
									recipe={recipe}
									handleDelete={handleDelete}
									pictureList={pictureList}
									withform={true}
									makeCardBig={makeCardBig}
									handleInputChange={handleInputChange}
									handleChangeIngredient={handleChangeIngredient}
									handleDeleteIngredient={handleDeleteIngredient}
									setChangeRecipe={setChangeRecipe}
									successfullUploaded={successfullUploaded}
									uploadProgress={uploadProgress}
									uploading={uploading}
									files={files}
									setFiles={setFiles}
									setSuccessfullUploaded={setSuccessfullUploaded}
									onFilesAdded={onFilesAdded}
									uploadFiles={uploadFiles}
									location={location}
								/>
							);
						}
					}
				})}
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
