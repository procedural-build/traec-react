import Traec from "traec";

/**
 * Extracts a trees descriptions from the state.
 * @namespace getTreeDescription
 * @param {Im.Map} state - The redux state as an immutable.
 * @param {Im.Map} tree - The tree you want to get the descriptions for.
 * @param {string} commitId - The commit id of the tree.
 * @returns {Im.List} An immutable list of all the trees descriptions
 */
export const getTreeDescription = function(state, tree, commitId) {
  if (!tree) {
    return Traec.Im.List();
  }

  const basePath = `entities.commitEdges.byId.${commitId}.trees.${tree.get("uid")}`;
  const descriptionIds = state.getInPath(`${basePath}.descriptions`);

  let descriptions = descriptionIds
    ? descriptionIds.map(id => state.getInPath(`entities.descriptions.byId.${id}`))
    : Traec.Im.List();

  return descriptions;
};

/**
 * Extracts the root tree id of the commit from the state,
 * @namespace getRootTreeId
 * @param {Im} state - The redux state as an immutable.
 * @param {string} commitId - The id of the commit.
 * @param {string} crefId - The commit refrence id.
 * @returns The id of the root tree.
 */
export const getRootTreeId = function(state, commitId, crefId) {
  let cref = getCrefFromCrefId(state, crefId);
  let activeCommitId = commitId || cref.getInPath("latest_commit.uid");
  let commit = state.getInPath(`entities.commits.byId.${activeCommitId}`) || cref.get("latest_commit");
  let rootTreeId = commit.getInPath("tree_root.uid");
  return rootTreeId;
};

/**
 * Extracts the task id from the state.
 * @namespace getTaskId
 * @param {Im} state - The redux state as an immutable.
 * @param {string} crefId - The commit refrence id
 * @returns The task id from the commit refrence with the given commit refrence id.
 */
export const getTaskId = function(state, crefId) {
  let cref = getCrefFromCrefId(state, crefId);
  return state.getInPath(`${cref}.uid`);
};

/**
 * Finds the currently selected dashboard and checks if it is equal to the caller.
 * @namespace isSelected
 * @param {Im} state - The redux state as an immutable.
 * @param {string} trackerId - The id of the tracker
 * @param {number} selectionLevel - The selection level of the caller.
 * @param {Object} commit - An object containing the following:
 * { commitId, crefId, treeId }
 * @returns {boolean} True if the supplied commit is selected, otherwise false.
 */
export const isSelected = function(state, trackerId, selectionLevel, commit) {
  let selected = state.getInPath(`ui.dashboards.${trackerId}.selected.${selectionLevel}`);
  return selected ? selected.equals(Traec.Im.fromJS(commit)) : false;
};

/**
 * Extracts the project disciplines from a redux state.
 * @namespace getProjectDesciplineId
 * @param {*} state - The redux state as an immutable.
 * @param {*} projectId - The id of the project, which discipline id should be extracted.
 * @returns {Object[]} The projects discipline objects
 */
export const getProjectDesciplineId = function(state, projectId) {
  const disciplineDictionary = {};
  let disciplinePath = state.getInPath(`entities.projectObjects.byId.${projectId}.disciplines`) || Traec.Im.Map();
  /* Unoptimized:: The dictionary length is = # of disciplineID's.  In the long term, this is inefficient and could be reworked so that there is only 1 dictionary entry with key/value pairs for each disciplineName/Value. */
  let projectDisciplineId = disciplinePath.toList().map(disciplineID => {
    const disciplineValue = disciplineID.getInPath(`base_uid`);
    const disciplineName = disciplineID.getInPath(`name`);
    disciplineDictionary[disciplineName] = disciplineValue;
    return disciplineDictionary;
  });
  return projectDisciplineId;
};

/**
 * Extracts the names of the members of a project from the redux state.
 * @namespace getMembers
 * @param {Im.Map} state - The redux state as an immutable.
 * @param {string} projectId - The id of the project
 * @returns An immutable list of the names of the members of a project.
 */
export const getMembers = function(state, projectId) {
  let memberList = state.getInPath(`entities.projectObjects.byId.${projectId}.disciplines`) || Traec.Im.Map();
  let members = memberList.toList().map(item => {
    const itemName = item.getInPath(`name`);
    return itemName;
  });
  return members;
};

/**
 * Extracts the names of the assignees of a project from the redux state.
 * @namespace getAssignee
 * @param {*} state - The redux state as an immutable.
 * @param {*} crefId - The commit refrence id
 * @param {*} projectId - The id of the project.
 * @returns An immutable list of the names of the assigned persons to the project.
 */
export const getAssignee = function(state, crefId, projectId) {
  let taskDisciplineId = state.getInPath(`entities.refs.byId.${crefId}.latest_commit.discipline`);
  let documentAssigneeList = state.getInPath(`entities.projectObjects.byId.${projectId}.disciplines`) || Traec.Im.Map();
  let assignee = documentAssigneeList.toList().map(item => {
    if (item.getInPath(`base_uid`) === taskDisciplineId) {
      const itemName = item.getInPath(`name`);
      return itemName;
    } else {
      return;
    }
  });
  return assignee;
};

/**
 * Extracts the tree descriptions and the tree from a redux state,
 * The descriptions are also inserted into the tree object.
 * @namespace getTreeWithDescription
 * @param {Im.Map} state - The redux state as an immutable.
 * @param {string} treeId - The id of the tree.
 * @param {string} commitId - The commit id.
 * @returns An object containing the tree and the descriptions: {tree, descriptions}
 */
export const getTreeWithDescription = function(state, treeId, commitId) {
  let tree = state.getInPath(`entities.trees.byId.${treeId}`);
  let descriptions = getTreeDescription(state, tree, commitId);
  tree = tree ? tree.set("descriptions", descriptions) : tree;
  return { tree, descriptions };
};

/**
 * Extracts the commit refrence with the id parameterized by {crefId} from the redux state.
 * @namespace getCrefFromCrefId
 * @param {*} state - The redux state as an immutable.
 * @param {*} crefId - The commit refrence id.
 * @returns A commit refrence immutable map.
 */
function getCrefFromCrefId(state, crefId) {
  return state.getInPath(`entities.refs.byId.${crefId}`);
}
