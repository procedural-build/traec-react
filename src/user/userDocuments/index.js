import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import { Spinner } from "traec-react/utils/entities";
import Im from "traec/immutable";
import { RenderErrorMessage } from "../../errors/handleError";
import { DocumentFilter } from "./documentFilter";
import { setIn } from "immutable";
import moment from "moment";

class UserDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      disciplineFilter: [],
      statusFilter: [],
      dueBefore: "",
      dueAfter: ""
    };
    this.requiredFetches = [new Traec.Fetch("project_discipline", "list", { projectId: this.props.projectId })];
    this.setDisciplineFilter = this.setDisciplineFilter.bind(this);
    this.setStatusFilter = this.setStatusFilter.bind(this);
    this.setDueAfter = this.setDueAfter.bind(this);
    this.setDueBefore = this.setDueBefore.bind(this);
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
    this.getDocuments();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
    if (!this.props.singleTracker) {
      getTrackers(this.props.projectIds);
    }

    this.getDocuments();
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  getDocuments() {
    let { trackerId } = this.props;
    if (trackerId) {
      let fetch = new Traec.Fetch("tracker_documents", "list", { trackerId });
      fetch.dispatch();
    }
  }

  getStatuses() {
    let statuses = [
      { label: "Nothing Received" },
      { label: "Pending Review" },
      { label: "Requires Revision" },
      { label: "OK for Submission" },
      { label: "Not for Submission" }
    ];
    return statuses;
  }

  setDisciplineFilter(values) {
    this.setFilter(values, "disciplineFilter");
  }

  setStatusFilter(values) {
    this.setFilter(values, "statusFilter");
  }

  setFilter(values, key) {
    let newState = {};
    newState[key] = values.map(v => v.label);
    this.setState(newState);
  }

  setDueBefore(dueBefore) {
    this.setState({ dueBefore });
  }

  setDueAfter(dueAfter) {
    this.setState({ dueAfter });
  }

  renderDocumentComponents() {
    if (this.state.hasError) {
      return this.renderErrorMessage();
    }

    if (this.areDocumentsLoading()) {
      return this.renderSpinner();
    }

    let orderedDocumentComponents = this.getOrderedDocumentComponents();

    return (
      <div className="mt-4">
        {Object.keys(orderedDocumentComponents).map((disciplineName, disciplineIndex) => {
          let documentComponents = orderedDocumentComponents[disciplineName];
          if (this.checkDisciplineFilter(documentComponents, disciplineName)) {
            return (
              <div key={disciplineIndex}>
                <h2>{disciplineName}</h2>

                {documentComponents.map((component, componentIndex) => {
                  return <div key={componentIndex}>{component}</div>;
                })}
              </div>
            );
          }
        })}
      </div>
    );
  }

  renderErrorMessage() {
    return <RenderErrorMessage error={this.state.error} />;
  }

  areDocumentsLoading() {
    let { documents, disciplines, docStatuses } = this.props;
    return !documents || documents.length === 0 || !disciplines || !docStatuses;
  }

  renderSpinner() {
    return <Spinner explanation="Loading Documents" timedOutComment="No Documents Found" />;
  }

  checkDisciplineFilter(components, disciplineName) {
    let { disciplineFilter } = this.state;
    return components.length > 0 && (disciplineFilter.length === 0 || disciplineFilter.includes(disciplineName));
  }

  getOrderedDocumentComponents() {
    let { disciplines } = this.props;
    let orderedDocumentComponents = {};
    for (let discipline of disciplines.valueSeq()) {
      orderedDocumentComponents[discipline.get("name")] = [];
    }

    let { trackerId, refId, commitId, documents, docStatuses } = this.props;
    for (let document of documents.valueSeq()) {
      let statusId = document.get("status");
      let status = docStatuses.get(statusId);
      if (this.checkStatusFilter(status) && this.checkDueDateFilter(status ? status.get("due_date") : "")) {
        let disciplineName = status
          ? disciplines.filter(d => d.get("uid") === status.get("discipline_id")).get("name")
          : "Unassigned";
        disciplineName = disciplineName ? disciplineName : "Unassigned";
        let documentComponent = (
          <this.props.documentComponent
            docId={document.get("uid")}
            trackerId={trackerId}
            refId={refId}
            commitId={commitId}
          />
        );
        orderedDocumentComponents[disciplineName].push(documentComponent);
      }
    }
    return orderedDocumentComponents;
  }

  checkStatusFilter(status) {
    let { statusFilter } = this.state;
    if (statusFilter.length === 0 || (!status && statusFilter.includes("Nothing Received"))) {
      return true;
    } else if (status && statusFilter.includes(status.getInPath("status.name"))) {
      return true;
    }
    return false;
  }

  checkDueDateFilter(dueDate) {
    let { dueAfter, dueBefore } = this.state;
    if (!dueDate || (!dueAfter && !dueBefore)) return true;
    return moment(dueDate).isSameOrBefore(dueBefore) || moment(dueDate).isSameOrAfter(dueAfter);
  }

  render() {
    let { disciplines } = this.props;
    if (!disciplines) return null;
    return (
      <div className="container">
        <h2 style={{ fontSize: "30px" }}>My Documents</h2>
        <DocumentFilter
          disciplines={disciplines}
          statuses={this.getStatuses()}
          setStatusFilter={this.setStatusFilter}
          setDisciplineFilter={this.setDisciplineFilter}
          dueAfter={this.state.dueAfter}
          dueBefore={this.state.dueBefore}
          setDueAfter={this.setDueAfter}
          setDueBefore={this.setDueBefore}
        />
        {this.renderDocumentComponents()}
      </div>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  let { trackerId } = ownProps;

  let { trackerIds, singleTracker } = getTrackersInState(state, ownProps);
  let refId = state.getInPath(`entities.trackers.byId.${trackerId}.root_master`);
  let commitId = state.getInPath(`entities.refs.byId.${refId}.latest_commit.uid`);

  let projectId = state.getInPath(`entities.refs.byId.${refId}.project`);
  let documents = state.getInPath(`entities.user.documents.byId`);
  let disciplines = state.getInPath(`entities.projectObjects.byId.${projectId}.disciplines`) || Im.Map();
  disciplines = setIn(disciplines, ["uid", "name"], "Unassigned");
  let docStatuses = state.getInPath(`entities.docStatuses.byId`);
  return {
    trackerIds,
    projectId,
    documents,
    singleTracker,
    refId,
    commitId,
    disciplines,
    docStatuses
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
)(UserDocuments);

const getTrackersInState = function(state, ownProps) {
  let trackerIds = null;
  let singleTracker = null;
  let { trackerId } = ownProps;

  if (trackerId) {
    trackerIds = Im.Map();
    trackerIds = trackerIds.set(trackerId, trackerId);
    singleTracker = true;
  } else {
    let trackers = state.getInPath("entities.trackers.byId");
    trackerIds = trackers ? trackers.map(tracker => tracker.get("uid")) : Im.Map({});
    singleTracker = false;
  }
  return { trackerIds, singleTracker };
};

export const getTrackers = function(projectIds) {
  if (projectIds) {
    projectIds.map(projectId => new Traec.Fetch("project_tracker", "list", { projectId }).dispatch());
  }
};

export const getCompanyProjectFromTracker = function(state, trackerId) {
  let projectId = state.getInPath(`entities.trackers.byId.${trackerId}.project.uid`);
  let project = state.getInPath(`entities.projects.byId.${projectId}`);
  let companyName = state.getInPath(`entities.projects.byId.${projectId}.company.name`);

  return { project, company: companyName };
};
