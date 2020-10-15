import React from "react";

export const DocumentCount = props => {
  let { documentStatuses } = props;
  if (!documentStatuses) {
    return null;
  }

  let okSubmission = documentStatuses.filter(status => status && status.get("name") === "OK for Submission");
  let color = okSubmission.size >= documentStatuses.size ? "#99eb99" : "#ff9696";
  return (
    <div className="badge badge-pill text-white" style={{ backgroundColor: color }}>
      {okSubmission.size}/{documentStatuses.size}
    </div>
  );
};
