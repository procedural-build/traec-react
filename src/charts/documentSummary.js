import React, { Component } from "react";
import { connect } from "react-redux";
import Traec from "traec";

class DocumentSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    let { trackerId } = this.props;
    this.requiredFetches = [new Traec.Fetch("tracker_documents", "list", { trackerId })];
  }

  fetchCommitEdges() {
    let { refs, trackerId } = this.props;
    if (refs) {
      refs.map(ref => {
        let commitId = ref.getInPath("latest_commit.uid");
        let fetch = new Traec.Fetch("tracker_commit_edge", "read", { trackerId, commitId });
        fetch.dispatch();
      });
    }
  }

  getChartData() {
    let { refs, documentStatuses, descriptions, commitEdges, commitBranches } = this.props;
    console.log(commitBranches);
    if (commitBranches.size == 6) {
      debugger;
    }
    let a = "";
    return;
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
    this.fetchCommitEdges();
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
    this.fetchCommitEdges();
  }

  render() {
    if (this.props.commitBranches) this.getChartData();
    return <div>Document Summary</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  let refs = state.getInPath(`entities.refs.byId`);
  let documentStatuses = state.getInPath("entities.docStatuses.byId");
  let descriptions = state.getInPath("entities.descriptions.byId");
  let commitEdges = state.getInPath("entities.commitEdges.byId");
  let commitBranches = state.getInPath("entities.commitBranches.commit");
  return {
    refs,
    documentStatuses,
    descriptions,
    commitEdges,
    commitBranches
  };
};

export default DocumentSummary = connect(mapStateToProps)(DocumentSummary);
