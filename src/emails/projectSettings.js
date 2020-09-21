import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Traec from "traec";

import { EMAIL_TYPE_HEADERS, EMAIL_TYPES } from "traec-react/emails/reportProject";
import { Spinner } from "../utils/entities";

const EMAIL_DEFAULT_FREQS = {
  project_invite: { value: 7, type: "number" },
  project_ref_near_due: { value: -1, type: "number" },
  project_ref_overdue: { value: 1, type: "number" },
  project_ref_submitted: { value: -1, type: "number" },
  project_ref_rejected: { value: -1, type: "number" },
  project_ref_approved: { value: -1, type: "checkbox" }
};

const EmailSettingsTableHeaders = props => {
  let cols = ["Block All"].concat(EMAIL_TYPE_HEADERS).map((header, i) => (
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
};

class ProjectEmailSettingRowOld extends React.Component {
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

const TraecProjectEmailSettings = props => {
  useEffect(() => {
    Traec.fetchRequired.bind({
      props,
      requiredFetches: [new Traec.Fetch("project_email_recipient", "list")]
    })();
  });

  let { recipients, projectId } = props;

  if (!recipients) {
    return <Spinner />;
  }

  let rows = recipients
    .toList()
    .map((recipient, i) => <ProjectEmailSettingRow key={i} recipient={recipient} projectId={projectId} />);

  if (rows.size === 0) {
    rows = (
      <p>
        <b>No notifications sent for this project yet</b>
      </p>
    );
  }

  return (
    <div>
      <h3>Email Settings</h3>
      <div>
        Adjust the numbers below to set the frequency that recipients receive various email types. 1=daily, 7=weekly,
        etc.
      </div>
      <br />
      <EmailSettingsTableHeaders />
      {rows}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let { projectId } = Traec.utils.getFullIds(state, ownProps.match.params);
  let recipients = state.getInPath(`entities.projectObjects.byId.${projectId}.recipients`);
  // Add this to props
  return {
    projectId,
    recipients
  };
};

export default connect(mapStateToProps)(TraecProjectEmailSettings);

const ProjectEmailSettingRow = props => {
  const [state, setState] = React.useState({
    blockAll: false
  });

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  let { recipient, projectId } = props;

  let inputs = EMAIL_TYPES.map((emailType, i) => {
    let frequency = recipient.getInPath(`settings.${emailType}`) || EMAIL_DEFAULT_FREQS[emailType].value;
    let frequencyType = EMAIL_DEFAULT_FREQS[emailType].type;
    return (
      <div className="col-sm-1">
        <input
          className="form-control text-center align-middle"
          type={frequencyType}
          name={emailType}
          value={frequency}
          onChange={e => handleChange(e, emailType)}
        />
      </div>
    );
  });

  inputs.unshift(
    <div className="col-sm-1">
      <input
        className="form-check-input align-middle"
        type="checkbox"
        name="blockAll"
        checked={state.blockAll}
        onChange={e => handleChange(e, "blockAll")}
      />
    </div>
  );

  return (
    <div>
      <div className="row">
        <div className="col-sm-4">
          <Link to={`/project/${projectId}/email/report/${recipient.get("uid")}`}>
            {recipient.get("email").toLowerCase()}
          </Link>
        </div>
        {inputs}
      </div>
      <hr className="m-1 p-0" />
    </div>
  );
};
