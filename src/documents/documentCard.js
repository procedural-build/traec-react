import React, { Component } from "react";
import { connect } from "react-redux";
import Traec from "traec";
import { DocumentCardView } from "./documentCardView";
import Dropzone from "react-dropzone";
import Moment from "moment";
import category from "traec-react/explorer/category";
import { confirmDelete } from "traec-react/utils/sweetalert";

class DocumentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dueDate: "",
      action: "Nothing Recieved",
      selectedFiles: []
    };
    let { trackerId, commitId } = props;
    this.requiredFetches = [new Traec.Fetch("tracker_commit_edge", "read", { trackerId, commitId })];

    this.deleteDocument = this.deleteDocument.bind(this);
    this.copyDocument = this.copyDocument.bind(this);
  }

  adminDropdownLinks() {
    let items = [
      {
        name: "Edit",
        onClick: e => {
          throw "Error Not Changed to a valid method!";
        }
      },
      { name: "Copy", onClick: this.copyDocument },
      { label: null },
      { name: "Delete", onClick: this.deleteDocument }
    ];
    return items;
  }

  componentDidUpdate() {
    this.requiredFetches.map(fetch => fetch.dispatch());
  }

  componentDidMount() {
    this.requiredFetches.map(fetch => fetch.dispatch());
    if (!this.dropzoneRef) this.forceUpdate(); // This has to be called, otherwise this.dropzoneRef won't be defined.

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
    const { trackerId, commitId, refId, docId } = this.props;
    confirmDelete({
      text: `This will delete this document including any data contained within.  Are you sure you would like to proceed?`,
      onConfirm: () => {
        new Traec.Fetch("tracker_ref_document", "delete", { trackerId, commitId, refId, docId }).dispatch();
      }
    });
  }

  copyDocument() {
    alert("Not implemented");
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
    let {
      cref,
      description,
      assignee,
      docStatus,
      currentDocObject,
      docId,
      editableTitleAndDescription,
      editableDocument,
      showAssignee,
      showTreeTitle
    } = this.props;
    if (!cref || !description) {
      return null;
    }
    const files = this.getFiles();
    return (
      <Dropzone onDrop={this.onDrop.bind(this)} noClick={true} ref={node => (this.dropzoneRef = node)}>
        {({ getRootProps, getInputProps }) => {
          return (
            <div {...getRootProps()} style={{ outline: "none" }}>
              <input {...getInputProps()} />
              <DocumentCardView
                cref={cref}
                documentId={docId}
                description={description}
                assignee={assignee}
                docStatus={docStatus}
                selectedFiles={files}
                currentDocObject={currentDocObject}
                editableDocument={editableDocument}
                showAssignee={showAssignee}
                showTreeTitle={showTreeTitle}
                editableTitleAndDescription={editableTitleAndDescription}
                dueDate={this.state.dueDate}
                action={this.state.action}
                dropzoneRef={this.dropzoneRef}
                editDocument={this.editDocument}
                copyDocument={this.copyDocument}
                deleteDocument={this.deleteDocument}
                save={this.save.bind(this)}
                doUpload={this.doUpload.bind(this)}
                setAction={this.setAction.bind(this)}
                setDueDate={this.setDueDate.bind(this)}
                adminDropdownLinks={this.adminDropdownLinks()}
              />
            </div>
          );
        }}
      </Dropzone>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { refId, commitId, docId, trackerId, document } = ownProps;
  let description = getDescription(state, commitId, docId);
  let cref = state.getInPath(`entities.refs.byId.${refId}`);
  description = addTreeTitleToDescription(state, cref, description);

  let docStatusId = getDocumentStatusId(state, commitId, docId);
  let currentDocObject = getCurrentObject(state, docStatusId);
  let docStatus = state.getInPath(`entities.docStatuses.byId.${docStatusId}`);
  let projectId = state.getInPath(`entities.trackers.byId.${trackerId}.project.uid`);
  let assignee = getDocumentAssignee(state, docId, commitId, projectId);

  return {
    document,
    description,
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

const addTreeTitleToDescription = (state, cref, description) => {
  let latestCommitId = cref.getInPath(`latest_commit.uid`);
  let rootTreeId = cref.getInPath(`latest_commit.tree_root.uid`);
  let categoryDescriptionIds = state.getInPath(
    `entities.commitEdges.byId.${latestCommitId}.trees.${rootTreeId}.descriptions`
  );
  if (categoryDescriptionIds) {
    let categoryTitle = state.getInPath(`entities.descriptions.byId.${categoryDescriptionIds.first()}.title`);
    description = description.setIn(["tree", "title"], categoryTitle);
    let trackerId = cref.getInPath("tracker");
    let refId = cref.get("uid");
    description = description.setIn(["tree", "url"], `/tracker/${trackerId}/root/${rootTreeId}/ref/${refId}/`);
  }
  return description;
};

const getDocumentStatusId = (state, commitId, docId) => {
  let docStatusId =
    state.getInPath(`entities.commitEdges.byId.${commitId}.documents.${docId}.status`) ||
    state.getInPath(`entities.user.documents.byId.${docId}.status`);
  return docStatusId;
};

const getDescription = (state, commitId, docId) => {
  let descriptionIds = state.getInPath(`entities.commitEdges.byId.${commitId}.documents.${docId}.descriptions`);
  if (!descriptionIds) {
    let descriptionId = state.getInPath(`entities.user.documents.byId.${docId}.description`);
    return state.getInPath(`entities.descriptions.byId.${descriptionId}`) || Traec.Im.Map();
  }
  let descriptions = descriptionIds.map(id => state.getInPath(`entities.descriptions.byId.${id}`));
  return descriptions.toList().first() || Traec.Im.Map();
};

const getCurrentObject = (state, statusId) => {
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
