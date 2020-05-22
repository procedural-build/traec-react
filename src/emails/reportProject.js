import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Traec from "traec";
import { loading } from "traec-react/utils/entities";
import { EmailBarChart } from "traec-react/emails/emailBarChart";

class ProjectEmailReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this.requiredFetches = [
      new Traec.Fetch("project_email", "list"),
      new Traec.Fetch("project_email_recipient", "list")
    ];

    // action bindings
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  displayEmpty() {
    if (!this.props.recipients && !this.props.emails) {
      return loading("report");
    } else if (!this.props.recipients.size && !this.props.emails.size) {
      return (
        <div>
          <h3>No emails have been sent to any recipients.</h3>
          <h5>Ensure there are members associated to this project first</h5>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    let { recipients, projectId } = this.props;
    if (!recipients) {
      return null;
    }

    let rows = recipients
      .toList()
      .sortBy(recipient => recipient.get("email").toLowerCase())
      .map((recipient, i) => <ProjectEmailRecipient key={i} recipient={recipient} projectId={projectId} />);

    if (!rows || !rows.size) {
      rows = <div>No email data found.</div>;
    }

    return (
      <React.Fragment>
        {this.displayEmpty()}
        <EmailBarChart
          emails={this.props.emails}
          title={"Email Recipients"}
          text={"The following email addresses have received notifications on this project."}
        />
        <div className="m-3 p-3">
          <RecipientTableHeaders />
          <hr className="m-1 p-0" />
          {rows}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { projectId } = Traec.utils.getFullIds(state, ownProps.match.params);

  let recipients = null;
  let emails = null;
  if (projectId) {
    recipients = state.getInPath(`entities.projectObjects.byId.${projectId}.recipients`);
    emails = state.getInPath(`entities.projectObjects.byId.${projectId}.emails`);
  }

  // Add this to props
  return {
    projectId,
    recipients,
    emails
  };
};

export default connect(mapStateToProps)(ProjectEmailReport);

export const EMAIL_TYPES = [
  "project_invite",
  "project_ref_near_due",
  "project_ref_overdue",
  "project_ref_submitted",
  "project_ref_rejected",
  "project_ref_approved"
];

export const EMAIL_TYPE_HEADERS = ["Invite", "Near Due", "Overdue", "Submitted", "Rejected", "Approved"];

const ProjectEmailRecipient = props => {
  let { recipient, projectId } = props;
  let total = 0;

  let cols = EMAIL_TYPES.map((emailType, i) => {
    //debugger;
    let num = recipient.getInPath(`sent_summary.email_types.${emailType}`) || 0;
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
    <div>
      <div className="row">
        <div className="col-sm-5">
          <Link to={`/project/${projectId}/email/report/${recipient.get("uid")}`}>
            {recipient.get("email").toLowerCase()}
          </Link>
        </div>
        {cols}
      </div>
      <hr className="m-1 p-0" />
    </div>
  );
};

const RecipientTableHeaders = () => {
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
};
