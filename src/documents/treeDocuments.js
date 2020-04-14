import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import * as eventHandlers from "traec/eventHandlers";

import { BSBtn } from "traec-react/utils/bootstrap/btn";

export class TreacDocuments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: null,
      documents: {}
    };

    this.requiredFetches = [
      new Traec.Fetch("project_tracker", "list"),
      new Traec.Fetch("tracker", "read"),
      new Traec.Fetch("tracker_commit_edge", "read")
    ];
    this.collectDocumentInfo = this.collectDocumentInfo.bind(this);
    this.setSortKey = this.setSortKey.bind(this);
  }

  getUrlParams() {
    let { trackerId, commitId, treeId, refId } = this.props;
    return { refId, treeId, trackerId, commitId };
  }

  handleEvent(e, eventName) {
    e.preventDefault();
    let params = this.getUrlParams();
    let fetch = eventHandlers[eventName].bind(this)(params);
    this.props.setFormStateHandler({ formParams: fetch.params, fieldType: "docCard" });
    fetch.toggleForm();
  }

  renderAddDocumentBtn() {
    if (this.props.isAdmin && this.props.treeId) {
      return (
        <BSBtn
          text="Add Document"
          onClick={e => this.handleEvent(e, "addDocument")}
          primaryOff={true}
          title="Document placeholder will be attached to the hightlighted task"
        />
      );
    }
    return "";
  }

  collectDocumentInfo(docInfo) {
    this.setState({ documents: Object.assign(this.state.documents, docInfo) });
  }

  setSortKey(e, name) {
    this.setState({ sortKey: name });
  }

  renderSubDocuments() {
    let { trackerId, treeId, commitId, subDocumentIds, selector, refId } = this.props;

    let subDocuments = <p>Select a sub-task</p>;
    if (treeId) {
      subDocuments = subDocumentIds.map((subDocId, i) => (
        <this.props.documentComponent
          key={i}
          refId={refId}
          selector={selector}
          docId={subDocId}
          trackerId={trackerId}
          commitId={commitId}
          collector={this.collectDocumentInfo}
        />
      ));
    }

    //subDocuments = sortComponentList(subDocuments, this.state.sortKey, this.state.documents, "docId");
    return subDocuments;
  }

  render() {
    return (
      <React.Fragment>
        {this.renderAddDocumentBtn()}
        <h4>{this.props.header}</h4>
        {/*<DocumentSortBar setSortKey={this.setSortKey} sortKey={this.state.sortKey} />*/}
        <div style={{ clear: "both" }} />
        {this.renderSubDocuments()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { trackerId, treeId, commitId, selector } = ownProps;
  let tree = state.getInPath(`entities.trees.byId.${treeId}`);
  const basePath = `entities.commitEdges.byId.${commitId}.trees.${treeId}`;
  const subTreeIds = state.getInPath(`${basePath}.trees`) || Traec.Im.List();
  const subDocumentIds = state.getInPath(`${basePath}.documents`) || Traec.Im.Set();
  let selected = state.getInPath(`ui.dashboards.${trackerId}.selected.${selector}`) === treeId;

  return {
    tree,
    subTreeIds,
    subDocumentIds,
    selected
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default TreacDocuments = connect(mapStateToProps, mapDispatchToProps)(TreacDocuments);
