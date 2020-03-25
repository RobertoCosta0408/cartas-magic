import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";


import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editCollection, addCollection, getCollections } from '../../actions/collections';
import { toggle } from './NewCollectionsModal';

import axios from "axios";

import { tokenConfig } from '../../actions/auth';

class NewCollectionForm extends React.Component {
  state = {
    id: 0,
    name: "",
  };

  componentDidMount() {
    if (this.props.collection) {
      const { id, name } = this.props.collection;
      this.setState({ id, name });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createCollection = e => {

        e.preventDefault();
        
        const { name } = this.state;
        const collection = { name };
        this.props.addCollection(collection);
        this.setState({
            name: '',
        });
        this.props.toggle();
  };

  editCollection = e => {
    e.preventDefault();
    
    this.props.editCollection(this.state.id, this.state);
    
    this.setState({
        name: '',
    });
    this.props.toggle();
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.collection ? this.editCollection : this.createCollection}>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <Button>{this.props.modalButton}</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
    collections: state.collections.collections
});


export default connect(mapStateToProps, { getCollections, editCollection, toggle, addCollection }) (NewCollectionForm);