import { Spinner,Image,Row, Col, Container,Button, Form} from 'react-bootstrap'
import { useState, useEffect } from 'react'

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

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
    console.log(numPages)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    useEffect( () => {
        console.log('file')
    }, [file] )



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
                            <Button onClick={ () => console.log('123') }>Autenticar</Button>
                        </center>

                    </Form>

                </Col>
            </Row>
        </Container>
    )
}
