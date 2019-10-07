import React from "react";
import { BSCard } from "traec-react/utils/bootstrap";
import { connect } from "react-redux";
import Traec from "traec";
import Im from "traec/immutable";
import { UserDocumentItem } from "./documentItem";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUpdate() {
    this.getTrackers();
    this.getDocuments();
  }

  getTrackers() {
    let { projectIds } = this.props;

    if (projectIds) {
      projectIds.map(projectId => new Traec.Fetch("project_tracker", "list", { projectId }).dispatch());
    }
  }

  getDocuments() {
    let { trackerIds } = this.props;

    if (trackerIds) {
      trackerIds.map(trackerId => new Traec.Fetch("tracker_documents", "list", { trackerId }).dispatch());
    }
  }

  renderDocuments() {
    let { documents } = this.props;

    if (!documents) {
      return null;
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
      return {
        title: state.getInPath(`entities.descriptions.byId.${descriptionId}.title`),
        status: state.getInPath(`entities.docStatus.byId.${statusId}.status`)
      };
    });
  }
  return documents;
};

const mapStateToProps = state => {
  let projects = state.getInPath("entities.projects.byId");
  let projectIds = projects ? projects.map(project => project.get("uid")) : null;

  let trackers = state.getInPath("entities.trackers.byId");
  let trackerIds = trackers ? trackers.map(tracker => tracker.get("uid")) : null;

  let documents = getDocumentsFromState(state);
  return { trackerIds, projectIds, documents };
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
