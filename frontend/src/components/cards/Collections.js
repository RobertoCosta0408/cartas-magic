import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCollections, deleteCollection } from '../../actions/collections';

import Datatable from "react-bs-datatable"; // Import this package
//import "bootstrap/dist/css/bootstrap.css";

import NewCollectionModal from './NewCollectionsModal';

import moment from 'moment';
export class Collections extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
        this.header = [
          { title: "Name", prop: "name", sortable: true, filterable: true },
          { title: "Edit", prop: "", 
            cell: row => (
              <NewCollectionModal
                    create={false}
                    collection={row}
                    resetState={this.props.resetState}
                  />
            ),
          
            sortable: false, filterable: false 
          },
          { title: "Delete", prop: "", 
            cell: row => (
              <button onClick={this.props.deleteCollection.bind(this,row.id)} className="btn btn-danger btn-sm">Delete</button>
            ),
          
            sortable: false, filterable: false 
          }
        ];
    }

    static propTypes = {
        collections: PropTypes.array.isRequired,
        getCollections: PropTypes.func.isRequired,
        deleteCollection: PropTypes.func.isRequired
    }
    
    componentDidMount() {
        this.props.getCollections();
    }
    
    render() {

        const header = this.header;
        const body = this.state.items;
        
        //rever isto - mudar o axios para na action fazer set a isto
        this.state.isLoaded = true;
        this.state.items = this.props.collections;

        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <Fragment>
            <div className="container mt-4">

            <NewCollectionModal
                    create={true}
                    collection=''
                    resetState={this.props.resetState}
                  />
            
            <h1>Collections List</h1>
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
    collections: state.collections.collections
});


export default connect(mapStateToProps, { getCollections, deleteCollection }) (Collections);
