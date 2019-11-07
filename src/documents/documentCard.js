import React, { Component } from "react";
import { connect } from "react-redux";
import Traec from "traec";
import { DocumentCardView } from "./documentCardView";
import Dropzone from "react-dropzone";

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
    if (this.props.docStatus) {
      this.setState(() => {
        return {
          ...this.state,
          dueDate: convertISODateToDateObject(this.props.docStatus.get("due_date")),
          action: this.props.docStatus.getInPath("status.name")
        };
      });
    }
  }

  setAction(name) {
    this.setState(() => {
      return {
        ...this.state,
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
        ...this.state,
        dueDate: value ? value : ""
      };
    });
  }

  onDrop(files) {
    console.log(files);
    this.setState({ selectedFiles: files });
  }

  onCancelUpload() {
    this.setState({ selectedFiles: [] });
  }

  getFiles() {
    return this.state.selectedFiles.map(file => file.name + " (" + (file.size / 1000000).toFixed(1) + "Mb" + ")");
  }

  save() {
    let { trackerId, refId, commitId, docId } = this.props;
    let formData = new FormData();
    formData.append("due_date", this.state.dueDate ? this.state.dueDate.toISOString() : "");
    formData.append("name", this.state.action);
    let fetch = new Traec.Fetch("tracker_ref_document", "put", { trackerId, refId, commitId, documentId: docId });
    fetch.updateFetchParams({ body: formData });
    fetch.dispatch();
  }

  render() {
    let { descriptions, assignee, docStatus, renderProps } = this.props;
    const files = this.getFiles();
    if (!descriptions) return "";
    let description = descriptions.toList().first() || Traec.Im.Map();
    return (
      <Dropzone onDrop={this.onDrop.bind(this)} noClick={true} ref={node => (this.dropzoneRef = node)}>
        {({ getRootProps, getInputProps }) => {
          return (
            <div {...getRootProps()} className="border border-dark">
              <input {...getInputProps()}></input>
              <DocumentCardView
                description={description}
                assignee={assignee}
                docStatus={docStatus}
                setDueDate={this.setDueDate.bind(this)}
                setAction={this.setAction.bind(this)}
                deleteDocument={this.deleteDocument}
                editDocument={this.editDocument}
                copyDocument={this.copyDocument}
                renderProps={renderProps}
                dropzoneRef={this.dropzoneRef}
                selectedFiles={files}
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

export default DocumentCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentCard);

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

const convertISODateToDateObject = ISODate => {
  if (!ISODate) return "";
  let dateArray = ISODate.split("T")[0].split("-");
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
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
