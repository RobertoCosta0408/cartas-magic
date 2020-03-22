import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCards, deleteCard } from '../../actions/cards';

import Datatable from "react-bs-datatable"; // Import this package
//import "bootstrap/dist/css/bootstrap.css";

import NewCardModal from './NewCardModal';

import moment from 'moment';
export class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
        this.header = [
          { title: "Name", prop: "name", sortable: true, filterable: true },
          {
            title: "Number",
            prop: "number",
            sortable: true,
            filterable: true
          },
          { title: "Description", prop: "description", sortable: true, filterable: true },
          { title: "Collection", prop: "collection_name", sortable: true, filterable: true },
          { title: "Edit", prop: "", 
            cell: row => (
              <NewCardModal
                    create={false}
                    card={row}
                    resetState={this.props.resetState}
                  />
            ),
          
            sortable: false, filterable: false 
          },
          { title: "Delete", prop: "", 
            cell: row => (
              <button onClick={this.props.deleteCard.bind(this,row.id)} className="btn btn-danger btn-sm">Delete</button>
            ),
          
            sortable: false, filterable: false 
          }
        ];
    }

    static propTypes = {
        cards: PropTypes.array.isRequired,
        getCards: PropTypes.func.isRequired,
        deleteCard: PropTypes.func.isRequired
    }
    
    componentDidMount() {
        this.props.getCards();
    }
    
    /*
    componentDidMount() {
        fetch("http://127.0.0.1:8000/cards/")
          .then(res => res.json())
          .then(
            result => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            error => {
              this.setState({
                isLoaded: true,
                error: error
              });
            }
          );
    }
    */
    render() {

        console.log('state isloaded: ');
        //console.log(this.state);
        //console.log(this.props.cards);
        console.log(this.state.isLoaded);
        //console.log(isLoaded);
        console.log('-------');

        const header = this.header;
        const body = this.state.items;
        
        //rever isto - mudar o axios para na action fazer set a isto
        this.state.isLoaded = true;
        this.state.items = this.props.cards;

        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <Fragment>
            <div className="container">

            <NewCardModal
                    create={true}
                    card=''
                    resetState={this.props.resetState}
                  />
            
            <h1>Cards List</h1>
              <Datatable
                tableHeaders={this.header}
                tableBody={this.state.items}
                keyName="userTable"
                tableClass="striped hover responsive"
                rowsPerPage={5}
                //rowsPerPageOption={[3, 5, 8, 10]}
                initialSort={{ prop: "name", isAscending: true }}
            />
             
            </div>
            </Fragment>
          );
        }
    }
    /*
    render() {
        
        return (
            <Fragment>
                <h1>Cards List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Description</th>
                            <th>Collection</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.cards.map(card => (
                            <tr key={card.id}>
                                <td>{card.id}</td>
                                <td>{card.name}</td>
                                <td>{card.number}</td>
                                <td>{card.description}</td>
                                <td>{card.collection_name}</td>
                                
                                <td><button onClick={this.props.deleteCard.bind(this,card.id)} className="btn btn-danger btn-sm">Delete</button></td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </Fragment>
        )
    }
    */
}

const mapStateToProps = state => ({
    cards: state.cards.cards
});


export default connect(mapStateToProps, { getCards, deleteCard }) (Cards);
