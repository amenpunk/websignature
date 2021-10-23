import React, { Component } from "react";

export default class Container extends Component { 
    render() {
        return( 
            <div style={{}} className="container">
                <div style={{  background : "#1e1e1e !important" }}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}



