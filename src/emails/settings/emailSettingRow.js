import React from "react";
import { emailDefaultFrequencies, emailTypes } from "../emailTypes";
import Traec from "traec";
import { ReportLink, getBgColor } from "../report/utils";

export const EmailSettingRow = props => {
  let { recipient, projectId, companyId, compute } = props;
  let emailSettingType = getEmailSettingType(projectId, companyId, compute);

  const handleChange = (e, name) => {
    let recipientId = recipient.get("uid");
    let APICall = props.projectId ? "project_email_recipient" : "company_email_recipient";
    let fetch = new Traec.Fetch(APICall, "patch", { projectId, companyId, recipientId });

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

  let inputs = emailTypes(emailSettingType).map((emailType, i) => (
    <SettingsInput
      key={i}
      emailType={emailType}
      recipient={recipient}
      handleChange={handleChange}
      emailSettingType={emailSettingType}
    />
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
      <div className="row mt-1 mb-1" style={{backgroundColor: getBgColor(recipient)}} >
        <div className="col-sm-4 d-flex align-items-center">
          <ReportLink companyId={companyId} projectId={projectId} recipient={recipient} />
        </div>
        {inputs}
      </div>
      <hr className="m-0 p-0" />
    </div>
  );
};

const SettingsInput = props => {
  let { recipient, emailType, handleChange, emailSettingType } = props;

  let emailSetting = recipient
    .get("settings")
    .filter(setting => setting.get("email_type") === emailType)
    .first();

  let frequency = emailSetting
    ? emailSetting.get("frequency")
    : emailDefaultFrequencies(emailSettingType)[emailType].value;

  let frequencyType = emailDefaultFrequencies(emailSettingType)[emailType].type;
  if (["project_ref_approved", "parent_task_completed", "task_completed"].indexOf(emailType) > -1) {
    frequency = frequency === 0;
  }

  let blocked = recipient.get("blocked");

  return (
    <div 
      className={`col-sm-1 d-flex justify-content-center ${frequencyType === "checkbox" ? "form-inline" : ""}`}
    >
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

export const getEmailSettingType = (projectId, companyId, compute) => {
  if (compute) {
    return "compute";
  }
  if (projectId) {
    return "project";
  }
  if (companyId) {
    return "company";
  }
  return "unknown";
};
