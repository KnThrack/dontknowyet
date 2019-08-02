// src/views/Loading.js
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link } from "react-router-dom";
import { RecipeForm } from "./";
import Moment from "moment";

const RecipeCard = (...props) => {
	const [withforms, setwithform] = useState("");

	const {
		recipe,
		url,
		withform,
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
		handleDelete,
		setChangeRecipe,
		ChangeRecipe,
		pictureList,
		location
	} = props[0];

	useEffect(() => {
		setwithform(withform);
	}, []);

	function test(something) {
		setChangeRecipe(recipe);

		setwithform(true);
		console.log(something);
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

	if (withforms) {
		return (
			<Card id={"card#" + recipe._id.toString()} className='Bigcard' key={recipe._id.toString()}>
				<Card.Header>{recipe.cuisine}</Card.Header>
				<div className='recipe-button'>
					<DropdownButton id='cardButton' className='cardButton' drop='left' variant='' title='...'>
						<Dropdown.Item eventKey={"recipes_del_btn#" + recipe._id.toString()} onSelect={handleDelete}>
							Delete
						</Dropdown.Item>
					</DropdownButton>
				</div>
				<Card.Body>
					<RecipeForm
						recipe={recipe}
						pictureList={pictureList}
						handleInputChange={handleInputChange}
						handleChangeIngredient={handleChangeIngredient}
						handleDeleteIngredient={handleDeleteIngredient}
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
				</Card.Body>
				<Card.Footer className='text-muted'>{Moment(recipe.create_date).format("DD MMM YY, h:mm:ss a")}</Card.Footer>
			</Card>
		);
	} else {
		return (
			<Card id={"card#" + recipe._id.toString()} onClick={test} className={cardClass(recipe)} key={recipe._id.toString()}>
				<Card.Header>{recipe.cuisine}</Card.Header>
				<div className='recipe-button'>
					<DropdownButton id='cardButton' className='cardButton' drop='left' variant='' title='...'>
						<Dropdown.Item eventKey={"recipes_del_btn#" + recipe._id.toString()} onSelect={handleDelete}>
							Delete
						</Dropdown.Item>
					</DropdownButton>
				</div>
				<div className='cardLink'>
					<Card.Body>
						<Card.Subtitle>{recipe.title}</Card.Subtitle>
						<Card.Text>{recipe.recipe < 45 ? `${recipe.recipe}` : `${recipe.recipe.substring(0, 45)}...`}</Card.Text>
					</Card.Body>

					<Card.Img src={url} alt='Card image' variant='top' />
				</div>
				<Card.Footer className='text-muted'>{Moment(recipe.create_date).format("DD MMM YY, h:mm:ss a")}</Card.Footer>
			</Card>
		);
	}
};

export { RecipeCard };

/*
<Link className='cardLink' to={{ pathname: "/recipe/" + recipe._id.toString(), state: recipe }}>

*/
