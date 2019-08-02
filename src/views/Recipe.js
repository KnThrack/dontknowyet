// src/views/Recipe.js
import React, { useState, useEffect } from "react";
import { RecipeCard } from "./";

const Recipe = (...props) => {
	const {
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
		recipesList,
		pictureList,
		setPageState,
		setChangeRecipe,
		ChangeRecipe,
		location
	} = props[0];

	useEffect(() => {
		setPageState({ page: "details" });
		let index = recipesList.findIndex(x => x._id === location.state._id.toString());
		setChangeRecipe(recipesList[index]);
	}, []);

	// handlers end

	// find which one we looking at
	let index = recipesList.findIndex(x => x._id === location.state._id.toString());

	const myRecipe = recipesList[index];
	if (myRecipe === null) return <p>Loading ...</p>;
	return (
		<div className='content-inner'>
			<RecipeCard
				recipe={myRecipe}
				pictureList={pictureList}
				withform={true}
				handleInputChange={handleInputChange}
				handleChangeIngredient={handleChangeIngredient}
				handleDeleteIngredient={handleDeleteIngredient}
				ChangeRecipe={ChangeRecipe}
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
		</div>
	);
};

export { Recipe };