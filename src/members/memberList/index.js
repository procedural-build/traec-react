import React from "react";
import { connect } from "react-redux";
import Traec from "traec";

import { BSCard, BSBtn, BSBtnDropdown } from "traec-react/utils/bootstrap";

import { objToList } from "traec-react/utils";
import InviteForm, { companyInviteFields, projectInviteFields } from "./form";
import { companyPermissionRender } from "traec/utils/permissions/company";
import { projectPermissionRender } from "traec/utils/permissions/project";
import MemberItem from "./item";

class MemberList extends React.Component {
  constructor(props) {
    super(props);

    if (props.companyId) {
      const companyId = props.companyId;
      this.fetch = new Traec.Fetch("company_invite", "post", { companyId });
      this.requiredFetches = [new Traec.Fetch("company_member", "list")];
    } else if (props.projectId) {
      const projectId = props.projectId;
      this.fetch = new Traec.Fetch("project_invite", "post", { projectId });
      this.requiredFetches = [new Traec.Fetch("project_member", "list")];
    }
    let { fetchParams, stateParams } = this.fetch.params;

    this.state = {
      formParams: {
        fetchParams,
        stateParams,
        initFields: {}
      }
    };

    // Bindings for actions
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  /* ACTIONS */

  onClick(e) {
    e.preventDefault();
    this.fetch.toggleForm();
  }

  /* RENDERING */

  render() {
    let { companyId, projectId, members, dispatch } = this.props;
    let itemList = objToList(members)
      .sortBy(i => i.getIn(["user", "first_name"]))
      .map((member, i) => (
        <MemberItem key={i} index={i} dispatch={dispatch} member={member} companyId={companyId} projectId={projectId} />
      ));

    let permissionRender = null;
    let inviteFields = null;

    if (projectId) {
      permissionRender = projectPermissionRender(
        projectId,
        true,
        [],
        <BSBtn onClick={this.onClick} text="Send Invite" />
      );
      inviteFields = projectInviteFields;
    } else if (companyId) {
      permissionRender = companyPermissionRender(
        companyId,
        true,
        [],
        <BSBtn onClick={this.onClick} text="Send Invite" />
      );
      inviteFields = companyInviteFields;
    }

    return (
      <div className="row">
        <BSCard
          widthOffset="col-sm-12"
          title="Members"
          button={permissionRender}
          body={itemList}
          form={
            <InviteForm
              companyId={companyId}
              projectId={projectId}
              stateParams={this.state.formParams.stateParams}
              fetchParams={this.state.formParams.fetchParams}
              fields={inviteFields}
            />
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { companyId, projectId } = ownProps;
  let project = null;
  let company = null;
  let members = null;

  if (projectId) {
    project = state.getInPath(`entities.projects.byId.${projectId}`);
    members = state.getInPath(`entities.projectObjects.byId.${projectId}.members`);
  } else if (companyId) {
    company = state.getInPath(`entities.companies.byId.${companyId}`);
    members = state.getInPath(`entities.companyObjects.byId.${companyId}.members`);
  }

  return {
    company,
    project,
    members,
    isAuthenticated: state.getInPath("auth.isAuthorized")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberList);
