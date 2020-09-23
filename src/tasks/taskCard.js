import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import Octicon from "react-octicon";
import Crypto from "crypto";
import { targetFields } from "AppSrc/tracker/form";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import BranchSelect from "./utils/branchSelect";
//import "../styles.css";
import {
  dropDownLinks,
  dispatchAsSelected,
  getTreeDescription,
  saveToRedux,
  renderParameters,
  toggleShowDescription
} from "./utils/cardUtils";
import { checkIfChildrenAreLoaded, getChildrenAndScores, getScore } from "./score";
import { projectPermissionFilter } from "traec/utils/permissions/project";
import BaseFormConnected from "traec-react/utils/form";
import { getMetricTarget } from "AppSrc/scores/targets";
import Moment from "moment";
import { TargetForm } from "AppSrc/tasks/tasks/targets";
import { GearDropdown } from "AppSrc/tasks/utils/gearDropdown";
import TaskDocumentStatusContainer from "AppSrc/tasks/taskStatus/taskDocumentStatusContainer";
import { TaskStatusContainer } from "AppSrc/tasks/taskStatus";
import { TaskAssignForm } from "./tasks/taskAssignForm";
import TaskScore from "./score";

import {
  getRootTreeId,
  getTaskId,
  isSelected,
  getProjectDesciplineId,
  getMembers,
  getAssignee,
  getTreeWithDescription
} from "./utils/dataExtraction";

export class TaskCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      metricFormParams: {
        stateParams: {},
        fetchParams: {},
        initFields: {}
      },
      showDescription: false
    };

    this.requiredFetches = [
      new Traec.Fetch("tracker_commit_edge", "read"),
      new Traec.Fetch("tracker_commit_value", "list"),
      new Traec.Fetch("project_discipline", "list"),
      new Traec.Fetch("tracker_commit_target", "list"),
      new Traec.Fetch("tracker_commit_document_object", "list")
    ];

    this.toggleSelected = this.toggleSelected.bind(this);
    this.checkoutBranch = this.checkoutBranch.bind(this);
    this.dispatchAsSelected = dispatchAsSelected.bind(this);
    this.toggleShowDescription = toggleShowDescription.bind(this);
    this.renderParameters = renderParameters.bind(this);
    this.toggleDisciplineForm = this.toggleDisciplineForm.bind(this);
    this.toggleTargetForm = this.toggleTargetForm.bind(this);
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate(prevProps) {
    Traec.fetchRequired.bind(this)();
    this.pushTaskInfoToCollector();
  }

  pushTaskInfoToCollector() {
    let { description, crefId, taskStatus } = this.props;
    if (description) {
      let taskInfo = {};
      taskInfo[crefId] = {
        assignee: this.props.assignee,
        title: description.get("title"),
        status: taskStatus ? taskStatus.get("name") : null
      };
      this.props.collector(taskInfo);
    }
  }

  getUrlParams() {
    let { trackerId, commitId, treeId, crefId } = this.props;
    return { refId: crefId, treeId, trackerId, commitId };
  }

  getDropdownLinks() {
    let links = dropDownLinks(this.props.isRootTree, this.getUrlParams(), this);
    links = projectPermissionFilter(this.props.projectId, links);
    return links;
  }

  /**********************
   ACTIONS
   **********************/

  checkoutBranch(e) {
    e.preventDefault();
    const { trackerId, refId, commitId } = this.getUrlParams();
    let fetch = new Traec.Fetch("tracker_ref_branch", "put", { trackerId, refId, commitId, branchId: null });
    this.setState({ formParams: fetch.params });
    fetch.toggleForm();
  }

  toggleSelected(e) {
    e.preventDefault();
    let { treeId, crefId, commitId } = this.props;
    this.dispatchAsSelected(treeId, crefId, commitId);
  }

  toggleTargetForm() {
    this.setState({ showTargets: !this.state.showTargets });
  }

  toggleDisciplineForm() {
    this.setState({ showDiscipline: !this.state.showDiscipline });
  }
  /**********************
   RENDER METHODS
   **********************/
  renderStatusbar() {
    let { trackerId, treeId, crefId, commitId, parentCommitId, parentTreeId } = this.props;
    return (
      // <div className="row" style={{ backgroundColor: "#fafbfc" }}>
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
          <GearDropdown
            projectId={this.props.projectId}
            trackerId={trackerId}
            refId={crefId}
            commitId={commitId}
            treeId={treeId}
            toggleTargets={this.toggleTargetForm}
            toggleDisciplines={this.toggleDisciplineForm}
          />
        </div>
      </div>
    );
  }

  renderDescription(description) {
    if (this.state.showDescription) {
      return <div dangerouslySetInnerHTML={{ __html: description.get("text") }} />;
    } else {
      return null;
    }
  }

  renderTitle(description) {
    return (
      <div className="row">
        <div className="col-sm-11">
          <h5>{description.get("title")}</h5>
        </div>
        <div className="col-sm-1">
          <Octicon
            name={this.state.showDescription ? "chevron-up" : "chevron-down"}
            onClick={this.toggleShowDescription}
          />
        </div>
      </div>
    );
  }

  render() {
    let { description, selected, hasChildren, metricTarget } = this.props;
    if (!description) {
      return null;
    }
    return (
      <React.Fragment>
        <div
          className={`pt-3 pb-3 mt-3 mb-3 col-sm-12 ${selected ? `popcard-selected` : `popcard`}`}
          onClick={this.toggleSelected}
        >
          {this.renderTitle(description)}
          {this.renderDescription(description)}
          <TaskScore
            hasChildren={hasChildren}
            metricTarget={metricTarget}
            value={this.props.value}
            userName={this.props.userName}
            score={this.props.score}
            inputValueId={this.props.inputValueId}
            trackerId={this.props.trackerId}
            commitId={this.props.commitId}
            children={this.props.children}
            treeId={this.props.treeId}
            loadedChildren={this.props.loadedChildren}
            scoreValues={this.props.scoreValues}
            scoreFromChildren={this.props.scoreFromChildren}
          />
          {
            <TargetForm
              trackerId={this.props.trackerId}
              commitId={this.props.commitId}
              metric={this.props.metric}
              showForm={this.state.showTargets}
              toggleForm={this.toggleTargetForm}
            />
          }
          {this.renderParameters()}
          {this.renderStatusbar()}
          {
            <TaskAssignForm
              memberData={this.props.members.toJS()}
              projectDisciplineId={this.props.projectDisciplineId.toJS()}
              trackerId={this.props.trackerId}
              refId={this.props.crefId}
              commitId={this.props.commitId}
              showForm={this.state.showDiscipline}
              toggleForm={this.toggleDisciplineForm}
            />
          }
          <div>Assigned to: {this.props.assignee}</div>
          <TaskStatusContainer
            trackerId={this.props.trackerId}
            selectionLevel={this.props.selectionLevel}
            selected={this.props.selected}
          />
        </div>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  let { trackerId, treeId, crefId, commitId, selectionLevel } = ownProps;

  let { tree, descriptions } = getTreeWithDescription(state, treeId, commitId);
  let rootTreeId = getRootTreeId(state, commitId, crefId);
  let isRootTree = rootTreeId === treeId;

  let taskId = getTaskId(state, crefId);
  let taskStatus = state.getInPath(`entities.refs.byId.${crefId}.latest_commit.status`);

  let projectId = state.getInPath(`entities.trackers.byId.${trackerId}.project.uid`);

  let selected = isSelected(state, trackerId, selectionLevel, { treeId, crefId, commitId });

  let { children, scoreFromChildren } = getChildrenAndScores(state, tree, commitId);
  let loadedChildren = children ? checkIfChildrenAreLoaded(state, children) : false;

  let projectDisciplineId = getProjectDesciplineId(state, projectId);

  let assignee = getAssignee(state, crefId, projectId);
  let members = getMembers(state, projectId);

  let { score, scoreValues } = getScore(state, tree, commitId);
  let metric = score ? state.getInPath(`entities.baseMetrics.byId.${score.get("metric")}`) : null;
  let metricTarget = getMetricTarget(state, commitId, score);

  return {
    tree,
    rootTreeId,
    isRootTree,
    taskId,
    taskStatus,
    description: descriptions ? descriptions.first() : null,
    selected,
    score,
    scoreValues,
    hasChildren: children,
    loadedChildren,
    scoreFromChildren,
    descriptions,
    projectId,
    projectDisciplineId,
    assignee,
    members,
    metricTarget,
    metric
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

const TaskCardConnected = connect(mapStateToProps, mapDispatchToProps)(TaskCard);
export default TaskCardConnected;
