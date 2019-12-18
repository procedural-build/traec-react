import React, { Component } from "react";
import { connect } from "react-redux";
import Traec from "traec";
import { DocumentCardView } from "./documentCardView";
import Dropzone from "react-dropzone";
import Moment from "moment";

class DocumentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dueDate: "",
      action: "Nothing Recieved",
      selectedFiles: []
    };
  }

  adminDropDownLinks() {
    let items = [
      { name: "copy", onClick: this.copyDocument },
      { name: "Edit", onClick: this.editDocument },
      { name: "Delete", onClick: this.deleteDocument }
    ];
    return items;
  }

  componentDidMount() {
    let { docStatus } = this.props;
    if (docStatus) {
      let due_date = docStatus.get("due_date");
      this.setState(() => {
        return {
          dueDate: due_date ? Moment(due_date).toDate() : null,
          action: docStatus.getInPath("status.name")
        };
      });
    }
  }

  setAction(name) {
    this.setState(() => {
      return {
        action: name
      };
    });
  }

  deleteDocument() {
    throw "Not implemented";
  }

  editDocument() {
    throw "Not implemented";
  }

  copyDocument() {
    throw "Not implemented";
  }

  setDueDate(value) {
    if (value) value.setHours(1);
    this.setState(() => {
      return {
        dueDate: value ? value : ""
      };
    });
  }

  onDrop(files) {
    this.setState({ selectedFiles: files });
  }

  onCancelUpload() {
    this.setState({ selectedFiles: [] });
  }

  getFiles() {
    return this.state.selectedFiles.map(file => file.name + " (" + (file.size / 1000000).toFixed(1) + "Mb" + ")");
  }

  doUpload(e) {
    let { trackerId, refId, commitId, docId } = this.props;
    let fetch = new Traec.Fetch("tracker_ref_document", "put", { trackerId, refId, commitId, documentId: docId });
    if (this.state.selectedFiles.length) {
      let formData = new FormData();
      formData.append("fileobj", this.state.selectedFiles[0]);
      fetch.updateFetchParams({ body: formData });
      fetch.dispatch();
      this.setState({
        selectedFiles: []
      });
    }
  }

  save() {
    let { trackerId, refId, commitId, docId, docStatus } = this.props;
    let { dueDate, action } = this.state;
    let fetch = new Traec.Fetch("tracker_ref_document", "put", { trackerId, refId, commitId, documentId: docId });

    fetch.updateFetchParams({
      throttleTimeCheck: 0,
      body: {
        status: {
          uid: docStatus ? docStatus.get("uid") : null,
          due_date: dueDate ? dueDate.toISOString() : null,
          status: {
            name: action
          }
        }
      },
      headers: { "content-type": "application/json" },
      rawBody: false
    });
    fetch.dispatch();
  }

  render() {
    let { cref, document, descriptions, assignee, docStatus, currentDocObject } = this.props;
    if (!cref || !descriptions) {
      return null;
    }

    const files = this.getFiles();
    let description = descriptions.toList().first() || Traec.Im.Map();
    return (
      <Dropzone onDrop={this.onDrop.bind(this)} noClick={true} ref={node => (this.dropzoneRef = node)}>
        {({ getRootProps, getInputProps }) => {
          return (
            <div {...getRootProps()} style={{ outline: "none" }}>
              <input {...getInputProps()}></input>
              <DocumentCardView
                cref={cref}
                document={document}
                description={description}
                assignee={assignee}
                docStatus={docStatus}
                setDueDate={this.setDueDate.bind(this)}
                dueDate={this.state.dueDate}
                setAction={this.setAction.bind(this)}
                action={this.state.action}
                deleteDocument={this.deleteDocument}
                editDocument={this.editDocument}
                copyDocument={this.copyDocument}
                dropzoneRef={this.dropzoneRef}
                selectedFiles={files}
                currentDocObject={currentDocObject}
                save={this.save.bind(this)}
                doUpload={this.doUpload.bind(this)}
              ></DocumentCardView>
            </div>
          );
        }}
      </Dropzone>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { descriptionId, refId, commitId, docId, trackerId } = ownProps;
  let document = state.getInPath(`entities.documents.byId.${docId}`);
  let descriptions = getDescriptions(state, commitId, docId);
  let cref = state.getInPath(`entities.refs.byId.${refId}`);
  let currentDocObject = getCurrentObject(state, commitId, docId);
  let docStatusId = state.getInPath(`entities.commitEdges.byId.${commitId}.documents.${docId}.status`);
  let docStatus = state.getInPath(`entities.docStatuses.byId.${docStatusId}`);
  let projectId = state.getInPath(`entities.trackers.byId.${trackerId}.project.uid`);
  let assignee = getDocumentAssignee(state, docId, commitId, projectId);
  return {
    document,
    descriptions,
    cref,
    refId,
    currentDocObject,
    docStatus,
    assignee
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default DocumentCard = connect(mapStateToProps, mapDispatchToProps)(DocumentCard);

const getDescriptions = (state, commitId, docId) => {
  let descriptionIds =
    state.getInPath(`entities.commitEdges.byId.${commitId}.documents.${docId}.descriptions`) || Traec.Im.Set();
  return descriptionIds.map(id => state.getInPath(`entities.descriptions.byId.${id}`));
};

const getCurrentObject = (state, commitId, docId) => {
  let statusId = state.getInPath(`entities.commitEdges.byId.${commitId}.documents.${docId}.status`);
  let objId = state.getInPath(`entities.docStatuses.byId.${statusId}.current_object`);
  return state.getInPath(`entities.docObjects.byId.${objId}`);
};

export const getDocumentAssignee = function(state, docId, commitId, projectId) {
  // Get states in Redux to determine the available disciplines and ensure the discipline names match with the docs
  const basePath = `entities.commitEdges.byId.${commitId}.documents.${docId}`;
  let docStatusId = state.getInPath(`${basePath}.status`);
  let docDisciplineId = state.getInPath(`entities.docStatuses.byId.${docStatusId}.discipline_id`);
  let documentAssigneeList = state.getInPath(`entities.projectObjects.byId.${projectId}.disciplines`) || Traec.Im.Map();

  // Check that the document uid matches with the discipline uid and then get the name of that discipline to display on the document.
  let assignee = documentAssigneeList.toList().map(item => {
    if (item.getInPath(`base_uid`) === docDisciplineId) {
      return item.getInPath(`name`);
    }
  });

  return { assignee };
};
