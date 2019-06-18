import Im from "traec/immutable";
import React from "react";
import { BSForm } from "./bootstrap";
import { connect } from "react-redux";
import { fetchToState, toggleForm } from "traec/redux/actionCreators";

class BaseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formFields: this.initialiseFormFields(props.fields, props.initFields),
      formErrors: null,
      forceShowForm: props.forceShowForm || false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  initialiseFormFields(fields, initFields) {
    // If there are no initialFields then just return projectFields
    if (!initFields) {
      return fields;
    }
    // Otherwise step through the projectFields and get what you can from initFields
    let initialFormFields = fields;
    Object.keys(fields).map(key => {
      initialFormFields[key].value = initFields.get(key) || fields[key].value;
    });
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
    //let newState = {formFields: nextProps.fields}
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
        .filter(key => !fields[key] && key != "non_field_errors")
        .map(key => `${key}: ${errors.get(key).toJS()}`);
      // Get existing non-field errors
      let non_field_errors = (errors.get("non_field_errors") || Im.List()).concat(errorMsgs);
      errors = errors.setIn(["non_field_errors"], non_field_errors);

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

  render() {
    let { showForm, forceShowForm } = this.props;
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

    return (
      <div className="col-sm-12 ">
        <form onSubmit={this.onSubmit}>
          <BSForm items={formFields} formErrors={this.state.formErrors} onChange={this.onChange} />
          {this.render_close()}
          <button type="submit" className="btn btn-sm btn-primary float-right">
            Submit
          </button>
          <div style={{ clear: "both" }} />
          <hr />
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
    toggleForm: () => {
      dispatch(toggleForm(s));
    },
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseForm);
