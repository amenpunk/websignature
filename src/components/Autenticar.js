import { useContext, useState, useEffect } from 'react'
import { API_GATEWAY } from '../App'
import { Image,Row, Col, Container, Card, Button, Form} from 'react-bootstrap'
import { getAuth } from 'firebase/auth';

import { Document, Page } from 'react-pdf';


export function Autenticar () {

    useEffect( () => {
    }, [])

    return (
        <Container style={{ backgroundColor : '#101010', marginTop : 15 }}>
            <Row>
                <Col style={{ padding : '25%' }}>

                    <center style={{ padding : 15 }}>
                        <Image width={100} src="https://www.iconpacks.net/icons/2/free-pdf-icon-1512-thumb.png" rounded />
                    </center>

                    <Form>

                        <Form.Group controlId="formFileLg" className="mb-3">
                            <Form.Label>Escoge un archivo PDF</Form.Label>
                            <Form.Control type="file" size="lg" accept="application/pdf" />
                        </Form.Group>

                        <center>
                            <Button type="submit">Submit</Button>
                        </center>

                    </Form>

                </Col>
            </Row>
        </Container>
    )
}
