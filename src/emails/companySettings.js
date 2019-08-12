import React from "react";
import Traec from "traec";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import BaseForm from "traec-react/utils/form";

import { EMAIL_TYPE_HEADERS, EMAIL_TYPES } from "traec-react/emails/reportCompany";

const EMAIL_DEFAULT_FREQS = {
  company_invite: 7
};

export function EmailSettingsTableHeaders() {
  let cols = ["Block All"].concat(EMAIL_TYPE_HEADERS.concat(["Save"])).map((header, i) => (
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

export class CompanyEmailSettingRow extends React.Component {
  constructor(props) {
    super(props);

    let { recipient } = props;
    let emailTypeMap = (recipient.get("settings") || Traec.Im.List()).reduce((a, c) => {
      return a.set(c.get("email_type"), c.get("frequency"));
    }, Traec.Im.Map());

    let emailTypeValues = EMAIL_TYPES.reduce((a, c) => {
      a[c] = emailTypeMap.get(c) || EMAIL_DEFAULT_FREQS[c];
      return a;
    }, {});

    this.state = {
      ...emailTypeValues,
      blockAll: recipient.get("blocked") || false
    };

    this.handleChange = this.handleChange.bind(this);
    this.setBlockAll = this.setBlockAll.bind(this);
    this.patchData = this.patchData.bind(this);
  }

  /*
  EVENT HANDLERS
  */

  handleChange(e) {
    e.preventDefault();
    let value = e.target.value;
    if (isNaN(value)) {
      value = -1;
    }
    this.setState({ [e.target.name]: value });
  }

  setBlockAll(e) {
    this.setState({ blockAll: e.target.checked });
  }

  /*
  ACTION HANDLERS
  */

  patchData() {
    let { companyId, recipient } = this.props;
    let recipientId = recipient.get("uid");
    let fetch = new Traec.Fetch("company_email_recipient", "patch", { companyId, recipientId });
    fetch.updateFetchParams({
      preFetchHook: body => ({
        blocked: this.state.blockAll,
        settings: this.state.blockAll
          ? []
          : EMAIL_TYPES.map(i => ({
              email_type: i,
              frequency: this.state[i] || null
            }))
      })
    });
    fetch.dispatch();
  }

  /*
  RENDER METHODS
  */

  render() {
    let { recipient, companyId } = this.props;
    let total = 0;

    let cols = EMAIL_TYPES.map((emailType, i) => {
      let input = null;
      if (!this.state.blockAll) {
        let num = this.state[emailType] || 0;
        num = num < 0 ? "once" : num;
        input = (
          <input
            className="form-control text-center mt-0 mb-0 pt-0 pb-0"
            id={emailType}
            name={emailType}
            value={num}
            onChange={this.handleChange}
          />
        );
      }
      return (
        <div key={i} className="col-sm-1 text-center">
          {input}
        </div>
      );
    });

    // Add the Save button to the last column
    cols.unshift(
      <div key={-1} className="col-sm-1 text-center align-middle">
        <input
          className="form-check-input"
          type="checkbox"
          name="blockAll"
          checked={this.state.blockAll || false}
          onChange={this.setBlockAll}
        />
      </div>
    );

    // Add the Save button to the last column
    cols.push(
      <div key={cols.length} className="col-sm-1 text-center" onClick={this.patchData}>
        <button className="btn btn-sm btn-primary pt-0 pb-0 ">Save</button>
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
}

class TraecCompanyEmailSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.requiredFetches = [new Traec.Fetch("company_email_recipient", "list")];

    // action bindings
    this.addRecipient = this.addRecipient.bind(this);
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  addRecipient(e) {
    e.preventDefault();
    let { companyId } = this.props;
    let fetch = new Traec.Fetch("company_email_recipient", "post", { companyId });
    this.setState({ formParams: fetch.params });
    fetch.toggleForm();
  }

  render() {
    let { recipients, companyId } = this.props;
    if (!recipients) {
      return null;
    }

    let rows = null;

    // If we have nothing then set a message
    if (recipients.toList().size == 0) {
      rows = (
        <p>
          <b>No notifications sent for this company yet</b>
        </p>
      );
    }

    rows = recipients
      .toList()
      .map((recipient, i) => <CompanyEmailSettingRow key={i} recipient={recipient} companyId={companyId} />);

    return (
      <React.Fragment>
        <h2>Email Settings</h2>

        <br />
        <p>
          Adjust the numbers below to set the frequency that recipients receive various email types. 1=daily, 7=weekly,
          etc.
        </p>
        <p>
          Type "once", "na" or "-1" to set a recipient to receive the email only once. Selecting "Block All" will
          prevent this user from receving any email notifications on this company.
        </p>
        <br />

        <BSBtnDropdown links={[{ name: "Add a Recipient", onClick: this.addRecipient }]} />
        <BaseForm params={this.state.formParams} fields={{ email: { value: "", class: "col", endRow: true } }} />
        <div style={{ clear: "both" }} />

        <EmailSettingsTableHeaders />
        {rows}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { companyId } = ownProps.match.params;
  let recipients = state.getInPath(`entities.companyObjects.byId.${companyId}.recipients`);
  // Add this to props
  return {
    companyId,
    recipients
  };
};

export default connect(mapStateToProps)(TraecCompanyEmailSettings);
