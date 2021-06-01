import React from "react";
import Traec from "traec";
import { connect } from "react-redux";
import { BSCard } from "traec-react/utils/bootstrap";
import InviteItem, { RequestItem } from "./item";
import { ErrorBoundary } from "traec-react/errors/handleError";

export function SubInviteList({ items, title }) {
  if (!items || !items.size) {
    return null;
  }
  return (
    <ErrorBoundary>
      <div className="row">
        <div className="col-sm-12">
          <b>{title}</b>
        </div>
      </div>
      {items}
    </ErrorBoundary>
  );
}

export class InviteList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    // Data required from the API for this Component
    if (props.projectId) {
      this.requiredFetches = [new Traec.Fetch("project_invite", "list")];
    } else if (props.companyId) {
      this.requiredFetches = [new Traec.Fetch("company_invite", "list")];
    }
  }

  componentDidMount() {
    Traec.fetchRequiredFor(this);
  }

  componentDidUpdate() {
    Traec.fetchRequiredFor(this);
  }

  render() {
    let { invites, companyId, projectId, dispatch } = this.props;
    if (!invites || !invites.size) {
      return null;
    }

    // Get the company requests
    let requestList = invites
      .toList()
      .filter(i => i && i.has("uid") && i.get("is_request"))
      .sortBy((obj, i) => obj.get("created"))
      .map((invite, i) => (
        <RequestItem key={i} index={i} item={invite} companyId={companyId} projectId={projectId} dispatch={dispatch} />
      ));

    // Get the list of Invite components
    let inviteList = invites
      .toList()
      .filter(i => i && i.has("uid") && !i.get("is_request"))
      .sortBy((obj, i) => obj.get("created"))
      .map((invite, i) => (
        <InviteItem key={i} index={i} item={invite} companyId={companyId} projectId={projectId} dispatch={dispatch} />
      ));

    return (
      <div className="row">
        <BSCard
          widthOffset="col-sm-12"
          title="Outstanding Invitations or Requests"
          button={null}
          body={
            <ErrorBoundary>
              <SubInviteList items={requestList} title="Requests" />
              <SubInviteList items={inviteList} title="Invitations" />
            </ErrorBoundary>
          }
          form={null}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { companyId, projectId } = ownProps;
  let project = null;
  let company = null;
  let invites = null;

  if (projectId) {
    project = state.getInPath(`entities.projects.byId.${projectId}`);
    invites = state.getInPath(`entities.projectObjects.byId.${projectId}.invites`);
  } else if (companyId) {
    company = state.getInPath(`entities.companies.byId.${companyId}`);
    invites = state.getInPath(`entities.companyObjects.byId.${companyId}.invites`);
  }

  return {
    project,
    company,
    invites,
    isAuthenticated: state.getInPath("auth.isAuthorized")
  };
};

export default connect(mapStateToProps)(InviteList);
