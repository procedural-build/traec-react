import Im from "traec/immutable";
import React from "react";
import { Link } from "react-router-dom";
import { RightArrow } from "traec-react/utils/entities";

/*
UTILITIES FOR GETTING COMPANY, PROJECT, TRACKER, CREF DETAILS
*/

export const getASOTracker = project => {
  let trackers = project ? project.get("trackers") : null;
  if (trackers) {
    if (trackers.size > 1) {
      trackers = trackers.filter(tracker => tracker.get("name") == "sustainability_tool");
    }
  }
  let tracker = trackers ? trackers.first() : null;
  let trackerId = tracker ? tracker.get("uid") : null;
  return trackerId;
};

export const getProjectProps = (state, projectId, refId) => {
  let project = state.getInPath(`entities.projects.byId.${projectId}`);
  let company = project ? project.get("company") : null;
  // Try to get a Tracker for this Project (compatability with Track API)
  let trackerId = getASOTracker(project);
  let tracker = state.getInPath(`entities.trackers.byId.${trackerId}`);
  // Get the work package (ref) that we should be on
  // Get the root branch
  let rootRefId = tracker ? tracker.get("root_master") : null;
  let rootRef = rootRefId ? state.getInPath(`entities.refs.byId.${rootRefId}`) : null;
  // Get the current ref from url parameters
  let cref = refId ? state.getInPath(`entities.refs.byId.${refId}`) : rootRef;
  // Are we on the root
  let crefId = cref ? cref.get("uid") : null;
  let isRootRef = crefId === rootRefId;
  // Return the key parameters (where we sit in the world)
  return { company, project, tracker, trackerId, cref, crefId, isRootRef, rootRef, rootRefId };
};

/*
UTILITIES FOR LOADING CONVERSION FACTORS
*/

const folderName = "conversion_factors";

export const getConvFactRef = (state, trackerId) => {
  //debugger
  let tracker = state.getInPath(`entities.trackers.byId.${trackerId}`);
  // Get the alternative root ref with tree_name
  let altMasters = tracker.get("alt_root_masters");
  if (!altMasters) {
    return null;
  }
  for (let [branchId, crefId] of altMasters.entrySeq()) {
    let cref = state.getInPath(`entities.refs.byId.${crefId}`);
    //console.log("CHECKING CONV FACTOR BRANCH REF", branchId, crefId, cref)
    if (cref && cref.getInPath("latest_commit.tree_root.name") == folderName) {
      //console.log("FOUND REF!!!!!")
      return cref;
    }
  }
  //console.log("CONV FACTOR BRANCH REF NOT FOUND")
  return null;
};

export const loadConvFacts = (state, trackerId) => {
  if (!trackerId) {
    return null;
  }
  // Get the ref that the conversion factors are on
  let convFactRef = getConvFactRef(state, trackerId);
  // Return none if we dont have a
  if (!convFactRef) {
    return null;
  }
  // Get the values for the conversion factors (in a dictionary object)
  let commitId = convFactRef.getInPath("latest_commit.uid");
  // Get the conversion factor objects
  let conversionFactors = state.getInPath(`entities.commitEdges.byId.${commitId}.conversionFactors`);
  // Transform these into a dictionary of metricId: {object}
  let convFactMetrics = {};
  let convFactorMap = conversionFactors ? {} : {};
  for (let [cfId, cf] of conversionFactors || []) {
    let metricId = cf.get("metric");
    let toUnit = cf.get("toUnit");
    cf = cf.set("metric", state.getInPath(`entities.baseMetrics.byId.${metricId}`));
    convFactorMap[[metricId, toUnit]] = cf;
  }
  // If we have a Ref but not conversion factors then
  return { convFactRef, convFactorMap };
};

export class BreadCrumb extends React.Component {
  render_company() {
    let { company } = this.props;
    return !company ? null : <Link to={`/company/${company.get("uid")}`}>{company.get("name")}</Link>;
  }

  render_project() {
    let { project, isRootRef } = this.props;
    if (!project) {
      return null;
    }
    let projectUrl = project ? `/project/${project.get("uid")}` : null;
    return (
      <React.Fragment>
        <RightArrow />
        &nbsp;&nbsp;
        {isRootRef && project ? project.get("name") : <Link to={projectUrl}>{project.get("name")}</Link>}
      </React.Fragment>
    );
  }

  render_report() {
    let { isRootRef, cref } = this.props;
    if (isRootRef || !cref) {
      return null;
    }
    return (
      <React.Fragment>
        <RightArrow />
        &nbsp;&nbsp;
        {cref.get("name")}
      </React.Fragment>
    );
  }

  render() {
    return (
      <p>
        {this.render_company()}
        &nbsp;&nbsp;
        {this.render_project()}
        &nbsp;&nbsp;
        {this.render_report()}
      </p>
    );
  }
}
