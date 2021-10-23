import react from 'react'
import {  Switch, Route, Link } from "react-router-dom";

import { Login } from '../components/Login'
import { Navbar } from '../components/Navbar'

export class Header extends react.Component{

    constructor(props){
        super(props)
        this.state = {
            user : undefined
        }
    }

    render(){

        let { user } = this.state

        if(!user){
            return ( <Login/> )
        }

        return(
            <header>
                <Navbar/>
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
