import React from "react";
import { camelCaseToSentence } from "traec/utils/index";
import { Editor as TinyMCE } from "@tinymce/tinymce-react";
import DatePicker from "react-date-picker";
import Crypto from "crypto";
import Moment from "moment";
import CreatableSelect from "react-select/creatable";
import { ErrorBoundary } from "../../errors/handleError";

function ItemLabel({ label }) {
  if (label == null) {
    return null;
  }
  return <label>{label}</label>;
}

function ItemHelp({ label, text }) {
  if (!text) {
    return null;
  }
  return (
    <small id={`${label}_help`} className="form-text text-muted">
      {text}
    </small>
  );
}

const validClass = error => (error ? "is-invalid" : "");

function TextInput(props) {
  // Mandatory props
  let { name, error, handleChange } = props;
  // Optional props
  let {
    label = camelCaseToSentence(name),
    groupExtraClass = "",
    value = "",
    inputType = "text",
    placeholder = "",
    helpText = "",
    disabled = false
  } = props;
  // Render the component
  return (
    <ErrorBoundary>
      <div className={`form-group ${groupExtraClass}`}>
        <ItemLabel label={label} />
        <input
          list={"autocompleteOff"}
          type={inputType}
          className={`form-control ${validClass(error)}`}
          placeholder={placeholder}
          name={name}
          onChange={handleChange}
          value={value}
          formNoValidate={true}
          disabled={disabled}
        />
        <ItemHelp text={helpText} label={name} />
        <ItemErrors error={error} />
        {error}
      </div>
    </ErrorBoundary>
  );
}

function TextAreaInput(props) {
  let { name, error, handleChange } = props;
  let {
    label = camelCaseToSentence(name),
    rows = "3",
    groupExtraClass = "col",
    placeholder = "",
    value = "",
    disabled = false
  } = props;
  return (
    <ErrorBoundary>
      <div className={`form-group ${groupExtraClass}`}>
        <ItemLabel label={label} />
        <textarea
          className={`form-control ${validClass(error)}`}
          placeholder={placeholder}
          rows={rows}
          name={name}
          onChange={handleChange}
          value={value}
          disabled={disabled}
        />
        <ItemErrors error={error} />
      </div>
    </ErrorBoundary>
  );
}

function TinyMCEInput(props) {
  let { name, error, handleChange } = props;
  let { label = camelCaseToSentence(name), config = {}, groupExtraClass = "col", initialContent = "" } = props;

  return (
    <ErrorBoundary>
      <div className={`form-group ${groupExtraClass}`}>
        <ItemLabel label={label} />
        <TinyMCE
          name={name}
          initialValue={initialContent}
          init={config}
          onEditorChange={v =>
            handleChange({
              target: {
                value: v,
                name: name
              }
            })
          }
        />
        <ItemErrors error={error} />
      </div>
    </ErrorBoundary>
  );
}

function SelectInput(props) {
  let { name, error, handleChange, options } = props;
  let { label = camelCaseToSentence(name), value = "", groupExtraClass = "col", disabled = false } = props;

  return (
    <ErrorBoundary>
      <div className={`form-group ${groupExtraClass}`}>
        <ItemLabel label={label} />
        <select
          className={`custom-select ${validClass(error)}`}
          onChange={handleChange}
          name={name}
          value={value == null ? "" : value}
          disabled={disabled}
        >
          {options}
        </select>
        <ItemErrors error={error} />
      </div>
    </ErrorBoundary>
  );
}

function DateInput(props) {
  let { name, error, handleChange } = props;
  let {
    label = camelCaseToSentence(name),
    value = "",
    groupExtraClass = "col",
    helpText = "",
    disabled = false
  } = props;

  return (
    <ErrorBoundary>
      <div className={`form-group ${groupExtraClass}`}>
        <ItemLabel label={label} />
        <br />
        <DatePicker
          className="form-control datepicker-fullwidth"
          disabled={disabled}
          onChange={value =>
            handleChange({
              target: {
                value: value ? Moment.utc(Moment(value).format("YYYY-MM-DDTHH:mm:ss")).toDate() : null,
                name: name
              }
            })
          }
          value={value ? new Date(value) : value}
        />
        <ItemHelp text={helpText} label={name} />
      </div>
    </ErrorBoundary>
  );
}

function CreatableSelectField(props) {
  let { name, error, handleChange, options } = props;
  let {
    label = camelCaseToSentence(name),
    value: initValue = "",
    groupExtraClass = "col",
    setNewValue = d => d.value
  } = props;

  return (
    <ErrorBoundary>
      <div className={`form-group ${groupExtraClass}`}>
        <ItemLabel label={label} />
        <CreatableSelect
          isClearable
          placeholder="Start typing to select or create..."
          onChange={data => {
            let value = data ? data.value : null;
            if (data && data.__isNew__) {
              value = setNewValue(data);
            }
            console.log("Handling change to value", value, data);
            handleChange({ target: { name, value } });
          }}
          options={options}
          defaultValue={((options || []).filter(i => i.value == initValue) || [])[0]}
        />
      </div>
    </ErrorBoundary>
  );
}

function CheckboxField(props) {
  let { name, error, handleChange } = props;
  let {
    label = camelCaseToSentence(name),
    inputType = "checkbox",
    groupExtraClass = "col",
    value = false,
    disabled = false
  } = props;
  let id = Crypto.randomBytes(4).toString("hex");
  return (
    <ErrorBoundary>
      <div className={`${groupExtraClass} form-group align-middle`}>
        <div className={`form-check `}>
          <input
            className="form-check-input"
            type={inputType || "checkbox"}
            name={name}
            checked={value}
            onChange={handleChange}
            id={id}
            disabled={disabled || false}
          />
          <label className="form-check-label" htmlFor={id}>
            {label}
          </label>
        </div>
      </div>
    </ErrorBoundary>
  );
}

function HiddenInput(props) {
  let { name } = props;
  let { inputType = "text", value = "" } = props;
  return <input type={inputType} name={name} value={value} />;
}

const FIELD_MAP = {
  text: TextInput,
  textarea: TextAreaInput,
  select: SelectInput,
  tinymce: TinyMCEInput,
  date: DateInput,
  hidden: HiddenInput,
  checkbox: CheckboxField,
  createableSelect: CreatableSelectField
};

const getErrorText = (name, errors) => {
  if (errors && errors.hasOwnProperty(name)) {
    return errors[name];
  }
  return null;
};

function ItemErrors({ error }) {
  return error ? <div className="invalid-feedback">{error}</div> : null;
}

function RowBreak({ endRow }) {
  return endRow ? <div className="w-100" /> : null;
}

function FormField(props) {
  let { item, errors } = props;
  if (!item || !item.details) {
    return null;
  }
  let FieldComponent = FIELD_MAP[item.details.inputType || "text"] || TextInput;
  let errorText = getErrorText(item.name, errors);
  return (
    <ErrorBoundary>
      <FieldComponent
        {...props}
        {...item.details}
        validClass={errorText ? "is-invalid" : ""}
        error={errorText}
        groupExtraClass={item.details.class || "col"}
        name={item.name}
        label={item.details.label || camelCaseToSentence(item.name)}
      />
      <RowBreak endRow={item.details.endRow} />
    </ErrorBoundary>
  );
}

function FormFields(props) {
  let { items } = props;
  return items.map((item, i) => <FormField key={i} {...props} item={item} />);
}

function NonFieldErrors(props) {
  const { formErrors: errors } = props;
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

export function BSForm(props) {
  let { items, onChange, formErrors: errors } = props;

  const changeHandler = e => {
    return onChange ? onChange(e) : null;
  };

  return (
    <div>
      <NonFieldErrors errors={errors} />
      <div className="row">
        <FormFields items={items} errors={errors} handleChange={changeHandler} />
      </div>
    </div>
  );
}
