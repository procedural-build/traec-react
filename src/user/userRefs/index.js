import React from "react";
import { BSCard } from "traec-react/utils/bootstrap";
import { connect } from "react-redux";
import Traec from "traec";
import { UserRefItem } from "./refItem";
import { Spinner } from "traec-react/utils/entities";
import { getTrackers, getCompanyProjectFromTracker } from "../userDocuments";

class UserRefs extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUpdate() {
    getTrackers(this.props.projectIds);
    this.getRefs();
  }

  getRefs() {
    new Traec.Fetch("tracker_ref_all", "list", { isResponsible: true }).dispatch();
  }

  renderRefs() {
    let { userRefs } = this.props;

    if (!userRefs || userRefs.length === 0) {
      return <Spinner explanation="Loading Tasks" timedOutComment="No Tasks Found" />;
    }

    return userRefs.map((ref, index) => <UserRefItem key={index} ref={ref} index={index} />);
  }
  render() {
    return <BSCard id="user-refs" widthOffset="col-sm-12" title="My Tasks" body={this.renderRefs()} />;
  }
}

export const getRefsFromState = function(state) {
  let userRefIds = state.getInPath("entities.user.refs.byId");
  let refs = [];
  if (userRefIds) {
    refs = userRefIds.toArray().map(refId => {
      let ref = state.getInPath(`entities.refs.byId.${refId[0]}`);
      let trackerId = ref.get("tracker");
      let { project, company } = getCompanyProjectFromTracker(state, trackerId);
      return {
        title: ref.get("name"),
        status: ref.getIn(["latest_commit", "status"]),
        project,
        company
      };
    });
  }
  return refs;
};

export const mapStateToProps = state => {
  let projects = state.getInPath("entities.projects.byId");
  let projectIds = projects ? projects.map(project => project.get("uid")) : null;

  let trackers = state.getInPath("entities.trackers.byId");
  let trackerIds = trackers ? trackers.map(tracker => tracker.get("uid")) : null;

  let userRefs = getRefsFromState(state);
  return { trackerIds, projectIds, userRefs };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRefs);
