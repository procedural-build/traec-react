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
    return (
      <Link to={`/company/${companyId}/email/report/${recipient.get("uid")}`}>
        {recipient.get("email").toLowerCase()}
      </Link>
    );
  }
  return null;
};
