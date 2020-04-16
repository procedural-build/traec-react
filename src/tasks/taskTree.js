import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import * as eventHandlers from "traec/eventHandlers";
import TaskCard from "./taskCard";
import { reconstructCommitBranches } from "./utils/utils";
import "../styles.css";
import ThemeCard from "./themeCard";
import { Spinner } from "traec-react/utils/entities";
import { TaskSortBar } from "../sort/sortTasks";
import Im from "traec/immutable";
import { sortComponentList } from "./utils/sort";
import { BSBtn } from "traec-react/utils/bootstrap/btn";

export class TaskTreeList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: null,
      tasks: {}
    };

    this.setSortKey = this.setSortKey.bind(this);
    this.collectTaskInfo = this.collectTaskInfo.bind(this);

    this.requiredFetches = [
      new Traec.Fetch("project_tracker", "list"),
      new Traec.Fetch("tracker", "read"),
      new Traec.Fetch("tracker_commit_edge", "read")
    ];
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  collectTaskInfo(taskInfo) {
    this.setState({ documents: Object.assign(this.state.tasks, taskInfo) });
  }

  setSortKey(e, name) {
    this.setState({ sortKey: name });
  }

  handleEvent(e, eventName) {
    e.preventDefault();
    let { trackerId, crefId: refId, treeId, commitId } = this.props;
    let fetch = eventHandlers[eventName].bind(this)({ refId, treeId, trackerId, commitId });
    this.props.setFormStateHandler({
      formParams: fetch.params,
      fieldType: "scoreCard",
      level: this.props.selectionLevel
    });
    fetch.updateFetchParams({
      nextHandlers: [
        (data, post, orgpost) => {
          let fetch2 = new Traec.Fetch("tracker_ref_tree_tree_and_metric", "post", {
            trackerId,
            refId: data.target.ref.uid,
            commitId: data.target.ref.latest_commit.uid,
            treeId: data.target.ref.latest_commit.tree_root.uid
          });
          fetch2.updateFetchParams({
            body: {
              name: orgpost.title,
              unit: "Number",
              parameters: {
                max: orgpost.max,
                threshold: orgpost.threshold,
                weight: orgpost.weight
              },
              category: orgpost.category
            }
          });
          return fetch2.params;
        }
      ]
    });
    fetch.toggleForm();
  }

  renderSubTrees() {
    let { trackerId, treeId, crefId, commitId, subTreeIds, selectionLevel, projectId } = this.props;
    let subTrees = null;

    if (treeId) {
      subTrees = subTreeIds.map((subTreeId, i) => (
        <TaskCard
          key={i}
          selectionLevel={selectionLevel}
          treeId={subTreeId}
          trackerId={trackerId}
          crefId={crefId}
          commitId={commitId}
          projectId={projectId}
          collector={this.collectTaskInfo}
        />
      ));
      return sortComponentList(subTrees, this.state.sortKey, this.state.tasks, "crefId");
    } else {
      subTrees = <p>Select a task</p>;
    }
    return subTrees;
  }

  renderSubCategories() {
    let {
      subCategories,
      selectionLevel,
      trackerId,
      treeId: parentTreeId,
      commitId: parentCommitId,
      projectId
    } = this.props;
    if (!subCategories || !subCategories.size) {
      return null;
    }

    if (selectionLevel > 0) {
      let categories = subCategories.map((subCategory, i) => {
        let treeId = subCategory.getInPath("target.ref.latest_commit.tree_root.uid");
        let refId = subCategory.getInPath("target.ref.uid");
        let commitId =
          subCategory.getInPath("target.commit.uid") || subCategory.getInPath("target.ref.latest_commit.uid");
        return (
          <TaskCard
            key={i}
            selectionLevel={selectionLevel}
            treeId={treeId}
            trackerId={trackerId}
            crefId={refId}
            commitId={commitId}
            parentCommitId={parentCommitId}
            parentTreeId={parentTreeId}
            projectId={projectId}
            collector={this.collectTaskInfo}
          />
        );
      });

      return sortComponentList(categories, this.state.sortKey, this.state.tasks, "crefId");
    } else {
      return (
        <ThemeCard
          selectionLevel={selectionLevel}
          subCategories={subCategories}
          trackerId={trackerId}
          projectId={projectId}
        />
      );
    }
  }

  renderCreateTaskBtn() {
    if (!this.props.dashboard) return "";

    let selectionLevel = Math.max(this.props.selectionLevel - 1, 0);
    if (this.props.isAdmin && this.props.dashboard.getInPath(`selected.${selectionLevel}`)) {
      return <BSBtn onClick={e => this.handleEvent(e, "addCategoryRef")} primaryOff={true} text="Add a Task" />;
    }
    return "";
  }

  renderSpinner() {
    let { subCategories } = this.props;

    if (
      (!subCategories || !subCategories.size) &&
      (this.props.selectionLevel === "0" || this.props.selectionLevel === "1")
    ) {
      let title = this.props.header ? this.props.header : "Categories";
      return <Spinner title={`Loading ${title}`} />;
    }
  }

  render() {
    let { header } = this.props;
    return (
      <React.Fragment>
        {this.renderCreateTaskBtn()}
        <h4>{header}</h4>
        {this.props.selectionLevel !== "0" ? (
          <TaskSortBar setSortKey={this.setSortKey} sortKey={this.state.sortKey} />
        ) : (
          ""
        )}
        <div style={{ clear: "both" }} />
        {this.renderSpinner()}
        {this.renderSubTrees()}
        {this.renderSubCategories()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { trackerId, treeId, crefId, commitId, selectionLevel } = ownProps;
  // Get this tree object
  let tree = state.getInPath(`entities.trees.byId.${treeId}`);
  // Get the children Ids
  const basePath = `entities.commitEdges.byId.${commitId}.trees.${treeId}`;
  const subTreeIds = state.getInPath(`${basePath}.trees`) || Traec.Im.List();
  const subDocumentIds = state.getInPath(`${basePath}.documents`);
  // Get the subcategories (reconstrct ref and commits into target)
  let commitBranchMap = state.getInPath(`${basePath}.categories`) || Traec.Im.Map();
  let subCategories = reconstructCommitBranches(state, commitBranchMap);
  // Check if this is selected
  let selected = state.getInPath(`ui.dashboards.${trackerId}.selected.${selectionLevel}`);
  selected = selected ? selected.equals(Traec.Im.fromJS({ treeId, crefId, commitId })) : false;

  let dashboard = state.getInPath(`ui.dashboards.${trackerId}`);

  return {
    tree,
    subTreeIds,
    subDocumentIds,
    subCategories,
    selected,
    dashboard
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

const TaskTreeListConnected = connect(mapStateToProps, mapDispatchToProps)(TaskTreeList);
export default TaskTreeListConnected;
