import { useContext, useState, useEffect } from 'react'
import { API_GATEWAY } from '../App'
import { Row, Col, Container, ListGroup } from 'react-bootstrap'
import { getAuth} from 'firebase/auth';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from '../App'

export function Home () {

    let { API } = useContext(API_GATEWAY)
    let [files, setFiles] = useState(null) 
    let [sign, setSign] = useState(null) 
    let [uid, setUID] = useState(null) 
    
    let [totalFiles, setTotalFiles] = useState(0) 

    useEffect( () => {

        getDocs(collection(db, "files")).then( querySnapshot => {
            let total = 0
            querySnapshot.forEach((doc) => {
                total=total+1;
                // console.log(`${doc.id} => ${doc.data()}`);
            });
            console.log('total files -> ',total)
            setTotalFiles(total)

        }).catch(e => console.log('error fetching files >>', e))
        
        getDocs(collection(db, "firmas")).then( querySnapshot => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });

        }).catch(e => console.log('error firmas db >>', e))


        let auth = getAuth();
        let user = auth.currentUser

        /// documentos
        let gateway = API + "/firma"
        fetch(gateway+"?uid="+user.uid)
            .then( docs => docs.json() )
            .then( f => {
                return setFiles(f.data)
            }).catch( e => {
                console.log( 'fetch error', e )
            })


        // firma digital
        gateway = API +"/sign?uid="+user.uid
        fetch(gateway)
            .then( docs => docs.json() )
            .then( f => {
                return f.data ?  setSign(f.data.image) : null
            }).catch( e => {
                console.log( 'fetch error', e )
            })

        setUID(user.uid)

    }, [API])

    return (
        <Container style={{ backgroundColor : '#101010', marginTop : 15 }}>
            <Row style={{ padding :25}} className="align-items-center">
                <Col md={6}>
                    <Row>
                        <Col>
                            <center>
                                {
                                    sign ? 
                                    <img style={{ width : 250, padding :15 }} src={ `data:image/png;base64, ${sign}`} alt="firma manuscrita" />
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
                                                <strong style={{ wordWrap: "break-word" , color : '#0dddd3',   whiteSpace: "normal" }}> 
                                                    <a className="tangel" style={{ color : '#0dddd3'}}  href={'https://explorer.iota.org/legacy-devnet/transaction/' + signature}>
                                                        {signature} 
                                                    </a>
                                                </strong>
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
                <center style={{ backgroundColor : "#121212", padding : 15 }}>
                    <h1 style={{ padding : 15 }}>Estadísticas Generales</h1>
                </center>

                <div style={{ backgroundColor : "#121212",padding : 15,display : 'flex', flexDirection : "row", justifyContent : 'space-around', flexWrap : 'wrap' }}>

                    <div className="stadistics">
                        <p><strong>FIRMAS HECHAS:</strong> <i className="numberS">32</i> </p>
                    </div>
                    
                    <div className="stadistics">
                        <p><strong>FIRMAS RECIBIDAS:</strong> <i className="numberS">20</i> </p>
                    </div>
                    
                    <div className="stadistics">
                        <p><strong>TOTAL DOCUMENTOS:</strong>  <i className="numberS">{ totalFiles }</i> </p>
                    </div>

                    <div className="stadistics">
                        <p><strong>TOTAL USUARIOS:</strong>  <i className="numberS">{ totalFiles }</i> </p>
                    </div>

                    <div className="stadistics">
                        <p><strong>AVG TIEMPO RESPUESTA FIRMA:</strong>  <i className="numberS"> 12,820ms </i> </p>
                    </div>
                    
                    <div className="stadistics">
                        <p><strong>AVG TIEMPO RESPUESTA AUTENTICACION:</strong>  <i className="numberS"> 10,888ms </i> </p>
                    </div>
                    

                </div>
            </Row>

        </Container>
    )
}
