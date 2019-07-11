// src/views/deleteModal.js

import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteModal = (...props) => {

    const { showModal, handleModalClose, handleModalSuccess } = props[0];

    function handleClose() {
        handleModalClose();
    }

    function handleSuccess() {
        handleModalSuccess();
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

export { DeleteModal };