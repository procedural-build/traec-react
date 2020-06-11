import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import ReportBarPlot from "traec-react/emails/reportBarChart";
import { loading } from "traec-react/utils/entities";
import { EmailBarChart } from "traec-react/emails/emailBarChart";

class CompanyEmailReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this.requiredFetches = [
      new Traec.Fetch("company_email_recipient", "list"),
      new Traec.Fetch("company_email", "list")
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
          <h5>Ensure there are members associated to this company first</h5>
        </div>
      );
    } else {
      return null;
    }
  }

  displayEmailData({ recipients, emails }) {
    return (
      <div>
        <h2>Email Recipients</h2>

        <p>The following email addresses have received notifications on this project.</p>
        <div className="emailPlot">{recipients ? <ReportBarPlot emails={emails} /> : null} </div>
        <RecipientTableHeaders />
      </div>
    );
  }

  render() {
    let { recipients, companyId, emails } = this.props;
    if (!recipients) {
      return null;
    }

    let rows = null;

    rows = recipients
      .toList()
      .map((recipient, i) => <CompanyEmailRecipient key={i} recipient={recipient} companyId={companyId} />);

    return (
      <React.Fragment>
        {this.displayEmpty()}
        <EmailBarChart
          emails={this.props.emails}
          title={"Email Recipients"}
          text={"The following email addresses have received notifications on this company."}
          company={true}
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
  let { companyId } = Traec.utils.getFullIds(state, ownProps.match.params);

  let recipients = state.getInPath(`entities.companyObjects.byId.${companyId}.recipients`);
  let emails = state.getInPath(`entities.companyObjects.byId.${companyId}.emails`);

  // Add this to props
  return {
    companyId,
    recipients,
    emails
  };
};

export default connect(mapStateToProps)(CompanyEmailReport);

export const EMAIL_TYPES = ["company_invite"];

export const EMAIL_TYPE_HEADERS = ["Invite"];

function CompanyEmailRecipient({ recipient, companyId }) {
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
    <div>
      <div className="row">
        <div className="col-sm-9">{recipient.get("email")}</div>
        {cols}
      </div>
      <hr className="m-1 p-0" />
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
      <div className="col-sm-9">
        <b>Email</b>
      </div>
      {cols}
    </div>
  );
}
