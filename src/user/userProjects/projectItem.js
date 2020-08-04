import React from "react";

import { Link } from "react-router-dom";
import { counter } from "./project";

export const ProjectItem = props => {
  let { project, index: i } = props;
  let projectId = project.get("uid");
  let projectName = project.get("name");
  let rowNum = counter.row++;

  projectId = projectId ? projectId.substring(0, 8) : projectId;

  return (
    <React.Fragment>
      <div className="row" key={i} style={{ backgroundColor: (rowNum + 1) % 2 ? "#ddd" : "" }}>
        <div className="col-sm-12">
          <Link to={`/project/${projectId}`}>{projectName}</Link>
        </div>
      </div>
      <div className="row" style={{ marginLeft: "1em" }}>
        <TrackerList trackers={project.get("trackers")} showTrackers={props.showTrackers} />
      </div>
      {React.Children.map(props.children, child => React.cloneElement(child, { project: props.project }))}
    </React.Fragment>
  );
};

const TrackerList = props => {
  if (!props.trackers || !props.showTrackers) {
    return null;
  }

  return props.trackers.toList().map((item, i) => (
    <div key={i} className="col-sm-12">
      <Link to={`/tracker/${item.get("uid")}`}>{item.get("name")}</Link>
    </div>
  ));
};
