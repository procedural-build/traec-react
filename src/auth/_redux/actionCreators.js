import * as types from "./types";

export const postLogin = (body, fetchParams) => {
  fetchParams = Object.assign({ url: "/auth-jwt/get/", method: "POST" }, { body }, fetchParams);
  return {
    APICallTypes: {
      successType: "LOGIN_SUCCESS",
      failureType: "LOGIN_FAILURE"
    },
    fetchParams
  };
};

export const postRegistration = (body, fetchParams) => {
  fetchParams = Object.assign({ url: "/auth-rest/register/", method: "POST" }, { body }, fetchParams);

  return {
    APICallTypes: {
      successType: "REGISTER_SUCCESS",
      failureType: "REGISTER_FAILURE"
    },
    fetchParams
  };
};

export const putActivation = (body, fetchParams) => {
  fetchParams = Object.assign({ url: "/auth-rest/register/activate/", method: "PUT" }, { body }, fetchParams);
  return {
    APICallTypes: {
      successType: "ACTIVATE_SUCCESS",
      failureType: "ACTIVATE_FAILURE"
    },
    fetchParams
  };
};

export const postPasswordReset = (body, fetchParams) => {
  fetchParams = Object.assign({ url: "/auth-rest/password/reset/", method: "POST" }, { body }, fetchParams);
  return {
    APICallTypes: {
      successType: "RESET_PENDING",
      failureType: "RESET_FAILURE"
    },
    fetchParams
  };
};

export const postPasswordResetConfirm = (body, fetchParams) => {
  fetchParams = Object.assign({ url: "/auth-rest/password/reset/confirm/", method: "POST" }, { body }, fetchParams);
  return {
    APICallTypes: {
      successType: "RESET_SUCCESS",
      failureType: "RESET_FAILURE"
    },
    fetchParams
  };
};

export const postPasswordChange = (body, fetchParams) => {
  fetchParams = Object.assign({ url: "/auth-rest/password/change/", method: "POST" }, { body }, fetchParams);
  return {
    APICallTypes: {
      successType: "CHANGE_SUCCESS",
      failureType: "CHANGE_FAILURE"
    },
    fetchParams
  };
};
