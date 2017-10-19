"use strict"
import axios from 'axios';

export function getCart(){
    return function(dispatch){
        axios.get('/api/cart')
            .then(function(response){
                dispatch({
                    type: "GET_CART",
                    payload: response.data
                })
            })
            .catch(function(err){
                console.log('ERROR: Error fetching cart from sessions');
                dispatch({
                    type: "GET_CART_REJECTED",
                    payload: "ERROR: Error fetching cart from sessions"
                })
            })
    }
}

export function addToCart(cart){
    return function(dispatch){
        axios.post('/api/cart', cart)
            .then(function(response){
                dispatch({
                    type: "ADD_TO_CART",
                    payload: response.data
                })
            })
            .catch(function(err){
                console.log('Error while adding book to cart: ' + err);
                dispatch({ 
                    type: "ADD_TO_CART_REJECTED",
                    payload: 'Error when adding to cart'
                })
            })
    }
}

export function deleteCartItem(_id, cart){
    const currentCart = cart;
    function findCartItemToDelete(book){
        return book._id === _id;
    }
    const indexToDelete = currentCart.findIndex(findCartItemToDelete);
    var cartUpdate = [...currentCart.slice(0,indexToDelete),...currentCart.slice(indexToDelete+1)];
    
    return function(dispatch){
        axios.post('/api/cart', cartUpdate)
            .then(function(response){
                dispatch({
                    type: "DELETE_CART_ITEM",
                    payload: cartUpdate
            })
        })
            .catch(function(err){
                dispatch({
                    type: "DELETE_CART_ITEM_REJECTED",
                    payload: 'Error when deleting from cart'
                })
            })
        }
        /*
    return {
        type: "DELETE_CART_ITEM",
        payload: _id
    }*/

}

export function updateCartItem(_id, decinc, cart){
    const cartListToUpdate = cart;
    function findCartItem(book){
        return book._id === _id;
    }
    const indexToUpdate = cartListToUpdate.findIndex(findCartItem);
    var newQuantity;
    if(decinc == "+"){
        newQuantity = cartListToUpdate[indexToUpdate].quantity+1;
    }
    else{
        if(cartListToUpdate[indexToUpdate].quantity>1){
            newQuantity = cartListToUpdate[indexToUpdate].quantity-1;
        }else{
            newQuantity = 1;
        }
    }
    
    const newCartItemToUpdate = {
        ...cartListToUpdate[indexToUpdate],
        quantity: newQuantity
    };

    let cartUpdate = [...cartListToUpdate.slice(0,indexToUpdate), newCartItemToUpdate, ...cartListToUpdate.slice(indexToUpdate+1)];

    return function(dispatch){
        axios.post('/api/cart', cartUpdate)
            .then(function(response){
                dispatch({
                    type: "UPDATE_CART_ITEM",
                    payload: cartUpdate
            })
        })
            .catch(function(err){
                dispatch({
                    type: "UPDATE_CART_ITEM_REJECTED",
                    payload: 'Error when updating to cart'
                })
            })
        }
    /* return {
        type: "UPDATE_CART_ITEM",
        payload: stateCart
    } */
}

export function grandTotalUpdate(){
    return {
        type: "TOTAL_CART_ITEM",
        payload: []
    }
}