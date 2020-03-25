import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCards, deleteCard } from '../../actions/cards';

import Datatable from "react-bs-datatable"; // Import this package
//import "bootstrap/dist/css/bootstrap.css";

import NewCardModal from './NewCardModal';
import ConfirmRemoveModalCard from './ConfirmRemoveModalCard'

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
          { title: "Actions", prop: "", 
            cell: row => (
              <div>
                <NewCardModal
                      create={false}
                      card={row}
                      resetState={this.props.resetState}
                    />
                <ConfirmRemoveModalCard
                    pk={row.id}
                    name={row.name}
                    resetState={this.props.resetState}
                  />
              </div>
            ),
          
            sortable: false, filterable: false 
          },
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
            <div className="container mt-4">

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
}

const mapStateToProps = state => ({
    cards: state.cards.cards
});


export default connect(mapStateToProps, { getCards, deleteCard }) (Cards);
