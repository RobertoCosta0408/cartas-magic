import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

import axios from "axios";

import { deleteUser } from '../../actions/users';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggle, resetState } from './UserModal';


class ConfirmRemovalUserModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };


  deleteUserButton = pk => {
    this.props.deleteUser(pk);
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
            Do you really wanna delete the user {this.props.username}?
          </ModalHeader>

          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => this.deleteUserButton(this.props.pk)}
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
    users: state.users.users
});

export default connect(mapStateToProps, { toggle, deleteUser, resetState }) (ConfirmRemovalUserModal);