import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const FloatButtons = (...props) => {
	const { handleAddRecipe, buttonVariant, pageState } = props[0];

	console.log(pageState);

	return (
		<ButtonGroup className='footerButtonGroup'>
			<Button variant='dark' size='lg' block onClick={handleAddRecipe} title='Add Recipe'>
				Add Recipe
			</Button>
		</ButtonGroup>
	);
};

export { FloatButtons };
