import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import { BSCard } from "traec-react/utils/bootstrap";
import LoginForm from "../form";

function LoginMessage({ isActive, registrationUser }) {
  if (!isActive) {
    return null;
  }
  return (
    <p>
      Your email address has been verified against invites sent to you. <b>You can now login directly.</b>
    </p>
  );
}

export function LoginPage(props) {
  let { registrationUser } = props;
  let { state, search } = props.location || {};

  let nextUrl = "/accounts/profile";
  if (state) {
    nextUrl = state.nextUrl || nextUrl;
  } else if (search) {
    let queryParams = new URLSearchParams(search);
    nextUrl = queryParams.get("next");
  }

  return (
    <div className="container" style={{ marginTop: "24px" }}>
      <div className="col-sm-8 offset-sm-2">
        <LoginMessage {...props} />
        <BSCard title="Login" body={<LoginForm nextUrl={nextUrl} initUsername={registrationUser.get("username")} />} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  let redirect = state.getInPath("auth.registration.redirect");
  let isAuthenticated = state.getInPath("auth.isAuthenticated");
  let isActive = state.getInPath("auth.registration.user.is_active");
  let registrationUser = state.getInPath("auth.registration.user") || Traec.Im.Map();
  return {
    redirect,
    isAuthenticated,
    isActive,
    registrationUser
  };
};

export default connect(mapStateToProps)(LoginPage);
