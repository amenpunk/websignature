import { useContext, useState, useEffect } from 'react'
import { API_GATEWAY } from '../App'
import { Row, Col, Dropdown, DropdownButton, Container, Card, Spinner } from 'react-bootstrap'
import { getAuth } from 'firebase/auth';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import QRCode from "react-qr-code";

const MySwal = withReactContent(Swal)


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

    const [numPages, setNumPages] = useState('');
    console.log(numPages)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function QR ( hash ) {
        MySwal.fire({
            title: <p style={{ color : "#101010" }}>Hello World</p>,
            footer: 'Copyright 2018',
            didOpen: () => {
                MySwal.clickConfirm()
            }
        }).then(() => {
            return MySwal.fire( <QRCode value={hash} />
            )
        })
    } 


    return (
        <Card style={{ backgroundColor : '#101010', padding : 40, border : '1px solid white', margin : 15, width : 354 }}>

            <Card.Header style={{ display : 'flex', justifyContent : 'flex-end' }}>

                <DropdownButton align="end" title="" id="dropdown-menu-align-end">
                    <Dropdown.Item onClick={() => QR(hash)} eventKey="1">Generar QR</Dropdown.Item>
                    <Dropdown.Item onClick={ () => console.log('ver firmas') } eventKey="2">Ver firmas</Dropdown.Item>
                    <Dropdown.Item onClick={ () => console.log('ver documento') } eventKey="3">Ver Documento</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </DropdownButton>

            </Card.Header>

            <Card.Body style={{     
                backgroundColor: "rgb(16, 16, 16)",
                "display": 'flex',
                flexDirection: "column",
                alignContent: "flex-start",
                justifyContent: "space-around",
                alignItems: 'stretch' }}>

                <Document loading={<Cargando/>} file={url} onLoadSuccess={onDocumentLoadSuccess} >
                    <Page renderMode="svg" height={100} width={250} pageNumber={1} loading={<Cargando/>} />
                </Document>

                <Card.Title style={{ paddingTop : 15 }}>{ filename.toUpperCase()}</Card.Title>
                <Card.Text style={{ color : '#b748ff'  }}> { hash }</Card.Text>
                <Card.Text>{ new Date(write * 1000).toLocaleString() } </Card.Text>

            </Card.Body>
        </Card>
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
        <div style={{
                backgroundColor: "rgb(16, 16, 16)",
                marginTop: 15,
                display: "flex",
                flexWrap: "wrap",
                alignContent: "center",
                justifyContent: "space-evenly",

            }}>
            {
                files ? 
                    files.map( file => <DocCard  key={file.hash} file={file}/> )
                    : undefined
            }
        </div>
    )
}
