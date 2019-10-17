import React from "react";
import Octicon from "react-octicon";
import { Link } from "react-router-dom";
import { getIcon, convertStatus } from "../userDocuments/documentItem";

export const UserRefItem = function(props) {
  let status = convertStatus(props.ref.status);
  return (
    <div className="row" key={props.index} style={{ backgroundColor: (props.index + 1) % 2 ? "#ddd" : "" }}>
      <div className="col-sm-3">
        <Link to={`/project/${props.ref.project.get("uid")}/tasks/`}>{props.ref.title}</Link>
      </div>
      <div className="col-sm-3">
        <Link to={`/project/${props.ref.project.get("uid")}/`}>{props.ref.project.get("name")}</Link>
      </div>
      <div className="col-sm-3">{props.ref.company}</div>
      <div className="col-sm-2">{status}</div>
      <div className="col-sm-1">{getIcon(status)}</div>
    </div>
  );
};
