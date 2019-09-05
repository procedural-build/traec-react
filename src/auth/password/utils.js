import React from "react";

export const renderItem = function(attr, placeholder, helpBlock, fieldType = "text") {
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
      {helpBlock}
    </div>
  );
};

export const renderNonFieldErrors = function(errors) {
  const attr = "non_field_errors";
  if (errors && errors.has(attr)) {
    //console.log("NON_FIELD_ERRORS", errors)
    return <div className="alert alert-danger form-control-sm">{errors.get(attr)}</div>;
  }
  return "";
};
