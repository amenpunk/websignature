import { Spinner,Image,Row, Col, Container,Button, Form} from 'react-bootstrap'
import { useLocation} from "react-router-dom";
import { useState, useEffect } from "react";


export function Firmas (){

    const location = useLocation();
    let [hash, setHash] = useState(location.state ? location.state.hash : '');

    return(
        <Container style={{ backgroundColor : '#101010', marginTop : 15 }}>
            <Row>
                <Col style={{ padding : '20%' }}>
                    <h1>{hash} </h1>
                </Col>
            </Row>
        </Container>
    )

}

