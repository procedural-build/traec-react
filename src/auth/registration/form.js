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

const modifyErrorMessage = errors => {
  let errorMessages = errors.map(error => {
    if (error.startsWith("Captcha failed.")) {
      return "reCAPTCHA failed. Please click the reset reCAPTCHA button and try again." + error.slice(15, 37);
    } else {
      return error;
    }
  });
  return errorMessages;
};

function FormItem(props) {
  let { name, placeholder, help_block, values, onChangeHandler, errors, type = "text" } = props;

  // Get the value
  let value = values[name] || "";

  // Get the validity and error message of this field
  const validClass = errors && errors.has(name) ? "is-invalid" : "";
  const error = validClass ? <div className="invalid-feedback">{errors.get(name).join(" ")}</div> : null;

  // Render
  return (
    <div className="form-group">
      <input
        className={`form-control form-control-sm ${validClass}`}
        disabled={name === "username" ? "disabled" : ""}
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={onChangeHandler}
        value={value}
      />
      {error}
      {help_block}
    </div>
  );
}

function FormNonFieldErrors({ errors }) {
  const attr = "non_field_errors";
  if (errors && errors.has(attr)) {
    //console.log("NON_FIELD_ERRORS", errors);
    return <div className="alert alert-danger">{modifyErrorMessage(errors.get(attr))}</div>;
  }
  return "";
}

const mandatoryFieldProps = [
  { name: "first_name", placeholder: "First Name" },
  { name: "last_name", placeholder: "Last Name" },
  { name: "email", placeholder: "Email", type: "email" },
  { name: "username", placeholder: "Username" },
  { name: "password1", placeholder: "Password", type: "password" },
  { name: "password2", placeholder: "Password (again)", type: "password" }
];

function FormFields(props) {
  let { fieldProps } = props;
  return fieldProps.map((_props, i) => <FormItem key={i} {...props} {..._props} />);
}

function FormMetaFields(props) {
  let { fieldProps } = props;
  if (!fieldProps) {
    return null;
  }
  return (
    <React.Fragment>
      <hr />
      <p>
        <b>Additional Information</b>
      </p>
      <FormFields {...props} />
      <hr />
    </React.Fragment>
  );
}

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      username: props.email || "",
      email: props.email || "",
      password1: "",
      password2: "",
      errors: null,
      meta_json: {},
      gRecaptchaResponse: null,
      showRecaptcha: !isIP(location.hostname)
    };

    // Bound methods
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeMeta = this.onChangeMeta.bind(this);
  }

  componentDidMount() {
    if (isIP(location.hostname)) {
      this.setState({ gRecaptchaResponse: "localsite" });
    }
  }

  onChange(e) {
    if (!e.target) {
      return null;
    }
    if (e.target.name === "email") {
      this.setState({
        [e.target.name]: e.target.value,
        username: e.target.value
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  onChangeMeta(e) {
    if (!e.target) {
      return null;
    }
    let { meta_json } = this.state;
    this.setState({
      meta_json: {
        ...meta_json,
        [e.target.name]: e.target.value
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let gRecaptchaSiteKey = getRecaptchaSiteKey();
    const post = {
      ...this.state,
      name: "",
      gRecaptchaSiteKey
    };

    // Call action when form submitted
    console.log("POSTing user registration data", post);
    this.props.dispatch(postRegistration(post));
  }

  render() {
    let { isAuthenticated, errors, metaFieldProps } = this.props;
    let { gRecaptchaResponse, showRecaptcha, meta_json } = this.state;

    let isAuthWarning = isAuthenticated ? <p>Logged in</p> : "";

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <FormNonFieldErrors errors={errors} />
        <FormFields
          fieldProps={mandatoryFieldProps}
          values={this.state}
          errors={errors}
          onChangeHandler={this.onChange}
        />
        <FormMetaFields fieldProps={metaFieldProps} values={meta_json} onChangeHandler={this.onChangeMeta} />
        {showRecaptcha ? (
          <Recaptcha
            ref={e => {
              this.recaptchaInstance = e;
            }}
            sitekey={getRecaptchaSiteKey()}
            render="explicit"
            verifyCallback={response => {
              console.log("Verifying Re-captcha response", response);
              this.setState({ gRecaptchaResponse: response });
            }}
            onloadCallback={() => {
              console.log("ONLOAD CALLBACK");
            }}
          />
        ) : null}
        <div className="form-group">
          <button className="btn btn-sm btn-primary btn-block" disabled={!gRecaptchaResponse} type="submit">
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

export default connect(mapStateToProps)(RegistrationForm);
