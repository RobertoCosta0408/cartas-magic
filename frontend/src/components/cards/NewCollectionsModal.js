import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewCollectionForm from "./NewCollectionsForm";

class NewCollectionModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "Editing Collection";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    var modalButton = 'Edit';
    if (create) {
      title = "Creating New Collection";
      modalButton = 'Create';

      button = (
        <Button
          color="primary"
          className="float-right"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          Create New
        </Button>
      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewCollectionForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              collection={this.props.collection}
              modalButton={modalButton}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewCollectionModal;