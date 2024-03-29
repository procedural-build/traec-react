import React from "react";
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

export default function LoginPage(props) {
  let { createText, registrationUser, azureConfig } = props;
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
        <BSCard 
          title="Login" 
          body={(
            <LoginForm 
              createText={createText || "Create an account"}
              nextUrl={nextUrl} 
              initUsername={registrationUser?.get("username")} 
              azureConfig={azureConfig}
            />
          )} 
        />
      </div>
    </div>
  );
}
