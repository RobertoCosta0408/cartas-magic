import { combineReducers } from 'redux';
import cards from './cards';
import collections from './collections';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import users from './users'
import { DataTableReducer } from 'react-redux-datatable';


export default combineReducers({
    cards,
    collections,
    DataTableReducer,
    errors,
    messages,
    auth,
    users
});