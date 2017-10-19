

"use strict"


export function cartReducers(state={cart:[], cartAmt:[], cartQty:[]}, action){
    switch(action.type){

        case "GET_CART":
            /*
            console.log(action.payload == "");
            if(action.payload != ""){
                state = {cart:[action.payload.cart], cartAmt:[...state.cartAmt], cartQty:[...state.cartQty]};
            }else{
                state={cart:[], cartAmt:[], cartQty:[]};
            }
            return state;
            */

            if (action.payload != ""){
                state = {cart:action.payload, cartAmt:[...state.cartAmt], cartQty:[...state.cartQty]};
            }else{
                state={cart:[], cartAmt:[], cartQty:[]};
            }
            
            var sum = 0;
            var qty = 0;
            for (var i=0; i<state.cart.length; i++){
                sum = sum + state.cart[i].price*state.cart[i].quantity;
                qty = qty + state.cart[i].quantity;
            }
            state = {cart:[...state.cart], cartAmt:[sum], cartQty:[qty]}
            return state;
            break;

        case "ADD_TO_CART":
            state = {cart:action.payload, cartAmt:[...state.cartAmt], cartQty:[...state.cartQty]};
            var sum = 0;
            var qty = 0;
            for (var i=0; i<state.cart.length; i++){
                sum = sum + state.cart[i].price*state.cart[i].quantity;
                qty = qty + state.cart[i].quantity;
            }
            
            state = {cart:[...state.cart], cartAmt:[sum], cartQty:[qty]}
            return state;
            break;

        case "DELETE_CART_ITEM":
        /*
            const currentCart = [...state.cart];
            function findCartItemToDelete(cart){
                return cart._id === action.payload;
            }
            const indexToDelete = currentCart.findIndex(findCartItemToDelete);
            state = {cart: [...currentCart.slice(0,indexToDelete),...currentCart.slice(indexToDelete+1)], cartAmt:[...state.cartAmt], cartQty:[...state.cartQty]};
            return state;
            */
            state = {cart:action.payload, cartAmt:[...state.cartAmt], cartQty:[...state.cartQty]};
            var sum = 0;
            var qty = 0;
            for (var i=0; i<state.cart.length; i++){
                sum = sum + state.cart[i].price*state.cart[i].quantity;
                qty = qty + state.cart[i].quantity;
            }
        
            state = {cart:[...state.cart], cartAmt:[sum], cartQty:[qty]}   
            return state;
            break;
        
        case "UPDATE_CART_ITEM":
            state = {cart:action.payload, cartAmt:[...state.cartAmt], cartQty:[...state.cartQty]};
            var sum = 0;
            var qty = 0;
            for (var i=0; i<state.cart.length; i++){
                sum = sum + state.cart[i].price*state.cart[i].quantity;
                qty = qty + state.cart[i].quantity;
            }
        
            state = {cart:[...state.cart], cartAmt:[sum], cartQty:[qty]}   
            return state;
            break;
        
        case "TOTAL_CART_ITEM":
            var sum = 0;
            var qty = 0;
            for (var i=0; i<state.cart.length; i++){
                sum = sum + state.cart[i].price*state.cart[i].quantity;
                qty = qty + state.cart[i].quantity;
            }
            
            state = {cart:[...state.cart], cartAmt:[sum], cartQty:[qty]}
            return state;
            break;
    }
    return state;
}