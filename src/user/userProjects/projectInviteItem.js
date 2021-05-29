import React from "react";
import ReactDOM from "react-dom";
import Traec from "traec";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import { ActionButton } from "../button";

export default class ProjectInviteItem extends React.Component {
  constructor(props) {
    super(props);

    this.respondInvite = this.respondInvite.bind(this);
  }

  respondInvite(e, accept) {
    e.preventDefault();
    let status = accept ? "accepted" : "rejected";
    const { invite } = this.props;
    let projectId = invite.getInPath("project_discipline.project.uid");
    let inviteId = invite.get("uid");
    let fetch = new Traec.Fetch("project_invite", "put", { projectId, inviteId });
    fetch.updateFetchParams({
      preFetchHook: body => ({ status }),
      postSuccessHook: () => {
        location.reload();
      }
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
        <div className="col-sm-7">{invite.getIn(["project_discipline", "project", "name"])}</div>
        <div className="col-sm-3">{invite.getIn(["project_discipline", "auth", "name"])}</div>
        <div className="col-sm-2">
          {/*<BSBtnDropdown links={this.dropDownLinks()} />*/}
          <ActionButton color="success" text="accept" onClickHandler={e => this.respondInvite(e, true)} />
          <ActionButton color="danger" text="reject" onClickHandler={e => this.respondInvite(e, false)} />
        </div>
      </div>
    );
  }
}
