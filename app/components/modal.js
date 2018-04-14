import React, {Component} from "react";
import {Modal, Button} from "react-bootstrap";

import '../assets/css/modal.css';

export default class Modals extends Component {

	render() {

		const showModal = !!this.props.modal;

		// Prevent rendering
		if (!showModal)
			return (<div></div>);

    const {closeModal} = this.props;

    const modal = this.props.modal;
		const {header, text} = modal;
    const className = modal.getClassName();

		return (
      <Modal show={showModal} onHide={() => closeModal()} className={className}>
  			<Modal.Header closeButton>
  			   <Modal.Title>{header}</Modal.Title>
  			</Modal.Header>
  			<Modal.Body>{text}</Modal.Body>
  			<Modal.Footer>
  			   <Button onClick={() => closeModal()}> Close
  			   </Button>
  		  </Modal.Footer>
	   </Modal>
);
	}
}
