import React from "react";
import { connect } from "react-redux";
import { BreadCrumb } from "traec-react/project/utils";
import MemberList from "./memberList";
import InviteList from "./inviteList";
import DisciplineList from "./disciplineList";
import AuthGroupList from "./authGroupList";
import { projectPermissionRender } from "traec/utils/permissions/project";

export class ProjectMembers extends React.Component {
  render() {
    const { projectId, project, company, seeAssignments } = this.props;
    if (!project) {
      return "";
    }

    // Initially passed to specify which project uses this component so that this panel renders different information.
    // Currently unused
    if (seeAssignments) {
      return (
        <React.Fragment>
          <h3>Project Member Admin</h3>
          <BreadCrumb company={company} project={project} />

          {/*Render the members panel if allowed */}
          <MemberList projectId={projectId} />

          {/*Render the invites panel if allowed */}
          <InviteList projectId={projectId} />

          {/*Render the discipline panel if allowed */}
          <DisciplineList projectId={projectId} />

          {/* Render the authGroup panel if allowed */}
          {projectPermissionRender(this.props.projectId, true, [], <AuthGroupList projectId={projectId} />)}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h3>Project Member Admin</h3>
          <BreadCrumb company={company} project={project} />

          {/*Render the members panel if allowed */}
          <MemberList projectId={projectId} />

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
}

const mapStateToProps = (state, ownProps) => {
  const { projectId } = ownProps.match.params;
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
