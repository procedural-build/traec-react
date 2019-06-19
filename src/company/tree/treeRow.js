import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import Octicon from "react-octicon";
import { companyPermissionRender } from "traec/utils/permissions/company";

export default class CompanyTreeRow extends React.Component {
  get_child_company(childId) {
    return this.props.companyList.get(childId);
  }

  render_subtree_list() {
    let { company, companyList, currentId } = this.props;
    let childIds = company.get("childids");
    if (!childIds) {
      return "";
    }
    let subTrees = childIds.map((childId, i) => {
      let child = this.get_child_company(childId);
      if (!child) {
        return null;
      }
      return <CompanyTreeRow key={i} company={child} companyList={companyList} currentId={currentId} />;
    });
    return subTrees;
  }

  render_project_count() {
    return "";
  }

  render_project_list() {
    let { company } = this.props;
    let projectList = company.get("projects");
    let projects = projectList.map((project, i) => {
      let projectId = project.get("uid");
      if (!project) {
        return null;
      }
      return (
        <p key={i} className={`m-0 p-0 mr-2 pr-2`}>
          <Link to={`/project/${project.get("uid")}`}>
            <Octicon name="tools" /> <i>{project.get("name")}</i>
          </Link>
        </p>
      );
    });
    return projects;
  }

  isCurrent() {
    let { currentId, company } = this.props;
    if (company.get("uid") == currentId) {
      return true;
    }
    return false;
  }

  render() {
    let { company } = this.props;
    let isCurrent = this.isCurrent();
    let bgColor = isCurrent ? "bg-info" : "";
    return (
      <div className="m-0 ml-2">
        <div className={`row m-0 p-0 ${bgColor}`}>
          <p className={`m-0 p-0 mr-2 pr-2`} style={{ display: "inline-block", verticalAlign: "middle" }}>
            <Link to={`/company/${company.get("uid")}`}>
              <Octicon name="server" /> {company.get("name")}
            </Link>
          </p>
          {this.props.extraContent}

          {this.render_project_count()}
        </div>
        {/* Project list */}
        {companyPermissionRender(
          this.props.currentId,
          false,
          ["READ_COMPANY_PROJECT"],
          <div className="m-0 p-0 ml-2">{this.render_project_list()}</div>
        )}

        {/* Render the sub-elements */}
        {this.render_subtree_list()}
      </div>
    );
  }
}
