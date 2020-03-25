import axios from 'axios'
import { createMessage } from './messages';

import { tokenConfig } from './auth';

import { GET_CARDS, DELETE_CARD, ADD_CARD, GET_ERRORS, GET_CARDS_LOADING, EDIT_CARD } from './types';

// Get All Cards
export const getCards = () => (dispatch, getState) => {
    dispatch({ type: GET_CARDS_LOADING });
    
    axios.get('/cards/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_CARDS,
                payload: res.data,
                items: res.data
            });
        }).catch(err => console.log(err));
}

// Delete Cards
export const deleteCard = (id) => (dispatch, getState) => {
    axios.delete(`/cards/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(
                createMessage({
                    deleteCard: 'Card Deleted'
                })
            );
            dispatch({
                type: DELETE_CARD,
                payload: id
            });
        }).catch(err => {
            dispatch(
                getCards()
            );
            dispatch(
                createMessage({
                    errorCard: err.response.data.detail
                })
            );
        });
}

// Get Add Card
export const addCard = (card) => (dispatch, getState) => {
    axios.post('/cards/', card, tokenConfig(getState))
        .then(res => {
            dispatch(
                createMessage({
                    addCard: 'Card Added'
                })
            );
            dispatch({
                type: ADD_CARD,
                payload: res.data
            });
        }).catch(err => {
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

export const editCards = (id, card) => (dispatch, getState) => {
    
    axios.put(`/cards/${id}/`, card, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: EDIT_CARD,
                payload: res.data,
                items: res.data
            });
        }).catch(err => {
            dispatch(
                getCards()
            );
            dispatch(
                createMessage({
                    errorCard: err.response.data.detail
                })
            );
        });
}