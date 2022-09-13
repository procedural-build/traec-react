import { Link } from "react-router-dom";
import React from "react";

export const ReportLink = props => {
  let { projectId, companyId, recipient } = props;
  if (projectId) {
    return (
      <Link to={`/project/${projectId}/email/report/${recipient.get("uid")}`}>
        {recipient.get("email").toLowerCase()}
      </Link>
    );
  }
  if (companyId) {
    let shortId = companyId.slice(0, 8);
    return (
      <Link to={`/company/${shortId}/email/report/${recipient.get("uid")}`}>
        {recipient.get("email").toLowerCase()}
      </Link>
    );
  }
  return null;
};


export const getBgColor = (recipient) => {
  return recipient?.get("blocked") ? "#ffccf2" : (recipient?.get("blocked_address") ? "#ffcccc" : null )
}