import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import TreeRow from "./treerow";

class CategoryRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      nameFormParams: {
        stateParams: {},
        fetchParams: {},
        initFields: {}
      }
    };

    this.requiredFetches = [new Traec.Fetch("tracker_commit_edge", "read")];

    this.addBranch = this.addBranch.bind(this);
    this.editBranch = this.editBranch.bind(this);
    this.doCommit = this.doCommit.bind(this);
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  dropDownLinks() {
    return [
      { name: "Add Branch", onClick: this.addBranch },
      { name: "Rename Branch", onClick: this.editBranch },
      { name: "Make a Commit", onClick: this.doCommit },
      //{ name: "Show Commit Log", linkTo: `/tracker/${tid}/ref/${cid}/log` },
      { name: null }
    ];
  }

  getUrlParams() {
    const cref = this.props.cref;
    const refId = cref.get("uid");
    const trackerId = cref.get("tracker");
    const rootId = cref.getIn(["latest_commit", "root_commit"]);
    const commitId = cref.getIn(["latest_commit", "uid"]);
    return { refId, trackerId, rootId, commitId };
  }

  addBranch(e) {
    e.preventDefault();
    let { refId, trackerId, rootId } = this.getUrlParams();
    const { parentCommitId: commitId } = this.props;
    let fetch = new Traec.Fetch("tracker_ref_branch", "post", {
      trackerId,
      refId,
      commitId
    });
    this.setState({ nameFormParams: fetch.params });
    fetch.toggleForm();
  }

  editBranch(e) {
    e.preventDefault();
    let { crefId, trackerId, rootId } = this.getUrlParams();
    let fetch = new Traec.Fetch("tracker_ref", "patch", { trackerId, refId });
    this.setState({ nameFormParams: fetch.params });
    fetch.toggleForm();
  }

  doCommit(e) {
    e.preventDefault();
    let { refId, trackerId, rootId, commitId } = this.getUrlParams();
    let fetch = new Traec.Fetch("tracker_commit", "post", {
      trackerId,
      refId,
      commitId
    });
    this.setState({
      nameFormParams: {
        ...fetch.params,
        initFields: {
          comment: {
            value: "",
            class: "col mb-1",
            label: "",
            placeholder: "Comment"
          }
        }
      }
    });
    fetch.toggleForm();
  }

  render() {
    let {
      cref,
      rootTreeId,
      parentCommitId,
      headCommitId,
      extraRowClass,
      renderRootTree = true,
      rootTreeName = null,
      addWithDescriptions,
      showTreesWithoutDescriptions = true,
      forceExpand = false,
      isRoot = false
    } = this.props;

    if (!cref) {
      return null;
    }
    if (!cref.getInPath("latest_commit.is_staging")) {
      return null;
    }

    if (cref.get("uid") == "a0f908d3-5a2c-4ac3-9b5d-7ae8d13b1db4") {
      console.log(`RENDERING REF ${cref.get("uid")}`);
    }

    // Return the element
    return (
      <TreeRow
        isRoot={true}
        extraRowClass={extraRowClass}
        treeId={rootTreeId}
        cref={cref}
        parentCommitId={parentCommitId}
        headCommitId={headCommitId}
        extraContent={null}
        extraDropDowns={this.dropDownLinks()}
        //
        renderRootTree={renderRootTree}
        renderName={rootTreeName}
        addWithDescriptions={addWithDescriptions}
        showTreesWithoutDescriptions={showTreesWithoutDescriptions}
        forceExpand={forceExpand}
        // Using a generic single-input field "nameForm"
        nameFormParams={this.state.nameFormParams}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //console.log("Mapping state to props for category, ", ownProps._id, ownProps.branchId)
  // Get the starting (referring category)
  let { parentCommitId: commitId, refId, tracker } = ownProps;
  let cref = state.getInPath(`entities.refs.byId.${refId}`) || Traec.Im.Map();
  let rootTreeId = cref.getInPath("latest_commit.tree_root.uid");
  let trackerId = tracker ? tracker.get("uid") : null;
  return { trackerId, commitId, cref, rootTreeId };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryRow);
