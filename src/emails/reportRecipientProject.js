import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import Im from "traec/immutable";
import { loading } from "traec-react/utils/entities";
import Moment from "moment";
import { EmailBarChart } from "traec-react/emails/emailBarChart";

class ProjectRecipientEmailReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this.requiredFetches = [new Traec.Fetch("project_email_recipient", "read")];
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  displayEmpty() {
    if (!this.props.recipient) {
      return loading("report");
    } else if (!this.props.recipient.size && this.props.recipient.get("sent")) {
      return (
        <div>
          <h3>No emails have been sent to this recipient.</h3>
          <h5>Ensure there are members associated to this project first</h5>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    let { recipient, projectId } = this.props;
    if (!recipient) {
      return null;
    }

    let sent_emails = recipient.get("sent") || Traec.Im.List();

    let rows = sent_emails
      .sortBy(i => i.get("date"))
      .reverse()
      .map((sentItem, i) => <ProjectSentEmail key={i} item={sentItem} recipient={recipient} projectId={projectId} />);

    return (
      <React.Fragment>
        {this.displayEmpty()}
        <EmailBarChart
          emails={parseRecipientEmails(recipient)}
          title={`Email Report for: ${recipient.get("email")}`}
          text={"The following email notifications have been sent to this address."}
        />
        <div className="m-3 p-3">
          <h4>Email History</h4>
          <RecipientTableHeaders />
          <hr className="m-1 p-0" />
          {rows}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { projectId, recipientId } = Traec.utils.getFullIds(state, ownProps.match.params);

  let recipient = state.getInPath(`entities.projectObjects.byId.${projectId}.recipients.${recipientId}`);
  return {
    projectId,
    recipientId,
    recipient
  };
};

export default connect(mapStateToProps)(ProjectRecipientEmailReport);

const ProjectSentEmail = props => {
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

const RecipientTableHeaders = () => {
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
