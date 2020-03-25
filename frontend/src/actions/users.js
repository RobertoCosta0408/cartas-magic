import axios from 'axios'
import { createMessage } from './messages';

import { tokenConfig } from './auth';

import { GET_USERS, DELETE_USER, GET_USERS_LOADING, EDIT_USER } from './types';

// Get All Users
export const getUsers = () => (dispatch, getState) => {
    dispatch({ type: GET_USERS_LOADING });
    
    axios.get('/auth/users/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data,
                items: res.data
            });
        }).catch(err => console.log(err));
}

// Delete Users
export const deleteUser = (id) => (dispatch, getState) => {
    axios.delete(`/auth/users/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(
                createMessage({
                    deleteUser: 'User Deleted'
                })
            );
            dispatch({
                type: DELETE_USER,
                payload: id
            });
        }).catch(err => {
            dispatch(
                getUsers()
            );
            dispatch(
                createMessage({
                    errorUser: err.response.data.detail
                })
            );
        });
}

export const editUsers = (id, user) => (dispatch, getState) => {
    
    axios.put(`/auth/users/${id}/`, user, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: EDIT_USER,
                payload: res.data,
                items: res.data
            });
        }).catch(err => {
            dispatch(
                getUsers()
            );
            dispatch(
                createMessage({
                    errorUser: err.response.data.detail
                })
            );
        });
}