import React from "react";
import { connect } from "react-redux";
import Traec from "traec";

import { setNavBarItems } from "traec-react/navBar";
import { setSideBarItems } from "traec-react/sideBar";
import TraecProjectTrackers from "./trackers";
import { getProjectProps, BreadCrumb } from "./utils";
import {
  projectPermissionRender,
  getProjectPermissions,
  projectPermissionFilter,
  projectPermissionCheck
} from "traec/utils/permissions/project";

class TraecProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarUrl: "",
      fetchedUrls: {},
      setSideBar: false,
      setNavBar: false
    };

    this.requiredFetches = [
      new Traec.Fetch("project_tracker", "list"),
      new Traec.Fetch("tracker_branch", "list"),
      new Traec.Fetch("project", "read")
    ];
  }

  componentDidMount() {
    const { projectId } = this.props;
    projectPermissionCheck(projectId, false, []);

    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate(prevProps, prevState) {
    const { projectId } = this.props.projectId;
    projectPermissionCheck(projectId, false, []);

    //this.setNavBar();
    //this.setSideBar();
    Traec.fetchRequired.bind(this)();
  }

  setNavBar(forceUpdate = false) {
    let navBarLinks = this.navBarLinks();
    if ((!this.state.setNavBar && navBarLinks) || forceUpdate) {
      this.setState({ setNavBar: true });
      this.props.dispatch(setNavBarItems(navBarLinks));
    }
  }

  setSideBar(forceUpdate = false) {
    let sideBarLinks = this.sideBarLinks();
    if ((!this.state.setSideBar && sideBarLinks) || forceUpdate) {
      if (!forceUpdate) {
        this.setState({ setSideBar: true });
      }
      this.props.dispatch(setSideBarItems(sideBarLinks));
    }
  }

  // To be set using Redux state
  navBarLinks() {
    let { projectId } = this.props;
    let links = [
      {
        label: "Project menu",
        requiresAdmin: true,
        to: [
          { label: "Members", to: `/project/${projectId}/members/` },
          { label: "Email Settings", to: "email/settings" },
          { label: "Email Statistics", to: "email/report" }
        ]
      }
    ];
    return projectPermissionFilter(projectId, links);
  }

  sideBarLinks() {
    let { projectId } = this.props;
    let links = [
      {
        to: [{ label: "Members", to: `/project/${projectId}/members/` }]
      }
    ];
    return projectPermissionFilter(projectId, links);
  }

  renderMain() {
    let { company, project, projectId } = this.props;
    if (!project) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="container">
          <div className="row" style={{ minHeight: "800px" }}>
            <div className="col-sm-12">
              <BreadCrumb company={company} project={project} />
              <TraecProjectTrackers projectId={projectId} title="Rating Schemes" addButtonText="Add a Scheme" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    // Check the User permissions for this project
    return this.renderMain();
    //return projectPermissionRender(this.props.projectId, false, ["READ_PROJECT_REPORT"], this.renderMain(), true);
  }
}

const mapStateToProps = (state, ownProps) => {
  let { projectId, refId } = ownProps.match.params;

  let { company, project, tracker, trackerId, cref, isRootRef, rootRef, rootRefId } = getProjectProps(
    state,
    projectId,
    refId
  );
  // Get the user permissions
  let userPermissions = getProjectPermissions(state, projectId);
  // Return the props
  return {
    projectId,
    project,
    company,
    tracker,
    trackerId,
    rootRefId,
    rootRef,
    isRootRef,
    refId,
    cref,
    userPermissions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TraecProjectDetail);
