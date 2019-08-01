import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./table.css";

const RecipeTable = (...props) => {
	const { recipe, handleChangeIngredient, handleDeleteIngredient } = props[0];

	useEffect(() => {}, []);

	return (
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
	);
};
export { RecipeTable };
