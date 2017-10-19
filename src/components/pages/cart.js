"use strict";
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Modal, Panel, Col, Row, Button, ButtonGroup, Label} from 'react-bootstrap';

import {deleteCartItem, updateCartItem, grandTotalUpdate, getCart} from '../../actions/cartActions';

class Cart extends React.Component{

    componentDidMount(){
        this.props.getCart();
      //  this.props.grandTotalUpdate();
    }

    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    open(){
        this.setState({showModal:true})
    }

    close(){
        this.setState({showModal:false})
    }

    grandTotalUpdate(){
        this.props.grandTotalUpdate();
    }

    onDelete(_id){

        this.props.deleteCartItem(_id, this.props.cart)
        this.props.grandTotalUpdate();
    }

    updateCartPlus(_id){
        this.props.updateCartItem(_id, '+', this.props.cart, this.props.cartTotalAmount, this.props.cartTotalQty);
        this.props.grandTotalUpdate();
    }

    updateCartMinus(_id){
        this.props.updateCartItem(_id, '-', this.props.cart, this.props.cartTotalAmount, this.props.cartTotalQty);
        this.props.grandTotalUpdate();
    }

    renderEmpty(){
        return (<div></div>);
    }

    renderCart(){
        const cartItemsList = this.props.cart.map(function(cartArr){

            return (
                
                    <Panel key={cartArr._id}>
                        <Row>
                            <Col xs={12} sm={4}>
                                <h6>{cartArr.title}</h6><span>   </span>
                            </Col>
                            <Col xs={12} sm={2}>
                                <h6>USD {cartArr.price}</h6>
                            </Col>
                            <Col xs={12} sm={2}>
                                <h6>Quantity <Label bsStyle="success">{cartArr.quantity}</Label></h6>
                            </Col>
                            <Col xs={6} sm={4}>
                                <ButtonGroup style={{minWidth:'300px'}}>
                                    <Button onClick= {this.updateCartMinus.bind(this, cartArr._id)} bsStyle="default" bsSize="small">-</Button>
                                    <Button onClick= {this.updateCartPlus.bind(this, cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                                    <span>     </span>
                                    <Button onClick= {this.onDelete.bind(this, cartArr._id)} bsStyle="danger" bsSize="small">Delete</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Panel>
                
            )
        },this)
        
        return (
            <Col xs={12} sm={12} md={12}>
                <Panel header="Cart" bsStyle="primary">
                    {cartItemsList}
                    <Row>
                        <Col xs={12}>
                        <h6 className="amt"><strong>Total Amount: USD {this.props.cartTotalAmount}</strong></h6>
                        <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
                            PROCEED TO CHECKOUT
                        </Button>
                        </Col>
                    </Row>
                    
                    <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h6>TESTING 1 2 3</h6>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close.bind(this)}>Close</Button>
                        </Modal.Footer>
                    </Modal>

                    
                </Panel>
            </Col>
        );
    }


render(){
        if (this.props.cart[0]){
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
        
    }
}

function mapStateToProps(state){
    return {
        cart: state.cart.cart,
        cartTotalAmount: state.cart.cartAmt,
        cartTotalQty: state.cart.cartQty
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteCartItem: deleteCartItem,
        updateCartItem: updateCartItem,
        grandTotalUpdate: grandTotalUpdate,
        getCart: getCart
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);