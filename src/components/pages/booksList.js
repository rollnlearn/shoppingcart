"use strict";

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Carousel, Well, Grid, Row, Col, Button} from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BooksList extends React.Component{

    componentDidMount(){
        this.props.getBooks();
        console.log("Trying to get the books")
        console.log(this.props.books)
    }
    render(){
        const booksList = this.props.books.map(function(booksArr){
            return (
                <Col xs={6} sm={6} md={6} key={booksArr._id}>
                    <BookItem 
                        _id= {booksArr._id}
                        title= {booksArr.title}
                        description= {booksArr.description}
                        image={booksArr.image}
                        price= {booksArr.price}
                        val= {5}
                        />
                </Col>
    
            )
        });
        return (
            <Grid>
                <Row>
                    <Carousel>
                        
                        <Carousel.Item>
                        <img width={300} height={300} alt="900x300" src="images/SteveJobs.jpeg"/>
                        <Carousel.Caption>
                            <h3>Steve Jobs</h3>
                            <p>Biography of a visionary</p>
                        </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                        <img width={300} height={300} alt="900x300" src="images/IdoWhatIdo.jpg"/>
                        <Carousel.Caption>
                            <h3>I Do What I Do</h3>
                            <p>Pragmatic and liberal regulator</p>
                        </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                        <img width={300} height={300} alt="900x300" src="images/unlimitedpower.jpg"/>
                        <Carousel.Caption>
                            <h3>Unlimited Power</h3>
                            <p>Unleashing your potential within</p>
                        </Carousel.Caption>
                        </Carousel.Item>

                    </Carousel>
                </Row>

                <Row style={{marginTop:'15px'}}> 
                    {booksList}
                </Row>
                
                <Row>
                   <Cart />
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state){
    return {
        books: state.books.books
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getBooks: getBooks,
     //   OtherActions: xxxx
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);