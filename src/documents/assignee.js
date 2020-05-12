import React from "react";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import Traec from "traec";

export const Assignee = props => {
  if (!props.show) {
    return null;
  }

  let links = [{ name: null }];
  if (props.disciplines) {
    links = props.disciplines
      .valueSeq()
      .map(discipline => {
        return {
          name: discipline.get("name"),
          onClick: e =>
            updateDiscipline(
              e,
              discipline.get("base_uid"),
              props.trackerId,
              props.refId,
              props.commitId,
              props.documentId
            )
        };
      })
      .toJS();
  }
  let name = props.assignee ? props.assignee.get("name") : "Unassigned";
  if (!name) {
    return null;
  }

  return (
    <div className="mb-3 pb-3">
      <BSBtnDropdown floatStyle={"float-left"} header={<i>{name}</i>} links={links} />
    </div>
  );
};

const updateDiscipline = (e, disciplineId, trackerId, refId, commitId, documentId) => {
  e.preventDefault();
  let fetch = new Traec.Fetch("tracker_ref_document", "put", { trackerId, refId, commitId, documentId });
  fetch.updateFetchParams({
    body: { discipline_id: disciplineId, commit_id: commitId },
    headers: { "content-type": "application/json" },
    rawBody: false
  });
  fetch.dispatch();
};
