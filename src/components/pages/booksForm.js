"use strict";

import React from 'react';
import {InputGroup, MenuItem, DropdownButton, Image, Well, Panel, FormControl, FormGroup, ControlLabel, Button, Row, Col} from 'react-bootstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

import {postBooks, deleteBooks, updateBooks, getBooks, resetButton} from '../../actions/booksActions';
import {getCart} from '../../actions/cartActions';

import axios from 'axios';

class BooksForm extends React.Component{

    constructor(){
        super();
        this.state = {
            images: [{}],
            img:''
        }
    }

    componentDidMount(){
        this.props.getBooks();
        this.props.getCart();
        axios.get('/api/images')
            .then(function(response){
                this.setState({
                    images: response.data
                })
            }.bind(this))
            .catch(function(err){
                this.setState({
                    images: 'Error loading images from the server',
                    img: ''
                })
            })
    }

    handleSubmit(){
        var fname = '';
        if(findDOMNode(this.refs.image).value == ''){
            fname = 'images/noimage.png';
        }else{
            fname = findDOMNode(this.refs.image).value;
        }
        const book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            
            image: fname,
            price: findDOMNode(this.refs.price).value,
        }];
        this.props.postBooks(book);

    }

    deleteBook(){

        const _id = findDOMNode(this.refs.delete).value
        this.props.deleteBooks(_id);
    }

    resetForm(){

        this.props.resetButton();
        findDOMNode(this.refs.title).value = '';
        findDOMNode(this.refs.description).value = '';
        findDOMNode(this.refs.price).value = '';
        this.setState({
            img: ''
        });
    }
    findBook(){

        this.resetForm();

        const currentBookList = this.props.books;
        var findID = findDOMNode(this.refs.delete).value;

        function findBookIndex(book){
            return book._id === findID;
        }
        const indexToUpdate = currentBookList.findIndex(findBookIndex);

     

        if (indexToUpdate != -1){
            findDOMNode(this.refs.title).value = currentBookList[indexToUpdate].title;
            findDOMNode(this.refs.description).value = currentBookList[indexToUpdate].description;
            if(typeof currentBookList[indexToUpdate].image == 'undefined'){
                findDOMNode(this.refs.image).value = "images/noimage.png";
                findDOMNode(this.refs.imageBox).src = "images/noimage.png";
            }else{
                this.setState({
                    img: currentBookList[indexToUpdate].image
                })
               // findDOMNode(this.refs.image).value = currentBookList[indexToUpdate].image;
               // findDOMNode(this.refs.imageBox).src = currentBookList[indexToUpdate].image;
            }
            findDOMNode(this.refs.price).value = currentBookList[indexToUpdate].price;
          //  
        }
       
    }

    updateBook(){
        
        const currentBookList = this.props.books;
        var findID = findDOMNode(this.refs.delete).value;

        function findBookIndex(book){
            return book._id === findID;
        }
        const indexToUpdate = currentBookList.findIndex(findBookIndex);

        if (indexToUpdate != -1){
            let bookDetails = {
                _id: findDOMNode(this.refs.delete).value,
                title: findDOMNode(this.refs.title).value,
                description: findDOMNode(this.refs.description).value,
                image: findDOMNode(this.refs.image).value,
                price: findDOMNode(this.refs.price).value,
            };

            this.props.updateBooks(bookDetails);
        }
       // this.props.updateBooks(book);
    }

    handleSelect(img){
        this.setState({
            img: 'images/'+img
        })
    }
   
    render(){

        const booksList = this.props.books.map(function(booksArr){
            return (
                <option key={booksArr._id} value={booksArr._id}>{booksArr.title}</option>
            )
        });

        const imgList = this.state.images.map(function(imgArr, i){
            return (
                <MenuItem key={i} eventKey={imgArr.name}
                onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</MenuItem>
            )
        }, this);
        return(
            <Well>
                <Row>
                <Col xs={12} sm={6} md={6}>
                    <Panel>
                        <InputGroup>
                            <FormControl type="text" ref="image" value={this.state.img}/>
                            <DropdownButton
                            componentClass={InputGroup.Button}
                            id="input-dropdown-addon"
                            title="Select an Image"
                            bsStyle="primary"
                            >
                                {imgList}
                            </DropdownButton>
                        </InputGroup>
                        <Image className="imgBox" ref="imageBox" src={this.state.img} responsive/>
                    </Panel>
                </Col>
                <Col xs={12} sm={6} md={6}>
                    <Panel>
                        <FormGroup controlId="title" validationState={this.props.validation}>
                            <ControlLabel>Title</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter Title"
                                ref="title" />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Panel>
                    <Panel>
                        <FormGroup controlId="description" validationState={this.props.validation}>
                            <ControlLabel>Description</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter Description"
                                ref="description" />
                            <FormControl.Feedback />
                        </FormGroup>
                    </Panel>
                    <Panel>
                        <FormGroup controlId="price" validationState={this.props.validation}>
                            <ControlLabel>Price ($)</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter Price in USD"
                                ref="price" />
                            <FormControl.Feedback />
                        </FormGroup>
                        <Button 
                        onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))} 
                        bsStyle={(!this.props.msg)?('primary'):(this.props.style)}>
                            {(!this.props.msg)?('Save Book'):(this.props.msg)}
                        </Button>
                        <span>    </span>
                        <Button onClick={this.updateBook.bind(this)} bsStyle="success">Update</Button>
                    </Panel>
                    <Panel>
                        <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Select a Title to Delete or Update</ControlLabel>
                            <FormControl 
                                ref="delete" 
                                componentClass="select" 
                                placeholder="select"
                                onClick={this.findBook.bind(this)}>
                                <option value="select">select</option>
                                {booksList}
                            </FormControl>
                        </FormGroup>
                        <Button onClick={this.deleteBook.bind(this)} bsStyle="danger">Delete</Button>
                    </Panel>
                </Col>
            </Row>
            </Well>
        )
    }
}

function mapStateToProps(state){
    return {
        books: state.books.books,
        cart: state.cart.cart,
        msg: state.books.msg,
        style: state.books.style,
        validation: state.books.validation
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        postBooks:postBooks,
        deleteBooks: deleteBooks,
        updateBooks: updateBooks,
        getBooks: getBooks,
        resetButton: resetButton,
        getCart: getCart
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);