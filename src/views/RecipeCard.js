// src/views/Loading.js
import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link } from "react-router-dom";
import { RecipeForm } from "./";
import Moment from "moment";

const RecipeCard = (...props) => {
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
		pictureList,
		location
	} = props[0];

	useEffect(() => {}, []);

	function test(something) {
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

	if (withform) {
		return (
			<Card className='Bigcard' key={recipe._id.toString()}>
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
			<Card onClick={test} className={cardClass(recipe)} key={recipe._id.toString()}>
				<Card.Header>{recipe.cuisine}</Card.Header>
				<div className='recipe-button'>
					<DropdownButton id='cardButton' className='cardButton' drop='left' variant='' title='...'>
						<Dropdown.Item eventKey={"recipes_del_btn#" + recipe._id.toString()} onSelect={handleDelete}>
							Delete
						</Dropdown.Item>
					</DropdownButton>
				</div>
				<Link className='cardLink' to={{ pathname: "/recipe/" + recipe._id.toString(), state: recipe }}>
					<Card.Body>
						<Card.Subtitle>{recipe.title}</Card.Subtitle>
						<Card.Text>{recipe.recipe < 45 ? `${recipe.recipe}` : `${recipe.recipe.substring(0, 45)}...`}</Card.Text>
					</Card.Body>
				</Link>
				<Card.Img src={url} alt='Card image' variant='top' />
				<Card.Footer className='text-muted'>{Moment(recipe.create_date).format("DD MMM YY, h:mm:ss a")}</Card.Footer>
			</Card>
		);
	}
};

export { RecipeCard };
