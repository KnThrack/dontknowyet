import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link } from "react-router-dom";

/**
 * @classdesc this class controls the floating buttons that are shown at the bottom
 * @class FloatButtons
 * @exports FloatButtons
 * @constructor
 */
const FloatButtons = (...props) => {
	const { handleAddRecipe, handleSubmit, handleBack, handleAddIngredient, pageState } = props[0];

	if (pageState === null) {
		return <ButtonGroup className='footerButtonGroup' />;
	}

	if (pageState.page === "list") {
		return (
			<ButtonGroup className='footerButtonGroup'>
				<Button variant='dark' className='back-Button' size='lg' block onClick={handleAddRecipe} title='Add Recipe'>
					Add Recipe
				</Button>
			</ButtonGroup>
		);
	} else if (pageState.page === "details") {
		return (
			<ButtonGroup className='footerButtonGroup'>
				<Button variant='info' className='back-Button' size='lg' title='Go Back' onClick={handleBack}>
					Go Back
				</Button>
				<Button type='submit' className='submit-Button' size='lg' variant='primary' onClick={handleSubmit}>
					Submit
				</Button>
				<Button type='button' className='back-Button' size='lg' variant='primary' onClick={handleAddIngredient}>
					Add Ingredient
				</Button>
			</ButtonGroup>
		);
	} else if (pageState.page === "home") {
		return <ButtonGroup className='footerButtonGroup' />;
	}
};

export { FloatButtons };
