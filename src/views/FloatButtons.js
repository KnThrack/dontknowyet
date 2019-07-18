import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link } from "react-router-dom";

const FloatButtons = (...props) => {
	const { handleAddRecipe, handleSubmit, handleAddIngredient, pageState } = props[0];

	if (pageState === null) {
		return <ButtonGroup className='footerButtonGroup' />;
	}

	if (pageState.page === "list") {
		return (
			<ButtonGroup className='footerButtonGroup'>
				<Button variant='dark' size='lg' block onClick={handleAddRecipe} title='Add Recipe'>
					Add Recipe
				</Button>
			</ButtonGroup>
		);
	} else if (pageState.page === "details") {
		return (
			<ButtonGroup className='footerButtonGroup'>
				<Link to='/'>
					<Button variant='info' title='Go Back'>
						Go Back
					</Button>
				</Link>
				<Button type='submit' variant='primary' onClick={handleSubmit}>
					Submit
				</Button>
				<Button type='button' variant='primary' onClick={handleAddIngredient}>
					Add Ingredient
				</Button>
			</ButtonGroup>
		);
	}
};

export { FloatButtons };
