
"use strict"

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Import combineReducer here

import reducers from './reducers/index'

// Import combined actions here
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';
/*
// STEP 3 define reducer
const reducer = function(state={books:[]},action){
    switch(action.type){
        
        case "POST_BOOK": state = {books:[...state.books, ...action.payload]};
        return state;
        break;

        case "DELETE_BOOK":
        const bookListToDelete = [...state.books];
        function findBook(book){
            return book._id === action.payload._id;
        }
        const indexToDelete = bookListToDelete.findIndex(findBook);
        state = {books: [...bookListToDelete.slice(0,indexToDelete),...bookListToDelete.slice(indexToDelete+1)]};
        return state
        break;

        case "UPDATE_BOOK":
        const bookListToUpdate = [...state.books];
        function findBook(book){
            return book._id === action.payload._id;
        }
        const indexToUpdate = bookListToUpdate.findIndex(findBook);
        const newBookToUpdate = {
            ...bookListToUpdate[indexToUpdate],
            title: action.payload.title
        };
        state = {books:[...bookListToUpdate.slice(0,indexToUpdate),newBookToUpdate,...bookListToUpdate.slice(indexToUpdate+1)]};
        return state;
        break;

    }
    return state;
}
*/

// STEP 1 Create the store
const middleware = applyMiddleware(thunk, logger);

// We will pass initial state from server store
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);

/*
import Main from './main';
import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
*/
import routes from './routes.js'

const Routes = (
    <Provider store={store}>
           {routes}
    </Provider>
);

render(
    Routes, document.getElementById('app')
);
/*
store.subscribe(function(){
    console.log('Current state is ', store.getState());
    //console.log('Current price of second book is ', store.getState().books[0].price);
})
*/
// STEP 2 Create and dispatch action

/*
store.dispatch(postBooks(
    [
        
    ]
))
*/
// Second Action to add book

/* store.dispatch(postBooks(
    [
        {
            _id: 3,
            title: 'Third Book Title',
            description: 'This is a great third book',
            price: 30.00
        }
    ]
)) */

/*
// DELETE a book

store.dispatch(deleteBooks(
    {_id:1}
))


// UPDATE a book

store.dispatch(updateBooks(
    {
        _id:2,
        title: 'Learn Revit in 24 hours'
    }
))

// Add to cart

store.dispatch(addToCart(
    [{_id:1}]
))

*/