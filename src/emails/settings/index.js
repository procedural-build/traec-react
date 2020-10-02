import React, { useEffect } from "react";
import { Spinner } from "traec-react/utils/entities";
import Traec from "traec";
import { EmailSettingRow, getEmailSettingType } from "./emailSettingRow";
import { connect } from "react-redux";
import { emailTypeHeaders } from "../emailTypes";

const EmailSettings = props => {
  useEffect(() => {
    let APICall = props.projectId ? "project_email_recipient" : "company_email_recipient";
    Traec.fetchRequired.bind({
      props,
      requiredFetches: [new Traec.Fetch(APICall, "list")]
    })();
  });

  let { recipients, projectId, companyId } = props;

  if (!recipients) {
    return <Spinner />;
  }

  let rows = recipients
    .toList()
    .sortBy(recipient => recipient.get("email").toLowerCase())
    .map((recipient, i) => (
      <EmailSettingRow key={i} recipient={recipient} projectId={projectId} companyId={companyId} />
    ));

  if (rows.size === 0) {
    rows = (
      <p>
        <b>{`No notifications sent for this ${projectId ? "project" : "company"} yet`}</b>
      </p>
    );
  }

  return (
    <div className="container">
      <h3>Email Settings</h3>
      <div>
        Adjust the numbers below to set the frequency that recipients receive various email types. 1=daily, 7=weekly,
        etc.
      </div>
      <br />
      <EmailSettingsHeaders emailSettingsType={getEmailSettingType(projectId, companyId)} />
      {rows}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let { projectId, companyId } = Traec.utils.getFullIds(state, ownProps.match.params);

  let recipients = null;
  if (projectId) {
    recipients = state.getInPath(`entities.projectObjects.byId.${projectId}.recipients`);
  } else {
    recipients = state.getInPath(`entities.companyObjects.byId.${companyId}.recipients`);
  }

  return {
    projectId,
    companyId,
    recipients
  };
};

export default connect(mapStateToProps)(EmailSettings);

const EmailSettingsHeaders = props => {
  let cols = ["Block All"].concat(emailTypeHeaders(props.emailSettingsType)).map((header, i) => (
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
