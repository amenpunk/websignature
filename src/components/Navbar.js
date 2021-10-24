import { Link } from "react-router-dom";
import { Button,FormControl,Form,Container, Nav, Navbar } from 'react-bootstrap';
import { getAuth ,signOut } from 'firebase/auth';
import { useState, useEffect } from 'react'

export function Navigation () {

    const [loged, setLoged] = useState(true)

    useEffect( () => {  
        if(!loged){
            let auth = getAuth();
            signOut(auth)
        }
    }, [loged] )


    return(
        <Navbar style={{ backgroundColor : '#101010' }} variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">

                    <Navbar.Brand style={{ color : '#b748ff' }} href="#home">
                        Home
                    </Navbar.Brand>

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


                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button onClick={ () => setLoged(false) } variant="outline-danger">Cerrar Session</Button>
                    </Form>



                </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}
