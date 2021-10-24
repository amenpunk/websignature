import { Link } from "react-router-dom";
import { Button,Form,Container, Nav, Navbar } from 'react-bootstrap';
import { getAuth ,signOut } from 'firebase/auth';
import { useState, useEffect } from 'react'

export function Navigation () {

    const [loged, setLoged] = useState(true)
    const [user, setUser] = useState(null)

    useEffect( () => {  
        let auth = getAuth();
        if(!loged){
            signOut(auth)
        }
        let user = auth.currentUser;
        console.log('c user -> ', user)

        setUser( user )
    }, [loged] )


    return(
        <Navbar style={{ backgroundColor : '#101010', marginTop : 25 }} variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">

                    <Navbar.Brand >
                        <Link style={{ color : '#b748ff' }}  to="/">Home</Link>
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
                        <Nav.Link >
                            <Link to="/">{ user ? user.displayName : ""}</Link>
                        </Nav.Link >
                        {/* <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" /> */}
                        <Button onClick={ () => setLoged(false) } variant="outline-danger">
                            <i style={{}} className="fa fa-times" aria-hidden="true"></i>
                        </Button>
                    </Form>



                </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}
