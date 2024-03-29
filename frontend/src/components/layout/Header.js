import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { logout } from '../../actions/auth';


export class Header extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: null,
            user: null,
            isSuperUser: null
        };
    }
    render() {

        const { isAuthenticated, user, isSuperUser } = this.props.auth;
        
        const authLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <span className="navbar-text mr-3">
                    <strong>{user ? `Welcome ${user.username}`: ""}</strong>
                </span>
                <li className="nav-item">
                    <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">Logout</button>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
            </ul>
        );

        const usersList = (
            <Link to="/users_list" className="navbar-brand">Users</Link>
        );

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">Magic Cards</a>
                
                
                { isSuperUser ? usersList : '' }
                
                { isAuthenticated ? authLinks : guestLinks }
                

            </div>
        </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,

});

export default connect(mapStateToProps, { logout })(Header);