import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { postLogin, verifyToken } from "./_redux/actions";

export class LoginForm extends React.Component {
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

  renderNonFieldErrors() {
    const attr = "non_field_errors";
    const errors = this.props.errors;
    if (errors && errors.hasOwnProperty(attr)) {
      //console.log("NON_FIELD_ERRORS", errors)
      return <div className="alert alert-danger form-control-sm">{errors.get(attr)}</div>;
    }
    return "";
  }

  renderCreateAccount() {
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
    if (this.props.isAuthenticated) {
      return this.renderLoggedIn();
    }
    let errors = this.props.errors;
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.renderNonFieldErrors()}
        <LoginField
          attribute="username"
          placeholder="Username"
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
  const validClass = errors && errors.hasOwnProperty(attribute) ? "is-invalid" : "";
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
