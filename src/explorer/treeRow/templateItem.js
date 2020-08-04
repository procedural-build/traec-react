import React from "react";
import { BSBtn } from "traec-react/utils/bootstrap";
import Traec from "traec";

export const TemplateItem = props => {
  if (!props.template) {
    return null;
  }

  const onClick = e => {
    let { copyToCommit, parentTreeId, treeId, fromCommitId } = props;
    if (props.templateTracker) {
      return copyTreeToCommit(e, copyToCommit, parentTreeId, treeId, fromCommitId);
    } else {
      return props.deleteTree(e);
    }
  };

  let buttonText = props.templateTracker ? "Add" : "Remove";
  return (
    <div className="col-sm-1 m-0 p-0">
      <BSBtn text={buttonText} extra_className={"m-1 p-1"} onClick={e => onClick(e)} />
    </div>
  );
};

const copyTreeToCommit = (e, copyToCommit, parentTreeId, treeId, fromCommitId) => {
  e.preventDefault();

  let { trackerId, commitId } = copyToCommit;
  let fetch = new Traec.Fetch("tracker_commit_edge", "put", { trackerId, commitId });

  fetch.updateFetchParams({
    body: {
      edge_type: "treetree",
      parent_id: parentTreeId,
      child_id: treeId,
      from_commit: fromCommitId
    }
  });
  fetch.dispatch();
};
