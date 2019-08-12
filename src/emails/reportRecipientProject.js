import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Traec from "traec";
import { loading } from "traec-react/utils/entities";
import Moment, { min } from "moment";
import IndividualReportBarPlot from "traec-react/emails/reportRecipientBarChart";

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

    this.state = {
      isLoading: true
    };

    this.requiredFetches = [new Traec.Fetch("project_email_recipient", "read")];

    // action bindings
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
    this.setIsLoading();
  }
  displayEmpty() {
    return (
      <div>
        <h3>No emails have been sent to this recipient.</h3>
        <h5>Ensure there are members associated to this project first</h5>
      </div>
    );
  }

  displayEmailData({ recipient }) {
    return (
      <div>
        <h2>Email Report for: {recipient.get("email")}</h2>

        <p>The following email notifications have been sent to this address.</p>
        <div>{recipient.get("sent") ? <IndividualReportBarPlot recipient={recipient} /> : null}</div>
        <RecipientTableHeaders />
      </div>
    );
  }

  setIsLoading() {
    let { recipient } = this.props;
    if (!recipient) {
      return null;
    }
    if (recipient.get("sent") && this.state.isLoading) {
      this.setState({ isLoading: false });
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
        {/* Render the loading spinning wheel */}
        {this.state.isLoading ? loading("report") : null}

        {!this.state.isLoading && recipient.toList().size == 0
          ? this.displayEmpty()
          : !this.state.isLoading && recipient.toList().size !== 0
          ? this.displayEmailData({ recipient })
          : null}
        {rows}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { projectId, recipientId } = ownProps.match.params;

  let recipient = state.getInPath(`entities.projectObjects.byId.${projectId}.recipients.${recipientId}`);
  return {
    projectId,
    recipientId,
    recipient
  };
};

export default connect(mapStateToProps)(ProjectRecipientEmailReport);
