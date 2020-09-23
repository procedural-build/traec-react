import React, { useEffect } from "react";
import { connect } from "react-redux";
import Traec from "traec";
import Im from "traec/immutable";
import { loading, Spinner } from "traec-react/utils/entities";
import Moment from "moment";
import { EmailBarChart } from "./emailBarChart";
import { getEmailSettingType } from "../settings/emailSettingRow";

const RecipientEmailReport = props => {
  let { projectId, companyId, recipient } = props;
  let emailSettingType = getEmailSettingType(projectId, companyId);
  useEffect(() => {
    Traec.fetchRequired.bind({
      props,
      requiredFetches: [new Traec.Fetch(`${emailSettingType}_email_recipient`, "read")]
    })();
  });

  if (!recipient) {
    return <Spinner />;
  }
  let sent_emails = recipient.get("sent") || Traec.Im.List();
  let rows = sent_emails
    .sortBy(i => i.get("date"))
    .reverse()
    .map((sentItem, i) => <SentEmail key={i} item={sentItem} recipient={recipient} projectId={projectId} />);

  return (
    <div>
      <EmailBarChart
        emails={parseRecipientEmails(recipient)}
        title={`Email Report for: ${recipient.get("email")}`}
        text={"The following email notifications have been sent to this address."}
        emailType={emailSettingType}
      />
      <div className="m-3 p-3">
        <h4>Email History</h4>
        <RecipientHeaders />
        <hr className="m-1 p-0" />
        {rows}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  let { projectId, recipientId, companyId } = Traec.utils.getFullIds(state, ownProps.match.params);
  let recipient = null;
  if (projectId) {
    recipient = state.getInPath(`entities.projectObjects.byId.${projectId}.recipients.${recipientId}`);
  }
  if (companyId) {
    recipient = state.getInPath(`entities.companyObjects.byId.${companyId}.recipients.${recipientId}`);
  }

  return {
    projectId,
    companyId,
    recipientId,
    recipient
  };
};

export default connect(mapStateToProps)(RecipientEmailReport);

const SentEmail = props => {
  let { item } = props;
  return (
    <div>
      <div className="row">
        <div className="col-sm-5">{Moment(item.get("date")).format("LLL")}</div>
        <div className="col-sm-3">{formatEmailName(item.get("email_type"))}</div>
        <div className="col-sm-4">{item.get("extra_info")}</div>
      </div>
      <hr className="m-1 p-0" />
    </div>
  );
};

const formatEmailName = email => {
  if (email === "project_invite") {
    return "Project Invite";
  } else if (email === "company_invite") {
    return "Company Invite";
  } else if (email === "project_ref_approved") {
    return "Report Approved";
  } else if (email === "project_ref_near_due") {
    return "Report Near Due";
  } else if (email === "project_ref_overdue") {
    return "Report Over Due";
  } else if (email === "project_ref_submitted") {
    return "Report Submitted";
  } else if (email === "project_ref_rejected") {
    return "Report Rejected";
  } else {
    return email;
  }
};

const RecipientHeaders = () => {
  return (
    <div className="row">
      <div className="col-sm-5">
        <b>Date</b>
      </div>
      <div className="col-sm-3">
        <b>Email Type</b>
      </div>
      <div className="col-sm-4">
        <b>Additional Info</b>
      </div>
    </div>
  );
};

const parseRecipientEmails = recipient => {
  let result = Im.Map();
  if (!recipient || !recipient.has("sent")) {
    return result;
  }

  recipient.get("sent").map(item => {
    let date = Moment(item.get("date")).format("YYYY-MM");
    if (result.has(date)) {
      result = result.setInPath(
        `${date}.email_types.${item.get("email_type")}`,
        (result.getInPath(`${date}.email_types.${item.get("email_type")}`) || 0) + 1
      );
    } else {
      result = result.setInPath(`${date}.email_types.${item.get("email_type")}`, 1);
      result = result.setInPath(`${date}.min_date`, date);
    }
  });
  return result.valueSeq();
};
