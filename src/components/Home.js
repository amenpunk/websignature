import { useContext, useState, useEffect } from 'react'
import { API_GATEWAY } from '../App'
import { Row, Col, Container, ListGroup } from 'react-bootstrap'
import { getAuth} from 'firebase/auth';

export function Home () {

    let { API } = useContext(API_GATEWAY)
    let [files, setFiles] = useState(null) 
    let [user, setUser] = useState(null) 
    let [sign, setSign] = useState(null) 

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

    }, [API])

    return (
        <Container style={{ backgroundColor : '#101010', marginTop : 15 }}>
            <Row style={{ padding :25 }}>
                <Col md={6}>
                    <Row>
                        <Col>
                            <center>
                                <h1 style={{ color : "white" }}> { user ? user.displayName : "" } </h1>
                                <img alt="profile" src={user ? user.photoURL : ""}/>
                            </center>
                            <center>
                                <img style={{ width : 250, padding :15 }} src={ "data:image/png;base64, " + sign ? sign : '' } alt="firma manuscrita" />
                            </center>
                        </Col>
                    </Row>
                </Col>
                <Col md={6}>
                    <ListGroup>
                        {
                            files ? 
                                files.map( ({ file, signature, timestamp, write, document }) => {  
                                    return(
                                        <ListGroup.Item key={document}>
                                            { file }
                                        </ListGroup.Item>
                                    )
                                })
                                : <h1>No hay arhivos que mostrar</h1>
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}
