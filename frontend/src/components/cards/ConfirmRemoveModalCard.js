import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

import axios from "axios";

import { deleteCard } from '../../actions/cards';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggle, resetState } from './NewCardModal';


class ConfirmRemovalCardModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };


  deleteCardButton = pk => {
    this.props.deleteCard(pk);
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
            Do you really wanna delete the card {this.props.name}?
          </ModalHeader>

          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => this.deleteCardButton(this.props.pk)}
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
    cards: state.cards.cards,
});

export default connect(mapStateToProps, { toggle, deleteCard, resetState }) (ConfirmRemovalCardModal);