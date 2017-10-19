"use strict"




export function booksReducers(state={books:[]},action){
    switch(action.type){
        
        case "GET_BOOK": 
            state = {...state, books:[...action.payload]};
            console.log('I am inside getbook reducer');
            console.log(state);
            return state;
            break;

        case "POST_BOOK": 
            state = {...state, books:[...state.books, ...action.payload], msg:'Saved! Click to add new book...', style: 'success', validation:'success'};
            return state;
            break;

        case "POST_BOOK_REJECTED": 
            state = {...state, msg:'Please, try again', style:'danger', validation:'error'};
            return state;
            break;

        case "DELETE_BOOK":
            const bookListToDelete = [...state.books];
            function findBook(book){
                return book._id.toString() === action.payload;
            }
            const indexToDelete = bookListToDelete.findIndex(findBook);
            state = {books: [...bookListToDelete.slice(0,indexToDelete),...bookListToDelete.slice(indexToDelete+1)]};
            return state
            break;

        case "UPDATE_BOOK":
            const bookListToUpdate = [...state.books];
            function findBook(book){
                return book._id == action.payload._id;
            }
            const indexToUpdate = bookListToUpdate.findIndex(findBook);
            state = {books: [...bookListToUpdate.slice(0,indexToUpdate),action.payload,...bookListToUpdate.slice(indexToUpdate+1)]};
            return state;
            break;

        case 'RESET_BUTTON':
            state = {...state, msg: null, style: 'primary', validation:null};
            return state;
            break;

    }
    return state;
}