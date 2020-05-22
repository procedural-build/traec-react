import React from "react";
import DocumentRow from "traec-react/explorer/documentRow";

export const SubDocuments = props => {
  let { treeId, commitId, cref, documentIds, formFields = null, showDropdown, show } = props;

  if (!documentIds || !show) {
    return null;
  }

  let documentsRows = documentIds
    .sortBy(docId => docId)
    .map((item, i) => (
      <DocumentRow
        key={i}
        headCommitId={commitId}
        cref={cref}
        treeId={treeId}
        docId={item}
        formFields={formFields}
        showDropdown={showDropdown}
      />
    ));
  return <div className="mb-4 ml-4">{documentsRows}</div>;
};
