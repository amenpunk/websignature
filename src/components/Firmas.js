import {Row, Col, Container, Form, Button, Spinner} from 'react-bootstrap'
import { useLocation} from "react-router-dom";
import { useContext ,useState, useEffect } from "react";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { API_GATEWAY } from '../App'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getAuth } from 'firebase/auth';

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


export function Firmas (){

    let location = useLocation();

    let [hash, setHash] = useState(location.state ? location.state.hash : '');
    let [file, setFile] = useState(null);
    let [filename, setFileName] = useState('');
    
    const [numPages, setNumPages] = useState('');
    let { API, IPFS } = useContext(API_GATEWAY)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function Firmar() {

        let auth = getAuth();
        let user = auth.currentUser

        let gateway = API + "/firma"
        let data  = {
            'uid' :user.uid,
            'hash' : hash,
            'name' :  user.displayName ? user.displayName : "",
            'mail' :  user.email,
            'filename' : filename
        }

        fetch(gateway, {
            "method" : "POST",
            'Content-Type': 'application/json',
            'body' : JSON.stringify(data)
        }).then( function(e) {
            return e.json()
        } ).then(function(e) {
            return MySwal.fire({
                title: e.head,
                html: e.message,
                icon: 'success'
            })
        }).catch(function(e) {
            return MySwal.fire({
                title: e.head,
                html: e.message,
                icon: 'error'
            })
        } )

    }


    useEffect( () => {
        setFile(null)
    }, [hash] )

    async function ValidateAndSign() {

        if(!hash){
            return MySwal.fire({
                title: 'Ups!!',
                html: 'Ingrea un hash valido',
                icon: 'error'
            })
        }

        let gateway = API + "/validate?hash=" + hash
        let docs = await fetch(gateway)
        let files = await docs.json();
        console.log('FILES -> ',files)

        if(!files || files.data.length <= 0) {
            return MySwal.fire({
                title: 'Ups!!',
                html: 'Ingrea un hash valido',
                icon: 'error'
            })

        }
        

        let { hash : shash, filename } = files.data.shift()
        let fileurl =  IPFS + 'ipfs/' + shash
        setFile(fileurl)
        setFileName(filename)


    }


    return(
        <Container style={{ backgroundColor : '#101010', marginTop : 15 }}>
            <Row>
                <Col style={{ padding : '20%' }}>

                    {
                        file ? 
                            <center style={{ padding : 15 }}>
                                <Document loading={<Cargando/>} file={file} onLoadSuccess={onDocumentLoadSuccess} >
                                    <Page renderMode="canvas" height={200} width={200} pageNumber={1} loading={<Cargando/>} />
                                </Document>
                            </center>
                        : undefined

                    }



                    <Form>

                        <Form.Group controlId="formFileLg" className="mb-3">
                            <Form.Control
                                value={hash}
                                placeholder="Pega el hash de un documento autenticado"
                                type="text" 
                                size="lg" 
                                onChange={(e) => setHash(e.target.value)}
                            />
                        </Form.Group>

                        <center>
                            <Button onClick={!file ?  ValidateAndSign : Firmar}> { !file ? "Validar" : "Firmar" }</Button>
                        </center>

                    </Form>

                </Col>
            </Row>
        </Container>
    )

}

