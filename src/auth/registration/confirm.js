import React from "react";
import ReactDOM from "react-dom";

import { Link } from "react-router-dom";
import { Icon } from "AppSrc/dashboards/icons";
import { BSCard, BSBtn } from 'AppSrc/utils/bootstrap'

class RegistrationConfirmationCard extends React.Component {

    render_body() {
        return (
            <div>
                <p>An activation email has been sent.  Check your 
                    email and click the link to verify your email address.
                </p>
                {/*<BSBtn text="Send again"/>*/}
            </div>
        );
    }

    render(){
        return (
            <BSCard 
                title = "Check your email"
                body = {this.render_body()}
            />
        );
    }
}

export { RegistrationConfirmationCard };