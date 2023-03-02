import logo from "./MicrosoftIcon.svg";
import { PublicClientApplication, InteractionType, InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, useMsalAuthentication, useIsAuthenticated, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ErrorBoundary } from "../errors";
import jwt_encode from "jwt-encode";
import jwt_decode from "jwt-decode";


function TopSeparator({ showTopSeparator, topSeparatorHr }) {
  if (!showTopSeparator) {
    return null;
  }
  return (
    <React.Fragment>
      {topSeparatorHr ? <hr className="mb-1" /> : null }
      <p className="text-center mt-0 mb-0">Or</p>
    </React.Fragment>
  );
}

const swapAzureTokenForLocalToken = (tokenState, config) => {
  let { accessToken } = tokenState;
  let { redirectOnSuccess: successRedirectUrl, redirectOnFailure: failureRedirectUrl, register: registration } = config;

  if (!accessToken) {
    console.warn("No valid access token found from Microsoft response");
    return null;
  }

  console.log(`Switching Azure access token for local app token with config`, config, accessToken);
  let callFunction = registration ? axios.post : axios.put;

  callFunction("/auth-jwt/sso/azure/", tokenState)
    .then(response => {
      console.log("response from backend", response.data);
      let { access, token } = response.data;
      token = access || token;
      if (token) {
        localStorage.setItem("token", token);
        console.log(`Got valid token redirecting to: ${successRedirectUrl}`);
        window.location = successRedirectUrl || "/accounts/profile";
      } else {
        console.log("token is invalid");
      }
    })
    .catch(error => {
      let redirectUrl = failureRedirectUrl || "/accounts/register";
      let err_msg = (error.response?.data || [])[0];
      console.log("Error swapping token:", error, err_msg);
      if (err_msg.startsWith("User for Azure SSO not found")) {
        console.log("Redirecting to registration page", redirectUrl);
        window.location = `${redirectUrl}?reason=user_not_found`;
      } else {
        console.log("Redirecting to host", errHost);
        window.location = redirectUrl;
      }
    });

  return undefined;
};


export const doAzureSSOLogin = ({ config }) => {
  console.log("Executing Azure SSO Login workflow with config", config);

  const publicClientApplication = new PublicClientApplication({
    auth: {
      clientId: config.appId,
      redirectUri: config.redirectUri,
      authority: config.authority
    },
    cache: {
      //cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true
    }
  });

  //Try to login via Popup
  publicClientApplication
    .loginPopup({
      scopes: config.scopes,
      prompt: "select_account",
      state: config.state
    })
    .then(response => {
      console.log("Successfully logged into Microsoft account", response);
      swapAzureTokenForLocalToken(response, config);
    })
    .catch((err) => {
      console.log("Error logging into Microsoft account", err);
    });
};

const redirectToCommonSSOPage = ({ config }) => {
  console.log("Redirecting to common SSO page for", config);
  let { ssoRedirectPage } = config;

  // The SSO page could be on another sub-domain.  Set the redirect back to here
  let { protocol, host } = window.location;
  let _config = {
    ...config,
    redirectOnSuccess: config.redirectOnSuccess || `${protocol}//${host}/accounts/profile`,
    redirectOnFailure: config.redirectOnFailure || `${protocol}//${host}/accounts/register`
  };
  delete _config.ssoRedirectPage;
  console.log("Encoding Azure SSO config parameters to JWT for query params", _config);

  // Encode the config to a URL-friendly JWT payload
  let configToken = jwt_encode(_config, "nosecret");
  let url = `${ssoRedirectPage}?config=${configToken}`;

  console.log(`Removing token from localStorage prior to Azure SSO redirect`);
  localStorage.removeItem("token");

  console.log(`Redirecting to complete SSO: ${url}`);
  location.replace(url);
};


export default function AzureSSO(props) {
  let { config } = props;
  const { instance } = useMsal();
  
  if (!config) {
    console.log("No Azure config provided. Not rendering Microsoft SSO button");
    return null;
  }

  //console.log("Rendering AzureSSO button with config", config)

  let buttonText = config.register ? `Register ` : `Login `;
  let action = config.ssoRedirectPage ? redirectToCommonSSOPage : doAzureSSOLogin;

  return (
    <ErrorBoundary>
      <div className="mb-3 mt-0 text-center">
        <TopSeparator {...props} />
        <button
          type="button"
          className="btn btn-sm btn-outline-dark btn-block mt-2 inline-block"
          onClick={() => action(props)}
        >
          <img src={logo} alt="azure-ad-sso" style={{ width: "1rem", marginRight: "0.75rem" }} />
          {buttonText} with Microsoft (SSO)
        </button>
      </div>
    </ErrorBoundary>
  );
}

function WelcomeUser() {
  const { accounts } = useMsal();
  const username = accounts[0]?.username;

  return <p>Welcome, {username}</p>;
}

function signOutClickHandler(instance) {
  let account = instance.getAllAccounts()[0]
  console.log("Signing out azure use with account", account)

  const logoutRequest = {
    account: account,
    mainWindowRedirectUri: "/",
    postLogoutRedirectUri: "/",
  };
  instance.logoutRedirect(logoutRequest);
}

export function AzureSSORedirectPage(props) {
  const { instance, accounts, inProgress }  = useMsal()

  // Get the config parameter from the props
  let { search } = props.location || {};
  let configToken = new URLSearchParams(search).get("config");

  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      console.log("Executing loginRedirect workflow with configToken", configToken)
       instance.loginRedirect({
        scopes: ["user.read"],
        state: configToken
      });
    }
  }, [instance, inProgress] );

  console.log("Rendering AzureSSORedirectPage", accounts, instance)

  instance.handleRedirectPromise()
    .then((response) => {
      if (!response && accounts && accounts[0]) { 
        //window.location = "/accounts/login"
        instance.acquireTokenSilent({account: accounts[0]})
          .then((response) => {
            console.log("Azure SSO got token silently", response)
            let _configToken = response?.state || configToken
            let _config = _configToken ? jwt_decode(_configToken) : {}
            console.log("Got config token", _config)
            swapAzureTokenForLocalToken(response, _config)
          })
        return null
      }
      if (!response) { return null }
      console.log("AzureSSORedirectPage got redirect response", response)
      let _configToken = response?.state || configToken
      let _config = _configToken ? jwt_decode(_configToken) : {}
      console.log("Got config token", _config)
      swapAzureTokenForLocalToken(response, _config)
    })

  return (
    // <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
    <div className="container" style={{ marginTop: "24px" }}>
      {/* <WelcomeUser />
      <button onClick={() => signOutClickHandler(instance)}>Sign Out</button> */}
      <AuthenticatedTemplate>
        <p>You have been authenticed against Microsoft Azure.  You will be redirected to your notifications page in a moment.</p>
        {/* <WelcomeUser /> */}
        {/* <button onClick={() => signOutClickHandler(instance)}>Sign Out</button> */}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
          <p>Not signed in with Azure</p>
      </UnauthenticatedTemplate>
    </div>
    // </MsalAuthenticationTemplate>
  );
}

export function AzureSSOFailurePage(props) {
  return (
    <div className="container" style={{ marginTop: "24px" }}>
      <div className="alert alert-primary" role="alert">
        Single sign on failed. The user for this Microsoft account does not exist.
      </div>
    </div>
  );
}


export function AzureSSORedirectCompletePage(props) {
  const { instance, accounts }  = useMsal()

  console.log("Rendering AzureSSORSuccessPage", accounts, instance)

  return (
    <div className="container" style={{ marginTop: "24px" }}>
      <div className="alert alert-primary" role="alert">
        You have successfully signed on.  
      </div>
      <WelcomeUser />
    </div>
  );
}