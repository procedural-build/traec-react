import React, { useEffect } from "react";
import { connect } from "react-redux";
import Traec from "traec";
import { EmailBarChart } from "./emailBarChart";
import { emailTypeHeaders } from "../emailTypes";
import { getEmailSettingType } from "../settings/emailSettingRow";
import { EmailRecipient } from "./emailRecipient";
import { Spinner } from "../../utils/entities";

const EmailReport = props => {
  let { projectId, companyId, recipients, compute, className } = props;
  let emailSettingType = getEmailSettingType(projectId, companyId, compute);
  let APICall = projectId ? "project" : "company";

  useEffect(() => {
    if (emailSettingType !== "unknown") {
      Traec.fetchRequired.bind({
        props,
        requiredFetches: [
          new Traec.Fetch(APICall, "read"),
          (projectId && projectId.length > 8) || (companyId && companyId.length > 8)
            ? new Traec.Fetch(`${APICall}_email`, "list")
            : null,
          (projectId && projectId.length > 8) || (companyId && companyId.length > 8)
            ? new Traec.Fetch(`${APICall}_email_recipient`, "list")
            : null
        ]
      })();
    }
  });

  if (!recipients) {
    return <Spinner />;
  }

  let rows = recipients
    .toList()
    .sortBy(recipient => recipient.get("email").toLowerCase())
    .map((recipient, i) => (
      <EmailRecipient key={i} recipient={recipient} projectId={projectId} companyId={companyId} compute={compute} />
    ));

  if (!rows || !rows.size) {
    return <div>No email data found.</div>;
  }
  return (
    <div className={className}>
      <EmailBarChart
        emails={props.emails}
        title={"Email Recipients"}
        text={"The following email addresses have received notifications on this project."}
        emailType={emailSettingType}
      />
      <div className="m-3 p-3">
        <RecipientHeaders emailSettingType={emailSettingType} />
        <hr className="m-1 p-0" />
        {rows}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let { _projectId, _companyId } = ownProps.match.params;
  let { projectId, companyId } = Traec.utils.getFullIds(state, ownProps.match.params);

  let recipients = null;
  let emails = null;
  if (projectId) {
    recipients = state.getInPath(`entities.projectObjects.byId.${projectId}.recipients`);
    emails = state.getInPath(`entities.projectObjects.byId.${projectId}.emails`);
  }
  if (companyId) {
    recipients = state.getInPath(`entities.companyObjects.byId.${companyId}.recipients`);
    emails = state.getInPath(`entities.companyObjects.byId.${companyId}.emails`);
  }

  if (_projectId && !projectId) {
    projectId = _projectId;
  }

  if (_companyId && !companyId) {
    companyId = _companyId;
  }

  // Add this to props
  return {
    projectId,
    companyId,
    recipients,
    emails
  };
};

export default connect(mapStateToProps)(EmailReport);

const RecipientHeaders = props => {
  let cols = emailTypeHeaders(props.emailSettingType)
    .concat(["Total"])
    .map((header, i) => (
      <div key={i} className="col-sm-1 text-center">
        <b>{header}</b>
      </div>
    ));

  return (
    <div className="row">
      <div className="col-sm-5">
        <b>Email</b>
      </div>
      {cols}
    </div>
  );
};
