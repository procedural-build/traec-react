import React from "react";
import { Link } from "react-router-dom";

import Traec from "traec";

import { BSBtnDropdown } from "../utils/bootstrap/";
import { isSuperuser } from "../utils";
import { confirmDelete } from "../utils/sweetalert";

export default class ProjectItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.deleteProject = this.deleteProject.bind(this);
  }

  deleteProject(e) {
    e.preventDefault();
    let { project, dispatch } = this.props;
    let projectId = project ? project.get("uid") : null;
    if (!projectId) {
      return null;
    }

    let projectName = project.get("name");
    confirmDelete({
      text: `This will delete the Project: ${projectName} and all associated data.\n\n Are you sure you would like to proceed?`,
      onConfirm: () => {
        new Traec.Fetch("project", "delete", { projectId }).dispatch();
      }
    });
  }

  render_menu() {
    if (!isSuperuser(this.props.user)) {
      return null;
    }
    return <BSBtnDropdown links={[{ name: "Delete", onClick: this.deleteProject }]} />;
  }

  render() {
    let { project, index: i } = this.props;
    return (
      <div className="row" key={i} style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
        <div className="col-sm-12">
          <Link to={"/project/" + project.get("uid")}>{project.get("name")}</Link>
          {this.render_menu()}
        </div>
      </div>
    );
  }
}
