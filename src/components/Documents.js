import { useContext, useState, useEffect } from 'react'
import { API_GATEWAY } from '../App'
import { Row, Col, Dropdown, DropdownButton, Container, Card, Button, Spinner } from 'react-bootstrap'
import { getAuth } from 'firebase/auth';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Swal from 'sweetalert2'

function Cargando(){
    return(
        <>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </>
    )
}

function DocCard (props)  {


    console.log('props -> ', props)
    let { filename, hash, write } = props.file
    let { IPFS } = useContext(API_GATEWAY)
    let url = IPFS + "ipfs/" + hash;

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function QR () {
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    } 


    return (
        <div>
            <Card style={{ backgroundColor : '#101010', padding : 40, border : '1px solid white', margin : 15, width : 354 }}>

                <Card.Header style={{ display : 'flex', justifyContent : 'flex-end' }}>

                    <DropdownButton align="end" title="Opciones" id="dropdown-menu-align-end">
                        <Dropdown.Item onClick={QR} eventKey="1">Generar QR</Dropdown.Item>
                        <Dropdown.Item onClick={ () => console.log('ver firmas') } eventKey="2">Ver firmas</Dropdown.Item>
                        <Dropdown.Item onClick={ () => console.log('ver documento') } eventKey="3">ver Documneto</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                    </DropdownButton>

                </Card.Header>

                <Card.Body stye={{ backgroundColor : '#101010' }}>

                    <Document loading={<Cargando/>} file={url} onLoadSuccess={onDocumentLoadSuccess} >
                        <Page renderMode="svg" height={100} width={250} pageNumber={1} loading={<Cargando/>} />
                    </Document>


                    <Card.Title>{ filename.toUpperCase()}</Card.Title>
                    <Card.Text style={{ color : '#b748ff'  }}> { hash }</Card.Text>
                    <Card.Text>{ new Date(write * 1000).toLocaleString() } </Card.Text>

                </Card.Body>
            </Card>
        </div>
    )
}


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
                // let files = await docs.json();
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

                    {
                        files ? 
                        files.map( file => <DocCard  key={file.hash} file={file}/> )
                        : undefined
                    }
                </Col>
            </Row>
        </Container>
    )
}
