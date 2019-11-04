import Traec from "traec";
import { confirmDelete } from "traec-react/utils/sweetalert";
import Moment from "moment";
import { setMetricScore } from "traec/redux/actionCreators";
import React from "react";

export const postCommit = function(e, trackerId, refId, commitId) {
  e.preventDefault();
  let fetch = new Traec.Fetch("tracker_ref_commit", "post", { trackerId, refId, commitId });
  fetch.updateFetchParams({
    preFetchHook: data => ({ comment: data.name })
  });
  this.setState({ formParams: fetch.params });
  fetch.toggleForm();
};

export const forkNewBranch = function(e, trackerId, refId, commitId, treeId) {
  e.preventDefault();
  // const { trackerId, refId, commitId, treeId } = this.getUrlParams();
  let fetch = new Traec.Fetch("tracker_ref_branch", "post", { trackerId, refId, commitId, treeId });
  // this.setState({ formParams: fetch.params });
  // fetch.toggleForm();
  fetch.dispatch();
};

export const checkoutBranch = function(e) {
  e.preventDefault();
  const { trackerId, refId, commitId } = this.getUrlParams();
  let fetch = new Traec.Fetch("tracker_ref_branch", "put", { trackerId, refId, commitId, branchId: null });
  this.setState({ formParams: fetch.params });
  fetch.toggleForm();
};

export const deleteTree = function(e, urlParams) {
  e.preventDefault();
  let { trackerId, refId, commitId, treeId } = urlParams;
  confirmDelete({
    text: `This will delete this tree including any data contained within.  Are you sure you would like to proceed?`,
    onConfirm: () => {
      // new Traec.Fetch("tracker_ref_tree", "delete", { ...this.getUrlParams() }).dispatch();
      let fetch = new Traec.Fetch("tracker_ref_tree", "delete", { trackerId, refId, commitId, treeId });
      //this.setState({formParams: fetch.params })
      //fetch.toggleForm();
      fetch.dispatch();
    }
  });
};

export const deleteBranch = function(e, urlParams) {
  e.preventDefault();
  let { trackerId, refId, commitId, treeId } = urlParams;
  confirmDelete({
    text: `This will delete this tree including any data contained within.  Are you sure you would like to proceed?`,
    onConfirm: () => {
      // new Traec.Fetch("tracker_ref_tree", "delete", { ...this.getUrlParams() }).dispatch();
      new Traec.Fetch("tracker_ref", "delete", {
        trackerId,
        refId,
        commitId,
        treeId,
        cleanTreeStructure: true
      }).dispatch();
    }
  });
  //this.setState({formParams: fetch.params })
  //fetch.toggleForm();
};

export const deleteCategory = function(e, urlParams) {
  e.preventDefault();
  let { trackerId, refId, commitId, treeId } = urlParams;
  confirmDelete({
    text: `This will delete this tree including any data contained within.  Are you sure you would like to proceed?`,
    onConfirm: () => {
      // new Traec.Fetch("tracker_ref_tree", "delete", { ...this.getUrlParams() }).dispatch();
      new Traec.Fetch("tracker_ref", "delete", {
        trackerId,
        refId,
        commitId,
        treeId,
        cleanTreeStructure: true
      }).dispatch();
    }
  });
  //this.setState({formParams: fetch.params })
  //fetch.toggleForm();
};

export const dispatchAsSelected = function(treeId, crefId, commitId) {
  let { trackerId, selectionLevel } = this.props;
  this.props.dispatch({
    type: "UI_SET_IN",
    payload: { treeId, crefId, commitId },
    stateParams: {
      itemPath: `dashboards.${trackerId}.selected.${selectionLevel}`
    }
  });

  let lowerBound = Number(selectionLevel) + 1;
  for (let index of Array.from(new Array(4 - lowerBound), (x, i) => i + lowerBound)) {
    this.props.dispatch({
      type: "UI_SET_IN",
      payload: null,
      stateParams: {
        itemPath: `dashboards.${trackerId}.selected.${String(index)}`
      }
    });
  }
};

export const treeLinks = function(urlParams) {
  // console.log('TREE LINKS', urlParams)
  return [{ name: "Delete", onClick: e => deleteTree(e, urlParams) }];
};

export const rootTreeLinks = function(urlParams, thisComponent) {
  const { trackerId, refId, commitId, treeId } = urlParams;
  return [
    { name: "Fork this Branch", onClick: e => forkNewBranch(e, trackerId, refId, commitId, treeId) },
    //{ name: "Make a Commit", onClick: e => postCommit(e, trackerId, refId, commitId) },
    { name: "Delete Branch", onClick: e => deleteBranch(e, urlParams) },
    { name: "Delete Task", requiresAdmin: true, onClick: e => deleteCategory(e, urlParams) },
    { name: "Edit Task", requiresAdmin: true, onClick: editCard },
    { name: "Set Target", onClick: e => setCardTarget(e, thisComponent) }
    // { name: "Assign Discipline", onClick: e => getMemberList(e, thisComponent)},   //moved to gearDropdown.js

    //{ name: "Add Tree Score", onClick: e => addTreeScore(e, trackerId, refId, commitId, treeId) }
  ];
};

export const saveToServer = function(userName, score, value, inputValueId, trackerId, commitId, stateValue) {
  let scoreId = score.get("uid");

  // Determine the method that we should use (overwrite existing or post new input)
  let method = inputValueId ? "put" : "post";
  if (method === "put" && inputValueId && value) {
    // Post a new value if we are a different user
    if (value.getInPath("creator.username") !== userName) {
      method = "post";
    }
    // Post a new value if the time since last input is > 30 minutes
    if (method === "put") {
      let created = Moment(new Date(value.get("created") + "Z"));
      let now = Moment(new Date());
      if (now.diff(created, "minutes") > 30) {
        method = "post";
      }
    }
  }

  //
  let fetch = new Traec.Fetch("tracker_commit_score_value", method, {
    trackerId,
    commitId,
    scoreId,
    inputValueId
  });
  fetch.updateFetchParams({
    preFetchHook: body => {
      return {
        value: stateValue || null,
        meta_json: {
          lastInput: new Date()
        }
      };
    }
  });
  fetch.dispatch();
};

export const saveToRedux = function() {
  if (!this.state.isSaved) {
    //e.preventDefault();
    let { score, value, children, commitId } = this.props;
    let scoreId = score.get("uid");

    let scoreMeta = { children };
    Object.assign(scoreMeta, {
      valueId: null,
      value: this.state.value
    });
    // Save this to Redux (for other components in the tree to listen for)
    this.props.dispatch(setMetricScore(scoreMeta, scoreId, commitId));

    // Also save this to the server
    if (!value || value.get("value") !== this.state.value) {
      let { userName, score, value, valueId: inputValueId, trackerId, commitId } = this.props;
      let stateValue = this.state.value;
      saveToServer(userName, score, value, inputValueId, trackerId, commitId, stateValue);
    }
  }
};

export const dropDownLinks = function(isRootTree, urlParams, thisComponent) {
  let links = [];
  if (isRootTree) {
    links = rootTreeLinks(urlParams, thisComponent);
  } else {
    links = treeLinks(urlParams);
  }
  return links;
};

export const editCard = function(e) {
  e.preventDefault();
};

export const renderParameters = function() {
  if (this.state.showDescription) {
    return (
      <div className="pt-2 pb-2">
        <div className="row" style={{ backgroundColor: "#fafbfc" }}>
          <h6 className="col-4" style={{ fontSize: "120%" }}>
            Max
          </h6>
          <h6 className="col-4" style={{ fontSize: "120%" }}>
            Minimum
          </h6>
          <h6 className="col-4" style={{ fontSize: "120%" }}>
            Weight
          </h6>
        </div>
        <div className="row" style={{ backgroundColor: "#fafbfc" }}>
          <h6 className="col-4" style={{ fontSize: "120%" }}>
            {this.props.score.getIn(["parameters", "params_json", "max"])}
          </h6>
          <h6 className="col-4" style={{ fontSize: "120%" }}>
            {this.props.score.getIn(["parameters", "params_json", "threshold"])}
          </h6>
          <h6 className="col-4" style={{ fontSize: "120%" }}>
            {this.props.score.getIn(["parameters", "params_json", "weight"])}
          </h6>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export const toggleShowDescription = function(e) {
  e.preventDefault();

  let show = this.state.showDescription;
  this.setState({
    showDescription: !show
  });
};

export const getMemberList = function(componentThis) {
  // e.preventDefault();
  componentThis.setState({
    showDiscipline: true
  });
};

export const setCardTarget = function(e, thisComponent) {
  e.preventDefault();
  debugger;
  let { trackerId, commitId, metric } = thisComponent.props;
  let fetch = new Traec.Fetch("tracker_commit_target", "post", { trackerId, commitId });
  fetch.updateFetchParams({
    preFetchHook: data => {
      return { ...data, metric, date: Moment().format("YYYY-MM-DDThh:mm") };
    }
  });
  thisComponent.setState({ fieldType: "target" });
  fetch.toggleForm();
};
