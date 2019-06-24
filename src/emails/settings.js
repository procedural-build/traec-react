import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Traec from "traec";

import { EMAIL_TYPE_HEADERS, EMAIL_TYPES } from "./report";

const EMAIL_DEFAULT_FREQS = {
  project_invite: 7,
  project_ref_near_due: -1,
  project_ref_overdue: 1,
  project_commit_committed: -1,
  project_commit_rejected: -1,
  project_commit_approved: -1
};

function EmailSettingsTableHeaders() {
  let cols = ["Block All"].concat(EMAIL_TYPE_HEADERS.concat(["Save"])).map((header, i) => (
    <div key={i} className="col-sm-1 text-center">
      <b>{header}</b>
    </div>
  ));

  return (
    <div className="row">
      <div className="col-sm-4">
        <b>Email</b>
      </div>
      {cols}
    </div>
  );
}

class ProjectEmailSettingRow extends React.Component {
  constructor(props) {
    super(props);

    let { recipient } = props;
    let emailTypeMap = (recipient.get("settings") || Traec.Im.List()).reduce((a, c) => {
      return a.set(c.get("email_type"), c.get("frequency"));
    }, Traec.Im.Map());

    let emailTypeValues = EMAIL_TYPES.reduce((a, c) => {
      a[c] = emailTypeMap.get(c) || EMAIL_DEFAULT_FREQS[c];
      return a;
    }, {});

    this.state = {
      ...emailTypeValues,
      blockAll: recipient.get("blocked") || false
    };

    this.handleChange = this.handleChange.bind(this);
    this.setBlockAll = this.setBlockAll.bind(this);
    this.patchData = this.patchData.bind(this);
  }

  /*
  EVENT HANDLERS
  */

  handleChange(e) {
    e.preventDefault();
    let value = e.target.value;
    if (isNaN(value)) {
      value = -1;
    }
    this.setState({ [e.target.name]: value });
  }

  setBlockAll(e) {
    this.setState({ blockAll: e.target.checked });
  }

  /*
  ACTION HANDLERS
  */

  patchData() {
    let { projectId, recipient } = this.props;
    let recipientId = recipient.get("uid");
    let fetch = new Traec.Fetch("project_email_recipient", "patch", { projectId, recipientId });
    fetch.updateFetchParams({
      preFetchHook: body => ({
        blocked: this.state.blockAll,
        settings: this.state.blockAll
          ? []
          : EMAIL_TYPES.map(i => ({
              email_type: i,
              frequency: this.state[i] || null
            }))
      })
    });
    fetch.dispatch();
  }

  /*
  RENDER METHODS
  */

  render() {
    let { recipient, projectId } = this.props;
    let total = 0;

    let cols = EMAIL_TYPES.map((emailType, i) => {
      let input = null;
      if (!this.state.blockAll) {
        let num = this.state[emailType] || 0;
        num = num < 0 ? "once" : num;
        input = (
          <input
            className="form-control text-center mt-0 mb-0 pt-0 pb-0"
            id={emailType}
            name={emailType}
            value={num}
            onChange={this.handleChange}
          />
        );
      }
      return (
        <div key={i} className="col-sm-1 text-center">
          {input}
        </div>
      );
    });

    // Add the Save button to the last column
    cols.unshift(
      <div key={-1} className="col-sm-1 text-center align-middle">
        <input
          className="form-check-input"
          type="checkbox"
          name="blockAll"
          checked={this.state.blockAll || false}
          onChange={this.setBlockAll}
        />
      </div>
    );

    // Add the Save button to the last column
    cols.push(
      <div key={cols.length} className="col-sm-1 text-center" onClick={this.patchData}>
        <button className="btn btn-sm btn-primary pt-0 pb-0 ">Save</button>
      </div>
    );

    return (
      <div className="row" style={{ borderTop: "1px solid grey" }}>
        <div className="col-sm-4">
          <Link to={`/project/${projectId}/email/report/${recipient.get("uid")}`}>{recipient.get("email")}</Link>
        </div>
        {cols}
      </div>
    );
  }
}

class TraecProjectEmailSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.requiredFetches = [new Traec.Fetch("project_email_recipient", "list")];

    // action bindings
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  render() {
    let { recipients, projectId } = this.props;
    console.log("EMAILS");
    if (!recipients) {
      return null;
    }

    let rows = null;

    // If we have nothing then set a message
    if (recipients.toList().size == 0) {
      rows = (
        <p>
          <b>No notifications sent for this project yet</b>
        </p>
      );
    }

    rows = recipients
      .toList()
      .map((recipient, i) => <ProjectEmailSettingRow key={i} recipient={recipient} projectId={projectId} />);
    console.log("EMAILS");
    return (
      <React.Fragment>
        <h2>Email Settings</h2>

        <br />
        <p>
          Adjust the numbers below to set the frequency that recipients recieve various email types. 1=daily, 7=weekly,
          etc.
        </p>
        <p>
          Type "once", "na" or "-1" to set a recipient to recieve the email only once. Selecting "Block All" will
          prevent this user from receving any email notifications on this project.
        </p>
        <br />

        <EmailSettingsTableHeaders />
        {rows}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { projectId } = ownProps.match.params;
  let recipients = state.getInPath(`entities.projectObjects.byId.${projectId}.recipients`);
  // Add this to props
  return {
    projectId,
    recipients
  };
};

export default connect(mapStateToProps)(TraecProjectEmailSettings);
