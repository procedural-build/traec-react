import React from "react";
import { Route, Switch } from "react-router-dom";

import RegistrationPage from "./registration/index";
import ActivationPage from "./registration/activate";
import LoginPage from "./registration/login";

import PasswordResetPage from "./password/reset";
import PasswordResetConfirmPage from "./password/confirm";
import PasswordChangePage from "./password/change";

import { AzureSSORedirectPage, AzureSSOFailurePage, AzureSSORedirectCompletePage } from "./azure";

function AccountsRouter(props) {
  const baseUrl = props.match.url;
  let { UserProfile, metaFieldProps, recaptchaExtra, azureConfig, createText } = props;

  return (
      <Switch>
        {/* Registration pages */}
        <Route
          exact path={`${baseUrl}/register`}
          render={_props => (
            <RegistrationPage
              {..._props}
              metaFieldProps={metaFieldProps}
              recaptchaExtra={recaptchaExtra}
              azureConfig={azureConfig}
            />
          )}
        />
        <Route exact path={`${baseUrl}/activate/:activationKey`} component={ActivationPage} />

        {/* Login and profile pages */}
        <Route 
          exact path={`${baseUrl}/login`} 
          render={_props => (
            <LoginPage
              {..._props}
              createText={createText}
              azureConfig={azureConfig}
            />
          )}
        />
        <Route exact path={`${baseUrl}/profile`} component={UserProfile} />

        {/* Password reset pages */}
        <Route exact path={`${baseUrl}/password/reset`} component={PasswordResetPage} />
        <Route exact path={`${baseUrl}/password/reset/:uid/:token`} component={PasswordResetConfirmPage} />
        <Route exact path={`${baseUrl}/reset/:uid/:token`} component={PasswordResetConfirmPage} />
        <Route exact path={`${baseUrl}/password/change`} component={PasswordChangePage} />

        {/* Password reset pages */}
        <Route exact path={`${baseUrl}/login/sso/azure`} component={AzureSSORedirectPage} />
        <Route exact path={`${baseUrl}/login/sso/fail`} component={AzureSSOFailurePage} />
        <Route exact path={`${baseUrl}/login/sso/azure/success`} component={AzureSSORedirectCompletePage} />
      </Switch>
  );
}

export default AccountsRouter;
