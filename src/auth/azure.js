import logo from "./MicrosoftIcon.svg";
import { PublicClientApplication } from "@azure/msal-browser";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ErrorBoundary } from "../errors";
import jwt_encode from "jwt-encode";
import jwt_decode from "jwt-decode";

function TopSeparator({ showTopSeparator }) {
  if (!showTopSeparator) {
    return null;
  }
  return (
    <React.Fragment>
      <hr className="mb-1" />
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

  console.log(`Switching Azure access token for local app token. registration=${registration}`);
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
      cacheLocation: "sessionStorage",
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
    .catch(() => {
      console.log("Error logging into Microsoft account");
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
  console.log("Encoding SSO config parameters to JWT for query params", _config);

  // Encode the config to a URL-friendly JWT payload
  let configToken = jwt_encode(_config, "nosecret");
  let url = `${ssoRedirectPage}?config=${configToken}`;

  console.log(`Removing token from localStorage prior to SSO redirect`);
  localStorage.removeItem("token");

  console.log(`Redirecting to complete SSO: ${url}`);
  location.replace(url);
};

export default function AzureSSO(props) {
  let { config } = props;

  if (!config) {
    console.log("No Azure config provided. Not rendering Microsoft SSO button");
    return null;
  }

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
          {buttonText} with Microsoft
        </button>
      </div>
    </ErrorBoundary>
  );
}

export function AzureSSORedirectPage(props) {
  let { search } = props.location || {};

  let configToken = new URLSearchParams(search).get("config");
  let config = jwt_decode(configToken);

  // Due to empty dependency array this is called only once
  useEffect(() => {
    console.log("Calling azureSSOLogin flow", config);
    doAzureSSOLogin({ config });
  }, []); // <-- empty dependency array

  return (
    <div className="container" style={{ marginTop: "24px" }}>
      <div className="alert alert-primary" role="alert">
        Logging in with Microsoft SSO. You will be redirected back to your original domain after the sign in process.
      </div>
    </div>
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
