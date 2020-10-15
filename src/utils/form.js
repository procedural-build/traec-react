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
      forceShowForm: forceShowForm || false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let { fields, initFields, showForm } = this.props;
    // Check if the fields are different
    let sameFields = eqSet(new Set(Object.keys(prevState.formFields)), new Set(Object.keys(fields)));
    // Check if the
    if (!sameFields || (!prevProps.showForm && showForm)) {
      this.setState({
        formFields: this.initialiseFormFields(fields, initFields)
      });
    }
  }

  initialiseFormFields(fields, initFields) {
    // If there are no initialFields then just return projectFields
    if (!initFields) {
      return fields;
    }
    // Otherwise step through the projectFields and get what you can from initFields
    let initialFormFields = fields;

    for (let key of Object.keys(fields)) {
      initialFormFields[key].value =
        typeof initFields.get(key) !== "undefined" ? initFields.get(key) : fields[key].value;
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

  getFormFields() {
    return this.props.stateFormFields || this.state.formFields;
  }

  onChange(e) {
    if (this.props.onChange) {
      return this.props.onChange(e);
    }
    let stateFormFields = this.getFormFields();
    let formFields = Object.assign({}, stateFormFields, {
      [e.target.name]: Object.assign({}, stateFormFields[e.target.name], { value: e.target.value })
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
    const formFields = this.getFormFields();
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
    let action = fetchToState(params, post);
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
    if (this.props.disabled) {
      return null;
    }
    return (
      <button type="submit" className="btn btn-sm btn-primary float-right">
        Submit
      </button>
    );
  }

  render() {
    let { showForm, forceShowForm, disabled, hideUnderline } = this.props;
    if (!showForm && !forceShowForm) {
      return "";
    }

    let stateFormFields = this.getFormFields();
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
