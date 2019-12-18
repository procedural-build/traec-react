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
    getRefs();
    getCommitEdges(this.props.userRefs);
  }

  renderRefs() {
    let { userRefs } = this.props;

    if (!userRefs || userRefs.length === 0) {
      return <Spinner explanation="Loading Tasks" timedOutComment="No Tasks Found" />;
    }

    return userRefs.map((cref, index) => <UserRefItem key={index} cref={cref} index={index} />);
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
        title: getCardName(state, ref),
        status: ref.getIn(["latest_commit", "status"]),
        project,
        company,
        trackerId,
        commitId: ref.getIn(["latest_commit", "uid"])
      };
    });
  }
  return refs;
};

export const getCardName = function(state, ref) {
  let treeId = ref.getIn(["latest_commit", "tree_root", "uid"]);
  let commitId = ref.getIn(["latest_commit", "uid"]);

  try {
    let descriptionId = state.getInPath(`entities.commitEdges.byId.${commitId}.trees.${treeId}.descriptions`).last();
    return state.getInPath(`entities.descriptions.byId.${descriptionId}.title`);
  } catch (e) {
    return null;
  }
};

export const getRefs = function() {
  new Traec.Fetch("tracker_ref_all", "list", { isResponsible: true }).dispatch();
};

export const getCommitEdges = function(userRefs) {
  userRefs.map(ref => {
    if (ref.trackerId && ref.commitId) {
      new Traec.Fetch("tracker_commit_edge", "read", { trackerId: ref.trackerId, commitId: ref.commitId }).dispatch();
    }
  });
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRefs);
