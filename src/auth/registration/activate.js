import React from "react";
import PropTypes from "prop-types";
import Traec from "traec";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { BSCard } from "traec-react/utils/bootstrap";

import { putActivation } from "../_redux/actionCreators";
import LoginForm from "../form";

class ActivationPage extends React.Component {
  componentDidMount() {
    let data = {
      activation_key: this.props.match.params.activationKey
    };
    this.props.dispatch(putActivation(data));
  }

  render_body_confirmed() {
    return (
      <div>
        <p>Your email address is confirmed and account activated.</p>
        <p>Please log in with the username and password you used to register.</p>

        <LoginForm show_create_account={false} />
      </div>
    );
  }

  render_body_failed() {
    let errors = this.props.errors.get("non_field_errors");
    console.log("Got activation errors", errors, Traec.Im.isList(errors));
    // Iterate through erros to find any already_activated ones
    let extra = null;
    if (Traec.Im.isList(errors)) {
      errors.map(error => {
        if (typeof error === "string" && error.includes("already_activated")) {
          extra = (
            <p>
              Your account has already been activated. Please try to{" "}
              <Link to="/accounts/login">
                <b>log in here</b>
              </Link>
            </p>
          );
        }
      });
    }
    //
    return (
      <div>
        <p>There was an error with your account activation.</p>
        {extra || <div className="alert alert-danger">{errors}</div>}
      </div>
    );
  }

  get_contents() {
    switch (this.props.status) {
      case "failed":
        return {
          title: "Activation failed",
          body: this.render_body_failed()
        };
      case "confirmed":
        return {
          title: "Email confirmed. You may log in.",
          body: this.render_body_confirmed()
        };
      default:
        return {
          title: "Waiting for confirmation ",
          body: (
            <div>
              <p>Please wait...</p>
            </div>
          )
        };
    }
  }

  render() {
    let { title, body } = this.get_contents();
    return (
      <React.Fragment>
        <div className="container" style={{ marginTop: "24px" }}>
          <div className="col-sm-8 offset-sm-2">
            <BSCard title={title} body={body} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ActivationPage.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.getInPath("auth.isAuthenticated"),
  status: state.getInPath("auth.registration.activate.status"),
  errors: state.getInPath("auth.registration.activate.errors")
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivationPage);
