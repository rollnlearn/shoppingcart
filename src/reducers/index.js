// code for combining the reducers

"use strict"

import {combineReducers} from 'redux';

// Here we import the reducers

import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducers';

// Here we combine the reducers

export default combineReducers({
    books: booksReducers,
    cart: cartReducers
})