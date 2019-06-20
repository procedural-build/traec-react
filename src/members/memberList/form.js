import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchToState, toggleForm } from "traec/redux/actionCreators";
import { BaseForm } from "traec-react/utils/form";
import { objToList } from "traec-react/utils";

// Project field definitions
export const companyInviteFields = {
  email: { inputType: "email", value: "", class: "col-sm-8 mb-1", label: "", placeholder: "Email" },
  auth: {
    value: "",
    class: "col-sm-4 mb-1",
    label: "",
    placeholder: "Authority Group",
    inputType: "select",
    defaultValue: "",
    header: "Choose an Authority Group"
  }
};

export const projectInviteFields = {
  email: { inputType: "email", value: "", class: "col-sm-8 mb-1", label: "", placeholder: "Email" },
  project_discipline: {
    value: "",
    class: "col-sm-4 mb-1",
    label: "",
    placeholder: "Supplier",
    inputType: "select",
    defaultValue: "",
    header: "Choose a Supplier"
  }
};

class InviteForm extends BaseForm {
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = prevState;

    if (nextProps.authGroups) {
      InviteForm.setSelectOptions(newState.formFields.auth, nextProps.authGroups);
    }

    if (nextProps.disciplines) {
      InviteForm.setSelectOptions(newState.formFields.project_discipline, nextProps.disciplines);
    }

    return newState;
  }

  static setSelectOptions(state, items) {
    let options = [];
    if (items) {
      options = objToList(items).map((item, i) => {
        return (
          <option key={i} value={item.get("uid")}>
            {item.get("name")}
          </option>
        );
      });
      if (state.value === "") {
        options = options.unshift(
          <option key={-1} value={""} disabled={true}>
            {state.header}
          </option>
        );
      }
    }
    Object.assign(state, { inputType: "select", options });
  }
}

InviteForm.propTypes = {
  newItem: PropTypes.object,
  showForm: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  const { companyId, projectId } = ownProps;
  let authGroups = null;
  let disciplines = null;

  if (projectId) {
    disciplines = state.getInPath(`entities.projectObjects.byId.${projectId}.disciplines`);
    authGroups = state.getInPath(`entities.projectObjects.byId.${projectId}.authGroups`);
  } else if (companyId) {
    authGroups = state.getInPath(`entities.companyObjects.byId.${companyId}.authGroups`);
  }

  const s = ownProps.stateParams;
  return {
    authGroups,
    disciplines,
    newItem: state.getInPath(`entities.${s.formObjPath}`),
    showForm: state.getInPath(`entities.${s.formVisPath}`)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postForm: (body, params) => {
      dispatch(fetchToState(params, body));
    },
    toggleForm: () => {
      dispatch(toggleForm(ownProps.stateParams));
    },
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteForm);
