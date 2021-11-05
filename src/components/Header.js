import react from 'react'

import {  Switch, Route } from "react-router-dom";
import { getAuth ,onAuthStateChanged } from 'firebase/auth';

import { Login } from '../components/Login'
import { Navigation } from '../components/Navbar'
import { Home } from '../components/Home'
import { Documents  } from '../components/Documents'
import { Autenticar  } from '../components/Autenticar'
import { Firmas  } from '../components/Firmas'


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
                this.setState({ user })
            } else {
                this.setState({ user : undefined })
            }
        });
    }

    render(){

        let {user} =this.state

        if(!user){
            return ( <Login/> )
        }

        return(
            <header>
                <Navigation/>
                <Switch>

                    <Route exact path="/">
                        <Home/>
                    </Route>

                    <Route path="/documentos">
                        <Documents/>
                    </Route>

                    <Route path="/autenticar">
                        <Autenticar/>
                    </Route>
                    
                    <Route path="/firmas">
                        <Firmas/>
                    </Route>


                </Switch>
            </header>
        )
    }
}
