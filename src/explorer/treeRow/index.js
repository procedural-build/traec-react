import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import Crypto from "crypto";
import Im from "traec/immutable";

import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import BaseFormConnected from "traec-react/utils/form";
import { confirmDelete } from "traec-react/utils/sweetalert";

import Octicon from "react-octicon";
import * as forms from "../form";
import { SubTrees } from "traec-react/explorer/treeRow/subTrees";
import { SubDocuments } from "traec-react/explorer/documentRow/subDocuments";
import { SubCategories } from "traec-react/explorer/categoryRow/subCategories";
import { TemplateItem } from "traec-react/explorer/treeRow/templateItem";
import { HTMLText } from "traec/utils/html";
import { DocumentCount } from "./documentCount";

function SubCategoryList({
  commitId,
  commitBranches,
  tracker,
  showTreesWithoutDescriptions = true,
  formFields = null,
  forceExpandAll = false
}) {
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
        renderRootTree={false}
        commitId={commitBranch.get("commit")}
        branchId={null}
        refId={commitBranch.getInPath("target.ref")}
        showTreesWithoutDescriptions={showTreesWithoutDescriptions}
        formFields={formFields}
        forceExpandAll={forceExpandAll}
      />
    ));
}

function SubTreeList({
  subTrees,
  commitId,
  cref,
  showTreesWithoutDescriptions = true,
  formFields = null,
  forceExpandAll = false
}) {
  if (!subTrees) {
    return null;
  }

  return (
    subTrees
      //.filter(i => (i.get('descriptions').first())) // Filter out trees without descriptions
      .sortBy(subTree => {
        // Sort based on the description title (if exists) else tree name
        let description = subTree.get("descriptions").first();
        return description ? description.get("title") : subTree.get("name");
      })
      .map((subTree, i) => (
        <TreeRowConnected
          key={i}
          headCommitId={commitId}
          cref={cref}
          treeId={subTree.get("uid")}
          showTreesWithoutDescriptions={showTreesWithoutDescriptions}
          formFields={formFields}
          forceExpandAll={forceExpandAll}
        />
      ))
  );
}

function SubDocumentList({ treeId, commitId, cref, documentIds, formFields = null }) {
  if (!subDocuments) {
    return null;
  }
  return documentIds
    .sortBy(docId => docId)
    .map((item, i) => (
      <DocumentRow key={i} headCommitId={commitId} cref={cref} treeId={treeId} docId={item} formFields={formFields} />
    ));
}

/*
TreeRow Connected to Redux
*/

class TreeRow extends React.PureComponent {
  constructor(props) {
    super(props);

    // Get the collapsed state from localStorage
    let isCollapsed = localStorage.getItem(`isCollapsed_tree_${props.treeId}`);
    // Convert the string to a boolean value
    isCollapsed = isCollapsed === "false" ? false : true;
    // Override if forceExpand is provided in the props
    isCollapsed = props.forceExpand || props.forceExpandAll ? false : isCollapsed;

    this.state = {
      calledFetch: false,
      showDocs: false,
      showDescription: false,
      isCollapsed: isCollapsed,
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
    this.addRevision = this.addRevision.bind(this);
    this.addFromTemplate = this.addFromTemplate.bind(this);
    this.clickedName = this.clickedName.bind(this);
    this.showDocs = this.showDocs.bind(this);
    this.showDescription = this.showDescription.bind(this);
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

  getRootDropdownLinks() {
    let { documentIds } = this.props;
    let dropdownLinks = [];
    if (this.props.template) {
      dropdownLinks = [
        { name: "Show Description", onClick: this.showDescription },
        documentIds
          ? {
              name: "Show Documents",
              onClick: this.showDocs
            }
          : { label: null }
      ];
    } else {
      dropdownLinks = [
        { name: "Edit Category", onClick: this.editTree },
        //{ name: "Add a new revision", onClick: this.addRevision },
        //{ name: "Add a new sub-category", onClick: this.addCategoryRef },
        { name: "Add a new package", onClick: this.addTree },
        { name: "Add a new document", onClick: this.addDocument },
        { name: "Add from template", onClick: this.addFromTemplate },
        { label: null },
        { name: "Delete category", onClick: this.deleteTree }
      ];
    }
    return dropdownLinks;
  }

  getTreeDropdownLinks() {
    let { documentIds } = this.props;
    let dropdownLinks = [];
    if (this.props.template) {
      dropdownLinks = [
        { name: "Show Description", onClick: this.showDescription },
        documentIds
          ? {
              name: "Show Documents",
              onClick: this.showDocs
            }
          : { label: null }
      ];
    } else {
      dropdownLinks = [
        { name: "Edit package", onClick: this.editTree },
        //{ name: "Add a new revision", onClick: this.addRevision },
        //{ name: "Add a new sub-category", onClick: this.addCategoryRef },
        { name: "Add a new package", onClick: this.addTree },
        { name: "Add a new document", onClick: this.addDocument },
        { label: null },
        { name: "Delete package", onClick: this.deleteTree }
      ];
    }

    return dropdownLinks;
  }

  showDocs(e) {
    e.preventDefault();
    this.setState({ showDocs: !this.state.showDocs });
  }

  showDescription(e) {
    e.preventDefault();
    this.setState({ showDescription: !this.state.showDescription });
  }

  addRevision(e) {
    alert("Not implemented");
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

  addFromTemplate(e) {
    e.preventDefault();
    this.props.history.push(`/tracker/${this.props.trackerId}/template`);
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

  deleteCategory(e) {
    e.preventDefault();
    alert("Not implemented");
  }

  addCategoryRef(e) {
    // Add a tree by default - later this can be converted to a revisionable branch
    //return this.addTree(e)
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
            },
            commit: commitId
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
    const { cref, headCommitId, parentCommitId, trackerId } = this.props;
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
        type: "UI_ADD_OR_REMOVE_FROM_DICT",
        stateParams: { itemPath: "explorer.selected" },
        payload
      });
    } else {
      this.props.dispatch({
        type: "UI_SET_IN",
        stateParams: { itemPath: `explorer.activeSelection.byId.${trackerId}` },
        payload
      });
      // Clear the other selection if there is no shift key held
      this.props.dispatch({
        type: "UI_SET_IN",
        stateParams: { itemPath: "explorer.selected" },
        payload: {}
      });
    }
  }

  isActiveSelection() {
    const treeId = this.props.tree.get("uid");
    const selection = this.props.activeSelection;
    if (this.props.isRoot) {
      const cref = this.props.cref;
      return selection ? cref.get("uid") === selection.get("uid") : false;
    }
    return selection ? treeId === selection.get("uid") : false;
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

  renderDocCount() {
    let { documentIds } = this.props;
    if (!documentIds) {
      return null;
    }
    return `(${documentIds.count()})  `;
  }

  hasDescription(tree) {
    let descriptions = tree.get("descriptions");
    return descriptions.size > 0;
  }

  getTreeName(tree) {
    let { renderName } = this.props;
    // Render a name if passed in through props
    if (renderName) {
      return renderName;
    }
    // Try to get the title from the descriptions
    let descriptions = tree.get("descriptions");
    if (descriptions.size) {
      return descriptions.first().get("title");
    }
    // Otherwise just return the tree name
    return tree.get("name");
  }

  getBgColor() {
    // Get the Selection type
    let bgColor = "";
    if (this.isActiveSelection()) {
      bgColor = "bg-info";
    } else if (this.isSelected()) {
      bgColor = "bg-secondary";
    }
    return bgColor;
  }

  renderTreeDescription() {
    if (!this.state.showDescription) {
      return null;
    }
    let { tree } = this.props;
    let descriptions = tree.get("descriptions");
    if (descriptions.size) {
      let description = descriptions.first().get("text");
      return <HTMLText text={description} extraClassName={"m-3"} />;
    }
  }

  renderTreeName(name) {
    let { treeIds, commitBranches, template } = this.props;
    let columnSize = template ? "10" : "11";
    if (treeIds.size || commitBranches) {
      return (
        <div className={`col-sm-${columnSize} mt-0 pt-0`}>
          <p className={`m-0 p-0 mr-2 pr-2`} style={{ display: "inline-block", verticalAlign: "middle" }}>
            <Octicon
              name={this.state.isCollapsed ? "chevron-right" : "chevron-down"}
              onClick={e => {
                localStorage.setItem(`isCollapsed_tree_${this.props.treeId}`, !this.state.isCollapsed);
                this.setState({ isCollapsed: !this.state.isCollapsed });
              }}
            />
            <b onClick={this.clickedName}>{name}</b>
          </p>
          {this.renderTreeDescription()}

          {this.props.extraContent}
        </div>
      );
    }
    return (
      <div className={`col-sm-${columnSize} mt-0 pt-0`}>
        <p
          className={`m-0 p-0 mr-2 pr-2`}
          style={{ display: "inline-block", verticalAlign: "middle" }}
          onClick={this.clickedName}
        >
          {name}
        </p>
        {this.renderTreeDescription()}
        {this.props.extraContent}
      </div>
    );
  }

  renderDropdownMenu() {
    let { treeIds, commitBranches } = this.props;
    let dropdownLinks = treeIds || commitBranches ? this.getRootDropdownLinks() : this.getTreeDropdownLinks();
    return (
      <div className="col-sm-1 m-0 p-0">
        <BSBtnDropdown
          links={dropdownLinks}
          header={<DocumentCount documentStatuses={this.props.documentStatuses} />}
        />
      </div>
    );
  }

  renderRow() {
    let {
      isRoot,
      renderRootTree,
      tree,
      showTreesWithoutDescriptions,
      template,
      copyToCommit,
      treeId,
      parentTreeId,
      templateTracker
    } = this.props;
    let { commitId: fromCommitId } = this.getUrlParams();
    // Skip rendering if there is no description
    if (!(isRoot && renderRootTree) && !showTreesWithoutDescriptions && !this.hasDescription(tree)) {
      return null;
    }

    const name = this.getTreeName(tree);
    const bgColor = this.getBgColor();
    return (
      <div className={`row m-0 p-0 ${bgColor}`} style={{ borderTop: "1px solid #F6F6F6" }}>
        {this.renderTreeName(name)}
        {this.renderDropdownMenu()}
        <TemplateItem
          template={template}
          copyToCommit={copyToCommit}
          parentTreeId={parentTreeId}
          treeId={treeId}
          fromCommitId={fromCommitId}
          templateTracker={templateTracker}
          deleteTree={this.deleteTree}
        />
      </div>
    );
  }

  renderSubItems() {
    if (this.state.isCollapsed && this.state.showDocs) {
      return (
        <React.Fragment>
          <SubDocuments
            documentIds={this.props.documentIds}
            treeId={this.props.treeId}
            cref={this.props.cref}
            commitId={this.props.commitId}
            show={this.state.showDocs}
          />
        </React.Fragment>
      );
    }
    if (this.state.isCollapsed) {
      return null;
    }
    return (
      <React.Fragment>
        <SubTrees {...this.props} />
        <SubDocuments
          documentIds={this.props.documentIds}
          treeId={this.props.treeId}
          cref={this.props.cref}
          commitId={this.props.commitId}
          showDropdown={!this.props.template}
          show={this.state.showDocs}
        />
        <SubCategories {...this.props} extraRowClass={null} />
      </React.Fragment>
    );
  }

  render() {
    let { tree, tracker, extraRowClass, addWithDescriptions, formFields } = this.props;
    if (!tree || !tracker) {
      return null;
    }
    // Set the margins (if not provided)
    extraRowClass = extraRowClass || "ml-2";

    return (
      <div className={`m-0 ${extraRowClass}`}>
        {this.renderRow()}
        {/* Render the form for simple name input */}
        <BaseFormConnected
          params={this.state.nameFormParams}
          fields={
            formFields ? forms[formFields] : addWithDescriptions ? forms.titleDescriptionFields : forms.nameFormFields
          }
        />
        {/* Render the sub-elements */}
        {this.renderSubItems()}
      </div>
    );
  }
}

export const getTreeWithDescriptions = (state, commitId, treeId) => {
  const basePath = `entities.commitEdges.byId.${commitId}.trees.${treeId}`;
  let tree = state.getInPath(`entities.trees.byId.${treeId}`);
  if (tree) {
    // Add the descriptions onto the tree objects
    const descriptionIds = state.getInPath(`${basePath}.descriptions`);
    let descriptions = descriptionIds
      ? descriptionIds.map(id => state.getInPath(`entities.descriptions.byId.${id}`))
      : Im.List();
    tree = tree.set("descriptions", descriptions);
  }
  return tree;
};

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
  const treeIds = state.getInPath(`${basePath}.trees`) || Traec.Im.List();
  const subTrees = treeIds.map(i => getTreeWithDescriptions(state, commitId, i));
  const documentIds = state.getInPath(`${basePath}.documents`);
  let documentStatuses = getDocumentStatuses(state, commitId, documentIds);

  // Get the commit branch pointers
  const commitBranches = state.getInPath(`${basePath}.categories`);
  // UI related selections
  const activeSelection = state.getInPath(`ui.explorer.activeSelection.byId.${trackerId}`);
  const allSelection = state.getInPath(`ui.explorer.selected`);
  // Root objects
  let tree = getTreeWithDescriptions(state, commitId, treeId);
  const tracker = state.getInPath(`entities.trackers.byId.${trackerId}`);

  return {
    trackerId,
    tracker,
    commit,
    commitId,
    commitEdges,
    rootTree,
    tree,
    treeIds,
    subTrees,
    documentIds,
    commitBranches,
    activeSelection,
    allSelection,
    latestCommitId,
    documentStatuses
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(TreeRow);

const getDocumentStatuses = (state, commitId, documentIds) => {
  if (!documentIds) {
    return null;
  }

  return documentIds.toList().map(documentId => {
    let statusId = state.getInPath(`entities.commitEdges.byId.${commitId}.documents.${documentId}.status`);
    return state.getInPath(`entities.docStatuses.byId.${statusId}.status`);
  });
};
