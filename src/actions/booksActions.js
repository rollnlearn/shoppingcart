"use strict"
import axios from 'axios';

// GET A BOOK
export function getBooks(){
    return function(dispatch){
        axios.get("/api/books")
            .then(function(response){
                console.log('I am in getbook actions');
                console.log(response);
                dispatch({
                    type: "GET_BOOK",
                    payload: response.data
                })
            })
            .catch(function(err){
                throw err;
                dispatch({
                    type: "GET_BOOK_REJECTED",
                    payload: ("There was an error while retrieving the book database. ERROR " + err)
                })
            })
    }
}

// POST A BOOK
export function postBooks(book){
    return function(dispatch){
        axios.post("/api/books",book)
            .then(function(response){
                dispatch({
                    type: "POST_BOOK",
                    payload: response.data
                })
            })
            .catch(function(err){
                dispatch({
                    type: "POST_BOOK_REJECTED",
                    payload: ("There was an error while posting the book. ERROR " + err)
                })
            })
    }
}

// DELETE A BOOK
export function deleteBooks(_id){
    return function(dispatch){
        axios.delete("/api/books/"+_id)
            .then(function(reponse){
                dispatch({
                    type: "DELETE_BOOK",
                    payload: _id
                })
            })
            .catch(function(err){
                dispatch({
                    type:"DELETE_BOOK_REJECTED",
                    payload: "There was an error while deleting this book. Error" + err
                })
            })
    }
}

// UPDATE A BOOK
export function updateBooks(newBookToUpdate){
    return function(dispatch){
        console.log(newBookToUpdate._id);
        axios.put("/api/books/"+(newBookToUpdate._id).toString(), newBookToUpdate)
            .then(function(response){
                console.log('I am inside updateBooks Actions');
                console.log(newBookToUpdate);
                console.log(response);
                dispatch({
                    type: "UPDATE_BOOK",
                    payload: response.data
                })
            })
            .catch(function(err){
                console.log('Error while updating book');
                dispatch({
                    type: "UPDATE_BOOK_REJECTED",
                    payload: "The update book action has been rejected"
                })
            })
    }
    /*
    function findBook(book){
        return book._id === bookToUpdate._id;
    }
    const indexToUpdate = bookListToUpdate.findIndex(findBook);
    const newBookToUpdate = {
        ...bookListToUpdate[indexToUpdate],
        title: action.payload.title
    };
    */
    //let state = {books:[...bookListToUpdate.slice(0,indexToUpdate),newBookToUpdate,...bookListToUpdate.slice(indexToUpdate+1)]};
    //console.log(state);
    /*
    return {
        type: "UPDATE_BOOK",
        payload: book
    }*/
}

// RESET FORM BUTTON

export function resetButton(newBookToUpdate){
    return {
        type: 'RESET_BUTTON'
    }
}