import React from "react";

const modifyErrorMessages = errors => {
  if (!errors) return null;
  return errors.map((error, i) => <React.Fragment key={i}>{modifyErrorMessage(error)}</React.Fragment>);
};

const modifyErrorMessage = error => {
  if (error.startsWith("Captcha failed.")) {
    return "reCAPTCHA failed. Please click the reset reCAPTCHA button and try again." + error.slice(15, 37);
  } else if (error.startsWith("User with that email or username already exists")) {
    return (
      <span>
        User with that email or username already exists.
        <br />
        <b>
          You may be already registered? If so, try logging in <a href="/accounts/login">here</a>
        </b>
      </span>
    );
  } else {
    return error;
  }
};

function FormItem(props) {
  let { name, placeholder, help_block, values, onChangeHandler, errors, type = "text" } = props;

  // Get the value
  let value = values[name] || "";

  // Get the validity and error message of this field
  const validClass = errors && errors.has(name) ? "is-invalid" : "";
  const error = validClass ? <div className="invalid-feedback">{modifyErrorMessages(errors.get(name))}</div> : null;

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

export const FormNonFieldErrors = ({ errors }) => {
  const attr = "non_field_errors";
  if (errors && errors.has(attr)) {
    //console.log("NON_FIELD_ERRORS", errors);
    return <div className="alert alert-danger">{modifyErrorMessages(errors.get(attr))}</div>;
  }
  return "";
};

export const mandatoryFieldProps = [
  { name: "first_name", placeholder: "First Name" },
  { name: "last_name", placeholder: "Last Name" },
  { name: "email", placeholder: "Email", type: "email" },
  { name: "username", placeholder: "Username or Email" },
  { name: "password1", placeholder: "Password", type: "password" },
  { name: "password2", placeholder: "Password (again)", type: "password" }
];

export const FormFields = props => {
  let { fieldProps } = props;
  return fieldProps.map((_props, i) => <FormItem key={i} {...props} {..._props} />);
};

export const FormMetaFields = props => {
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
};
