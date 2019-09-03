import Im from "traec/immutable";

export const getBranches = function(state, commitId) {
  let branches = state.getInPath(`entities.commitBranches.commit.${commitId}.branch`);
  if (branches) {
    return branches;
  } else {
    return null;
  }
};

export const getMasterRef = function(data, commitBranchId, parent) {
  let refId = null;
  if (!parent) {
    refId = data
      .get("children")
      .filter(branch => {
        if (branch.get("branchId") === commitBranchId) {
          return branch.get("masterRefId");
        }
      })
      .first();
    refId = refId ? refId.get("masterRefId") : null;
  } else if (parent) {
    refId = data
      .get("children")
      .filter(branch => {
        if (branch.get("branchId") === parent.commitBranchId) {
          return branch;
        }
      })
      .first()
      .get("children")
      .filter(subBranch => {
        if (subBranch.get("refId") === parent.refId) {
          return subBranch;
        }
      })
      .first()
      .get("children")
      .filter(branch => {
        if (branch.get("branchId") === commitBranchId) {
          return branch.get("masterRefId");
        }
      })
      .first();
    refId = refId ? refId.get("masterRefId") : null;
  }

  return refId ? refId : null;
};

export const constructDataTree = function(state, rootMasterId, rootCommitId, allCommitIds) {
  let level = 1;
  let branches = getBranches(state, rootCommitId);
  if (!branches) {
    return null;
  }

  let data = createData(state, branches, level, rootMasterId, allCommitIds);
  let result = constructChildTree(state, data, branches, allCommitIds, level);

  return result.data;
};

const constructChildTree = function(state, data, branches, allCommitIds, level, parent = null) {
  let refId = "";
  let [...commitBranchIds] = branches.keys();
  for (let commitBranchId of commitBranchIds) {
    let subBranches = getBranches(state, commitBranchId);
    if (subBranches) {
      refId = getMasterRef(data, commitBranchId, parent);
      allCommitIds.add(commitBranchId);

      if (refId) {
        let subBranchData = createData(state, subBranches, level + 2, refId, allCommitIds);
        let newData = setData(data, commitBranchId, refId, subBranchData.get("children"), parent);
        data = newData.data;
        let index = newData.index;
        let res = constructChildTree(state, data, subBranches, allCommitIds, level + 2, {
          commitBranchId,
          refId,
          index
        });
        data = res.data;
        allCommitIds = res.allCommitIds;
      }
    }
  }
  return { data, allCommitIds };
};

const getIndex = function(data, commitBranchId, refId, parent) {
  let dataList = data.get("children").toJS();
  let refIndex = null;
  let commitIndex = null;

  if (parent) {
    dataList = data.getIn(["children", parent.index.commitIndex, "children", parent.index.refIndex, "children"]).toJS();
  }
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

const setData = function(data, commitBranchId, refId, children, parent = null) {
  let index = getIndex(data, commitBranchId, refId, parent);

  if (!parent) {
    data = data.setIn(["children", index.commitIndex, "children", index.refIndex, "children"], children);
  } else {
    data = data.setIn(
      [
        "children",
        parent.index.commitIndex,
        "children",
        parent.index.refIndex,
        "children",
        index.commitIndex,
        "children",
        index.refIndex,
        "children"
      ],
      children
    );
  }
  return { data, index };
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
      let treeTreeId = state.getInPath(`entities.commitEdges.byId.${latestCommitId}.trees.${treeId}.trees`).first();

      if (treeTreeId) {
        let metricScoreId = state
          .getInPath(`entities.commitEdges.byId.${latestCommitId}.trees.${treeTreeId}.metricScores`)
          .first();
        let baseMetricId = state.getInPath(`entities.metricScores.byId.${metricScoreId}.metric`);
        let category = state.getInPath(`entities.baseMetrics.byId.${baseMetricId}.category`);
        subData = subData.set("name", category);
        subData = subData.set("masterRefId", subRefId);
      }
    }
  }

  // Set the data for the current level
  let name = state.getInPath(`entities.refs.byId.${subRefId}.name`);
  return subData.setIn(
    ["children", subData.get("children").size],
    Im.Map({
      name,
      branchId: subBranchId,
      refId: subRefId,
      colname: `level${level + 1}`,
      isMaster,
      children: Im.List()
    })
  );
};
