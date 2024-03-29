import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { postLogin, verifyToken } from "./_redux/actions";
import AzureSSOButton from "traec-react/auth/azure";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.initUsername || "",
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

  componentDidMount() {
    // verifyToken checks if there is an existing token in localStorage and verifies it
    if (!this.props.isAuthenticated) {
      // Or use this dispatch if using mapDispatchToProps below
      if (!this.state.requestVerified) {
        this.setState({ requestVerified: true });
        this.props.dispatch(verifyToken());
      }
    }
  }

  renderNonFieldErrors() {
    const attr = "detail";
    const errors = this.props.errors;
    if (errors && errors.has(attr)) {
      let errorMessage = errors.get(attr);
      if (errorMessage.startsWith("No active account")) {
        errorMessage = "Unable to log in with provided credentials.";
      }
      if (errorMessage.startsWith("Token is invalid or expired")) {
        errorMessage = "Your login has expired. Please login again.";
      }
      return <div className="alert alert-info p-2">{errorMessage}</div>;
    }
    return "";
  }

  renderCreateAccount() {
    let { createText } = this.props;
    if (createText === "") {
      return null;
    }
    return (
      <div className="text-center border-top pt-3">
        <Link to="/accounts/register/?navbar">
          <b>{createText || "Create an account"}</b>
        </Link>
      </div>
    );
  }

  renderLoggedIn() {
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
    let { isAuthenticated, errors, azureConfig } = this.props;
    if (isAuthenticated) {
      return this.renderLoggedIn();
    }
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.renderNonFieldErrors()}
        <LoginField
          attribute="username"
          placeholder="Username or Email"
          onChange={this.onChange}
          value={this.state["username"]}
          errors={errors}
        />
        <LoginField
          attribute="password"
          placeholder="Password"
          onChange={this.onChange}
          helpBlock={passwordHelpBlock()}
          fieldType="password"
          value={this.state["password"]}
          errors={errors}
        />
        <div className="form-group">
          <button className="btn btn-sm btn-primary btn-block" type="submit">
            Login
          </button>
        </div>

        <AzureSSOButton showTopSeparator={true} config={azureConfig ? ({ ...azureConfig, register: false }) : null} />

        {this.renderCreateAccount()}
      </form>
    );
  }
}

LoginForm.propTypes = {
  isAuthenticated: PropTypes.bool
};

const passwordHelpBlock = function() {
  return (
    <div>
      <small id="passwordHelpBlock" className="form-text text-muted float-right">
        <Link to="/accounts/password/reset/">Reset your password</Link>
      </small>
      <div style={{ clear: "both" }} />
    </div>
  );
};

export const LoginField = function(props) {
  let { attribute, placeholder, helpBlock, fieldType = "text", onChange, value, errors } = props;

  // Get the validity and error message of this field
  const validClass = errors && errors.has(attribute) ? "is-invalid" : "";
  const error = validClass ? <div className="invalid-feedback">{errors.get(attribute).join(" ")}</div> : null;

  // Render
  return (
    <div className="form-group">
      <input
        className={`form-control form-control-sm ${validClass}`}
        placeholder={placeholder}
        type={fieldType}
        name={attribute}
        onChange={onChange}
        value={value}
      />
      {error}
      {helpBlock}
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
