import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import Crypto from "crypto";
import Im from "traec/immutable";

import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import BaseFormConnected from "traec-react/utils/form";
import { confirmDelete } from "traec-react/utils/sweetalert";

import DocumentRow from "./docrow";
import CategoryRow from "./category";
import Octicon from "react-octicon";
import { nameFormFields, titleDescriptionFields } from "./form";

/*
Functional components
*/

function SubCategoryList({ commitId, commitBranches, tracker }) {
  if (!commitBranches) {
    return null;
  }
  return commitBranches
    .toList()
    .map((commitBranch, i) => (
      <CategoryRow
        key={i}
        parentCommitId={commitId}
        tracker={tracker}
        commitId={commitBranch.get("commit")}
        branchId={null}
        refId={commitBranch.getInPath("target.ref")}
      />
    ));
}

function SubTreeList({ treeIds, commitId, cref }) {
  if (!treeIds) {
    return null;
  }
  return treeIds.map((itemId, i) => <TreeRowConnected key={i} headCommitId={commitId} cref={cref} treeId={itemId} />);
}

function SubDocumentList({ treeId, commitId, cref, documentIds }) {
  if (!subDocuments) {
    return null;
  }
  return documentIds.map((item, i) => (
    <DocumentRow key={i} headCommitId={commitId} cref={cref} treeId={treeId} docId={item} />
  ));
}

/*
TreeRow Connected to Redux
*/

class TreeRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calledFetch: false,
      showDocs: false,
      nameFormParams: {
        stateParams: {},
        fetchParams: {},
        initFields: {}
      }
    };

    this.requiredFetches = [new Traec.Fetch("tracker_commit_edge", "read")];

    this.addTree = this.addTree.bind(this);
    this.editTree = this.editTree.bind(this);
    this.deleteTree = this.deleteTree.bind(this);
    this.addDocument = this.addDocument.bind(this);
    this.addCategoryRef = this.addCategoryRef.bind(this);
    this.clickedName = this.clickedName.bind(this);
    this.showDocs = this.showDocs.bind(this);
  }

  getUrlParams() {
    const cref = this.props.cref;
    const refId = cref.get("uid");
    const trackerId = cref.get("tracker");
    const commitId = this.props.commitId;
    const treeId = this.props.tree ? this.props.tree.get("uid") : null;
    return { refId, trackerId, commitId, treeId };
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  dropDownLinks() {
    let thisItems = [
      { name: "Rename", onClick: this.editTree },
      { name: "Add Folder", onClick: this.addTree },
      { name: "Add Document", onClick: this.addDocument },
      { name: "Add CategoryRef", onClick: this.addCategoryRef },
      { name: null },
      {
        name: this.state.showDocs ? "Hide Docs" : "Show Docs",
        onClick: this.showDocs
      },
      { name: null },
      { name: "Delete", onClick: this.deleteTree }
    ];
    let extraDropDowns = this.props.extraDropDowns || [];
    return extraDropDowns.concat(thisItems);
  }

  showDocs(e) {
    e.preventDefault();
    this.setState({ showDocs: !this.state.showDocs });
  }

  addTree(e) {
    e.preventDefault();
    let { refId, trackerId, treeId, commitId } = this.getUrlParams();
    let fetch = new Traec.Fetch("tracker_ref_tree_tree", "post", {
      trackerId,
      refId,
      commitId,
      treeId
    });
    fetch.updateFetchParams({
      preFetchHook: body => {
        let name =
          body.name ||
          Crypto.createHash("sha1")
            .update(body.title)
            .digest("hex");
        let newBody = { name };
        if (body.title) {
          newBody = {
            ...newBody,
            description: {
              title: body.title,
              text: body.description
            }
          };
        }
        return newBody;
      }
    });
    this.setState({ nameFormParams: fetch.params });
    fetch.toggleForm();
  }

  addDocument(e) {
    e.preventDefault();
    let { trackerId, refId, commitId, treeId } = this.getUrlParams();
    let fetch = new Traec.Fetch("tracker_ref_tree_document", "post", {
      trackerId,
      refId,
      commitId,
      treeId
    });
    this.setState({ nameFormParams: fetch.params });
    fetch.toggleForm();
  }

  editTree(e) {
    e.preventDefault();
    let { refId, trackerId, treeId, commitId } = this.getUrlParams();
    let fetch = new Traec.Fetch("tracker_ref_tree", "put", {
      trackerId,
      refId,
      commitId,
      treeId
    });
    this.setState({ nameFormParams: fetch.params });
    fetch.toggleForm();
  }

  deleteTree(e) {
    e.preventDefault();
    confirmDelete({
      text: `This will delete this tree including any data contained within.  Are you sure you would like to proceed?`,
      onConfirm: () => {
        new Traec.Fetch("tracker_ref_tree", "delete", { ...this.getUrlParams() }).dispatch();
      }
    });
  }

  addCategoryRef(e) {
    e.preventDefault();
    let { trackerId, refId, commitId, treeId } = this.getUrlParams();
    let fetch = new Traec.Fetch("tracker_ref_tree_branch", "post", {
      trackerId,
      refId,
      commitId,
      treeId
    });
    fetch.updateFetchParams({
      preFetchHook: body => {
        let name =
          body.name ||
          Crypto.createHash("sha1")
            .update(body.title)
            .digest("hex");
        let newBody = { name };
        if (body.title) {
          newBody = {
            ...newBody,
            description: {
              title: body.title,
              text: body.description
            }
          };
        }
        return newBody;
      }
    });
    this.setState({ nameFormParams: fetch.params });
    fetch.toggleForm();
  }

  clickedName(e) {
    e.preventDefault();
    let payload = {};
    const { cref, headCommitId, parentCommitId } = this.props;
    const treeId = this.props.tree.get("uid");
    if (this.props.isRoot) {
      payload = {
        type: this.isSelected() ? null : "refs",
        uid: this.isSelected() ? null : cref.get("uid"),
        parentCommitId: parentCommitId
      };
    } else {
      payload = {
        type: this.isSelected() ? null : "trees",
        uid: this.isSelected() ? null : treeId,
        refId: cref.get("uid"),
        parentCommitId: headCommitId
      };
    }
    if (e.ctrlKey && !this.isActiveSelection() && this.props.activeSelection) {
      payload.uid = this.props.isRoot ? cref.get("uid") : treeId;
      this.props.dispatch({
        type: "ENTITY_ADD_OR_REMOVE_FROM_DICT",
        stateParams: { itemPath: "ui.explorer.selected" },
        payload
      });
    } else {
      this.props.dispatch({
        type: "ENTITY_SET_IN",
        stateParams: { itemPath: "ui.explorer.activeSelection" },
        payload
      });
      // Clear the other selection if there is no shift key held
      this.props.dispatch({
        type: "ENTITY_SET_IN",
        stateParams: { itemPath: "ui.explorer.selected" },
        payload: {}
      });
    }
  }

  isActiveSelection() {
    const treeId = this.props.tree.get("uid");
    const selection = this.props.activeSelection;
    if (this.props.isRoot) {
      const cref = this.props.cref;
      return selection ? cref.get("uid") == selection.get("uid") : false;
    }
    return selection ? treeId == selection.get("uid") : false;
  }

  isSelected() {
    const treeId = this.props.tree.get("uid");
    const selection = this.props.allSelection;
    if (!selection) {
      return false;
    }
    if (this.props.isRoot) {
      const cref = this.props.cref;
      return selection.has(cref.get("uid"));
    }
    return selection.has(treeId);
  }

  render_doc_count() {
    let { documentIds } = this.props;
    if (!documentIds) {
      return null;
    }
    return `(${documentIds.count()})  `;
  }

  get_tree_name(tree) {
    // Render a name if passed in through props
    if (this.props.renderName) {
      return this.props.renderName;
    }
    // Try to get the title from the descriptions
    let descriptions = tree.get("descriptions");
    if (descriptions.size) {
      return descriptions.first().get("title");
    }
    // Otherwise just return the tree name
    return tree.get("name");
  }

  get_bgColor() {
    // Get the Selection type
    let bgColor = "";
    if (this.isActiveSelection()) {
      bgColor = "bg-info";
    } else if (this.isSelected()) {
      bgColor = "bg-secondary";
    }
    return bgColor;
  }

  render_row() {
    let { isRoot, tree } = this.props;
    const name = this.get_tree_name(tree);
    const bgColor = this.get_bgColor();
    return (
      <div className={`row m-0 p-0 ${bgColor}`} style={{ borderTop: "1px solid #F6F6F6" }}>
        <div className="col-sm-11 m-0 p-0">
          <p
            className={`m-0 p-0 mr-2 pr-2`}
            style={{ display: "inline-block", verticalAlign: "middle" }}
            onClick={this.clickedName}
          >
            {isRoot ? (
              <b>{name}</b>
            ) : (
              <React.Fragment>
                {/*<Octicon name="primitive-dot" />*/}
                {name}
              </React.Fragment>
            )}
          </p>
          {this.props.extraContent}
        </div>
        <div className="col-sm-1 m-0 p-0">
          <BSBtnDropdown
            links={this.dropDownLinks()}
            header={<React.Fragment>{this.render_doc_count()}</React.Fragment>}
          />
        </div>
      </div>
    );
  }

  render() {
    let { tree, tracker, isRoot, extraRowClass, addWithDescriptions } = this.props;

    //console.log("Rendering tree", this.props.treeId)
    if (!tree) {
      return "";
    }
    if (!tracker) {
      return "";
    }

    extraRowClass = extraRowClass || "ml-2";

    // Return the element
    return (
      <div className={`m-0 ${extraRowClass}`}>
        {this.render_row()}
        {/* Render the form for simple name input */}
        <BaseFormConnected
          params={this.state.nameFormParams}
          fields={addWithDescriptions ? titleDescriptionFields : nameFormFields}
        />
        {/* Render the sub-elements */}
        <SubTreeList {...this.props} />
        {this.state.showDocs ? <SubDocumentList {...this.props} /> : null}
        <SubCategoryList {...this.props} extraRowClass={null} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { cref, treeId } = ownProps;
  // Get the commit target
  const latestCommitId = cref.getInPath("latest_commit.uid");
  const commitId = ownProps.headCommitId || latestCommitId;
  const commit = state.getInPath(`entities.commits.byId.${commitId}`);
  const commitEdges = state.getInPath(`entities.commitEdges.byId.${commitId}`);
  // Get the root tree (used to determine if we should re-fetch)
  const rootTreeId = commit ? commit.get("tree_root") : null;
  const rootTree = rootTreeId ? state.getInPath(`entities.trees.byId.${rootTreeId}`) : null;
  // CategoryRef and Tracker UIDs
  const cid = cref.get("uid");
  const trackerId = cref.get("tracker");
  // Get the related items (from commit info)
  const basePath = `entities.commitEdges.byId.${commitId}.trees.${treeId}`;
  const treeIds = state.getInPath(`${basePath}.trees`);
  const documentIds = state.getInPath(`${basePath}.documents`);
  // Get the commit branch pointers
  const commitBranches = state.getInPath(`${basePath}.categories`);
  // UI related selections
  const activeSelection = state.getInPath(`entities.ui.explorer.activeSelection`);
  const allSelection = state.getInPath(`entities.ui.explorer.selected`);
  // Root objects
  let tree = state.getInPath(`entities.trees.byId.${treeId}`);
  const tracker = state.getInPath(`entities.trackers.byId.${trackerId}`);
  // Add the descriptions onto the tree objects
  if (tree) {
    const descriptionIds = state.getInPath(`${basePath}.descriptions`);
    let descriptions = descriptionIds
      ? descriptionIds.map(id => state.getInPath(`entities.descriptions.byId.${id}`))
      : Im.List();
    tree = tree.set("descriptions", descriptions);
  }
  return {
    trackerId,
    tracker,
    commit,
    commitId,
    commitEdges,
    rootTree,
    tree,
    treeIds,
    documentIds,
    commitBranches,
    activeSelection,
    allSelection,
    latestCommitId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

const TreeRowConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeRow);
export default TreeRowConnected;