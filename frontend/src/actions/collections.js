import axios from 'axios'

import { createMessage } from './messages';
import { tokenConfig } from './auth';

import { GET_COLLECTIONS, DELETE_COLLECTION, ADD_COLLECTION } from './types';

// Get All Collections
export const getCollections = () => (dispatch, getState) => {
    axios.get('/collections/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_COLLECTIONS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}


// Get Add Collection
export const addCollection = (collection) => (dispatch, getState) => {
    axios.post('/collections/', collection, tokenConfig(getState))
        .then(res => {
            dispatch(
                createMessage({
                    addCollection: 'Collection Added'
                })
            );
            dispatch({
                type: ADD_COLLECTION,
                payload: res.data,
            });
        }).catch(err => {
            console.log('erro');
            console.log(err);

            const errors = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            });
        });
}

// Delete Collections
export const deleteCollection = (id) => (dispatch, getState) => {
    axios.delete(`/collection/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_COLLECTION,
                payload: id
            });
        }).catch(err => console.log(err));
}