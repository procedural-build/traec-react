import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Traec from "traec";

import { EMAIL_TYPE_HEADERS, EMAIL_TYPES } from "traec-react/emails/reportProject";
import { Spinner } from "../utils/entities";

const EMAIL_DEFAULT_FREQS = {
  project_invite: { value: 7, type: "number" },
  project_ref_near_due: { value: 7, type: "number" },
  project_ref_overdue: { value: 1, type: "number" },
  project_ref_submitted: { value: 3, type: "number" },
  project_ref_rejected: { value: 7, type: "number" },
  project_ref_approved: { value: 0, type: "checkbox" }
};

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
    .sortBy(recipient => recipient.get("email").toLowerCase())
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

  return {
    projectId,
    recipients
  };
};

export default connect(mapStateToProps)(TraecProjectEmailSettings);

const EmailSettingsTableHeaders = props => {
  let cols = ["Block All"].concat(EMAIL_TYPE_HEADERS).map((header, i) => (
    <div key={i} className="col-sm-1 text-center">
      <b>{header}</b>
    </div>
  ));

  return (
    <div className="row mb-3">
      <div className="col-sm-4">
        <b>Email</b>
      </div>
      {cols}
    </div>
  );
};

const ProjectEmailSettingRow = props => {
  let { recipient, projectId } = props;

  const handleChange = (e, name) => {
    let recipientId = recipient.get("uid");
    let fetch = new Traec.Fetch("project_email_recipient", "patch", { projectId, recipientId });

    let value = e.target.value;
    if (name === "project_ref_approved") {
      value = e.target.checked ? 0 : -1;
    }

    if (name === "blocked") {
      value = e.target.checked;
      fetch.updateFetchParams({
        body: { blocked: value }
      });
    } else {
      fetch.updateFetchParams({
        body: { settings: [{ email_type: name, frequency: value }] }
      });
    }

    fetch.dispatch();
  };

  let inputs = EMAIL_TYPES.map((emailType, i) => (
    <SettingsInput key={i} emailType={emailType} recipient={recipient} handleChange={handleChange} />
  ));

  let blocked = recipient.get("blocked");
  inputs.unshift(
    <div className="col-sm-1 form-inline d-flex justify-content-center" key={-1}>
      <input
        className="form-control"
        type="checkbox"
        name="blockAll"
        checked={blocked}
        onChange={e => handleChange(e, "blocked")}
      />
    </div>
  );

  return (
    <div>
      <div className="row mt-1 mb-1">
        <div className="col-sm-4 d-flex align-items-center">
          <Link to={`/project/${projectId}/email/report/${recipient.get("uid")}`}>
            {recipient.get("email").toLowerCase()}
          </Link>
        </div>
        {inputs}
      </div>
      <hr className="m-0 p-0" />
    </div>
  );
};

const SettingsInput = props => {
  let { recipient, emailType, handleChange } = props;

  let emailSetting = recipient
    .get("settings")
    .filter(setting => setting.get("email_type") === emailType)
    .first();

  let frequency = emailSetting ? emailSetting.get("frequency") : EMAIL_DEFAULT_FREQS[emailType].value;

  let frequencyType = EMAIL_DEFAULT_FREQS[emailType].type;
  if (emailType === "project_ref_approved") {
    frequency = frequency === 0;
  }

  let blocked = recipient.get("blocked");

  return (
    <div className={`col-sm-1 d-flex justify-content-center ${frequencyType === "checkbox" ? "form-inline" : ""}`}>
      <input
        className={`form-control text-center align-middle p-0 m-0 ${frequencyType === "checkbox" ? "" : "w-50"}`}
        type={frequencyType}
        name={emailType}
        value={frequency}
        checked={frequency}
        disabled={blocked}
        onChange={e => handleChange(e, emailType)}
      />
    </div>
  );
};
