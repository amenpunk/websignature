import React, { Component } from "react";

export default class Container extends Component { 
    render() {
        return( 
            <div style={{}} className="container">
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}



