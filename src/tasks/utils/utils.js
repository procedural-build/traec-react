import Traec from "traec";

export const reconstructCommitBranches = (state, commitBranchMap) => {
  // Reconstruct the full target objects in a commitBranch object
  return commitBranchMap
    .toList()
    .map((cb, i) =>
      cb
        .setInPath("target.ref", state.getInPath(`entities.refs.byId.${cb.getInPath("target.ref")}`))
        .setInPath("target.commit", state.getInPath(`entities.commits.byId.${cb.getInPath("target.commit")}`))
    );
};

export const getActiveCommit = (state, ownProps) => {
  let { crefId, commitId } = ownProps;
  let cref = state.getInPath(`entities.refs.byId.${crefId}`);
  if (!commitId && !cref) {
    return null;
  }
  let activeCommitId = commitId || cref.getInPath("latest_commit.uid");
  let commit = state.getInPath(`entities.commits.byId.${activeCommitId}`) || cref.get("latest_commit");
  return commit;
};

export const getCommitBranches = (state, ownProps, newProps) => {
  let { crefId, commitId, parentCommitId } = ownProps;
  let commit = getActiveCommit(state, ownProps);
  if (!commit) {
    return null;
  }
  let rootId = commit.getInPath(`root_commit`);
  let parentPath = parentCommitId ? `commit.${parentCommitId}` : "root";
  let branches = state.getInPath(`entities.commitBranches.${parentPath}.branch.${rootId}.byId`) || Traec.Im.Map();
  return reconstructCommitBranches(state, branches);
};

/**.
 *
 */

const getCategoryRefBranches = (state, ownProps, newProps) => {
  let { branch, branches, crefs, rootId } = newProps;
  // Working with latest commits of everything
  branch = state.getInPath(`entities.branches.byId.${rootId}`);
  branches = state.getInPath(`entities.branches.byId.${rootId}.refs`);
  if (branches) {
    crefs = branches.map(itemId => {
      let catObj = state.getInPath(`entities.refs.byId.${itemId}`);
      const userHeadCommit = branch.getIn(["userHead", "target", "commit"]);
      if (userHeadCommit) {
        const commitStr =
          catObj.getIn(["latest_commit", "uid"]) == userHeadCommit || !userHeadCommit
            ? ""
            : ` (${userHeadCommit.substring(0, 8)})`;
        catObj = catObj.merge({
          name: `${catObj.get("name")}${commitStr}`
        });
      }
      return catObj;
    });
  }
  Object.assign(newProps, { branch, branches, crefs });
  return newProps;
};

const getTargetsAndHeads = (state, ownProps, newProps) => {
  let { branch, crefs, masterHead, userHead, currentTarget, currentCommitId, rootId } = newProps;
  masterHead = branch.has("masterHead") ? branch.get("masterHead") : null;
  // Make this the master branch if none is found
  masterHead =
    masterHead ||
    Im.fromJS({
      branchId: rootId,
      refId: ownProps.cref.get("uid"),
      is_master: false
    });
  userHead = branch.has("userHead") ? branch.get("userHead") || masterHead : masterHead;
  let matchingTargets = crefs.filter(item => item.get("uid") == userHead.getIn(["target", "ref"]));
  if (matchingTargets.size == 1) {
    //console.log("Branch head targets == 1")
    currentTarget = matchingTargets.toList().get(0);
    crefs = crefs.filter(item => item.get("uid") != currentTarget.get("uid"));
    currentCommitId =
      (userHead ? userHead.getIn(["target", "commit"]) : null) || ownProps.cref.getIn(["latest_commit", "uid"]);
  } else {
    //console.log("Branch head targets != 1")
  }
  Object.assign(newProps, {
    masterHead,
    userHead,
    currentTarget,
    currentCommitId
  });
  return newProps;
};
