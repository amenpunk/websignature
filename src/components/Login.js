import react from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';

export class Login extends react.Component{
    constructor(props){
        super(props)
    }

    render (){
        return(
            <Row className="login-card">
                <Col style={{ paddingTop : '10%'}}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="email" placeholder="Ingresa tu correo" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contrasena</Form.Label>
                            <Form.Control type="password" placeholder="Contrasena" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Ingresar
                        </Button>
                    </Form>
                </Col>
            </Row>
        )
    }

}
