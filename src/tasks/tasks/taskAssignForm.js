import React from "react";
import Traec from "traec/index";

export class TaskAssignForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disciplineToAssign: null, showDiscipline: false };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.createMemberSelect = this.createMemberSelect.bind(this);
    this.confirmAssign = this.confirmAssign.bind(this);
  }

  onChange(e) {
    this.setState({ disciplineToAssign: e.target.options[e.target.selectedIndex].text });
  }

  createMemberSelect(memberData) {
    let optionsArray = [];
    optionsArray.push(
      <option className="dropdown-item" key={-1} defaultValue="Select a discipline" disabled>
        Select a discipline
      </option>
    );

    for (let i = 0; i < memberData.length; i++) {
      let memberDiscipline = memberData[i];
      optionsArray.push(
        <option className="dropdown-item" key={i}>
          {memberDiscipline}
        </option>
      );
    }
    return optionsArray;
  }

  onSubmit(e) {
    e.preventDefault();
    this.confirmAssign(
      this.props.projectDisciplineId,
      this.props.trackerId,
      this.props.refId,
      this.state.disciplineToAssign
    );
    this.props.toggleForm();
  }

  confirmAssign(
    projectDisciplineId, // Required to look up if discipline already exists
    trackerId,
    refId,
    disciplineToAssign
  ) {
    // Set 'selectedDisciplineName' to equal the dropdown field of the button

    let baseDisciplineId = projectDisciplineId[0][disciplineToAssign];
    let fetch = new Traec.Fetch("tracker_ref", "patch", { trackerId, refId });

    fetch.updateFetchParams({
      body: {
        latest_commit: { discipline: baseDisciplineId }
      }
    });

    fetch.dispatch();

    this.props.toggleForm();
  }

  renderForm() {
    let memberData = this.props.memberData;
    return (
      <div>
        <h6>Assign a User</h6>
        <select
          className="dropdown-toggle show"
          style={{ position: "static", fontSize: "12px", marginRight: "-1em" }}
          data-style="btn-default"
          type="select"
          id="UserAssignForm"
          onChange={this.onChange}
          defaultValue={"Select a discipline"}
        >
          {this.createMemberSelect(memberData)}
        </select>
      </div>
    );
  }

  renderClose() {
    return (
      <button className="btn btn-sm btn-default col-2" type="button" onClick={this.props.toggleForm}>
        Cancel
      </button>
    );
  }

  renderSubmit() {
    return (
      <button className="btn btn-sm btn-default col-2 mr-1" type="button" onClick={this.onSubmit}>
        Confirm
      </button>
    );
  }

  render() {
    if (!this.props.showForm) {
      return null;
    } else {
      return (
        <div className="col-sm-12 pt-2 pb-2">
          <div className="row">
            {this.renderForm()}
            <span className="col-2" />
            {this.renderSubmit()}
            {this.renderClose()}
          </div>
        </div>
      );
    }
  }
}
