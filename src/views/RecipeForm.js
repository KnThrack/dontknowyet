import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Upload, PictureCarousel } from "./";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./table.css";

const RecipeForm = (...props) => {
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
	function handleInputChanges(event) {
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
			<Form.Group /*controlId={recipe._id.toString()+".ControlTextarea1"}*/>
				<Form.Label htmlFor='recipe'>Recipe</Form.Label>
				<Form.Control name='recipe' onChange={handleInputChanges} id='recipe' as='textarea' rows='10' value={recipe.recipe} />
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
					{recipe.ingredients.map(ingredient => (
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
										className='ingredientDelete-Button submit-Button'
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
	);
};

export { RecipeForm };
