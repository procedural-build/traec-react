import React from "react";
import Traec from "traec"

export const renderItem = function(attr, placeholder, helpBlock, fieldType = "text") {
  // Get the validity and error message of this field
  const errors = this.props.errors;
  const validClass = errors?.has(attr) ? "is-invalid" : "";
  let _errors = errors?.get(attr)
  const error = validClass ? (
    <div className="invalid-feedback">
      {Traec.Im.List.isList(_errors) ? (<ul style={{marginLeft: "-1em"}}>{_errors.map((item, i) => (<li key={i}>{item}</li>))}</ul>) : _errors.join(" ")}
    </div>
  ) : null;
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
      {helpBlock}
    </div>
  );
};

export const renderNonFieldErrors = function(errors) {
  const attr = "non_field_errors";
  if (errors && errors.has(attr)) {
    //console.log("NON_FIELD_ERRORS", errors)
    let _errors = errors.get(attr)
    if (Traec.Im.List.isList(_errors)) {
      _errors = (<ul style={{marginLeft: "-1em"}}>{_errors.map((item, i) => (<li key={i}>{item}</li>))}</ul>)
    }
    return <div className="alert alert-danger form-control-sm">{_errors}</div>;
  }
  return "";
};
