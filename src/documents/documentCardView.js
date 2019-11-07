import React, { Component } from "react";
import { TitleAndDescription } from "./titleAndDescription";
import { DocumentStatus } from "./documentStatus";
import { BSBtnDropdown } from "traec-react/utils/bootstrap/btnDropdown";
import UploadDocumentButton from "traec-react/utils/documentUpload";
import { BSBtn } from "traec-react/utils/bootstrap/btn";
import DatePicker from "react-date-picker";

export class DocumentCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dueDate: "",
      action: "Nothing Recieved"
    };
    this.renderSelectedFile = this.renderSelectedFile.bind(this);
  }

  adminDropDownLinks() {
    let items = [
      { name: "copy", onClick: this.props.copyDocument },
      { name: "Edit", onClick: this.props.editDocument },
      { name: "Delete", onClick: this.props.deleteDocument }
    ];
    return items;
  }

  actionDropDownLinks() {
    let { setAction } = this.props;
    let items = [
      { name: "Nothing Received", onClick: (e, name) => setAction(name), id: "Nothing Received" },
      { name: "Pending Review", onClick: (e, name) => setAction(name), id: "Pending Review" },
      { name: "Requires Revision", onClick: (e, name) => setAction(name), id: "Requires Revision" },
      { name: "OK for Submission", onClick: (e, name) => setAction(name), id: "OK for Submission" },
      { name: "Not for Submission", onClick: (e, name) => setAction(name), id: "Not for Submission" }
    ];
    return items;
  }

  rendActionDropDown() {
    if (this.props.renderProps.actionDropDown) {
      return (
        <div className="col-sm-2 h-100">
          <BSBtnDropdown links={this.actionDropDownLinks()} header={this.state.action} />
        </div>
      );
    }
  }

  rendSaveBtn() {
    if (this.props.renderProps.saveBtn) {
      return (
        <div className="col-sm-1 h-100">
          <BSBtn text={"Save"} onClick={() => this.save()} />
        </div>
      );
    }
  }

  rendDatePicker() {
    if (this.props.renderProps.datePicker) {
      return (
        <React.Fragment>
          <div className="col-sm-1 h-100">Due:</div>
          <div className="col-sm-4 h-100">
            <DatePicker
              className="form-control datepicker-fullwidth"
              onChange={value => this.props.setDueDate(value)}
              value={this.state.dueDate}
            />
          </div>
        </React.Fragment>
      );
    }
  }

  rendFileUpload() {
    let { commitId, rootTreeId, document, cref } = this.props;
    if (this.props.renderProps.fileUpload) {
      return (
        <div className="col-sm-4 h-100">
          <UploadDocumentButton commitId={commitId} rootTreeId={rootTreeId} subDoc={document} cref={cref} />
        </div>
      );
    }
  }

  renderSelectedFile() {
    if (this.props.selectedFiles.length) {
      return (
        <div className="badge badge-primary m-1">
          <a className="h6 text-white">{this.props.selectedFiles}</a>
        </div>
      );
    }
  }

  render() {
    let { description, assignee, renderProps, dropzoneRef } = this.props;
    if (!renderProps || !dropzoneRef) return "";
    console.log(dropzoneRef);
    return (
      <div className="row border-bottom border-grey my-2">
        <div className="col-md-10">
          <div className="float-right">
            <BSBtnDropdown links={this.adminDropDownLinks()} header={"Admin"} />
          </div>

          <TitleAndDescription description={description} assignee={assignee}></TitleAndDescription>

          <div className="row align-items-center mb-2 border border-danger ">
            <button className="btn-sm btn-secondary" onClick={dropzoneRef.open}>
              Upload File
            </button>
            {this.renderSelectedFile()}
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
