import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import RegistrationForm from "./form";
import RegistrationConfirmationCard from "./confirm";
import { BSCard } from "traec-react/utils/bootstrap";
import AcceptProjectInvites from "./acceptProjectInvites";

const RegistrationCard = props => {
  let { redirect } = props;

  if (redirect === "register_success_confirm") {
    return <RegistrationConfirmationCard />;
  } else if (redirect === "accept_invites") {
    return <AcceptProjectInvites />;
  }

  return <BSCard title="Register" body={<RegistrationForm {...props} />} />;
};

const RegistrationPage = props => {
  let { isAuthenticated, location, metaFieldProps, recaptchaExtra, azureConfig } = props;

  if (isAuthenticated) {
    return <Redirect to="/accounts/profile" />;
  }

  let query_params = new URLSearchParams(location.search);
  let email = query_params.get("email");

  let reason = query_params.get("reason");
  let REASONS = {
    user_not_found:
      "The user for this Microsoft account does not exist on this system.  Please click the Register with Microsoft button below to create your account."
  };
  let _reason = reason ? (
    <div className="alert alert-primary" role="alert">
      {REASONS[reason]}
    </div>
  ) : null;

  let initMeta = {};
  if (metaFieldProps) {
    console.log("Settting metaFieldProps from query params", metaFieldProps);
    for (let field of metaFieldProps || []) {
      let value = query_params.get(field.name);
      if (value) {
        console.log("Settting initial meta field value from query params", field, value);
        initMeta[field.name] = value;
      }
    }
    console.log("RENDERING REGISTRATION PAGE", metaFieldProps);
  }

  /*if (location.search.indexOf("email") > -1) {
    email = location.search.match(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/)[0];
  }*/

  return (
    <React.Fragment>
      <div className="container" style={{ marginTop: "24px" }}>
        <div className="col-sm-8 offset-sm-2">
          {_reason}
          <RegistrationCard
            redirect={props.redirect}
            email={email}
            metaFieldProps={metaFieldProps}
            initMeta={initMeta}
            recaptchaExtra={recaptchaExtra}
            azureConfig={azureConfig}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  redirect: state.getInPath("auth.registration.redirect"),
  isAuthenticated: state.getInPath("auth.isAuthenticated")
});

export default connect(mapStateToProps)(RegistrationPage);
