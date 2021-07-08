import React from "react";
import { connect } from "react-redux";
import { postRegistration } from "../../_redux/actionCreators";
import { FormFields, FormMetaFields, FormNonFieldErrors, mandatoryFieldProps } from "./formItems";
import { getRecaptchaSiteKey, ReloadRecaptcha, TraecRecaptcha } from "./recaptcha";

export const isIP = hostname => {
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

const RegistrationForm = props => {
  let { dispatch, errors, metaFieldProps, initMeta, recaptchaExtra } = props;
  const [metaJSON, setMetaJSON] = React.useState(initMeta || {});
  const [state, setState] = React.useState({
    first_name: "",
    last_name: "",
    username: props.email || "",
    email: props.email || "",
    password1: "",
    password2: "",
    errors: null,
    showRecaptcha: !isIP(location.hostname)
  });
  const [recaptchaState, setRecaptcha] = React.useState({});

  const onChange = e => {
    if (!e.target) {
      return null;
    }
    if (e.target.name === "email") {
      setState({
        [e.target.name]: e.target.value,
        username: e.target.value
      });
    } else {
      setState({ [e.target.name]: e.target.value });
    }
  };

  const onChangeMeta = e => {
    if (!e.target) {
      return null;
    }
    setMetaJSON({
      ...metaJSON,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    let gRecaptchaSiteKey = getRecaptchaSiteKey();
    const post = {
      ...state,
      name: "",
      gRecaptchaSiteKey
    };

    dispatch(postRegistration(post));
  };

  let recaptchaInstance = null;

  return (
    <form className="form" onSubmit={onSubmit}>
      <FormNonFieldErrors errors={errors} />
      <FormFields fieldProps={mandatoryFieldProps} values={state} errors={errors} onChangeHandler={onChange} />
      <FormMetaFields fieldProps={metaFieldProps} values={metaJSON} onChangeHandler={onChangeMeta} />
      <TraecRecaptcha
        show={state.showRecaptcha}
        setRecaptcha={setRecaptcha}
        recaptchaInstance={recaptchaInstance}
        recaptchaExtra={recaptchaExtra}
      />
      <RegisterButton gRecaptchaResponse={recaptchaState} />
      <ReloadRecaptcha setRecaptcha={setRecaptcha} recaptchaInstance={recaptchaInstance} />
    </form>
  );
};

class RegistrationFormOld extends React.Component {
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
      meta_json: props.initMeta || {},
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
    let { errors, metaFieldProps } = this.props;
    let { gRecaptchaResponse, showRecaptcha, meta_json } = this.state;

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
        <TraecRecaptcha show={showRecaptcha} setRecaptcha={setRecaptcha} recaptchaInstance={recaptchaInstance} />
        <RegisterButton gRecaptchaResponse={gRecaptchaResponse} />
        <ReloadRecaptcha setRecaptcha={setRecaptcha} recaptchaInstance={recaptchaInstance} />
      </form>
    );
  }
}

const RegisterButton = props => {
  let { gRecaptchaResponse } = props;

  return (
    <div className="form-group">
      <button className="btn btn-sm btn-primary btn-block" disabled={!gRecaptchaResponse} type="submit">
        Register
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.getInPath("auth.isAuthenticated"),
  errors: state.getInPath("auth.registration.errors"),
  redirect: state.getInPath("auth.registration.redirect")
});

export default connect(mapStateToProps)(RegistrationForm);
