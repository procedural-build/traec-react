import React from "react";
import { connect } from "react-redux";

import RegistrationForm from "./form";
import { RegistrationConfirmationCard } from "./confirm";
import { BSCard } from "traec-react/utils/bootstrap";

class RegistrationPage extends React.Component {
  render_card() {
    if (this.props.redirect === "register_success_confirm") {
      return <RegistrationConfirmationCard />;
    }
    return <BSCard title="Register" body={<RegistrationForm />} />;
  }

  render() {
    return (
      <React.Fragment>
        <div className="container" style={{ marginTop: "24px" }}>
          <div className="col-sm-8 offset-sm-2">{this.render_card()}</div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  redirect: state.getInPath("auth.registration.redirect")
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
