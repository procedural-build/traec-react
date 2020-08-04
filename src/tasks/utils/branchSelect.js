import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import Octicon from "react-octicon";
import { getActiveCommit, reconstructCommitBranches, getCommitBranches } from "./utils";

class BranchSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.requiredFetches = [
      new Traec.Fetch("tracker", "read"),
      new Traec.Fetch("tracker_branch", "list"),
      new Traec.Fetch("tracker_commit_branch", "list")
    ];

    this.checkoutBranch = this.checkoutBranch.bind(this);
    this.resetDetached = this.resetDetached.bind(this);
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  getUrlParams() {
    let { trackerId, crefId, commitId } = this.props;
    return { trackerId, refId: crefId, commitId };
  }

  selectionLinks() {
    let { branches, crefId } = this.props;
    let links = branches
      .filter(cb => cb.getInPath("target.ref.uid") != crefId)
      .map((cb, i) => ({
        name: cb.getInPath("target.ref.name"),
        onClick: e => this.checkoutBranch(e, cb)
      }));
    //console.log("BRANCHES", branches.toJS(), links.toJS())
    return links.toJS();
  }

  checkoutBranch(e, commitBranch) {
    e.preventDefault();
    let { parentCommitId } = this.props;
    // Manually manipulate the state to represent checking out branches
    if (!parentCommitId) {
      this.checkoutRootBranch(commitBranch);
    } else {
      this.checkoutCommitBranch(commitBranch);
    }
    //let fetch = new Traec.Fetch("tracker_ref_branch", "put", { trackerId, refId, branchId: null });
    //this.setState({ formParams: fetch.params });
    //fetch.toggleForm();
  }

  checkoutRootBranch(commitBranch) {
    let { trackerId } = this.props;
    this.props.dispatch({
      type: "ENTITY_SET_FUNC",
      stateParams: {
        stateSetFunc: (state, action) => {
          let newState = state.setInPath(
            `trackers.byId.${trackerId}.root_master`,
            commitBranch.getInPath("target.ref.uid")
          );
          return newState;
        }
      }
    });
  }

  checkoutCommitBranch(commitBranch) {
    let { treeId, commitId, branches, parentCommitId, parentTreeId } = this.props;
    let currentBranch = getCurrentBranch(branches, commitId);
    let currentBranchId = currentBranch.get("uid");
    let parentTreeCategoryPath = `commitEdges.byId.${parentCommitId}.trees.${parentTreeId}.categories`;
    let strippedCommitBranch = commitBranch
      .setInPath("target.ref", commitBranch.getInPath("target.ref.uid"))
      .setInPath("target.commit", commitBranch.getInPath("target.commit.uid"));
    this.props.dispatch({
      type: "ENTITY_SET_FUNC",
      stateParams: {
        stateSetFunc: (state, action) => {
          return state
            .removeInPath(`${parentTreeCategoryPath}.${currentBranchId}`)
            .setInPath(`${parentTreeCategoryPath}.${commitBranch.get("uid")}`, strippedCommitBranch);
        }
      }
    });
  }

  resetDetached(e) {
    const branchId = this.props.rootId;
    const parentCommitId = this.props.parentCommitId;
    const stateSetFunc = (state, action, utils) => {
      if (!parentCommitId) {
        return utils.setInPath(state, `branches.byId.${branchId}.userHead.target.commit`, null);
      } else {
        return utils.setInPath(
          state,
          `commitBranches.commit.${parentCommitId}.branch.${branchId}.userHead.target.commit`,
          null
        );
      }
    };
    // Dispatch an action to change the state
    this.props.dispatch({
      type: "ENTITY_SET_FUNC",
      stateParams: { stateSetFunc }
    });
  }

  render_master_warning(cref) {
    const { userHead, masterHead } = this.props;
    let warning = "";
    if (userHead && masterHead) {
      if (userHead.getIn(["target", "ref"]) != masterHead.getIn(["target", "ref"])) {
        warning = <span className="badge badge-warning ml-1 mr-1">!master</span>;
      }
    }
    return warning;
  }

  render_detached_warning(cref) {
    const { userHead } = this.props;
    const latestCommitId = cref.getIn(["latest_commit", "uid"]);
    let commitId = userHead.getIn(["target", "commit"]);
    let warning = "";
    if (commitId != latestCommitId && commitId != null) {
      warning = (
        <span className="badge badge-info ml-1 mr-1" onClick={this.resetDetached}>
          old
        </span>
      );
    }
    return warning;
  }

  render() {
    let { rootTreeId, treeId, cref } = this.props;
    if (!cref) {
      return null;
    }
    if (rootTreeId != treeId) {
      return null;
    }

    return (
      <React.Fragment>
        <BSBtnDropdown
          floatStyle={""}
          alwaysShowHeader={true}
          header={
            <span>
              <Octicon name="repo-forked" /> {cref.get("name")}
            </span>
          }
          links={this.selectionLinks()}
        />
        {/*this.render_master_warning(cref)*/}
        {/*this.render_detached_warning(cref)*/}
      </React.Fragment>
    );
  }
}

/*
 * Getting the relevant branch/head objects for a particular parent/commit
 */
const getCurrentBranch = (commitBranches, commitId) => {
  for (let cb of commitBranches) {
    let targetCommitId = cb.getInPath("target.commit.uid") || cb.getInPath("target.ref.latest_commit.uid");
    if (targetCommitId == commitId) {
      return cb;
    }
  }
  return null;
};

const mapStateToProps = (state, ownProps) => {
  let { trackerId, crefId, treeId, commitId } = ownProps;
  let cref = state.getInPath(`entities.refs.byId.${crefId}`);
  let commit = getActiveCommit(state, ownProps);
  //if (crefId && crefId.startsWith('e10db')) { console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZ", cref.toJS(), commit.toJS()) }
  let rootTreeId = commit ? commit.getInPath("tree_root.uid") : null;

  let branches = null;
  if (rootTreeId === treeId) {
    branches = getCommitBranches(state, ownProps);
  }

  return { branches, cref, commit, rootTreeId };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(BranchSelect);
