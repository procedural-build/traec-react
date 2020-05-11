import React from "react";
import CategoryRow from "traec-react/explorer/categoryRow";

export const SubCategories = props => {
  let {
    commitId,
    commitBranches,
    tracker,
    showTreesWithoutDescriptions = true,
    formFields = null,
    forceExpandAll = false
  } = props;
  if (!commitBranches) {
    return null;
  }
  return commitBranches
    .toList()
    .map((commitBranch, i) => (
      <CategoryRow
        key={i}
        parentCommitId={commitId}
        tracker={tracker}
        renderRootTree={false}
        commitId={commitBranch.get("commit")}
        branchId={null}
        refId={commitBranch.getInPath("target.ref")}
        showTreesWithoutDescriptions={showTreesWithoutDescriptions}
        formFields={formFields}
        forceExpandAll={forceExpandAll}
      />
    ));
};
