import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import RegistrationForm from "./form";
import RegistrationConfirmationCard from "./confirm";
import { BSCard } from "traec-react/utils/bootstrap";
import AcceptProjectInvites from "./acceptProjectInvites";
import logger from "redux-logger";

const RegistrationCard = props => {
  let { redirect, email, metaFieldProps, initMeta } = props;

  if (redirect === "register_success_confirm") {
    return <RegistrationConfirmationCard />;
  } else if (redirect === "accept_invites") {
    return <AcceptProjectInvites />;
  }

  return (
    <BSCard
      title="Register"
      body={<RegistrationForm email={email} metaFieldProps={metaFieldProps} initMeta={initMeta} />}
    />
  );
};

const RegistrationPage = props => {
  let { isAuthenticated, location, metaFieldProps } = props;

  if (isAuthenticated) {
    return <Redirect to="/accounts/profile" />;
  }

  let query_params = new URLSearchParams(location.search);
  let email = query_params.get("email");

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
          <RegistrationCard
            redirect={props.redirect}
            email={email}
            metaFieldProps={metaFieldProps}
            initMeta={initMeta}
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
