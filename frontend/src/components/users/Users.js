import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers, deleteUser } from '../../actions/users';

import Datatable from "react-bs-datatable";

import UserModal from './UserModal';
import ConfirmRemoveModalUser from './ConfirmRemoveModalUser'

export class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
        this.header = [
          { title: "Username", prop: "username", sortable: true, filterable: true },
          {
            title: "Email",
            prop: "email",
            sortable: true,
            filterable: true
          },
          { title: "First Name", prop: "first_name", sortable: true, filterable: true },
          { title: "Last Name", prop: "last_name", sortable: true, filterable: true },
          { title: "Is Admin", prop: "is_superuser", 
          
          cell: row => (
            <input type="checkbox"
            readOnly
            checked={row.is_superuser}>
            </input>
          ),
          sortable: true, filterable: true },
          { title: "Actions", prop: "", 
            cell: row => (
              <div>
                <UserModal
                      create={false}
                      user={row}
                      resetState={this.props.resetState}
                    />
                <ConfirmRemoveModalUser
                    pk={row.id}
                    username={row.username}
                    resetState={this.props.resetState}
                  />
              </div>
            ),
          
            sortable: false, filterable: false 
          },
        ];
    }

    static propTypes = {
        users: PropTypes.array.isRequired,
        getUsers: PropTypes.func.isRequired,
        deleteUser: PropTypes.func.isRequired
    }
    
    componentDidMount() {
        this.props.getUsers();
    }
    
    
    render() {

        const header = this.header;
        const body = this.state.items;
        
        this.state.isLoaded = true;
        this.state.items = this.props.users;

        const { error, isLoaded, items } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <Fragment>
            <div className="container">

  
            
            <h1>Users List</h1>
              <Datatable
                tableHeaders={this.header}
                tableBody={this.state.items}
                keyName="userTable"
                tableClass="striped hover responsive"
                rowsPerPage={5}
                initialSort={{ prop: "username", isAscending: true }}
            />
             
            </div>
            </Fragment>
          );
        }
    }
}

const mapStateToProps = state => ({
    users: state.users.users
});


export default connect(mapStateToProps, { getUsers, deleteUser }) (Users);
