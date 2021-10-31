import { useContext, useState, useEffect } from 'react'
import { API_GATEWAY } from '../App'
import { Row, Col, Container, Card, Button} from 'react-bootstrap'
import { getAuth } from 'firebase/auth';

import { Document, Page } from 'react-pdf';


export function Documents () {

    let { API } = useContext(API_GATEWAY)
    let [files, setFiles] = useState(null) 

    useEffect( () => {

        let auth = getAuth();
        let user = auth.currentUser
        // let gateway = "http://localhost:8000/ipfs"
        let gateway = API + "/ipfs"

        fetch(gateway+"?uid="+user.uid)
            .then( docs => docs.json() )
            .then( f => {
                console.log('files ->>> ', f)
                if(f.data && f.data.length){
                    setFiles(f.data)
                }
            }).catch( e => {
                console.log( 'fetch error', e )
            })

    }, [API])

    return (
        <Container style={{ backgroundColor : '#101010', marginTop : 15 }}>
            <Row>
                <Col>
                    <h1>Subir Archivo</h1>

                </Col>
            </Row>
        </Container>
    )
}
