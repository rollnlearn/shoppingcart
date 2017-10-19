"use strict";

import React from 'react';
import {connect} from 'react-redux';

import Menu from './components/pages/menu';
import Footer from './components/pages/footer';


class Main extends React.Component{
    render(){
        return(

            <div>
                
                <Menu cartItemNumber = {this.props.cartQty}/>
                    {this.props.children}
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        cartQty: state.cart.cartQty
    }
}

export default connect(mapStateToProps)(Main);