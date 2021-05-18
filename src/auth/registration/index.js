import React from "react";
import { connect } from "react-redux";

import RegistrationForm from "./form";
import { RegistrationConfirmationCard } from "./confirm";
import { BSCard } from "traec-react/utils/bootstrap";
import AcceptProjectInvites from "./acceptProjectInvites";

const RegistrationCard = props => {
  let { redirect, email, metaFieldProps } = props;

  if (redirect === "register_success_confirm") {
    return <RegistrationConfirmationCard />;
  } else if (redirect === "accept_invites") {
    return <AcceptProjectInvites />;
  }

  return <BSCard title="Register" body={<RegistrationForm email={email} metaFieldProps={metaFieldProps} />} />;
};

const RegistrationPage = props => {
  let { location, metaFieldProps } = props;

  let email = null;
  if (location.search.indexOf("email") > -1) {
    email = location.search.match(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+/)[0];
  }

  return (
    <React.Fragment>
      <div className="container" style={{ marginTop: "24px" }}>
        <div className="col-sm-8 offset-sm-2">
          <RegistrationCard redirect={props.redirect} email={email} metaFieldProps={metaFieldProps} />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  redirect: state.getInPath("auth.registration.redirect")
});

export default connect(mapStateToProps)(RegistrationPage);
