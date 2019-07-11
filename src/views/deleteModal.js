// src/views/deleteModal.js

import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteModal = ({ showModal }, ...props) => {

    function handleClose() {
        props.handleModalClose();
    }


    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
            </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    );
};

export { DeleteModal };