import Im from "traec/immutable";

export const getBranches = function(state, commitId) {
  let branches = state.getInPath(`entities.commitBranches.commit.${commitId}.branch`);
  if (branches) {
    return branches;
  } else {
    return null;
  }
};

export const getMasterRef = function(data, commitBranchId) {
  let refId = data
    .get("children")
    .filter(branch => {
      if (branch.get("branchId") === commitBranchId) {
        return branch.get("masterRefId");
      }
    })
    .first();

  refId = refId ? refId.get("masterRefId") : null;

  return refId ? refId : null;
};

export const constructDataTree = function(state, rootMasterId, rootCommitId, allCommitIds) {
  let refId = "";
  let level = 1;
  let branches = getBranches(state, rootCommitId);
  if (!branches) {
    return null;
  }

  let data = createData(state, branches, level, rootMasterId, allCommitIds);

  let [...commitBranchIds] = branches.keys();
  for (let commitBranchId of commitBranchIds) {
    let subBranches = getBranches(state, commitBranchId);
    if (subBranches) {
      refId = getMasterRef(data, commitBranchId);
      allCommitIds.add(commitBranchId);

      if (refId) {
        //debugger;
        let subBranchData = createData(state, subBranches, level + 2, refId, allCommitIds);

        let index = getIndex(data, commitBranchId, refId);
        data = data.setIn(
          ["children", index.commitIndex, "children", index.refIndex, "children"],
          subBranchData.get("children")
        );
      }
    }
  }

  return data;
};

const getIndex = function(data, commitBranchId, refId) {
  let dataList = data.get("children").toJS();
  let refIndex = null;
  let commitIndex = null;
  for (let index in dataList) {
    if (dataList[index].branchId === commitBranchId) {
      commitIndex = index;

      for (let jndex in dataList[index].children) {
        if (dataList[index].children[jndex].refId === refId) {
          refIndex = jndex;
          break;
        }
      }
      break;
    }
  }
  return { commitIndex, refIndex };
};

export const createData = function(state, branches, level, refId, allCommitIds) {
  let topName = state.getInPath(`entities.refs.byId.${refId}.name`);
  let data = Im.fromJS({ name: topName, refId, children: [] });
  let [...branchIds] = branches.keys();

  for (let branchId of branchIds) {
    allCommitIds.add(branchId);
    let name = "";
    let masterRefId = "";
    let isMaster = true;
    let subData = Im.Map({
      name,
      masterRefId,
      branchId,
      colname: `level${level}`,
      children: Im.List(),
      isMaster
    });

    let [...subBranchIds] = branches.getIn([branchId, "byId"]).keys();
    for (let subBranchId of subBranchIds) {
      subData = createSubData(state, branches, branchId, subBranchId, subData, allCommitIds, level);
    }
    data = data.setIn(["children", data.get("children").size], subData);
  }
  return data;
};

export const createSubData = function(state, branches, branchId, subBranchId, subData, allCommitIds, level) {
  let subRefId = branches.getIn([branchId, "byId", subBranchId, "target", "ref"]);
  let isMaster = !!branches.getIn([branchId, "byId", subBranchId, "heads", "master"]);
  //If the ref is master, then update the name of level above
  if (isMaster) {
    let treeId = state.getInPath(`entities.refs.byId.${subRefId}.latest_commit.tree_root.uid`);
    let latestCommitId = state.getInPath(`entities.refs.byId.${subRefId}.latest_commit.uid`);
    allCommitIds.add(latestCommitId);

    if (treeId && state.getInPath(`entities.commitEdges.byId.${latestCommitId}`)) {
      let descriptionId = state
        .getInPath(`entities.commitEdges.byId.${latestCommitId}.trees.${treeId}.descriptions`)
        .first();
      let description = state.getInPath(`entities.descriptions.byId.${descriptionId}`);
      subData = subData.set("name", description.get("title"));
      subData = subData.set("masterRefId", subRefId);
    }
  }

  // Set the data for the current level
  let name = state.getInPath(`entities.refs.byId.${subRefId}.name`);
  return subData.setIn(["children", subData.get("children").size], {
    name,
    branchId: subBranchId,
    refId: subRefId,
    colname: `level${level + 1}`,
    isMaster,
    children: Im.List()
  });
};
