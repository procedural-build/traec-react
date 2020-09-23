import React, { useEffect } from "react";
import { connect } from "react-redux";
import Traec from "traec";
import { EmailBarChart } from "./emailBarChart";
import { emailTypeHeaders } from "../emailTypes";
import { getEmailSettingType } from "../settings/emailSettingRow";
import { EmailRecipient } from "./emailRecipient";
import { Spinner } from "../../utils/entities";

const EmailReport = props => {
  let { projectId, companyId, recipients } = props;
  let emailSettingType = getEmailSettingType(projectId, companyId);

  useEffect(() => {
    Traec.fetchRequired.bind({
      props,
      requiredFetches: [
        new Traec.Fetch(`${emailSettingType}_email`, "list"),
        new Traec.Fetch(`${emailSettingType}_email_recipient`, "list")
      ]
    })();
  });

  if (!recipients) {
    return <Spinner />;
  }

  let rows = recipients
    .toList()
    .sortBy(recipient => recipient.get("email").toLowerCase())
    .map((recipient, i) => (
      <EmailRecipient key={i} recipient={recipient} projectId={projectId} companyId={companyId} />
    ));

  if (!rows || !rows.size) {
    return <div>No email data found.</div>;
  }
  return (
    <div>
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
