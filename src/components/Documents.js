import { useContext, useState, useEffect } from 'react'
import { API_GATEWAY } from '../App'
import { Row, Col, Container, Card, Button} from 'react-bootstrap'
import { getAuth } from 'firebase/auth';


function DocCard (props)  {
    console.log('props -> ', props)
    let { filename, hash, write } = props.file
    return (
        <div>
            <Card style={{ width: '18rem', backgroundColor : '#101010', padding : 15  }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body stye={{ backgroundColor : '#101010' }}>
                    <Card.Title>{ filename }</Card.Title>
                    <Card.Text> { hash }</Card.Text>
                    <Card.Text> { new Date(write * 1000).toLocaleString() }</Card.Text>
                    <Button variant="primary">Go somewhere</Button>
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
