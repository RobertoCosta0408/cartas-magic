import { GET_COLLECTIONS, DELETE_COLLECTION, ADD_COLLECTION, EDIT_COLLECTION, GET_COLLECTIONS_ERRORS } from '../actions/types.js';

const initialState = {
    collections: []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_COLLECTIONS:
        case GET_COLLECTIONS_ERRORS:
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
        case EDIT_COLLECTION:
            
            const newArrayCollections = state.collections.filter(collection => collection.id !== action.payload.id);
            console.log(newArrayCollections);
            return {
                ...state,
                collections: [...newArrayCollections, action.payload]
            }    
        default:
            return state;
    }
}