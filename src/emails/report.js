import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Traec from "traec";

export const EMAIL_TYPES = [
  "project_invite",
  "project_ref_near_due",
  "project_ref_overdue",
  "project_commit_committed",
  "project_commit_rejected",
  "project_commit_approved"
];

export const EMAIL_TYPE_HEADERS = ["Invite", "Near Due", "Overdue", "Submitted", "Rejected", "Approved"];

function ProjectEmailRecipient({ recipient, projectId }) {
  let total = 0;

  let cols = EMAIL_TYPES.map((emailType, i) => {
    let num = recipient.getInPath(`sent_summary.email_types.${emailType}`);
    total += parseInt(num) || 0;
    return (
      <div key={i} className="col-sm-1 text-center">
        {num}
      </div>
    );
  });

  // Add the total to the last column
  cols.push(
    <div key={cols.length} className="col-sm-1 text-center">
      {total}
    </div>
  );

  return (
    <div className="row" style={{ borderTop: "1px solid grey" }}>
      <div className="col-sm-5">
        <Link to={`/project/${projectId}/email/report/${recipient.get("uid")}`}>{recipient.get("email")}</Link>
      </div>
      {cols}
    </div>
  );
}

function RecipientTableHeaders() {
  let cols = EMAIL_TYPE_HEADERS.concat(["Total"]).map((header, i) => (
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
}

class TraecProjectEmailReport extends React.Component {
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
      .map((recipient, i) => <ProjectEmailRecipient key={i} recipient={recipient} projectId={projectId} />);

    return (
      <React.Fragment>
        <h2>Email Recipients</h2>

        <p>The following email addresses have received notifications on this project.</p>

        <RecipientTableHeaders />
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

export default connect(mapStateToProps)(TraecProjectEmailReport);
