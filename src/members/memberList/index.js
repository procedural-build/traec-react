import React from "react";
import { connect } from "react-redux";
import Traec from "traec";

import { BSCard, BSBtn, BSBtnDropdown } from "traec-react/utils/bootstrap";

import { objToList } from "traec-react/utils";
import InviteForm, { companyInviteFields, projectInviteFields } from "./form";
import { companyPermissionRender } from "traec/utils/permissions/company";
import { projectPermissionRender } from "traec/utils/permissions/project";
import MemberItem from "./item";

export class MemberList extends React.Component {
  constructor(props) {
    super(props);

    if (props.companyId) {
      const companyId = props.companyId;
      this.fetch = new Traec.Fetch("company_invite", "post", { companyId });
      this.requiredFetches = [new Traec.Fetch("company_member", "list"),
                              new Traec.Fetch("tracker_commit_document_object", "list"),
                              ];
      
    } else if (props.projectId) {
      const projectId = props.projectId;
      this.fetch = new Traec.Fetch("project_invite", "post", { projectId });
      this.requiredFetches = [
        new Traec.Fetch("project_discipline", "list"),
        new Traec.Fetch("tracker_commit_document_object", "list"),
        new Traec.Fetch("project_member", "list")
      ];
    }
    let { fetchParams, stateParams } = this.fetch.params;

    this.requiredFetches = [
      new Traec.Fetch("project_discipline", "list"),
      new Traec.Fetch("tracker_commit_document_object", "list"),
      new Traec.Fetch("project_member", "list"),
      new Traec.Fetch("tracker_commit_edge", "read"),
      new Traec.Fetch("tracker_commit_value", "list"),
    ];
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
    console.log("FDSAFDSA", this.fetch.params);
    this.fetch.toggleForm();
  }

  /* RENDERING */

  render() {
    let { companyId, projectId, members, dispatch } = this.props;
    let itemList = objToList(members)
      .sortBy(i => i.getIn(["user", "first_name"]))
      .map((member, i) => (
        // <MemberItem key={i} index={i} dispatch={dispatch} member={member} companyId={companyId} projectId={projectId} memberList={memberList} dgnb={true}/>
        <MemberItem key={i} index={i} dispatch={dispatch} member={member} companyId={companyId} projectId={projectId} dgnb={true}/>

        ));

    let permObjId = projectId ? projectId : companyId;
    let permRenderFunc = projectId ? projectPermissionRender : companyPermissionRender;
    let inviteFields = projectId ? projectInviteFields : companyInviteFields;

    let permissionRender = permRenderFunc(permObjId, true, [], <BSBtn onClick={this.onClick} text="Send Invite" />);

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
              params={this.state.formParams}
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
  
  //Get documents that are assigned to a user/contain a discipline ID
  // const basePath = `entities.commitEdges.byId.${commitId}.documents.${docId}`;
  // let docStatusId = state.getInPath(`${basePath}.status`);
  // const docStatus = state.getInPath(`entities.docStatuses.byId.${docStatusId}`);

  // Check that the document uid matches with the discipline uid and then get the name of that discipline to display on the document.
  // let assignee = documentAssigneeList.toList().map(item => {
  //   if (item.getInPath(`base_uid`) === docDisciplineId) {
  //     const itemName = item.getInPath(`name`);
  //     return itemName;
  //   } else {
  //     return;
  //   }
  // });

  return {
    company,
    project,
    members,
    isAuthenticated: state.getInPath("auth.isAuthorized"),
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
