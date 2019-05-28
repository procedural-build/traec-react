import React from "react";
import {Route, Switch} from "react-router-dom";

import RegistrationPage from './registration/index'
import ActivationPage from './registration/activate'
import LoginPage from './registration/login'

import PasswordResetPage from './password/reset'
import PasswordResetConfirmPage from './password/confirm'


class AccountsRouter extends React.Component {

    render() {
        const baseUrl = this.props.match.url;
        return (
            <React.Fragment>
                <Switch>
                    {/* Registration pages */}
                    <Route exact path={`${baseUrl}/register`} component={RegistrationPage} />
                    <Route exact path={`${baseUrl}/activate/:activationKey`} component={ActivationPage} />
        
                    {/* Login and profile pages */}
                    <Route exact path={`${baseUrl}/login`} component={LoginPage} />
                    <Route exact path={`${baseUrl}/profile`} component={this.props.UserProfile} />

                    {/* Password reset pages */}
                    <Route exact path={`${baseUrl}/password/reset`} component={PasswordResetPage} />
                    <Route exact path={`${baseUrl}/password/reset/:uid/:token`} component={PasswordResetConfirmPage} />

                </Switch>
            </React.Fragment>
        );
    }
}

export default AccountsRouter;