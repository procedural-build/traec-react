import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Traec from "traec";
import ReportBarPlot from "traec-react/emails/reportBarChart";
import { loading } from "traec-react/utils/entities";

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
    <div className="row" style={{ borderTop: "1px solid grey" }}>
      <div className="col-sm-9">
        <Link to={`/company/${companyId}/email/report/${recipient.get("uid")}`}>{recipient.get("email")}</Link>
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
      <div className="col-sm-9">
        <b>Email</b>
      </div>
      {cols}
    </div>
  );
}

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
    this.setIsLoading();
  }

  displayEmpty() {
    return (
      <div>
        <h3>No emails have been sent to any recipients.</h3>
        <h5>Ensure there are members associated to this project first</h5>
        <RecipientTableHeaders />
      </div>
    );
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

  setIsLoading() {
    let { recipients, emails } = this.props;
    if (!recipients && !emails) {
      // if (!recipients) {
      return null;
    } else if (recipients && this.state.isLoading) {
      this.setState({ isLoading: false });
    }
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
        {this.state.isLoading ? loading("report") : null}

        {(!this.state.isLoading && recipients.toList().size == 0) || !emails
          ? this.displayEmpty()
          : (!this.state.isLoading && emails.toList().size == 0) || !emails
          ? this.displayEmpty()
          : !this.state.isLoading && recipients.toList().size !== 0 && emails
          ? this.displayEmailData({ recipients, emails })
          : null}

        {rows}
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
