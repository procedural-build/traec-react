import React from "react";
import Traec from "traec/index";
import { connect } from "react-redux";
import { TaskDocumentStatusBar } from "../taskStatus/taskDocumentStatus";

class TaskDocumentStatusContainer extends React.Component {
  render() {
    return <TaskDocumentStatusBar documentStatuses={this.props.documentStatuses} />;
  }
}

export const mapStateToProps = (state, ownProps) => {
  let { trackerId } = ownProps;

  let { commitId, treeId } = getSubLevelData(state, trackerId);
  let documentStatuses = getDocumentStatuses(state, commitId, treeId);

  return { documentStatuses };
};

const TaskDocumentStatusContainerConnected = connect(mapStateToProps)(TaskDocumentStatusContainer);
export default TaskDocumentStatusContainerConnected;

const getSubLevelData = function(state, trackerId) {
  let commitId = null;
  let treeId = null;
  let refId = null;
  try {
    let subLevelData = state.getInPath(`ui.dashboards.${trackerId}.selected.2`);
    commitId = subLevelData.get("commitId");
    treeId = subLevelData.get("treeId");
    refId = subLevelData.get("refId");
  } catch (e) {}
  return { commitId, treeId, refId };
};

const getDocumentStatuses = function(state, commitId) {
  let documentStatuses = null;
  try {
    let documents = state.getInPath(`entities.commitEdges.byId.${commitId}.documents`);
    documentStatuses = documents.map(document => {
      let statusId = document.get("status");
      return state.getInPath(`entities.docStatuses.byId.${statusId}`);
    });
  } catch (e) {
    documentStatuses = null;
  }
  return documentStatuses;
};
