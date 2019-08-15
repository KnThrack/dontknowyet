// src/views/Recipes.js
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Loading, RecipeCard } from ".";

var _ = require("underscore");

interface Irecipe {
	_id: string;
	name: string;
	title: string;
	cuisine: string;
	ingredients: [{ ingredient: string; quantity: number; unit: string; _id: string }];
	create_date: Date;
	recipe: string;
	user: string;
}
/**
 * @classdesc Recipes renderer class to display a list of recipes or a single recipe
 * @exports Recipes
 * @constructor
 */
const Recipes = (
	...props: {
		handleFilterChange: any;
		handleDelete: any;
		recipesList: any;
		filter: any;
		uploadFiles: any;
		onFilesAdded: any;
		successfullUploaded: any;
		uploadProgress: any;
		uploading: any;
		files: any;
		setFiles: any;
		setSuccessfullUploaded: any;
		handleInputChange: any;
		handleChangeIngredient: any;
		handleDeleteIngredient: any;
		makeCardBig: any;
		pictureList: any;
		setPageState: any;
		setChangeRecipe: any;
		changeRecipe: any;
		location: any;
	}[]
) => {
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
		makeCardBig,
		pictureList,
		setPageState,
		setChangeRecipe,
		changeRecipe,
		location
	} = props[0];

	useEffect(() => {
		setPageState({ page: "list" });
	}, []);

	function handleFilterChanges(event: any) {
		handleFilterChange(event);
	}

	if (changeRecipe) {
		return (
			<div className='content-inner'>
				<RecipeCard
					recipe={changeRecipe}
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
			</div>
		);
	}

	if (recipesList) {
		return (
			<div className='content-inner'>
				<Form inline>
					<FormControl type='text' placeholder='Search' className=' mr-sm-2' onChange={handleFilterChanges} value={filter} />
				</Form>
				<div className='recipe-cards'>
					{recipesList.map(function recipes(recipe: Irecipe) {
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
