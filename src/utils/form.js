import Im from "traec/immutable";
import React from "react";
import { BSForm } from "./bootstrap";
import { connect } from "react-redux";
import { fetchToState, toggleForm } from "traec/redux/actionCreators";

function eqSet(as, bs) {
  if (as.size !== bs.size) return false;
  for (var a of as) if (!bs.has(a)) return false;
  return true;
}

class BaseForm extends React.Component {
  constructor(props) {
    super(props);
    let { fields, initFields, forceShowForm } = props;

    this.state = {
      formFields: this.initialiseFormFields(fields, initFields),
      formErrors: null,
      forceShowForm: forceShowForm || false,
      requiresRefresh: false,
      pending: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let { fields, initFields, showForm, reInit } = this.props;
    // Check if the fields are different
    let sameFields = eqSet(new Set(Object.keys(prevState.formFields)), new Set(Object.keys(fields)));
    // Check if the
    if (!sameFields || (!prevProps.showForm && showForm)) {
      let formFields = this.initialiseFormFields(fields, initFields);
      console.log("Setting new form-fields in BaseForm", !sameFields, !prevProps.showForm && showForm, formFields);
      this.setState({ formFields });
    }
  }

  initialiseFormFields(fields, initFields) {
    // If there are no initialFields then just return projectFields
    if (!initFields) {
      return fields;
    }

    if (!Im.isImmutable(initFields)) {
      initFields = Im.fromJS(initFields);
    }

    // Otherwise step through the projectFields and get what you can from initFields
    let initialFormFields = fields;

    for (let [key, value] of Object.entries(fields)) {
      if (value === null) {
        continue;
      } // Skip if the value is null
      let initValue = typeof initFields.get(key) !== "undefined" ? initFields.get(key) : fields[key].value;
      // Set the initialContent of the TinyMCE to match the initValue
      if ((initialFormFields[key] || {}).inputType == "tinymce") {
        initialFormFields[key].initialContent = initValue;
      }
      // Set the value of everything to initValue
      initialFormFields[key].value = initValue;
    }

    return initialFormFields;
  }

  fetchParams() {
    let { params, fetchParams } = this.props;
    let p = params ? params.fetchParams : fetchParams;
    return p || {};
  }

  stateParams() {
    let { params, stateParams } = this.props;
    let p = params ? params.stateParams : stateParams;
    return p || {};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const newItem = nextProps.newItem;
    // In case the form fields have changed
    let newState = prevState;

    // Load any errors into the state
    if (newItem && newItem.get("errors")) {
      let errors = newItem.get("errors");

      // put any unmatched error keys into non_field_errors
      let fields = Object.keys(prevState.formFields);
      fields = Im.List(fields).reduce((a, k) => {
        a[k] = 1;
        return a;
      }, {});
      let errorMsgs = Im.List(errors.keys())
        .filter(key => !fields[key] && key !== "non_field_errors")
        .map(key => `${key}: ${errors.get(key).toJS()}`);
      // Get existing non-field errors
      let non_field_errors = (errors.get("non_field_errors") || Im.List()).concat(errorMsgs);
      errors = errors.setIn(["non_field_errors"], non_field_errors);

      console.log("errors", errors);
      // Errors in the form - save errors to state
      //this.setState({formErrors: errors.toJS()})
      Object.assign(newState, { formErrors: errors.toJS() });
    }

    return newState;
  }

  stripFormFields(fields) {
    // Eliminate field keys that have undefined (null) configs
    let _fields = {};
    for (let [key, value] of Object.entries(fields)) {
      if (value) {
        _fields[key] = value;
      }
    }
    return _fields;
  }

  getFormFields() {
    return this.props.stateFormFields || this.state.formFields;
  }

  onChange(e) {
    if (this.props.onChange) {
      return this.props.onChange(e);
    }
    let stateFormFields = this.getFormFields();
    let value = e.target.type == "checkbox" ? e.target.checked : e.target.value;
    let formFields = Object.assign({}, stateFormFields, {
      [e.target.name]: Object.assign({}, stateFormFields[e.target.name], { value })
    });
    this.setState({ formFields });
    // Hook in an action post-change
    if (this.props.postChangeHook) {
      this.props.postChangeHook(e, formFields, this.setState);
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let { prePostHook, dispatchHandler, dispatch } = this.props;
    const formFields = this.stripFormFields(this.getFormFields());
    let post = {};
    Object.keys(formFields).map(key => {
      if (formFields[key].value) {
        post[key] = formFields[key].value;
      }
    });
    post = prePostHook ? prePostHook(post) : post;
    let params = {
      fetchParams: this.fetchParams(),
      stateParams: this.stateParams()
    };
    // Wrapp the postSuccessHook to set pending to false again
    let _postSuccessHook = params.fetchParams.postSuccessHook || (() => {});
    params.fetchParams.postSuccessHook = data => {
      _postSuccessHook(data);
      this.setState({ pending: false });
    };

    // Wrapp the postSuccessHook to set pending to false again
    let _postFailureHook = params.fetchParams.postFailureHook || (() => {});
    params.fetchParams.postFailureHook = data => {
      _postFailureHook(data);
      this.setState({ pending: false });
    };

    // Dispatch the action (disable the submit button at the same time)
    let action = fetchToState(params, post);
    this.setState({ pending: true });
    if (dispatchHandler) {
      dispatchHandler(dispatch, action);
    } else {
      dispatch(action);
    }
  }

  render_close() {
    if (this.props.forceShowForm) {
      return null;
    }
    return (
      <button type="button" onClick={this.props.toggleForm} className="btn btn-sm btn-default float-left">
        Close
      </button>
    );
  }

  render_submit() {
    let { disabled, submitBtnText, submitBtnStyle = "btn-primary" } = this.props;
    let { pending } = this.state;
    if (disabled) {
      return null;
    }
    return (
      <button type="submit" disabled={pending} className={`btn btn-sm ${submitBtnStyle} float-right`}>
        {pending ? (
          <div className="spinner-border spinner-border-sm text-light" role="status" />
        ) : (
          submitBtnText || "Submit"
        )}
      </button>
    );
  }

  render() {
    let { showForm, forceShowForm, disabled, hideUnderline } = this.props;
    if (!showForm && !forceShowForm) {
      return "";
    }

    let stateFormFields = this.stripFormFields(this.getFormFields());
    let formFields = Object.keys(stateFormFields).map(key => {
      return {
        name: key,
        details: stateFormFields[key]
      };
    });

    // disable inputs if disabled prop is set
    if (disabled) {
      for (let item of formFields) {
        // Create new object to avoid mutating original details
        item.details = { ...item.details, disabled: true };
      }
    }
    return (
      <div className="col-sm-12 ">
        <form onSubmit={e => this.onSubmit(e)}>
          <BSForm items={formFields} formErrors={this.state.formErrors} onChange={this.onChange} />
          {this.render_close()}
          {this.render_submit()}
          <div style={{ clear: "both" }} />
          {hideUnderline ? null : <hr />}
        </form>
      </div>
    );
  }
}

export { BaseForm };

// Export a connected base form element

const mapStateToProps = (state, ownProps) => {
  let { params, stateParams } = ownProps;
  const s = params ? params.stateParams : stateParams || {};
  return {
    newItem: state.getInPath(`entities.${s.formObjPath}`),
    showForm: state.getInPath(`entities.${s.formVisPath}`)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let { params, stateParams } = ownProps;
  let s = params ? params.stateParams : stateParams || {};
  return {
    postForm: (body, params) => {
      dispatch(fetchToState(params, body));
    },
    toggleForm:
      ownProps.toggleForm ||
      (() => {
        dispatch(toggleForm(s));
      }),
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseForm);
