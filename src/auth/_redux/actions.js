import { LOGIN_SUCCESS, LOGIN_STATUS, LOGIN_FAILURE } from './types';
import fetchJSON from 'traec/redux/fetch';

 export const postLogin = (postData) => dispatch => {
    //console.log("POSTing login data")

    let fetchParams = {
        url: '/auth-jwt/get/',
        method: 'POST',
        body: postData
    }

    // Dispatch an action that will be caught by the APIMiddleware for fetching
    dispatch({
        APICallTypes: { 
            successType: LOGIN_SUCCESS, 
            failureType: LOGIN_FAILURE
        }, 
        fetchParams
    })
  };


export const verifyToken = () => dispatch => {
    console.log("Checking if token exists")

    let token = localStorage.getItem('token');
    if (token == null) {
        //console.log("No token found")
        dispatch({
            type: LOGIN_FAILURE,
            //payload: {non_field_errors: "No token in local storage."}
        })
        return 
    }

    // Dispatch a notice that we are waiting
    dispatch({ type: LOGIN_STATUS, payload: {status: 'pending'}})

    //console.log("Verifying token ", token)
    let fetchParams = {
        url: '/auth-jwt/verify/',
        method: 'POST',
        body: {token}
    }
    // Dispatch an action that will be caught by the APIMiddleware for fetching
    dispatch({
        APICallTypes: { 
            successType: LOGIN_SUCCESS, 
            failureType: LOGIN_FAILURE
        }, 
        fetchParams
    })
};


export const logoutToken = () => dispatch => {
    console.log("Logging out... ")

    let token = localStorage.getItem('token');
    if (token != null) {
        localStorage.removeItem('token');
        console.log('Deleted token', localStorage.getItem('token'))
    }
    dispatch({
        type: 'USER_LOGOUT',
    })
};