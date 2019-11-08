import React, { Component } from "react";
import { connect } from "react-redux";
import { TitleAndDescription } from "./titleAndDescription";
import { DocumentStatus } from "./documentStatus";
import Traec from "traec";
import { BSBtnDropdown } from "traec-react/utils/bootstrap/btnDropdown";
import UploadDocumentButton from "traec-react/utils/documentUpload";
import { BSBtn } from "traec-react/utils/bootstrap/btn";
import DatePicker from "react-date-picker";

class DocumentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dueDate: "",
      action: "Nothing Recieved"
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

  actionDropDownLinks() {
    let items = [
      { name: "Nothing Received", onClick: (e, name) => this.setAction(name), id: "Nothing Received" },
      { name: "Pending Review", onClick: (e, name) => this.setAction(name), id: "Pending Review" },
      { name: "Requires Revision", onClick: (e, name) => this.setAction(name), id: "Requires Revision" },
      { name: "OK for submission", onClick: (e, name) => this.setAction(name), id: "OK for submission" },
      { name: "Not for submission", onClick: (e, name) => this.setAction(name), id: "Not for submission" }
    ];
    return items;
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

  save() {
    let { trackerId, refId, commitId, docId } = this.props;
    let fetch = new Traec.Fetch("tracker_ref_document", "put", { trackerId, refId, commitId, documentId: docId });

    // Add the file object to the form and dispatch
    fetch.updateFetchParams({
      body: {
        due_date: this.state.dueDate ? this.state.dueDate.toISOString() : "",
        status: {
          name: this.state.action
        }
      },
      headers: { "content-type": "application/json" },
      rawBody: false
    });
    fetch.dispatch();
  }

  rendActionDropDown() {
    if (this.props.renderActionDropDown) {
      return (
        <div className="col-sm-2">
          <BSBtnDropdown links={this.actionDropDownLinks()} header={this.state.action} />
        </div>
      );
    }
  }

  rendSaveBtn() {
    if (this.props.renderSaveBtn) {
      return (
        <div className="col-sm-1">
          <BSBtn text={"Save"} onClick={() => this.save()} />
        </div>
      );
    }
  }

  rendDatePicker() {
    if (this.props.renderDatePicker) {
      return (
        <React.Fragment>
          <div className="col-sm-1">Due:</div>
          <div className="col-sm-4">
            <DatePicker
              className="form-control datepicker-fullwidth"
              onChange={value => this.setDueDate(value)}
              value={this.state.dueDate}
            />
          </div>
        </React.Fragment>
      );
    }
  }

  rendFileUpload() {
    let { commitId, rootTreeId, document, cref } = this.props;
    if (this.props.renderFileUpload) {
      return (
        <div className="col-sm-4">
          <UploadDocumentButton commitId={commitId} rootTreeId={rootTreeId} subDoc={document} cref={cref} />
        </div>
      );
    }
  }

  render() {
    let { descriptions } = this.props;
    if (!descriptions) return "";
    let description = descriptions.toList().first() || Traec.Im.Map();
    return (
      <div className="row border-bottom border-secondary my-2">
        <div className="col-md-10">
          <div className="float-right">
            <BSBtnDropdown links={this.adminDropDownLinks()} header={"Admin"} />
          </div>

          <TitleAndDescription description={description}></TitleAndDescription>

          <div className="row align-items-center mb-2">
            {this.rendFileUpload()}
            {this.rendDatePicker()}
            {this.rendActionDropDown()}
            {this.rendSaveBtn()}
          </div>
        </div>

        <DocumentStatus docStatus={this.props.docStatus}></DocumentStatus>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { descriptionId, refId, commitId, docId } = ownProps;
  let document = state.getInPath(`entities.documents.byId.${docId}`);
  let descriptions = getDescriptions(state, commitId, docId);
  let cref = state.getInPath(`entities.refs.byId.${refId}`);
  let currentDocObject = getCurrentObject(state, commitId, docId);
  let docStatusId = state.getInPath(`entities.commitEdges.byId.${commitId}.documents.${docId}.status`);
  let docStatus = state.getInPath(`entities.docStatuses.byId.${docStatusId}`);
  return {
    document,
    descriptions,
    cref,
    refId,
    currentDocObject,
    docStatus
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
  console.log(dateArray);
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
};
