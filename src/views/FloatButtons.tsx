import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

/**
 * @classdesc this class controls the floating buttons that are shown at the bottom
 * @exports FloatButtons
 * @constructor
 */
const FloatButtons = (...props: { handleAddRecipe: any; handleSubmit: any; handleBack: any; handleAddIngredient: any; pageState: EpageState }[]) => {
	const { handleAddRecipe, handleSubmit, handleBack, handleAddIngredient, pageState } = props[0];

	if (pageState === EpageState.init) {
		return <ButtonGroup className='footerButtonGroup' />;
	}

	if (pageState === EpageState.list) {
		return (
			<ButtonGroup className='footerButtonGroup'>
				<Button variant='dark' className='back-Button' size='lg' block onClick={handleAddRecipe} title='Add Recipe'>
					Add Recipe
				</Button>
			</ButtonGroup>
		);
	} else if (pageState === EpageState.details) {
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
	} else if (pageState === EpageState.home) {
		return <ButtonGroup className='footerButtonGroup' />;
	}
	return <div />;
};

export { FloatButtons };
