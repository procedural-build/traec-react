import React from "react";
import ReactDOM from "react-dom";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logoutToken } from "./_redux/actions";
import { postLogin, verifyToken } from "./_redux/actions";
import store from "traec/redux/store";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: null,
      status: null,
      requestVerified: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    //console.log("Login form submitted")
    e.preventDefault();

    const post = {
      username: this.state.username,
      password: this.state.password
    };

    // Call action when form submitted
    this.props.postLogin(post);
  }

  componentWillMount() {
    // verifyToken checks if there is an existing token in localStorage and verifies it
    if (!this.props.isAuthenticated) {
      // Or use this dispatch if using mapDispatchToProps below
      if (!this.state.requestVerified) {
        this.setState({ requestVerified: true });
        this.props.dispatch(verifyToken());
      }
    }
  }

  password_help_block() {
    return (
      <div>
        <small id="passwordHelpBlock" className="form-text text-muted float-right">
          <Link to="/accounts/password/reset/">Reset your password</Link>
        </small>
        <div style={{ clear: "both" }} />
      </div>
    );
  }

  render_item(attr, placeholder, help_block, fieldType = "text") {
    // Get the validity and error message of this field
    const errors = this.props.errors;
    const validClass = errors && errors.has(attr) ? "is-invalid" : "";
    const error = validClass ? <div className="invalid-feedback">{errors.get(attr).join(" ")}</div> : null;
    // Render
    return (
      <div className="form-group">
        <input
          className={`form-control form-control-sm ${validClass}`}
          placeholder={placeholder}
          type={fieldType}
          name={attr}
          onChange={this.onChange}
          value={this.state[attr]}
        />
        {error}
        {help_block}
      </div>
    );
  }

  render_non_field_errors() {
    const attr = "non_field_errors";
    const errors = this.props.errors;
    if (errors && errors.has(attr)) {
      //console.log("NON_FIELD_ERRORS", errors)
      return <div className="alert alert-danger form-control-sm">{errors.get(attr)}</div>;
    }
    return "";
  }

  render_create_account() {
    if (this.props.show_create_account === false) {
      return "";
    }
    return (
      <div className="text-center border-top pt-3">
        <Link to="/accounts/register/">
          <b>Create an account</b>
        </Link>
      </div>
    );
  }

  logoutClicked(e) {
    e.preventDefault();
    store.dispatch(logoutToken());
  }

  render_logged_in() {
    let { nextUrl, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return null;
    }
    if (!nextUrl) {
      return <Redirect to={`/accounts/profile`} />;
    }
    return <Redirect to={nextUrl} />;
  }

  render() {
    //console.log("AUTHENTICATED", this.props.isAuthenticated)
    if (this.props.isAuthenticated) {
      return this.render_logged_in();
    }
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.render_non_field_errors()}
        {this.render_item("username", "Username")}
        {this.render_item("password", "Password", this.password_help_block(), "password")}

        <div className="form-group">
          <button className="btn btn-sm btn-primary btn-block" type="submit">
            Login
          </button>
        </div>

        {this.render_create_account()}
      </form>
    );
  }
}

LoginForm.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.getInPath("auth.isAuthenticated"),
  errors: state.getInPath("auth.errors"),
  status: state.getInPath("auth.status")
});

const mapDispatchToProps = dispatch => {
  return {
    postLogin: post => dispatch(postLogin(post)),
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
