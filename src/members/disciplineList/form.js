import React from "react";
import { connect } from "react-redux";
import { fetchToState, toggleForm } from "traec/redux/actionCreators";
import { BaseForm } from "traec-react/utils/form";
import Traec from "traec";

export const disciplineFields = {
  name: { value: "", class: "col-sm-6 mb-1", label: "", placeholder: "Supplier Name" },
  auth: {
    value: "",
    class: "col-sm-3 mb-1",
    label: "",
    placeholder: "AuthGroup",
    inputType: "select",
    defaultValue: "",
    header: "Choose an Authority Group"
  },
  approver: {
    value: "",
    class: "col-sm-3 mb-1",
    label: "",
    placeholder: "Approver",
    inputType: "select",
    defaultValue: "",
    header: "Chose an Approver (optional)"
  }
};

class DisciplineForm extends BaseForm {
  static getDerivedStateFromProps(nextProps, prevState) {
    // Update the selection list for discipline drop-down
    let newState = prevState;
    // Get the dropdown menu items for Auth Groups
    if (nextProps.authGroups) {
      DisciplineForm.setSelectOptions(newState.formFields.auth, nextProps.authGroups);
    }
    // Get the disciplines
    if (nextProps.disciplines) {
      DisciplineForm.setSelectOptions(
        newState.formFields.approver,
        nextProps.disciplines,
        Traec.Im.fromJS([nextProps.itemId]),
        true
      );
    }
    return newState;
  }

  static setSelectOptions(state, items, excludes = Traec.Im.List(), includeNull = false) {
    let options = [];
    if (items) {
      options = items
        .toList()
        .filter(i => !excludes.contains(i.get("uid")))
        .map((item, i) => {
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
      } else if (includeNull) {
        options = options.unshift(<option key={-1} value={""} />);
      }
    }
    Object.assign(state, { inputType: "select", options });
  }
}

const mapStateToProps = (state, ownProps) => {
  const { stateParams, projectId } = ownProps;
  let authGroups = state.getInPath(`entities.projectObjects.byId.${projectId}.authGroups`);
  let disciplines = state.getInPath(`entities.projectObjects.byId.${projectId}.disciplines`);
  return {
    authGroups,
    disciplines,
    newItem: state.getInPath(`entities.${stateParams.formObjPath}`),
    showForm: state.getInPath(`entities.${stateParams.formVisPath}`)
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

export default connect(mapStateToProps, mapDispatchToProps)(DisciplineForm);
