import React from "react";
import ReactDOM from "react-dom";

import PropTypes from 'prop-types';

import Octicon from 'react-octicon';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class CopyId extends React.Component {

    render() { 
        const _id = this.props._id
        return(
            <div className={`btn-group ${this.props.extraClass}`}>
                <CopyToClipboard text={_id}>
                    <button className="btn btn-sm btn-primary" style={{fontFamily: "monospace"}}>
                        <Octicon name="clippy"/>
                    </button>
                </CopyToClipboard>
                <button className="btn btn-sm btn-secondary" style={{fontFamily: "monospace"}}>
                    {_id.substring(0,8)}
                </button>
            </div>
        );
    }
}

export default CopyId