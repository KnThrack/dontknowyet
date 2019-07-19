// src/views/ConfirmationModal.js

import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ConfirmationModal = (...props) => {
	const { showModal, handleModalClose, handleModalSuccess, handleInputChange, modal, changeRecipe, ingredientIndex, ingredientDelete } = props[0];

	let title = "",
		body = "";

	if (modal !== undefined) {
		switch (modal.type) {
			case "delete":
				// code block
				title = "Delete Recipe";
				body = "Are you sure that you want to delete the recipe ?";
				break;
			case "confirm":
				// code block
				title = "Submit Recipe";
				body = "Are you sure that you want to change the recipe ?";
				break;
			case "addIngredient":
				if (ingredientDelete) {
					title = "Delete Ingredient";
				} else {
					title = "Add Ingredient";
				}
				break;
			default:
			// code block
		}
	}
	function handleClose() {
		handleModalClose();
	}

	function handleSuccess() {
		handleModalSuccess(modal);
	}

	if (modal.type === "addIngredient") {
		return (
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form id='Ingredient' /*controlId={recipe._id.toString()+".Form"}*/>
						<Form.Group /*controlId={recipe._id.toString()+".ControlInput1"}*/>
							<Form.Label htmlFor='ingredient'>Ingredient</Form.Label>
							<Form.Control
								readOnly={ingredientDelete}
								name='ingredient'
								onChange={handleInputChange}
								id='ingredient'
								value={changeRecipe.ingredients[ingredientIndex].ingredient}
							/>
							<Form.Label htmlFor='quantity'>Quantity</Form.Label>
							<Form.Control
								readOnly={ingredientDelete}
								name='quantity'
								onChange={handleInputChange}
								id='quantity'
								value={changeRecipe.ingredients[ingredientIndex].quantity}
							/>
							<Form.Label htmlFor='unit'>Unit</Form.Label>
							<Form.Control
								readOnly={ingredientDelete}
								name='unit'
								onChange={handleInputChange}
								id='unit'
								value={changeRecipe.ingredients[ingredientIndex].unit}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Cancel
					</Button>
					<Button variant='primary' onClick={handleSuccess}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		);
	} else {
		return (
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{body}</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Cancel
					</Button>
					<Button variant='primary' onClick={handleSuccess}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
};

export { ConfirmationModal };
