import React from "react";
import ReactDOM from "react-dom";

import { Link } from "react-router-dom";
import Octicon from "react-octicon";
import Moment from "moment";
import chroma from "chroma-js";
import { counter } from "./project";

const colorScale = chroma.scale([
  "#db1919",
  "#e75818",
  "#f18215",
  "#f9a80e",
  "#ffcc00",
  "#d5c523",
  "#a9bd33",
  "#78b43e",
  "#36aa47"
]);

export default class ProjectItem extends React.Component {
  renderRelatedCommits(project) {
    let commits = project.get("related_commits");
    if (!commits) {
      return null;
    }
    let projectId = project.get("uid");

    let commitList = commits.map((commit, i) => {
      if (commit.get("is_staging")) {
        return null;
      }
      let commitId = commit.get("uid");
      let refId = commit.get("ref");

      // Get the string of this reporting period
      let startDate = commit.getInPath("reporting_period_data.startDate");
      let endDate = commit.getInPath("reporting_period_data.endDate");
      let rpStr = `${Moment(startDate).format("Do MMM YY")} to ${Moment(endDate)
        .add(-1, "days")
        .format("Do MMM YY")}`;

      // Get the status
      let status = commit.getInPath("meta_json.status");
      switch (status) {
        case "pending_approval":
          status = "Pending Approval";
          break;
        case "pending_revision":
          status = "Requires Revision";
          break;
        case "approved":
          status = "Approved";
          break;
        default:
          break;
      }

      let color = chroma("#ffff99")
        .brighten(1)
        .hex();

      return (
        <div key={i} className="row" style={{ backgroundColor: color }}>
          <div className="col-sm-5">
            <div className="ml-3">
              <Octicon name="file" />
              &nbsp;&nbsp;
              <Link to={`/project/${projectId}/wpack/${refId}/evals`}>{rpStr}</Link>
            </div>
          </div>
          <div className="col-sm-2">
            <i>{status}</i>
          </div>
          <div className="col-sm-3" />
          <div className="col-sm-2">
            <Link className="float-right" to={`/project/${projectId}/wpack/${refId}/report/${commitId}`}>
              Go to Report
            </Link>
          </div>
        </div>
      );
    });
    return commitList;
  }

  renderRelatedRefs(project) {
    let refs = project.get("related_refs");
    if (!refs) {
      return null;
    }
    let projectId = project.get("uid");

    let refList = refs.map((ref, i) => {
      let refId = ref.get("uid");
      let refName = ref.get("name");
      let dueDate = ref.getInPath("latest_commit.due_date");
      let dueDateStr = dueDate ? Moment(dueDate).format("MMM Do YY") : "undefined";

      let now = Moment(new Date());
      let diffDays = dueDate ? Moment(dueDate).diff(now, "days") : null;
      let diffDayStr = diffDays ? (diffDays > 0 ? `(${diffDays} days)` : `(overdue ${Math.abs(diffDays)} days)`) : null;

      let rowNum = counter.row++;
      let color = diffDays
        ? colorScale(diffDays / 30)
            .brighten(2)
            .hex()
        : (rowNum + 1) % 2
        ? "#ddd"
        : "";

      return (
        <div key={i} className="row" style={{ backgroundColor: color }}>
          <div className="col-sm-5">
            <div className="ml-3">
              <Octicon name="file" />
              &nbsp;&nbsp;
              <Link to={`/project/${projectId}/wpack/${refId}/`}>{refName}</Link>
            </div>
          </div>
          <div className="col-sm-2">
            <i>Pending Input</i>
          </div>
          <div className="col-sm-3">
            Due:{" "}
            <i>
              {dueDateStr} {diffDayStr}
            </i>
          </div>
          <div className="col-sm-2">
            <Link className="float-right" to={`/project/${projectId}/wpack/${refId}/report`}>
              Go to Report
            </Link>
          </div>
        </div>
      );
    });
    return refList;
  }

  renderTrackerList(trackers) {
    if (!trackers) {
      return null;
    }
    let rowNum = counter.row++;
    return trackers.toList().map((item, i) => (
      <div key={i} className="col-sm-12">
        <Link to={`/tracker/${item.get("uid")}`}>{item.get("name")}</Link>
      </div>
    ));
  }

  render() {
    let { project, index: i } = this.props;
    let projectId = project.get("uid");
    let projectName = project.get("name");
    let trackers = project.get("trackers");
    let rowNum = counter.row++;

    return (
      <React.Fragment>
        <div className="row" key={i} style={{ backgroundColor: (rowNum + 1) % 2 ? "#ddd" : "" }}>
          <div className="col-sm-12">
            <Link to={`/project/${projectId}`}>{projectName}</Link>
          </div>
        </div>
        <div className="row" style={{ marginLeft: "1em" }}>
          {this.renderTrackerList(trackers)}
        </div>
        {/*this.render_related_refs(project)*/}
        {/*this.render_related_commits(project)*/}
      </React.Fragment>
    );
  }
}
