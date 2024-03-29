import React, { useState } from "react";
import { connect } from "react-redux";
import { postRegistration } from "../../_redux/actionCreators";
import { FormFields, FormMetaFields, FormNonFieldErrors, mandatoryFieldProps } from "./formItems";
import { getRecaptchaSiteKey, ReloadRecaptcha, TraecRecaptcha } from "./recaptcha";
import AzureSSOButton from "../../azure";

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
  let { dispatch, errors, metaFieldProps, initMeta, recaptchaExtra, azureConfig } = props;
  const [metaJSON, setMetaJSON] = useState(initMeta || {});
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    username: props.email || "",
    email: props.email || "",
    password1: "",
    password2: "",
    errors: null,
    showRecaptcha: !isIP(location.hostname)
  });
  const [recaptchaState, setRecaptcha] = useState(isIP(location.hostname) ? "localsite" : null);
  const [recaptchaInstance, setRecaptchaInstance] = useState(null);

  const onChange = e => {
    if (!e.target) {
      return null;
    }
    if (e.target.name === "email") {
      setState({
        ...state,
        [e.target.name]: e.target.value,
        username: e.target.value
      });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
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
      meta_json: { ...metaJSON },
      gRecaptchaResponse: recaptchaState,
      name: "",
      gRecaptchaSiteKey
    };

    dispatch(postRegistration(post));
  };

  return (
    <div className="row">
      <div className="col">
        <form className="form" onSubmit={onSubmit}>
          <FormNonFieldErrors errors={errors} />
          <FormFields fieldProps={mandatoryFieldProps} values={state} errors={errors} onChangeHandler={onChange} />
          <div style={{ marginTop: "-1em", marginLeft: "0.25em" }} className="form-group">
            <small className="text-muted">
              <b>
                All passwords must contain at least 12 characters, one uppercase, one special character and one numeric
                character. It also cannot be similar to parts of your name or email address.
              </b>
            </small>
          </div>
          <FormMetaFields fieldProps={metaFieldProps} values={metaJSON} onChangeHandler={onChangeMeta} />
          <TraecRecaptcha
            show={true || state.showRecaptcha}
            setRecaptcha={setRecaptcha}
            setRecaptchaInstance={setRecaptchaInstance}
            recaptchaExtra={recaptchaExtra}
          />
          <ReloadRecaptcha setRecaptchaInstance={setRecaptchaInstance} recaptchaInstance={recaptchaInstance} />
          <RegisterButton gRecaptchaResponse={recaptchaState} />
        </form>
      </div>
      <div className="col">
        <AzureSSOButton 
          showTopSeparator={true} 
          config={azureConfig ? { ...azureConfig, register: true } : null} 
        />
      </div>
    </div>
  );
};

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
