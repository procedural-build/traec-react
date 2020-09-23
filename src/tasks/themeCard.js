import React from "react";
import Traec from "traec";

//import "../styles.css";
import { BSBtnDropdown, BSBtn } from "traec-react/utils/bootstrap";
import { projectPermissionFilter } from "traec/utils/permissions/project";
import { getChildrenAndScores, getPerformanceIndex, getScore } from "./score";
import { renderParameters, toggleShowDescription } from "./utils/cardUtils";
import { connect } from "react-redux";
import BranchSelect from "./utils/branchSelect";
import { dispatchAsSelected, dropDownLinks, saveToRedux } from "./utils/cardUtils";
import Octicon from "react-octicon";
import { getThemeTarget } from "AppSrc/scores/targets";
import { getProjectProps } from "AppSrc/project/utils";
import { getTreeDescription } from "./utils/dataExtraction";

export class ThemeCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      selected: null,
      showDescription: false
    };

    this.requiredFetches = [
      new Traec.Fetch("tracker_commit_edge", "read"),
      new Traec.Fetch("tracker_commit_value", "list")
    ];

    this.changeSelected = this.changeSelected.bind(this);
    this.dispatchAsSelected = dispatchAsSelected.bind(this);
    this.saveToRedux = saveToRedux.bind(this);
    this.renderParameters = renderParameters.bind(this);
    this.toggleShowDescription = toggleShowDescription.bind(this);
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
    let { treeId, crefId, commitId } = this.props;
    this.dispatchAsSelected(treeId, crefId, commitId);
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();

    if (this.props.hasChildren) {
      this.handleChildScoreUpdates();
    }

    if (this.props.rootCommitId) {
      new Traec.Fetch("tracker_commit_target", "list", {
        trackerId: this.props.trackerId,
        commitId: this.props.rootCommitId
      }).dispatch();
    }
    if (
      this.props.scoreValues &&
      !this.state.value &&
      this.props.scoreValues.first().get("value") !== this.state.value
    ) {
      this.setState({ value: this.props.scoreValues.first().get("value") });
    }
  }

  getUrlParams() {
    let { trackerId, commitId, treeId, crefId } = this.props;
    return { refId: crefId, treeId, trackerId, commitId };
  }

  handleChildScoreUpdates() {
    if (this.props.scoreFromChildren && this.props.scoreFromChildren !== this.state.value) {
      this.setState(
        {
          isSaved: false,
          value: this.props.scoreFromChildren
        },
        () => {
          this.saveToRedux();
        }
      );
    }
  }

  getDropdownLinks() {
    let links = dropDownLinks(this.props.isRootTree, this.getUrlParams());
    links = projectPermissionFilter(this.props.projectId, links);
    return links;
  }

  /**********************
   ACTIONS
   **********************/

  changeSelected(e, index) {
    e.preventDefault();

    let { subCategories } = this.props;

    let subCategory = subCategories.get(index);
    let treeId = subCategory.getInPath("target.ref.latest_commit.tree_root.uid");
    let commitId = subCategory.getInPath("target.commit.uid") || subCategory.getInPath("target.ref.latest_commit.uid");
    let crefId = subCategory.getInPath("target.ref.uid");

    this.dispatchAsSelected(treeId, crefId, commitId);
  }

  /**********************
   RENDER METHODS
   **********************/

  renderStatusbar() {
    let { trackerId, treeId, crefId, commitId, parentCommitId, parentTreeId } = this.props;
    return (
      <div className="row">
        <div className="col-sm-10">
          <BranchSelect
            trackerId={trackerId}
            treeId={treeId}
            crefId={crefId}
            commitId={commitId}
            parentCommitId={parentCommitId}
            parentTreeId={parentTreeId}
          />
        </div>
        <div className="col-sm-2">
          <BSBtnDropdown links={this.getDropdownLinks()} />
        </div>
      </div>
    );
  }

  renderScores() {
    let value = this.state.value === null ? "" : this.state.value;

    return (
      <div>
        <h4>{`Performance Index: ${(value * 100).toFixed(1)}%`}</h4>
      </div>
    );
  }

  renderTarget() {
    return (
      <div>
        <h6>{`Performance Target: ${(this.props.target * 100).toFixed(1)}%`}</h6>
      </div>
    );
  }

  renderThemes() {
    let { descriptions, description: current } = this.props;

    let buttons = descriptions.map((description, i) => {
      if (!description.first()) {
        return null;
      }
      return (
        <BSBtn
          key={i}
          text={description.size ? description.first().get("title") : null}
          onClick={e => this.changeSelected(e, i)}
          primaryOff={current.get("title") !== description.first().get("title")}
          noFloatRight={true}
        />
      );
    });
    return (
      <div className="btn-group-lg float-left" role="group">
        {buttons}
      </div>
    );
  }

  render() {
    let { description } = this.props;
    if (!description) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-11">{this.renderThemes()}</div>
          <div className="col-sm-1">
            <Octicon
              className="float-right"
              name={this.state.showDescription ? "chevron-up" : "chevron-down"}
              onClick={this.toggleShowDescription}
            />
          </div>
        </div>
        <div className="pt-3 pb-3">{this.renderScores()}</div>
        <div>{this.renderTarget()}</div>
        <div>{this.renderParameters()}</div>
        <div>{this.renderStatusbar()}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { trackerId, subCategories, selectionLevel } = ownProps;

  let selected = state.getInPath(`ui.dashboards.${trackerId}.selected.${selectionLevel}`);

  let descriptions = subCategories.map(subCategory => {
    let subTreeId = subCategory.getInPath("target.ref.latest_commit.tree_root.uid");
    let commitId = subCategory.getInPath("target.commit.uid") || subCategory.getInPath("target.ref.latest_commit.uid");
    let fetch = new Traec.Fetch("tracker_commit_edge", "read", { trackerId, commitId });
    fetch.dispatch();
    return getTreeDescription(state, state.getInPath(`entities.trees.byId.${subTreeId}`), commitId);
  });

  let treeId = null;
  let crefId = null;
  let commitId = null;

  if (!selected) {
    let subCategory = subCategories.first();
    treeId = subCategory.getInPath("target.ref.latest_commit.tree_root.uid");
    crefId = subCategory.getInPath("target.ref.uid");
    commitId = subCategory.getInPath("target.commit.uid") || subCategory.getInPath("target.ref.latest_commit.uid");
  } else {
    crefId = selected.get("crefId");
    treeId = selected.get("treeId");
    commitId = selected.get("commitId");
  }
  // Get the rootTreeId (to determine if we are on a )
  let cref = state.getInPath(`entities.refs.byId.${crefId}`);
  let activeCommitId = commitId || cref.getInPath("latest_commit.uid");
  let commit = state.getInPath(`entities.commits.byId.${activeCommitId}`) || cref.get("latest_commit");
  let rootTreeId = commit.getInPath("tree_root.uid");
  let isRootTree = rootTreeId === treeId;

  // Get this tree object
  let tree = state.getInPath(`entities.trees.byId.${treeId}`);

  // Add the descriptions onto the tree object
  let description = getTreeDescription(state, tree, commitId);
  tree = tree ? tree.set("descriptions", description) : tree;
  let { score, scoreValues } = getScore(state, tree, commitId);
  let { children, scoreFromChildren } = getChildrenAndScores(state, tree, commitId);
  scoreFromChildren = scoreFromChildren
    ? getPerformanceIndex(scoreFromChildren, score.getIn(["parameters", "params_json", "max"]))
    : scoreFromChildren;

  let category = score ? state.getInPath(`entities.baseMetrics.byId.${score.get("metric")}.category`) : null;
  let projectId = state.getInPath(`entities.trackers.byId.${trackerId}.project.uid`);
  let { cref: rootcRef } = getProjectProps(state, projectId);
  let rootCommitId = rootcRef ? rootcRef.getInPath("latest_commit.uid") : null;
  let target = getThemeTarget(state, rootCommitId, category);
  return {
    tree,
    treeId,
    crefId,
    commitId,
    rootCommitId,
    rootTreeId,
    isRootTree,
    description: description ? description.first() : null,
    descriptions,
    selected,
    score,
    scoreValues,
    hasChildren: children,
    scoreFromChildren,
    target
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

const ThemeCardConnected = connect(mapStateToProps, mapDispatchToProps)(ThemeCard);
export default ThemeCardConnected;
