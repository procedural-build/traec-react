import React from "react";
import ReactDOM from "react-dom";

import Traec from "traec";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";

export default class CompanyInviteItem extends React.Component {
  constructor(props) {
    super(props);

    this.respondInvite = this.respondInvite.bind(this);
  }

  respondInvite(e, accept) {
    e.preventDefault();
    const { invite } = this.props;
    let companyId = invite.getIn(["company", "uid"]);
    let inviteId = invite.get("uid");
    let fetch = new Traec.Fetch("company_invite", "patch", { companyId, inviteId });
    fetch.updateFetchParams({
      preFetchHook: body => ({ accepted: accept })
    });
    fetch.dispatch();
  }

  dropDownLinks() {
    return [
      { name: "Accept", onClick: e => this.respondInvite(e, true) },
      { name: "Reject", onClick: e => this.respondInvite(e, false) }
    ];
  }

  render() {
    const i = this.props.index;
    const invite = this.props.invite;
    return (
      <div className="row" key={i} style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
        <div className="col-sm-7">{invite.getIn(["company", "name"])}</div>
        <div className="col-sm-4">{invite.getIn(["auth", "name"])}</div>
        <div className="col-sm-1">
          <BSBtnDropdown links={this.dropDownLinks()} />
        </div>
      </div>
    );
  }
}
