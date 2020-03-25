import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

import axios from "axios";

import { deleteCollection } from '../../actions/collections';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggle, resetState } from './NewCollectionsModal';


class ConfirmRemovalCollectionModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };


  deleteCollectionButton = pk => {
    this.props.deleteCollection(pk);
    this.toggle();
  };
  

  render() {
    return (
      <Fragment>
        <Button color="danger ml-2" onClick={() => this.toggle()}>
          Delete
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Do you really wanna delete the collection {this.props.name}?
          </ModalHeader>

          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => this.deleteCollectionButton(this.props.pk)}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
    collections: state.collections.collections
});

export default connect(mapStateToProps, { toggle, deleteCollection, resetState }) (ConfirmRemovalCollectionModal);