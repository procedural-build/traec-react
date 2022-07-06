import logo from "./logo.svg";
import { PublicClientApplication } from "@azure/msal-browser";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ErrorBoundary } from "../errors";

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

const swapAzureTokenForLocalToken = tokenState => {
  let { accessToken } = tokenState;

  if (!accessToken) {
    console.warn("No valid access token found from Microsoft response");
    return null;
  }

  console.log("Switching Azure access token for local app token");
  axios
    .post("/auth-jwt/sso/azure/", tokenState)
    .then(response => {
      console.log("response from backend", response.data);
      if (response.data.access) {
        let { access, token } = action.payload;
        token = access || token;
        localStorage.setItem("token", token);
        console.log("Got valid token redirecting to accounts/profile...");
        window.location = "/accounts/profile";
      } else {
        console.log("token is invalid");
      }
    })
    .catch(error => console.log("Error swapping token:", error));

  return undefined;
};

const doAzureSSOLogin = props => {
  let { config } = props;
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
  try {
    publicClientApplication
      .loginPopup({
        scopes: config.scopes,
        prompt: "select_account"
      })
      .then(() => {
        console.log("Successfully logged into Microsoft account");
        // Acquire an access token
        try {
          publicClientApplication
            .acquireTokenSilent({
              account: publicClientApplication.getAllAccounts()[0],
              scopes: ["user.read", "email"]
            })
            .then(response => {
              console.log("Got response from aquireTokenSilent: ", response);
              swapAzureTokenForLocalToken(response);
            });
        } catch (err) {
          console.log("Error acquiring access token", err);
        }
      })
      .catch(() => {
        console.log("Error logging into Microsoft account");
      });
  } catch (err) {
    console.log("Error logging into Microsoft account [2]");
    return null;
  }
};

export default function AzureSSO(props) {
  let { config } = props;
  if (!config) {
    console.log("No Azure config provided. Not rendering Microsoft SSO button");
    return null;
  }

  return (
    <ErrorBoundary>
      <div className="mb-3 mt-0 text-center">
        <TopSeparator {...props} />
        <a onClick={() => doAzureSSOLogin(props)} style={{ cursor: "pointer" }}>
          <img src={logo} alt="azure-ad-sso" />
        </a>
      </div>
    </ErrorBoundary>
  );
}
