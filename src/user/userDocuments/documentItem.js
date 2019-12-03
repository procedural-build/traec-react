import React from "react";
import Octicon from "react-octicon";
import { Link } from "react-router-dom";

export const UserDocumentItem = function(props) {
  let status = convertStatus(props.document.status);
  return (
    <div className="row" key={props.index} style={{ backgroundColor: (props.index + 1) % 2 ? "#ddd" : "" }}>
      <div className="col-sm-3">
        <Link to={`/project/${props.document.project.get("uid")}/tasks/`}>{props.document.title}</Link>
      </div>
      <div className="col-sm-3">
        <Link to={`/project/${props.document.project.get("uid")}/`}>{props.document.project.get("name")}</Link>
      </div>
      <div className="col-sm-3">{props.document.company}</div>
      <div className="col-sm-2">{status}</div>
      <div className="col-sm-1">{getIcon(status)}</div>
    </div>
  );
};

export const getIcon = function(status) {
  if (status === "Approved") {
    return <Octicon name="check" />;
  } else {
    return <Octicon name="issue-opened" />;
  }
};

export const convertStatus = function(status) {
  if (!status) {
    return "Nothing Uploaded";
  }

  let name = status.get("name");
  if (name === "OK for Submission") {
    return "Approved";
  } else {
    return name;
  }
};
