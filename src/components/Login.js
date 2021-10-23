import react, { useRef } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { 
    getAuth,
    createUserWithEmailAndPassword, 
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
const provider = new GoogleAuthProvider();

export class Login extends react.Component{

    constructor(props){
        super(props)
        this.auth = getAuth()
    }

    inWithGoogle = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    componentDidMount() {

    }

    Email = (event) => {
        console.log(event)
    }

    render (){
        return(
            <Row style={{ padding : 50 }} className="login-card">
                <Col md={4} style={{background : '#1e1e1e;',paddingTop : '15%'}}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{ color : 'white' }}>Correo:</Form.Label>
                            <Form.Control onChange={this.Email} type="email" placeholder="Ingresa tu correo" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label style={{ color : 'white' }}>Contraseña:</Form.Label>
                            <Form.Control  type="password" placeholder="Contraseña" />
                        </Form.Group>

                        <Button style={{ backgroundColor : '#a6192e !important' }} variant="light" type="submit">
                            Ingresar
                        </Button>
                        
                        <Button style={{ paddinLeft : 15, marginLeft : 15 }} onClick={this.inWithGoogle} variant="danger">
                            <i style={{}} class="fa fa-google" aria-hidden="true"></i>
                        </Button>

                    </Form>
                </Col>
                <Col md={8}>
                    <img style={{ width : '100%', height : 'auto', paddingTop : '5%'}} src="https://media.istockphoto.com/photos/businessman-working-in-modern-office-picture-id1316436137?b=1&k=20&m=1316436137&s=170667a&w=0&h=NxeojAsgCWOLMQVOeG5GbgmQDeNKspaOwZF9Xj1OOqk="/>
                </Col>
            </Row>
        )
    }

}
