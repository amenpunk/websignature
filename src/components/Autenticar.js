import { Spinner,Image,Row, Col, Container,Button, Form} from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getAuth } from 'firebase/auth';

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { API_GATEWAY } from '../App'

const MySwal = withReactContent(Swal)

function Cargando(){
    return(
        <center>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </center>
    )
}

export function Autenticar () {

    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState('');
    let { API } = useContext(API_GATEWAY)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }


    async function Upload () {
        
        if(!file){
            return MySwal.fire({
                title: 'Ocurrio un error',
                html: 'Carga un documento primero ',
                icon: 'error'
            })
        }

        let auth = getAuth();
        let user = auth.currentUser

        const data = new FormData();
        data.append('filename', file.name );
        data.append('file', file);
        data.append('uid', user.uid);
        data.append('manuscrita', 0);
        data.append('new_page',0);


        let response = await fetch(
            API + '/ipfs',
            {
                method: 'post',
                body: data,
            }
        )


        let { status } = await response.json()

            setFile(null)
        
            return MySwal.fire({
                title: status ? 'Excelente' : "Ocurrio un error!!",
                html: status ? 'Tu documento fue autenticado' :  'Vuelve a intentarlo',
                icon: status ? "success" : 'error'
            })

    }


    return (
        <Container style={{ backgroundColor : '#101010', marginTop : 15 }}>
            <Row>
                <Col style={{ padding : '20%' }}>

                    {
                        file ? 
                            <center>
                                <Document loading={<Cargando/>} file={file} onLoadSuccess={onDocumentLoadSuccess} >
                                    <Page renderMode="canvas" height={200} width={200} pageNumber={1} loading={<Cargando/>} />
                                </Document>
                            </center>
                        : <center style={{ padding : 15 }}>
                            <Image width={100} src="https://www.iconpacks.net/icons/2/free-pdf-icon-1512-thumb.png" rounded />
                        </center>

                    }

                    <Form>

                        <Form.Group controlId="formFileLg" className="mb-3">
                            <Form.Label>Escoge un archivo PDF</Form.Label>
                            <Form.Control
                                type="file" 
                                size="lg" 
                                accept="application/pdf" 
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </Form.Group>

                        <center>
                            <Button onClick={Upload}>Autenticar</Button>
                        </center>

                    </Form>

                </Col>
            </Row>
        </Container>
    )
}
