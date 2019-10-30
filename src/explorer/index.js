import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import CategoryRow from "./category";

class TrackerTree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formParams: {
        initFields: {}
      }
    };

    this.requiredFetches = [new Traec.Fetch("tracker", "read")];

    this.addRootCategory = this.addRootCategory.bind(this);
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  dropDownLinks() {
    return [{ name: "Add a Category", onClick: this.addRootCategory }];
  }

  addRootCategory(e) {
    e.preventDefault();
    let { trackerId, refId, commitId, treeId } = this.props;
    let fetch = new Traec.Fetch("tracker_ref_tree_branch", "post", {
      trackerId,
      refId,
      commitId,
      treeId
    });
    this.setState({ formParams: { params: fetch.params } });
    fetch.toggleForm();
  }

  render() {
    const { tracker, trackerId, refId, commitId } = this.props;

    if (!tracker) {
      return null;
    }

    return (
      <React.Fragment>
        <CategoryRow
          isRoot={true}
          extraRowClass={"ml-0"}
          tracker={tracker}
          trackerId={trackerId}
          commitId={commitId}
          branchId={null}
          refId={refId}
          renderRootTree={true}
          rootTreeName={tracker.get("name")}
          addWithDescriptions={false}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { trackerId } = ownProps;
  let tracker = state.getInPath(`entities.trackers.byId.${trackerId}`);
  let refId = tracker ? tracker.getInPath("root_master") : null;
  let ref = state.getInPath(`entities.refs.byId.${refId}`);
  let commitId = ref ? ref.getInPath(`latest_commit.uid`) : null;
  let treeId = ref ? ref.getInPath(`latest_commit.tree_root.uid`) : null;
  return { trackerId, tracker, refId, ref, commitId, treeId };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackerTree);