import React, { Component } from "react";

export default class Container extends Component { 
    render() {
        return( 
            <div style={ { background : "" } } className="container">{this.props.children}</div>
        )
    }
}



