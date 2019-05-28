import React from "react";
import { DropzoneButton } from "./dropZone";
import Traec from "traec";
import Octicon from "react-octicon";
import { connect } from "react-redux";
import { BSBtn } from "traec-react/utils/bootstrap";

class UploadDocumentButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: [],
      uploadedFile: false
    };
    this.confirmDocumentUpload = this.confirmDocumentUpload.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onCancelUpload = this.onCancelUpload.bind(this);
    this.addDocument = this.addDocument.bind(this);
  }

  addDocument(docId) {
    let {
      trackerId,
      refId,
      commitId,
      rootTreeId: treeId
    } = this.getUrlParams();
    let fetch = new Traec.Fetch("tracker_ref_document", "put", {
      trackerId,
      refId,
      commitId,
      documentId: docId
    });

    // Add the file object to the form and dispatch
    let formData = new FormData();
    formData.append("fileobj", this.state.selectedFiles[0]);
    fetch.updateFetchParams({ body: formData });
    fetch.dispatch();
    // Set the state here
    this.setState({
      uploadedFile: this.state.selectedFiles[0].name,
      selectedFiles: []
    });
  }

  getUrlParams() {
    let { cref, commitId, rootTreeId } = this.props;
    let trackerId = cref.get("tracker");
    let refId = cref.get("uid");
    return { trackerId, refId, commitId, rootTreeId };
  }

  confirmDocumentUpload(e, docId) {
    e.preventDefault();

    if (this.state.selectedFiles) {
      this.addDocument(docId);
    }
  }

  checkIfDocumentIsUploaded() {
    let { currentDocObject } = this.props;
    if (currentDocObject) {
      return !(currentDocObject.created && currentDocObject.virus_checked);
    }
  }

  onDrop(files) {
    this.setState({ selectedFiles: files });
  }

  onCancelUpload() {
    this.setState({ selectedFiles: [] });
  }

  render_current_object() {
    let { currentDocObject } = this.props;
    if (!currentDocObject) {
      return <p className="float-left">No file</p>;
    }
    let filename = currentDocObject.get("filename");
    let url = currentDocObject.get("url");
    return (
      <React.Fragment>
        {this.checkIfDocumentIsUploaded() ? (
          <Octicon name="check" className="float-left" />
        ) : (
          <Octicon name="file" />
        )}
        <a href={url} download={filename}>
          {filename}
        </a>
      </React.Fragment>
    );
  }

  render_select_file() {
    let { subDoc } = this.props;

    const files = this.state.selectedFiles.map(file => (
      <a key={file.name}>
        Upload {file.name}? ({(file.size / 1000000).toFixed(1)}Mb)
      </a>
    ));

    let selectedFiles = null;
    if (this.state.selectedFiles.length) {
      selectedFiles = <span>{files}</span>;
    }

    const confirmButton = (
      <BSBtn
        text={"Upload"}
        onClick={e => this.confirmDocumentUpload(e, subDoc.get("uid"))}
        extra_className="pl-1 pr-1 m-0 p-0"
        noFloatRight={true}
      />
    );

    return (
      <div className="float-right">
        <DropzoneButton
          onDrop={this.onDrop}
          extra_className="pl-1 pr-1 m-0 p-0"
          selectAreaText="Select file"
          confirmButton={confirmButton}
          selectedFiles={files}
          onCancelUpload={this.onCancelUpload}
        />
      </div>
    );
  }

  render() {
    let { subDoc } = this.props;
    return (
      <div>
        {this.render_current_object()}
        {this.render_select_file()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { commitId, rootTreeId, subDoc } = ownProps;
  let tree = state.getInPath(`entities.trees.byId.${rootTreeId}`);
  let commitEdges = commitId
    ? state.getInPath(`entities.commitEdges.byId.${commitId}`)
    : null;
  const docId = subDoc.get("uid");
  const doc = state.getInPath(
    `entities.commitEdges.byId.${commitId}.documents.${docId}`
  );
  let currentDocObject = false;
  let hasUploaded = false;

  if (doc) {
    const docStatus = state.getInPath(
      `entities.docStatuses.byId.${doc.get("status")}`
    );
    currentDocObject = docStatus
      ? state.getInPath(
          `entities.docObjects.byId.${docStatus.get("current_object")}`
        )
      : null;
  }

  // Add this to props
  return { commitEdges, tree, currentDocObject, hasUploaded };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDocumentButton);
