import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

const AdminRoute = ({ component: Component, auth, ...rest }) => (
    <Route 
        {...rest}
        render={props => {
                if(auth.isLoading) {
                    return <h2>Loading...</h2>
                } else if(!auth.isSuperUser) {
                    return <Redirect to="/"></Redirect>;
                }
                else {
                    return <Component {...props} />;
                }
            }
        }
    
    />
);

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(AdminRoute);