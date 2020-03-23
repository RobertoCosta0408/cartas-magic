import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";


import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editUsers } from '../../actions/users';
import { toggle } from './UserModal';

import axios from "axios";

import { tokenConfig } from '../../actions/auth';

class UserForm extends React.Component {
  state = {
    id: 0,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    is_superuser: ""
  };

  componentDidMount() {
    if (this.props.user) {
        console.log(this.props.user);
      const { id, username, email, first_name, last_name, is_superuser } = this.props.user;
      this.setState({ id, username, email, first_name, last_name, is_superuser });
    }
  }

  onChange = e => {
      console.log(e.target.value);
      console.log(e.target.selected);
    this.setState({ [e.target.name]: e.target.value });
  };

  
  editUser = e => {
    e.preventDefault();
    console.log('a editar cenas');
    console.log(this.state);
    
    this.props.editUsers(this.state.id, this.state);
    //this.props.resetState();
    this.setState({
        id: 0,
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        is_superuser: 0
    });
    this.props.toggle();
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.user ? this.editUser : ''}>
        <FormGroup>
          <Label for="name">Username:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.username)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="email"
            name="email"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.email)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="first_name">First Name:</Label>
          <Input
            type="text"
            name="first_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.first_name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="last_name">Last Name:</Label>
          <Input
            type="text"
            name="last_name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.last_name)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="is_superuser"
            className="ml-auto"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.is_superuser)}
            checked={this.defaultIfEmpty(this.state.is_superuser)}
          />
          <Label for="is_superuser">Is Admin</Label>
        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
    users: state.users.users
});


export default connect(mapStateToProps, { editUsers, toggle }) (UserForm);