import { GET_USERS, DELETE_USER, GET_USERS_LOADING, EDIT_USER } from '../actions/types.js';

const initialState = {
    users: [],
    isLoaded: false,
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_USERS_LOADING:
            return {
                ...state,
                users: [],
                isLoaded: true
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                isLoaded: true
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload),
                isLoaded: true
            }
        case EDIT_USER:
            
            const newArrayUsers = state.users.filter(user => user.id !== action.payload.id);
            
            return {
                ...state,
                users: [...newArrayUsers, action.payload],
                isLoaded: true
            }
        default:
            return state;
    }
}