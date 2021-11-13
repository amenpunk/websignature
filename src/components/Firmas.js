import {Row, Col, Container} from 'react-bootstrap'
import { useLocation} from "react-router-dom";
import { useState } from "react";


export function Firmas (){

    const location = useLocation();
    let [hash] = useState(location.state ? location.state.hash : '');

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

