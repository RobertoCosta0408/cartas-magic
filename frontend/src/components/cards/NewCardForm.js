import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";


import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editCards, addCard } from '../../actions/cards';
import { toggle } from './NewCardModal';

import axios from "axios";

import { tokenConfig } from '../../actions/auth';

import { getCollections } from '../../actions/collections';

class NewCardForm extends React.Component {
  state = {
    id: 0,
    name: "",
    number: "",
    description: "",
    collection: ""
  };

  componentDidMount() {
    if (this.props.card) {
      const { id, name, number, description, collection } = this.props.card;
      this.setState({ id, name, number, description, collection });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createCard = e => {
      console.log('esta a criar carta');

        e.preventDefault();
        e.preventDefault();
        console.log(this.state);
        //this.state.user = "1";
        //console.log(this.state);

        
        const { name, number, description, collection } = this.state;
        const card = { name, number, description, collection };
        this.props.addCard(card);
        this.setState({
            name: '',
            number: '',
            description: '',
            collection: '',
        });
        this.props.toggle();
        /*
        axios.post('/cards/', this.state, tokenConfig(getState)).then(() => {
        this.props.resetState();
        this.props.toggle();
        });
        */
  };

  editCard = e => {
    e.preventDefault();
    console.log('a editar cenas');
    console.log(this.state);
    
    this.props.editCards(this.state.id, this.state);
    //this.props.resetState();
    this.setState({
        name: '',
        number: '',
        description: '',
        collection: '',
    });
    this.props.toggle();
    /*
    axios.put(`/cards/${this.state.id}/`, this.state, tokenConfig(getState)).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
    */
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.card ? this.editCard : this.createCard}>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="number">Number:</Label>
          <Input
            type="number"
            name="number"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.number)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description:</Label>
          <Input
            type="text"
            name="description"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.description)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="collection">Collection:</Label>
            <select className="form-control" 
                type="text" 
                name="collection"
                onChange={this.onChange}
                value={this.state.collection} >
                <option key={0} value=""> </option>
                { this.props.collections.map(collection => (
                    <option key={collection.id} value={collection.id}>{collection.name}</option>
                )) }
            </select>

        </FormGroup>
        <Button>Send</Button>
      </Form>
    );
  }
}

//export default NewCardForm;


const mapStateToProps = state => ({
    cards: state.cards.cards,
    collections: state.collections.collections
});


export default connect(mapStateToProps, { getCollections, editCards, toggle, addCard }) (NewCardForm);