import { useContext, useState, useEffect } from 'react'
import { API_GATEWAY } from '../App'
import { Image,Row, Col, Container, ListGroup } from 'react-bootstrap'
import { getAuth} from 'firebase/auth';

export function Home () {

    let { API } = useContext(API_GATEWAY)
    let [files, setFiles] = useState(null) 
    let [user, setUser] = useState(null) 
    let [sign, setSign] = useState(null) 
    let [uid, setUID] = useState(null) 

    useEffect( () => {

        let auth = getAuth();
        let user = auth.currentUser

        let gateway = API + "/firma"
        fetch(gateway+"?uid="+user.uid)
            .then( docs => docs.json() )
            .then( f => {
                setFiles(f.data)
            }).catch( e => {
                console.log( 'fetch error', e )
            })


        gateway = API +"/sign?uid="+user.uid
        fetch(gateway+"?uid="+user.uid)
            .then( docs => docs.json() )
            .then( f => {
                return f.data ?  setSign(f.data.image) : null
            }).catch( e => {
                console.log( 'fetch error', e )
            })

        setUser(user)
        setUID(user.uid)

    }, [API])

    return (
        <Container style={{ backgroundColor : '#101010', marginTop : 15 }}>
            <Row style={{ padding :25 }}>
                <Col md={6}>
                    <Row>
                        <Col>
                            <center>
                                <h1 style={{ color : "white" }}> { user ? user.displayName : "" } </h1>
                                  <Image src={ user ? user.photoURL : "" } rounded />
                            </center>
                            <center>
                                {
                                    sign ? 
                                    <img style={{ width : 250, padding :15 }} src={ "data:image/png;base64, " + sign ? sign : '' } alt="firma manuscrita" />
                                    : undefined
                                }
                                <h5 style={{ padding : 5 }}><strong>SIGN:</strong> <i>{uid}</i> </h5>
                            </center>
                        </Col>
                    </Row>
                </Col>
                <Col md={6}>
                    <ListGroup style={{ paddingTop : 15 }}>
                        {
                            files ? 
                                files.map( ({ file, signature, timestamp, write, document }) => {  
                                    return(
                                        <ListGroup.Item style={{ wordWrap: "break-word" , backgroundColor : '#1e1e1e', padding : 25, marginTop : 5 }} key={document}>
                                            <p>
                                                <i style={{ color : 'white' }}> {file.toUpperCase()} </i>
                                                <br/>
                                                <strong style={{ color : 'white' }}> { new Date( write * 1000  ).toLocaleString() } </strong>
                                                <strong style={{ wordWrap: "break-word" , color : '#0dddd3',   whiteSpace: "normal" }}> {signature} </strong>
                                            </p>
                                        </ListGroup.Item>
                                    )
                                })
                                : <h1>No hay arhivos que mostrar</h1>
                        }
                    </ListGroup>
                </Col>
            </Row>
            <Row>
                <div style={{ paddingBottom : 15 ,paddingTop: 10,display : 'flex', flexDirection : "row", justifyContent : 'space-around', flexWrap : 'wrap' }}>

                    <div className="stadistics">
                        <p><strong>FIRMAS HECHAS:</strong> <i className="numberS">32</i> </p>
                    </div>
                    
                    <div className="stadistics">
                        <p><strong>FIRMAS RECIBIDAS:</strong> <i className="numberS">20</i> </p>
                    </div>
                    
                    <div className="stadistics">
                        <p><strong>TOTAL DOCUMENTOS:</strong>  <i className="numberS">15</i> </p>
                    </div>

                </div>
            </Row>

        </Container>
    )
}
