
"use strict";

import React from 'react';

import {Nav, Navbar, NavItem, NavDropdown, MenuItem, Badge} from 'react-bootstrap';

class Menu extends React.Component{
    render(){
        return (
            
            <Navbar inverse fixedTop className="navbar">
                <Navbar.Header>

                    <Navbar.Brand className="brand">
                        <a href="/">ROLL 'N LEARN</a>
                    </Navbar.Brand>

                    <Navbar.Toggle />

                </Navbar.Header>

                <Navbar.Collapse>

                    <Nav >
                        
                            <NavItem eventKey={1} href="/admin">Admin</NavItem>
                        
                        
                            <NavItem eventKey={2} href="#">Contact Us</NavItem>
                        
                            <NavItem eventKey={3} href="/cart">Your Cart{(this.props.cartItemNumber > 0)?(<Badge>{this.props.cartItemNumber}</Badge>):('')}</NavItem>
                        
                    </Nav>

                    <Nav pullRight>
                        <NavDropdown eventKey={1} title="Student" id="basic-nav-dropdown">
                            <MenuItem eventKey={1.1}>Sign Up</MenuItem>
                            <MenuItem eventKey={1.2}>Sign In</MenuItem>
                        </NavDropdown>
                        <NavDropdown eventKey={2} title="Instructor" id="basic-nav-dropdown">
                            <MenuItem eventKey={2.1}>Sign Up</MenuItem>
                            <MenuItem eventKey={2.2}>Sign In</MenuItem>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default Menu;