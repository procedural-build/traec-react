import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Traec from "traec";
import Moment from "moment";
import IndividualReportBarPlot from "./reportRecipientBarChart";

function ProjectSentEmail({ item, recipient, projectId }) {
  return (
    <div className="row" style={{ borderTop: "1px solid grey" }}>
      <div className="col-sm-6">{Moment(item.get("date")).format("MMM Do YY, h:mm:ss a")}</div>
      <div className="col-sm-3">{item.get("email_type")}</div>
      <div className="col-sm-3">{item.get("extra_info")}</div>
    </div>
  );
}

function RecipientTableHeaders() {
  return (
    <div className="row">
      <div className="col-sm-6">
        <b>Date</b>
      </div>
      <div className="col-sm-3">
        <b>Email Type</b>
      </div>
      <div className="col-sm-3">
        <b>Additional Info</b>
      </div>
    </div>
  );
}

class ProjectRecipientEmailReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.requiredFetches = [new Traec.Fetch("project_email_recipient", "read")];

    // action bindings
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
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
        <h2>Email Report for: {recipient.get("email")}</h2>

        <p>The following email notifications have been sent to this address.</p>
        <div>{recipient.get("sent") ? <IndividualReportBarPlot recipient={recipient} /> : null}</div>
        <RecipientTableHeaders />
        {rows}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { projectId, recipientId } = ownProps.match.params;
  let recipient = state.getInPath(`entities.projectObjects.byId.${projectId}.recipients.${recipientId}`);
  // Add this to props
  return {
    projectId,
    recipientId,
    recipient
  };
};

export default connect(mapStateToProps)(ProjectRecipientEmailReport);
