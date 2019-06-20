import React from "react";
import ReactDOM from "react-dom";

export const authGroupFields = {
  name: { value: "", class: "col col-sm-11 mb-1", label: "", placeholder: "Name" },
  is_admin: { value: false, class: "col col-sm-1 mb-1", label: "Administrator", inputType: "checkbox" }
};

export default class CompanyAuthGroupForm extends React.Component {
  constructor(props) {
    super(props);

    this.operations = ["CREATE", "READ", "UPDATE", "DELETE"];
    this.viewObjectTypes = {
      COMPANY_COMPANY: "Business Units",
      COMPANY_MEMBER: "Corporate Users",
      COMPANY_PROJECT: "Corporate Projects",
      COMPANY: "Corporate Details",
      COMPANY_REPORT: "Corporate Dashboard"
    };

    let { item } = props;
    let initActionList = item ? item.getIn(["policy_json", "actions"]) || [] : [];
    this.state = {
      uid: item ? item.get("uid") : null,
      name: item ? item.get("name") : "",
      is_admin: item ? item.get("is_admin") : false,
      actions: initActionList.reduce((obj, i) => {
        obj[i] = true;
        return obj;
      }, {})
    };

    this.changeAction = this.changeAction.bind(this);
    this.toggleAdmin = this.toggleAdmin.bind(this);
    this.changeTextInput = this.changeTextInput.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  changeAction(e, action) {
    let actions = Object.assign({}, this.state.actions);
    actions[action] = !actions[action];
    this.setState({ actions });
  }

  toggleAdmin(e) {
    this.setState({ is_admin: !this.state.is_admin });
  }

  changeTextInput(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  submitData(e) {
    e.preventDefault();
    let { companyId, fetchHandler } = this.props;
    // Construct the auth object that will be sent
    let actions = [];
    if (!this.state.is_admin) {
      for (let [action, isAction] of Object.entries(this.state.actions)) {
        if (isAction) {
          actions.push(action);
        }
      }
    }
    let data = {
      name: this.state.name,
      is_admin: this.state.is_admin,
      policy_json: { actions }
    };
    // The fetchHandler to use should be passed in as a prop
    fetchHandler.update({ companyId, authGroupId: this.state.uid });
    fetchHandler.updateFetchParams({ body: data });
    fetchHandler.dispatch();
  }

  render_actions_table_rows() {
    let rows = [];
    let counter = 0;
    for (let [objKey, name] of Object.entries(this.viewObjectTypes)) {
      let colCells = this.operations.map((operation, i) => {
        let action = `${operation}_${objKey}`;
        let isChecked = this.state.actions[action] || false;
        return (
          <td key={counter++} className="text-center" style={{ backgroundColor: isChecked ? "#99EB99" : "#EB9999" }}>
            <input type="checkbox" checked={isChecked} onChange={e => this.changeAction(e, action)} />
          </td>
        );
      });
      // Add the row header
      colCells.unshift(
        <th key={counter++} scope="row">
          {name}
        </th>
      );
      // Add this to the rows
      rows.push(<tr key={counter++}>{colCells}</tr>);
    }
    return rows;
  }

  render_actions_table() {
    if (this.state.is_admin) {
      return null;
    }
    let colHeadings = this.operations.map((o, i) => (
      <th key={i} scope="col" width="15%" className="text-center">
        {o}
      </th>
    ));
    colHeadings.unshift(<th key={colHeadings.length} scope="col" />);
    return (
      <div className="form-group row mb-0">
        <div className="col-sm-12">
          <table className="table table-sm">
            <thead>
              <tr>{colHeadings}</tr>
            </thead>
            <tbody>{this.render_actions_table_rows()}</tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    const i = this.props.index;
    const item = this.props.item;

    return (
      <React.Fragment>
        <form>
          <div className="form-group row mb-0">
            <div className="col-sm-11">
              <input
                type="text"
                name="name"
                className="form-control-plaintext"
                value={this.state.name}
                onChange={this.changeTextInput}
                placeholder="Enter a name for this Role"
              />
            </div>
            <div className="form-check col-sm-1">
              <input
                className="form-check-input"
                type="checkbox"
                id="adminCheck"
                checked={this.state.is_admin}
                onChange={this.toggleAdmin}
              />
              <label className="form-check-label" htmlFor="adminCheck">
                Admin?
              </label>
            </div>
          </div>
          {this.render_actions_table()}
          <button className="btn btn-sm btn-default" onClick={e => this.props.showFormHandler(e, false)}>
            Close
          </button>
          <button className="btn btn-sm btn-primary float-right" onClick={this.submitData}>
            Save
          </button>
          <div style={{ clear: "both" }} />
        </form>
        <hr />
      </React.Fragment>
    );
  }
}
