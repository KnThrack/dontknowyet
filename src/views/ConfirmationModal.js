// src/views/ConfirmationModal.js

import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmationModal = (...props) => {
	const { showModal, handleModalClose, handleModalSuccess, modal } = props[0];

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
};

export { ConfirmationModal };
