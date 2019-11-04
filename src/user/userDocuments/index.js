import React from "react";
import { BSCard } from "traec-react/utils/bootstrap";
import { connect } from "react-redux";
import Traec from "traec";
import { UserDocumentItem } from "./documentItem";
import { Spinner } from "traec-react/utils/entities";
import Im from "traec/immutable";
import { RenderErrorMessage } from "../../errors/handleError";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount() {
    this.getDocuments();
  }

  componentDidUpdate() {
    if (!this.props.singleTracker) {
      getTrackers(this.props.projectIds);
    }

    this.getDocuments();
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  getDocuments() {
    let { trackerIds } = this.props;
    if (trackerIds) {
      trackerIds.map(trackerId => new Traec.Fetch("tracker_documents", "list", { trackerId }).dispatch());
    }
  }

  renderDocuments() {
    if (this.state.hasError) {
      return <RenderErrorMessage error={this.state.error} />;
    }

    let { documents } = this.props;

    if (!documents || documents.length === 0) {
      return <Spinner explanation="Loading Documents" timedOutComment="No Documents Found" />;
    }

    return documents.map((document, index) => <UserDocumentItem key={index} document={document} index={index} />);
  }
  render() {
    return <BSCard id="user-documents" widthOffset="col-sm-12" title="My Documents" body={this.renderDocuments()} />;
  }
}

export const getDocumentsFromState = function(state) {
  let userDocuments = state.getInPath("entities.user.documents.byId");
  let documents = [];
  if (userDocuments) {
    documents = userDocuments.toArray().map(document => {
      let descriptionId = document[1].get("description");
      let statusId = document[1].get("status");
      let trackerId = document[1].get("trackerId");
      let { project, company } = getCompanyProjectFromTracker(state, trackerId);
      return {
        title: state.getInPath(`entities.descriptions.byId.${descriptionId}.title`),
        status: state.getInPath(`entities.docStatus.byId.${statusId}.status`),
        project,
        company
      };
    });
  }
  return documents;
};

export const getCompanyProjectFromTracker = function(state, trackerId) {
  let projectId = state.getInPath(`entities.trackers.byId.${trackerId}.project.uid`);
  let project = state.getInPath(`entities.projects.byId.${projectId}`);
  let companyName = state.getInPath(`entities.projects.byId.${projectId}.company.name`);

  return { project, company: companyName };
};

export const mapStateToProps = (state, ownProps) => {
  let projects = state.getInPath("entities.projects.byId");
  let projectIds = projects ? projects.map(project => project.get("uid")) : null;

  let { trackerIds, singleTracker } = getTrackersInState(state, ownProps);

  let documents = getDocumentsFromState(state);
  return { trackerIds, projectIds, documents, singleTracker };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);

const getTrackersInState = function(state, ownProps) {
  let trackerIds = null;
  let singleTracker = null;

  try {
    let { trackerId } = ownProps;
    trackerIds = Im.Map();
    trackerIds = trackerIds.set(trackerId, trackerId);
    singleTracker = true;
  } catch (e) {
    let trackers = state.getInPath("entities.trackers.byId");
    trackerIds = trackers ? trackers.map(tracker => tracker.get("uid")) : null;
    singleTracker = false;
  }

  return { trackerIds, singleTracker };
};

export const getTrackers = function(projectIds) {
  if (projectIds) {
    projectIds.map(projectId => new Traec.Fetch("project_tracker", "list", { projectId }).dispatch());
  }
};
