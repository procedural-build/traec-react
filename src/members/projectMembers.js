import React from "react";
import { connect } from "react-redux";
import { BreadCrumb } from "traec-react/project/utils";
import MemberList from "./memberList";
import InviteList from "./inviteList";
import DisciplineList from "./disciplineList";
import AuthGroupList from "./authGroupList";
import { projectPermissionRender } from "traec/utils/permissions/project";
import Traec from "traec";

export class ProjectMembers extends React.Component {
  render() {
    const { projectId, project, company, seeAssignments } = this.props;
    if (!project) {
      return "";
    }
    return (
      <React.Fragment>
        <h3>Project Member Admin</h3>
        <BreadCrumb company={company} project={project} />

        {/*Render the members panel if allowed */}
        <MemberList projectId={projectId} seeAssignments={seeAssignments} />

        {/*Render the invites panel if allowed */}
        <InviteList projectId={projectId} />

        {/*Render the discipline panel if allowed */}
        <DisciplineList projectId={projectId} />

        {/*Render the authGroup panel if allowed */}
        {projectPermissionRender(this.props.projectId, true, [], <AuthGroupList projectId={projectId} />)}

        {this.props.children}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { projectId } = Traec.utils.getFullIds(state, ownProps.match.params);
  let project = state.getInPath(`entities.projects.byId.${projectId}`);
  let company = project ? project.get("company") : null;
  return { projectId, project, company };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMembers);
