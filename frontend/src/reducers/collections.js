import { GET_COLLECTIONS, DELETE_COLLECTION, ADD_COLLECTION } from '../actions/types.js';

const initialState = {
    collections: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        case DELETE_COLLECTION:
            return {
                ...state,
                collections: state.collections.filter(collection => collection.id !== action.payload)
            }
        case ADD_COLLECTION:
            return {
                ...state,
                collections: [...state.collections, action.payload],
            }
        default:
            return state;
    }
}