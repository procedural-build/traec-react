import React from "react";
import TreeRow from "traec-react/explorer/treeRow";

export const SubTrees = props => {
  let {
    subTrees,
    commitId,
    treeId,
    cref,
    showTreesWithoutDescriptions = false,
    formFields = null,
    forceExpandAll = false,
    template = false,
    templateTracker,
    copyToCommit
  } = props;
  if (!subTrees) {
    return null;
  }

  return subTrees
    .sortBy(subTree => {
      try {
        return subTree
          .get("descriptions")
          .first()
          .get("title");
      } catch (e) {
        return "";
      }
    })
    .map((subTree, i) => (
      <TreeRow
        key={i}
        headCommitId={commitId}
        cref={cref}
        treeId={subTree.get("uid")}
        parentTreeId={treeId}
        showTreesWithoutDescriptions={showTreesWithoutDescriptions}
        formFields={formFields}
        forceExpandAll={forceExpandAll}
        template={template}
        templateTracker={templateTracker}
        copyToCommit={copyToCommit}
      />
    ));
};
