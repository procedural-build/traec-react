import { LOGIN_SUCCESS, LOGIN_STATUS, LOGIN_FAILURE, LOGOUT_FAILURE, LOGOUT_SUCCESS } from "./types";


export const postLogin = postData => dispatch => {
  //console.log("POSTing login data")

  let fetchParams = {
    url: "/auth-jwt/get/",
    method: "POST",
    body: postData
  };

  // Dispatch an action that will be caught by the APIMiddleware for fetching
  dispatch({
    APICallTypes: {
      successType: LOGIN_SUCCESS,
      failureType: LOGIN_FAILURE
    },
    fetchParams
  });
};

export const postRefresh = () => dispatch => {
  console.log("Requesting token refresh");

  let fetchParams = {
    url: "/auth-jwt/refresh/",
    method: "POST",
    body: { refresh: null } // The refresh token should be in the httpOnly cookie that is sent
  };

  dispatch({
    APICallTypes: {
      successType: "LOGIN_SUCCESS",
      failureType: "LOGIN_FAILURE"
    },
    fetchParams
  });
};

export const verifyToken = () => dispatch => {
  console.log("Checking if token exists");

  let token = localStorage.getItem("token");

  if (token == null || token == "undefined") {
    /* We may still have the required token stored in cookies - but we don't know
    so we try to call the refresh endpoint to get a new access/refresh token 
    */
    console.log("No token found - trying to refresh");
    dispatch({ type: LOGIN_STATUS, payload: { status: "pending" } });
    dispatch(postRefresh());
    return;
  } else if (token == "failed") {
    /* If the token failed then don't try again */
    console.log("Token is ", token, " - not attempting refresh");
    return;
  }

  // Dispatch a notice that we are waiting
  dispatch({ type: LOGIN_STATUS, payload: { status: "pending" } });

  //console.log("Verifying token ", token)
  let fetchParams = {
    url: "/auth-jwt/verify/",
    method: "POST",
    body: { token }
  };
  // Dispatch an action that will be caught by the APIMiddleware for fetching
  dispatch({
    APICallTypes: {
      successType: LOGIN_SUCCESS,
      failureType: LOGIN_FAILURE
    },
    fetchParams
  });
};

export const logoutToken = () => dispatch => {
  console.log("Logging out... ");

  // Removing
  let fetchParams = {
    url: "/auth-jwt/delete/",
    method: "DELETE",
    body: null
  };
  // Dispatch an action that will be caught by the APIMiddleware for fetching
  dispatch({
    APICallTypes: {
      successType: LOGOUT_SUCCESS,
      failureType: LOGOUT_FAILURE
    },
    fetchParams
  });

  if (localStorage.getItem("token_refresh")) {
    localStorage.removeItem("token_refresh")
  }

  localStorage.setItem("token", "undefined");
}
