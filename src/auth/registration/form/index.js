import React from "react";
import { connect } from "react-redux";
import { postRegistration } from "../../_redux/actionCreators";
import { FormFields, FormMetaFields, FormNonFieldErrors, mandatoryFieldProps } from "./formItems";
import { getRecaptchaSiteKey, ReloadRecaptcha, TraecRecaptcha } from "./recaptcha";
// import AzureSSOButton from "../../azure";
import AzureSSOButton from "traec-react/auth/azure";

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
  const [recaptchaState, setRecaptcha] = React.useState(isIP(location.hostname) ? "localsite" : null);
  const [recaptchaInstance, setRecaptchaInstance] = React.useState(null);

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
    <form className="form" onSubmit={onSubmit}>
      <FormNonFieldErrors errors={errors} />
      <FormFields fieldProps={mandatoryFieldProps} values={state} errors={errors} onChangeHandler={onChange} />
      <FormMetaFields fieldProps={metaFieldProps} values={metaJSON} onChangeHandler={onChangeMeta} />
      <TraecRecaptcha
        show={state.showRecaptcha}
        setRecaptcha={setRecaptcha}
        setRecaptchaInstance={setRecaptchaInstance}
        recaptchaExtra={recaptchaExtra}
      />
      <ReloadRecaptcha setRecaptchaInstance={setRecaptchaInstance} recaptchaInstance={recaptchaInstance} />
      <RegisterButton gRecaptchaResponse={recaptchaState} />

      <AzureSSOButton showTopSeparator={true} config={azureConfig} register={true} />
    </form>
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
