import React from "react";
import { camelCaseToSentence } from "traec/utils/index";
import { Editor as TinyMCE } from "@tinymce/tinymce-react";
import DatePicker from "react-date-picker";
import Crypto from "crypto";
import Moment from "moment";
import CreatableSelect, { makeCreatableSelect } from "react-select/creatable";

export class BSForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tinymceContent: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTinyMceChange = this.handleTinyMceChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  renderItemErrors(item) {
    const errors = this.props.formErrors;
    if (errors && errors.hasOwnProperty(item.name)) {
      return <div className="invalid-feedback">{errors[item.name]}</div>;
    }
    return null;
  }

  renderHiddenInput(item, keyIndex) {
    const inputType = item.details.inputType || "text";
    const details = item.details;
    const value = details.value || "";
    return <input key={keyIndex} type={inputType} name={item.name} value={value} />;
  }

  renderTextInput(item, keyIndex) {
    const inputType = item.details.inputType || "text";
    const error = this.renderItemErrors(item);
    const validClass = error ? "is-invalid" : "";
    const details = item.details;
    const label = details.label || camelCaseToSentence(item.name);
    const value = details.value || "";
    const extraClass = details.class || "col";
    const rowBreakDiv = details.endRow ? <div className="w-100" /> : "";
    const labelBlock = details.label === "" ? "" : <label>{label}</label>;
    return (
      <React.Fragment key={keyIndex}>
        <div className={`form-group ${extraClass}`}>
          {labelBlock}
          <input
            list={"autocompleteOff"}
            type={inputType}
            className={`form-control ${validClass}`}
            placeholder={details.placeholder || ""}
            name={item.name}
            onChange={this.handleChange}
            value={value}
            formNoValidate={true}
            disabled={details.disabled || false}
          />
          {error}
        </div>
        {rowBreakDiv}
      </React.Fragment>
    );
  }

  renderTextAreaInput(item, keyIndex) {
    const inputType = item.details.inputType || "text";
    const rows = item.details.rows || "3";
    const error = this.renderItemErrors(item);
    const validClass = error ? "is-invalid" : "";
    const details = item.details;
    const label = details.label || camelCaseToSentence(item.name);
    const value = details.value || "";
    const extraClass = details.class || "col";
    const rowBreakDiv = details.endRow ? <div className="w-100" /> : "";
    const labelBlock = details.label === "" ? "" : <label>{label}</label>;
    let extra_attrs = details.disabled ? { disabled: true } : { disabled: true };
    return (
      <React.Fragment key={keyIndex}>
        <div className={`form-group ${extraClass}`}>
          {labelBlock}
          <textarea
            className={`form-control ${validClass}`}
            placeholder={details.placeholder || ""}
            rows={rows}
            name={item.name}
            onChange={this.handleChange}
            value={value}
            disabled={details.disabled || false}
          />
          {error}
        </div>
        {rowBreakDiv}
      </React.Fragment>
    );
  }

  handleTinyMceChange(value, itemName) {
    //console.log("HANDLING TNYMCE CHANGE", value, itemName)
    let e = {
      target: {
        value,
        name: itemName
      }
    };
    this.props.onChange(e);
  }

  renderTinyMCEInput(item, keyIndex) {
    const inputType = item.details.inputType || "text";
    const rows = item.details.rows || "3";
    const error = this.renderItemErrors(item);
    const validClass = error ? "is-invalid" : "";
    const details = item.details;
    const label = details.label || camelCaseToSentence(item.name);
    const value = details.value || "";
    const extraClass = details.class || "col";
    const rowBreakDiv = details.endRow ? <div className="w-100" /> : "";
    const labelBlock = details.label === "" ? "" : <label>{label}</label>;

    let initalContent = details.initialContent || value;
    //console.log("RENDERING TINYMCE COMPONENT", initalContent)

    return (
      <React.Fragment key={keyIndex}>
        <div className={`form-group ${extraClass}`}>
          {labelBlock}
          <TinyMCE
            name={item.name}
            initialValue={initalContent}
            init={details.config}
            onEditorChange={v => this.handleTinyMceChange(v, item.name)}
          />
          {error}
        </div>
        {rowBreakDiv}
      </React.Fragment>
    );
  }

  renderSelectInput(item, keyIndex) {
    const inputType = item.details.inputType || "text";
    const error = this.renderItemErrors(item);
    const validClass = error ? "is-invalid" : "";
    const details = item.details;
    const label = details.label || camelCaseToSentence(item.name);
    const value = details.value || "";
    const extraClass = details.class || "col";
    const rowBreakDiv = details.endRow ? <div className="w-100" /> : "";
    const labelBlock = details.label === "" ? "" : <label>{label}</label>;
    return (
      <React.Fragment key={keyIndex}>
        <div className={`form-group ${extraClass}`}>
          {labelBlock}
          <select
            className={`custom-select ${validClass}`}
            onChange={this.handleChange}
            name={item.name}
            value={value}
            disabled={details.disabled || false}
          >
            {details.options}
          </select>
          {error}
        </div>
        {rowBreakDiv}
      </React.Fragment>
    );
  }

  renderDateInput(item, keyIndex) {
    const inputType = item.details.inputType || "date";
    const error = this.renderItemErrors(item);
    const validClass = error ? "is-invalid" : "";
    const details = item.details;
    const label = details.label || camelCaseToSentence(item.name);
    const value = details.value || "";
    const extraClass = details.class || "col";
    const rowBreakDiv = details.endRow ? <div className="w-100" /> : "";
    const labelBlock = details.label === "" ? "" : <label>{label}</label>;
    const helpTextBlock = details.helpText ? (
      <small id={`${label}_help`} className="form-text text-muted">
        {details.helpText}
      </small>
    ) : null;
    return (
      <React.Fragment key={keyIndex}>
        <div className={`form-group ${extraClass}`}>
          {labelBlock}
          <br />
          <DatePicker
            className="form-control datepicker-fullwidth"
            disabled={details.disabled || false}
            onChange={value =>
              this.handleChange({
                target: {
                  value: value ? Moment.utc(Moment(value).format("YYYY-MM-DDTHH:mm:ss")).toDate() : null,
                  name: item.name
                }
              })
            }
            value={value ? new Date(value) : value}
          />
          {helpTextBlock}
        </div>
        {rowBreakDiv}
      </React.Fragment>
    );
  }

  renderCheckboxType(item, keyIndex) {
    const inputType = item.details.inputType || "checkbox";
    const error = this.renderItemErrors(item);
    const validClass = error ? "is-invalid" : "";
    const details = item.details;
    const label = details.label || camelCaseToSentence(item.name);
    const value = details.value || false;
    const extraClass = details.class || "col";
    const rowBreakDiv = details.endRow ? <div className="w-100" /> : "";
    const labelBlock = details.label === "" ? "" : <label>{label}</label>;
    let id = Crypto.randomBytes(4).toString("hex");
    return (
      <React.Fragment key={keyIndex}>
        <div className={`${extraClass} form-group align-middle`}>
          <div className={`form-check `}>
            <input
              className="form-check-input"
              type={inputType}
              name={item.name}
              checked={value}
              onChange={this.handleChange}
              id={id}
              disabled={details.disabled || false}
            />
            <label className="form-check-label" htmlFor={id}>
              {label}
            </label>
          </div>
        </div>
        {rowBreakDiv}
      </React.Fragment>
    );
  }

  renderCreateableSelect(item, keyIndex) {
    const details = item.details;
    const extraClass = details.class || "col";
    const rowBreakDiv = details.endRow ? <div className="w-100" /> : "";
    const label = details.label || camelCaseToSentence(item.name);
    const labelBlock = details.label === "" ? "" : <label>{label}</label>;
    const setNewValue = details.setNewValue || (d => d.value);
    const initValue = details.value || null;
    return (
      <React.Fragment key={keyIndex}>
        <div className={`form-group ${extraClass}`}>
          {labelBlock}
          <CreatableSelect
            isClearable
            placeholder="Start typing to select or create..."
            onChange={data => {
              let value = data ? data.value : null;
              if (data && data.__isNew__) {
                value = setNewValue(data);
              }
              console.log("Handling change to value", value, data);
              this.handleChange({
                target: {
                  name: item.name,
                  value: value
                }
              });
            }}
            options={details.options}
            defaultValue={((details.options || []).filter(i => i.value == initValue) || [])[0]}
          />
        </div>
        {rowBreakDiv}
      </React.Fragment>
    );
  }

  renderFormItem(item, keyIndex) {
    let inputType = item.details.inputType || "text";
    switch (inputType) {
      case "text":
        return this.renderTextInput(item, keyIndex);
      case "textarea":
        return this.renderTextAreaInput(item, keyIndex);
      case "select":
        return this.renderSelectInput(item, keyIndex);
      case "tinymce":
        return this.renderTinyMCEInput(item, keyIndex);
      case "date":
        return this.renderDateInput(item, keyIndex);
      case "hidden":
        return this.renderHiddenInput(item, keyIndex);
      case "checkbox":
        return this.renderCheckboxType(item, keyIndex);
      case "createableSelect":
        return this.renderCreateableSelect(item, keyIndex);
      default:
        return this.renderTextInput(item, keyIndex);
    }
  }

  renderFormItems() {
    return this.props.items.map((item, i) => this.renderFormItem(item, i));
  }

  render_non_field_errors() {
    const errors = this.props.formErrors;
    let non_field_errors = "";
    if (errors && errors.hasOwnProperty("non_field_errors") && errors.non_field_errors.length) {
      let error_list = errors.non_field_errors.map((error, i) => (
        <p key={i} className="help-block">
          {error}
        </p>
      ));
      non_field_errors = <div className="alert alert-danger">{error_list}</div>;
    }
    return non_field_errors;
  }

  render() {
    return (
      <div>
        {this.render_non_field_errors()}
        <div className="row">{this.renderFormItems()}</div>
      </div>
    );
  }
}
