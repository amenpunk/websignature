import { Link } from "react-router-dom";
import { Container, Nav, } from 'react-bootstrap';

export function Navbar () {
    return(
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
    )
}
