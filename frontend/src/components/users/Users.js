import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers, deleteUser } from '../../actions/users';

import Datatable from "react-bs-datatable"; // Import this package

import UserModal from './UserModal';

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
          { title: "Edit", prop: "", 
            cell: row => (
              <UserModal
                    create={false}
                    user={row}
                    resetState={this.props.resetState}
                  />
            ),
          
            sortable: false, filterable: false 
          },
          { title: "Delete", prop: "", 
            cell: row => (
              <button onClick={this.props.deleteUser.bind(this,row.id)} className="btn btn-danger btn-sm">Delete</button>
            ),
          
            sortable: false, filterable: false 
          }
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
        
        //rever isto - mudar o axios para na action fazer set a isto
        this.state.isLoaded = true;
        this.state.items = this.props.users;
        console.log(this.state.items);

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
                //rowsPerPageOption={[3, 5, 8, 10]}
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
