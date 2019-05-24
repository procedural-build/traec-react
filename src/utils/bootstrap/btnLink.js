import React from "react";
import ReactDOM from "react-dom";

import {Link} from "react-router-dom";


export class BSBtnLink extends React.Component {
    render(){
        return (
            <Link to={this.props.to} className="btn btn-sm btn-primary float-right">
                {this.props.text}
            </Link>
        );
    }
 }