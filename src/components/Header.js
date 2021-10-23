import { Button, Navbar, Container, Nav, } from 'react-bootstrap';
import {  Switch, Route, Link } from "react-router-dom";

import react, { Component } from 'react'

export class Header extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <header>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">Home</Navbar.Brand>
                        <Nav className="me-auto">

                            <Nav.Link>
                                <Link to="/documentos">Mis Documentos </Link>
                            </Nav.Link>
                            
                            <Nav.Link >
                                <Link to="/autenticar">Autenticar</Link>
                            </Nav.Link>
                            
                            <Nav.Link >
                                <Link to="/firmas">Firmas</Link>
                            </Nav.Link>

                        </Nav>
                    </Container>
                </Navbar>


                <Switch>

                    <Route path="/documentos">
                        <h1>Mis documentos</h1>
                    </Route>

                    <Route path="/autenticar">
                        <h1>Autenticar</h1>
                    </Route>
                    
                    <Route path="/firmas">
                        <h1>Mis firmas</h1>
                    </Route>

                    <Route path="/">
                        <h1>Hola mundo </h1>
                    </Route>

                </Switch>



            </header>
        )
    }
}
