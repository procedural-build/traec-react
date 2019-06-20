import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { RightArrow, Spinner } from "traec-react/utils/entities";

import MemberList from "./memberList";
import InviteList from "./inviteList";
import DisciplineList from "./disciplineList";
import AuthGroupList from "./authGroupList";
import { projectPermissionRender } from "traec/utils/permissions/project";

class ProjectMembers extends React.Component {
  company_name() {
    let { company } = this.props;
    if (!company) {
      return "";
    }
    return <Link to={`/company/${company.get("uid")}`}>{company.get("name")}</Link>;
  }

  render() {
    const { projectId, project } = this.props;
    if (!project) {
      return "";
    }
    return (
      <React.Fragment>
        <h3>Project Member Admin</h3>
        <p>
          {this.company_name()} <RightArrow /> {project.get("name")}
        </p>

        {/*Render the members panel if allowed */}
        <MemberList projectId={projectId} />

        {/*Render the invites panel if allowed */}
        <InviteList projectId={projectId} />

        {/*Render the discipline panel if allowed */}
        <DisciplineList projectId={projectId} />

        {/*Render the authGroup panel if allowed */}
        {projectPermissionRender(this.props.projectId, true, [], <AuthGroupList projectId={projectId} />)}
      </React.Fragment>
    );
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectMembers);
