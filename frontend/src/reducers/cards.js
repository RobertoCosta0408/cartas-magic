import { GET_CARDS, DELETE_CARD, ADD_CARD, GET_CARDS_LOADING, EDIT_CARD } from '../actions/types.js';

const initialState = {
    cards: [],
    isLoaded: false,
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_CARDS_LOADING:
            return {
                ...state,
                cards: [],
                isLoaded: true
            }
        case GET_CARDS:
            return {
                ...state,
                cards: action.payload,
                isLoaded: true
            }
        case DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.payload),
                isLoaded: true
            }
        case ADD_CARD:
            return {
                ...state,
                cards: [...state.cards, action.payload],
                isLoaded: true
            }
        case EDIT_CARD:
            
            const newArrayCards = state.cards.filter(card => card.id !== action.payload.id);
            
            return {
                ...state,
                cards: [...newArrayCards, action.payload],
                isLoaded: true
            }
        default:
            return state;
    }
}