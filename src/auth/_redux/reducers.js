import Im from "traec/immutable";
import * as types from "./types";
import jwt_decode from "jwt-decode";

const initialState = Im.fromJS({
  isAuthenticated: false,
  token: {},
  errors: null
});

export default function(state = initialState, action) {
  //console.log("Reducing auth data")
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      let token = action.payload.token;
      localStorage.setItem("token", token);
      let decoded_token = token ? jwt_decode(token) : null;
      return state.merge(
        Im.fromJS(action.payload),
        Im.fromJS({ isAuthenticated: true, status: "confirmed", decoded_token })
      );
    case types.LOGIN_STATUS:
      return state.merge(Im.fromJS(action.payload));
    case types.LOGIN_FAILURE:
      //console.log("LOGIN FAILURE", action.payload)
      localStorage.removeItem("token");
      return state.merge(
        Im.fromJS(action.payload),
        Im.fromJS({
          isAuthenticated: false,
          token: null,
          errors: action.payload ? action.payload.errors : null,
          status: "failed"
        })
      );
    case types.REGISTER_SUCCESS:
      return state.mergeIn(
        ["registration"],
        Im.fromJS({
          redirect: "register_success_confirm"
        })
      );
    case types.REGISTER_FAILURE:
      return state.mergeIn(["registration"], Im.fromJS(action.payload));
    case types.ACTIVATE_SUCCESS:
      return state.mergeIn(
        ["registration", "activate"],
        Im.fromJS({
          status: "confirmed"
        })
      );
    case types.ACTIVATE_FAILURE:
      return state.mergeIn(
        ["registration", "activate"],
        Im.fromJS({
          status: "failed",
          errors: action.payload.errors
        })
      );
    case types.RESET_SUCCESS:
      return state.mergeIn(
        ["registration", "password_reset"],
        Im.fromJS({
          status: "confirmed"
        })
      );
    case types.RESET_PENDING:
      return state.mergeIn(
        ["registration", "password_reset"],
        Im.fromJS({
          status: "pending"
        })
      );
    case types.RESET_FAILURE:
      return state.mergeIn(
        ["registration", "password_reset"],
        Im.fromJS({
          status: "failed",
          errors: action.payload.errors
        })
      );
    default:
      return state;
  }
}
