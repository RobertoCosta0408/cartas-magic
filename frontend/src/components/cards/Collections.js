import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCollections, deleteCollection } from '../../actions/collections';

import Datatable from "react-bs-datatable";

import NewCollectionModal from './NewCollectionsModal';
import ConfirmRemoveModalCollection from './ConfirmRemoveModalCollection'

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
          { title: "Actions", prop: "", 
            cell: row => (
              <div>
              <NewCollectionModal
                    create={false}
                    collection={row}
                    resetState={this.props.resetState}
                  />
              <ConfirmRemoveModalCollection
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
