import React from 'react';
import {Image, Panel, Row, Col, Well, Button} from 'react-bootstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {addToCart, updateCartItem, grandTotalUpdate} from '../../actions/cartActions';

class BookItem extends React.Component{

    constructor(){
        super();
        this.state = {
            isClicked: false
        };
    }

    onReadMore(){
        this.setState({
            isClicked: !this.state.isClicked
        })
    }

    handleCart(){

        const book = {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            images: this.props.images,
            price: this.props.price,
            quantity: 1
        };

        // CHECK IF CART IS EMPTY OR IF IT JUST QUANTITY NEEDS TO BE UPDATED
        function findCartItem(cart){
            return cart._id === book._id;
        }

/*         var indexCheck;
        if (this.props.cart.length > 0){
            console.log(this.props.cart);
            indexCheck = this.props.cart.findIndex(findCartItem);
        }else
        {
            indexCheck === -1 ;
        }
         */
        var indexCheck = this.props.cart.findIndex(findCartItem);

        if(indexCheck === -1){
            this.props.addToCart([...this.props.cart,book]);
            
        } else {
            this.props.updateCartItem(book._id, '+', this.props.cart);
            
        }
        this.props.grandTotalUpdate();
    }

    render(){
        return (
            <Well>
                <Row>
                    <Col xs={6} sm={4}>
                        <Image src={this.props.image} responsive/>
                    </Col>
                    <Col xs={6} sm={8}>
                        <h6 className="bookTitle">{this.props.title}</h6>
                        <p>{(this.props.description.length > 50 && this.state.isClicked===false)?(this.props.description.substring(0,50)):(this.props.description)}
                            <Button className='link' onClick={this.onReadMore.bind(this)}>
                                {(this.state.isClicked === false && this.props.description !== null && this.props.description.length>50)?('...read more'):((this.props.description.length < 50)?(''):(' read less'))}
                            </Button>
                        </p>
                        <h6>Price: $ {this.props.price}</h6>
                        <Button onClick= {this.handleCart.bind(this)} className = "buyNowButton" bsStyle='primary' bsSize="small">Buy Now</Button>
                    </Col>
                </Row>
            </Well>
        )
    }
}

function mapStateToProps(state){
    return {
       cart: state.cart.cart,
       cartTotalAmount: state.cart.cartAmt,
       cartTotalQty: state.cart.cartQty
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        addToCart: addToCart,
        updateCartItem: updateCartItem,
        grandTotalUpdate: grandTotalUpdate
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);