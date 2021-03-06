import React, { FunctionComponent, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Upload, PictureCarousel, RecipeTable } from ".";
import * as T from "../declarations/globaltypes";
/**
 * @classdesc RecipeForm renderer class
 * @exports RecipeForm
 * @constructor
 * @inner
 * @memberof RecipeCard
 */
const RecipeForm : FunctionComponent<any> = (...props) => {
	const {
		recipe,
		uploadFiles,
		onFilesAdded,
		successfullUploaded,
		uploadProgress,
		uploading,
		files,
		setFiles,
		setSuccessfullUploaded,
		handleChangeIngredient,
		handleInputChange,
		handleDeleteIngredient,
		pictureList,
		location
	} = props[0];

	useEffect(() => {}, []);

	// handlers
	function handleInputChanges(event: any) {
		handleInputChange(event, location.state);
	}

	return (
		<Form id='bigform' /*controlId={recipe._id.toString()+".Form"}*/>
			<Form.Group /*controlId={recipe._id.toString()+".ControlInput1"}*/>
				<Form.Label htmlFor='title'>Recipe Title</Form.Label>
				<Form.Control name='title' onChange={handleInputChanges} id='title' value={recipe.title} />
				<Form.Label htmlFor='name'>Recipe Name</Form.Label>
				<Form.Control name='name' onChange={handleInputChanges} id='name' value={recipe.name} />
				<Form.Label htmlFor='cuisine'>Cuisine</Form.Label>
				<Form.Control name='cuisine' onChange={handleInputChanges} id='cuisine' value={recipe.cuisine} as='select'>
					<option>German</option>
					<option>Chinese</option>
					<option>Asian</option>
					<option>French</option>
					<option>Italian</option>
				</Form.Control>
			</Form.Group>
			<Form.Group /*controlId={recipe._id.toString()+".ControlTextarea1"}
							<Form.Control name='recipe' onChange={handleInputChanges} id='recipe' as='textarea' rows='10' value={recipe.recipe} />
			*/
			>
				<Form.Label htmlFor='recipe'>Recipe</Form.Label>
				<Form.Control name='recipe' onChange={handleInputChanges} id='recipe' as='textarea' rows='10' value={recipe.recipe} />
			</Form.Group>
			<Form.Group>
				<RecipeTable recipe={recipe} handleChangeIngredient={handleChangeIngredient} handleDeleteIngredient={handleDeleteIngredient} />
			</Form.Group>
			<Form.Group className='Recipe-pictures'>
				<Upload
					successfullUploaded={successfullUploaded}
					uploadProgress={uploadProgress}
					uploading={uploading}
					files={files}
					setFiles={setFiles}
					setSuccessfullUploaded={setSuccessfullUploaded}
					onFilesAdded={onFilesAdded}
					uploadFiles={uploadFiles}
				/>
				<PictureCarousel pictureList={pictureList} recipeID={recipe._id.toString()} />
			</Form.Group>
		</Form>
	);
};

export { RecipeForm };
