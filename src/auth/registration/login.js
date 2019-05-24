import React from "react";
import { BSCard } from 'AppSrc/utils/bootstrap';
import LoginForm from '../form'


class LoginPage extends React.Component {

    render(){
        //console.log(this.props.location)
        let {state} = this.props.location
        let nextUrl = state ? state.nextUrl : "/accounts/profile"

        return (
        <React.Fragment>
            <div className="container" style={{marginTop: "24px"}}>
                <div className="col-sm-8 offset-sm-2">
                    <BSCard 
                        title = "Login"
                        body = {<LoginForm 
                            nextUrl={nextUrl}
                        />}
                    />
                </div>
            </div>
        </React.Fragment>
    );
    }
}

export { LoginPage };