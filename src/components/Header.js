import react from 'react'
import {  Switch, Route } from "react-router-dom";

import { Login } from '../components/Login'
import { Navigation } from '../components/Navbar'

import { getAuth ,onAuthStateChanged } from 'firebase/auth';


export class Header extends react.Component{

    constructor(props){
        super(props)
        this.state = {
            user : undefined
        }
    }

    componentDidMount() {
        const auth = getAuth(); 
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('user -> ',user)
                this.setState({ user })
            } else {
                this.setState({ user : undefined })
            }
        });
    }

    render(){


        let {user} =this.state
        console.log(user)

        if(!user){
            return ( <Login/> )
        }

        return(
            <header>
                <Navigation/>
                <Switch>

                    <Route path="/documentos">
                        <h1>Mis documentos</h1>
                    </Route>

                    <Route path="/autenticar">
                        <h1>Autenticar</h1>
                    </Route>
                    
                    <Route path="/firmas">
                        <h1>Mis firmas</h1>
                    </Route>

                    <Route path="/">
                        <h1>Hola mundo </h1>
                    </Route>

                </Switch>
            </header>
        )
    }
}
