// src/views/ConfirmationModal.js

import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConfirmationModal = (...props) => {

    const { showModal, handleModalClose, handleModalSuccess, state, that } = props[0];

    if (state.modal !== undefined) {
        switch (state.modal.type) {
            case "delete":
                // code block
                break;
            case "confirm":
                // code block
                break;
            default:
            // code block
        }
    }
    function handleClose() {
        handleModalClose();
    }

    function handleSuccess() {
        handleModalSuccess(state, that);
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Decide !!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you really want to delete your recipe</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
            </Button>
                <Button variant="primary" onClick={handleSuccess}>
                    Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    );
};

export { ConfirmationModal };