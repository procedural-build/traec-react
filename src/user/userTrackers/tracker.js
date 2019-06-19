import React from "react";
import ReactDOM from "react-dom";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Traec from "traec";
import { BSCard } from "traec-react/utils/bootstrap";
import BaseFormConnected from "traec-react/utils/form";
import TrackerItem from "AppSrc/project/tracker";

export const counter = { row: 0 };

class UserTracker extends React.Component {
  constructor(props) {
    super(props);

    const projectId = props.projectId;
    this.fetch = new Traec.Fetch("tracker", "post", { projectId });
    let { fetchParams, stateParams } = fetch;
    this.state = {
      formParams: {
        fetchParams,
        stateParams,
        initFields: {}
      }
    };

    this.requiredFetches = [new Traec.Fetch("project_tracker", "list")];

    //this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    Traec.fetchRequired.bind(this)();
  }

  render() {
    let { items } = this.props;
    if (!items) {
      return null;
    }

    let trackerList = items
      .toList()
      .sortBy((obj, i) => obj.get("name"))
      .map((item, i) => <TrackerItem key={i} index={i} tracker={item} />);

    // Reset the row counter
    counter.row = 0;
    return (
      <BSCard
        id="user-trackers"
        widthOffset="col-sm-12"
        title="My Trackers"
        body={trackerList}
        //body={<p>List of Projects that this User is contributing to</p>}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { projectId } = ownProps;
  let project = state.getInPath(`entities.projects.byId.${projectId}`);

  let trackers = state.getInPath(`entities.trackers.byId`);

  if (trackers) {
    trackers = trackers.toList().filter(i => i.getInPath("project.uid") == projectId);
  }

  return {
    project,
    items: trackers,
    newItem: state.getInPath(`entities.trackers.newItem`) || [],
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
)(UserTracker);
