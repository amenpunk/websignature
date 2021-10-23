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
            <Row className="login-card">
                <Col style={{ paddingTop : '10%'}}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control onChange={this.Email} type="email" placeholder="Ingresa tu correo" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contrasena</Form.Label>
                            <Form.Control  type="password" placeholder="Contrasena" />
                        </Form.Group>

                        <Button variant="light" type="submit">
                            Ingresar
                        </Button>
                        
                        <Button style={{ paddinLeft : 15, marginLeft : 15 }} onClick={this.inWithGoogle} variant="danger">
                            Ingresar con Google
                        </Button>

                    </Form>
                </Col>
            </Row>
        )
    }

}
