import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { BSCard, BSBtn } from "traec-react/utils/bootstrap";

function UserIsActiveBody() {
  return <Redirect to="/accounts/login" />;

  return (
    <div>
      <p>Your address has been verified against existing invitations sent to you. You can now login directly.</p>
      <button
        className="btn btn-primary btn-sm"
        onClick={e => {
          e.preventDefault();
          location.href = "/accounts/login";
        }}
      >
        Log in here
      </button>
    </div>
  );
}

function UserNotActiveBody() {
  return (
    <div>
      <p>An activation email has been sent. Check your email and click the link to verify your email address.</p>
      <p>
        <b>
          Please check your junk or spam folder. If you do not receive the activation email then please contact support
          for manual verification of your email.
        </b>
      </p>
      {/*<BSBtn text="Resend activation email"/>*/}
    </div>
  );
}

function RegistrationConfirmationCard({ isAuthenticated, isActive }) {
  if (isAuthenticated) {
    return <Redirect to="/accounts/profile" />;
  }

  let MessageBody = isActive ? UserIsActiveBody : UserNotActiveBody;
  let title = isActive ? "Ready to Log In" : "Check your email";

  return <BSCard title={title} body={<MessageBody />} />;
}

const mapStateToProps = state => {
  let redirect = state.getInPath("auth.registration.redirect");
  let isAuthenticated = state.getInPath("auth.isAuthenticated");
  let isActive = state.getInPath("auth.registration.user.is_active");
  return {
    redirect,
    isAuthenticated,
    isActive
  };
};

export default connect(mapStateToProps)(RegistrationConfirmationCard);
