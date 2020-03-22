import axios from 'axios';
import { returnErrors } from './messages';

import { USER_LOADED,
         USER_LOADING, 
         AUTH_ERROR, 
         LOGIN_FAIL, 
         LOGIN_SUCCESS, 
         LOGOUT_SUCCESS,
         REGISTER_FAIL,
         REGISTER_SUCCESS
 } from './types';

export const loadUser = () => (dispatch, getState) => {
    //User loading
    dispatch({ type: USER_LOADING })

    const config = tokenConfig(getState);

    axios.get('/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

export const login = (username, password) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, password });

    axios.post('/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
        });
}

export const register = ({ username, password, email, first_name, last_name }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, email, first_name, last_name, password });

    axios.post('/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

export const logout = () => (dispatch, getState) => {
    
    const config = tokenConfig(getState);

    axios.post('/auth/logout/', null, config)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}

export const tokenConfig = getState => {
    //get token from state
    const token = getState().auth.token;

    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //setting token
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}