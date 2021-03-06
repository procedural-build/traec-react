import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Recaptcha from "react-recaptcha";
import { postRegistration } from "../_redux/actionCreators";

/* TODO: This may be changed to make use of a csrftoken
const csrftoken = Cookies.get('csrftoken');
xhr.setRequestHeader("X-CSRFToken", csrftoken);  // For AJAX request
<input type='hidden' name='csrfmiddlewaretoken' value={$csrftoken} />

For now we have switched off csrftoken checks on the server for 
registration and activation api endpoints only.
*/

// GOOGLE DEVELOPMENT SITE KEY
//const gRecaptchaSiteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
// sustainabilitytool.net SITE KEY
//const gRecaptchaSiteKey = "6LesrYYUAAAAAOSE244oWzmKo18m0YFuC-o4U9il"

export const getRecaptchaSiteKey = () => {
  const hostname = location.hostname;
  if (hostname.endsWith("sustainabilitytool.net")) {
    return "6LesrYYUAAAAAOSE244oWzmKo18m0YFuC-o4U9il";
  } else if (hostname.endsWith("sustainabilitytool.com")) {
    return "6LfJt4sUAAAAAIGNjKs8OeA3gmDAYXmeiUHMtp2o";
  } else if (hostname.endsWith("ods-track.com")) {
    return "6LdViicUAAAAADRyFSQpSwJ3OBPjwC_jcrJizqsx";
  } else if (hostname.endsWith("abate.dk")) {
    return "6Lc1i8gUAAAAAIhmFXMivq-k_my-9t4JxejzWpor";
  } else if (hostname.endsWith("procedural.build")) {
    return "6LcpY-MUAAAAAGsdHWQsRy7VJN1iydQD95e1RRnA";
  } else if (isIP(hostname)) {
    return "localsite";
  } else {
    return "6LcbH3wUAAAAANJthLG_viHtCcXrDnXJ_kzH8Nga";
  }
};

const isIP = hostname => {
  console.log("HOST", hostname);
  if (hostname === "localhost") {
    return true;
  }
  let IPRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

  try {
    return !!hostname.match(IPRegex)[0];
  } catch (e) {
    return false;
  }
};

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password1: "",
      password2: "",
      errors: null,
      gRecaptchaResponse: null
    };

    // Bound methods
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.verifyRecaptchaCallback = this.verifyRecaptchaCallback.bind(this);
  }

  componentDidMount() {
    if (isIP(location.hostname)) {
      this.setState({ gRecaptchaResponse: "localsite" });
    }
  }

  onChange(e) {
    if (e.target.name === "email") {
      this.setState({
        [e.target.name]: e.target.value,
        username: e.target.value
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    let gRecaptchaSiteKey = getRecaptchaSiteKey();
    const post = {
      ...this.state,
      name: "",
      gRecaptchaSiteKey
    };

    // Log the post (for debugging registration issues)
    console.log("Registration form submitted", post);

    // Call action when form submitted
    this.props.dispatch(postRegistration(post));
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
          disabled={attr === "username" ? "disabled" : ""}
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
      //console.log("NON_FIELD_ERRORS", errors);
      return <div className="alert alert-danger">{this.modifyErrorMessage(errors.get(attr))}</div>;
    }
    return "";
  }

  modifyErrorMessage(errors) {
    let errorMessages = errors.map(error => {
      if (error.startsWith("Captcha failed.")) {
        return "reCAPTCHA failed. Please click the reset reCAPTCHA button and try again." + error.slice(15, 37);
      } else {
        return error;
      }
    });
    return errorMessages;
  }

  verifyRecaptchaCallback(response) {
    console.log("Verifying Re-captcha response", response);
    this.setState({ gRecaptchaResponse: response });
  }

  renderRecaptcha() {
    if (isIP(location.hostname)) {
      return null;
    }
    return (
      <Recaptcha
        ref={e => {
          this.recaptchaInstance = e;
        }}
        sitekey={getRecaptchaSiteKey()}
        render="explicit"
        verifyCallback={response => {
          this.verifyRecaptchaCallback(response);
        }}
        onloadCallback={() => {
          console.log("ONLOAD CALLBACK");
        }}
      />
    );
  }

  render() {
    let isAuthWarning = this.props.isAuthenticated ? <p>Logged in</p> : "";

    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.render_non_field_errors()}
        {this.render_item("first_name", "First Name")}
        {this.render_item("last_name", "Last Name")}
        {this.render_item("email", "E-mail")}
        {this.render_item("username", "Username")}
        {this.render_item("password1", "Password", "", "password")}
        {this.render_item("password2", "Password (again)", "", "password")}
        {this.renderRecaptcha()}
        <div className="form-group">
          <button className="btn btn-sm btn-primary btn-block" disabled={!this.state.gRecaptchaResponse} type="submit">
            Register
          </button>
        </div>
        <div className="m-0 p-0 float-right">
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              console.log("Reloading Recaptcha");
              this.recaptchaInstance.reset();
              this.setState({ gRecaptchaResponse: null });
            }}
          >
            Reload reCaptcha
          </a>
        </div>
      </form>
    );
  }
}

RegistrationForm.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.getInPath("auth.isAuthenticated"),
  errors: state.getInPath("auth.registration.errors"),
  redirect: state.getInPath("auth.registration.redirect")
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
