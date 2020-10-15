import React from "react";
import { connect } from "react-redux";
import { BreadCrumb } from "traec-react/project/utils";
import MemberList from "./memberList";
import InviteList from "./inviteList";
import DisciplineList from "./disciplineList";
import AuthGroupList from "./authGroupList";
import { ProjectPermission } from "traec/utils/permissions/project";
import Traec from "traec";
import { ErrorBoundary } from "../errors";

export class ProjectMembers extends React.Component {
  render() {
    const { children, projectId, project, company, seeAssignments } = this.props;
    if (!project) {
      return "";
    }
    return (
      <React.Fragment>
        <h3>Project Member Admin</h3>
        <BreadCrumb company={company} project={project} />

        {/*Render the members panel if allowed */}

        <ErrorBoundary>
          <MemberList projectId={projectId} seeAssignments={seeAssignments} />
        </ErrorBoundary>

        {/*Render the invites panel if allowed */}
        <ErrorBoundary>
          <InviteList projectId={projectId} />
        </ErrorBoundary>

        {/*Render the discipline panel if allowed */}
        <ErrorBoundary>
          <DisciplineList projectId={projectId} />
        </ErrorBoundary>

        {/*Render the authGroup panel if allowed */}
        <ErrorBoundary>
          <ProjectPermission projectId={projectId} requiredAdmin={true}>
            <AuthGroupList projectId={projectId} />
          </ProjectPermission>
        </ErrorBoundary>

        {children}
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

export default connect(mapStateToProps)(ProjectMembers);
