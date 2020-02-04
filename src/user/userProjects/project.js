import React from "react";
import { connect } from "react-redux";

import Traec from "traec";
import { BSCard } from "traec-react/utils/bootstrap";
import BaseFormConnected from "traec-react/utils/form";
import { ProjectItem } from "./projectItem";

export const projectFields = {
  name: { value: "", class: "col", endRow: true },
  address: { value: "", class: "col", endRow: true },
  suburb: { value: "", class: "col" },
  postcode: { value: "", class: "col" },
  country: { value: "", class: "col", endRow: true },
  client: { value: "", class: "col-sm-8" },
  NLA: { label: "Project NLA", value: "", class: "col", endRow: true }
};

export const counter = { row: 0 };

class UserProjects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formParams: {
        stateParams: {},
        fetchParams: {},
        initFields: {}
      }
    };

    // Data required from the API for this Component
    this.requiredFetches = [
      new Traec.Fetch("project", "list"),
      new Traec.Fetch("tracker_ref_all", "list"),
      new Traec.Fetch("tracker_commit_all", "list")
    ];
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  render() {
    let { projects } = this.props;
    if (!projects) {
      return null;
    }

    let projectList = projects
      .toList()
      .sortBy((obj, i) => obj.get("name"))
      .map((item, i) => (
        <ProjectItem key={i} index={i} project={item} showTrackers={false}>
          {this.props.children}
        </ProjectItem>
      ));

    // Reset the row counter
    counter.row = 0;
    return (
      <BSCard
        id="user-projects"
        widthOffset="col-sm-12"
        title={this.props.title ? this.props.title : "My Projects"}
        body={projectList}
        form={
          <BaseFormConnected
            stateParams={this.state.formParams.stateParams}
            fetchParams={this.state.formParams.fetchParams}
            fields={projectFields}
          />
        }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let projects = state.getInPath("entities.projects.byId");
  let newItem = state.getInPath("entities.projects.newItem");
  let isAuthenticated = state.getInPath("auth.isAuthenticated");

  // Map the responsible refs onto the list of projects
  let userRefs = state.getInPath("entities.refs.byId");
  if (projects && userRefs) {
    for (let [crefId, cref] of userRefs) {
      if (!cref.getInPath("latest_commit.discipline")) {
        continue;
      }
      if (!(cref.get("depth") > 1)) {
        continue;
      }
      let projectId = cref.get("project");
      if (projects.has(projectId)) {
        projects = projects.addListToSet(`${projectId}.related_refs`, [cref]);
      }
    }
  }

  // Map th responsible commits onto  the list of projects
  let commits = state.getInPath("entities.commits.byId");
  if (projects && commits) {
    for (let [commitId, commit] of commits) {
      if (!commit.getInPath("meta_json.actionRequiredBy")) {
        continue;
      }
      if (!commit.get("reporting_period")) {
        continue;
      }
      let projectId = commit.get("project");
      if (projects.has(projectId)) {
        projects = projects.addListToSet(`${projectId}.related_commits`, [commit]);
      }
    }
  }

  return { projects, newItem, isAuthenticated, userRefs };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProjects);
