import React, { Component } from "react";
import { TitleAndDescription } from "./titleAndDescription";
import { DocumentStatus } from "./documentStatus";
import { BSBtnDropdown } from "traec-react/utils/bootstrap/btnDropdown";
import DatePicker from "react-date-picker";
import moment from "moment";

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

  renderDatePicker() {
    console.log("RENDERING DATE PICKET", this.props.dueDate);
    return (
      <div className="row align-items-center justify-content-center">
        <div className="col-auto BS-btn-sm-text">Due:</div>
        <div className="col-auto">
          <DatePicker
            className="form-control btn-sm datepicker-fullwidth p-0"
            onChange={value => this.props.setDueDate(value)}
            value={this.props.dueDate}
          />
        </div>
      </div>
    );
  }

  renderUploadedFile() {
    let { currentDocObject } = this.props;
    if (currentDocObject) {
      return (
        <span className="BS-btn-sm-text">
          Currently: <a href={currentDocObject.get("url")}>{currentDocObject.get("filename")}</a>,{" "}
          <i>
            Uploaded by: {currentDocObject.getInPath("creator.username")},{" "}
            {moment(currentDocObject.get("created")).format("lll")}
          </i>
        </span>
      );
    }
  }

  renderSelectedFile() {
    if (this.props.selectedFiles.length) {
      return (
        <span className="badge badge-primary m-1">
          <a className="BS-btn-sm-text text-white">{this.props.selectedFiles}</a>
        </span>
      );
    }
  }

  render() {
    let { cref, document, description, assignee, dropzoneRef } = this.props;
    if (!dropzoneRef) return "";
    return (
      <div className="row mb-4 mt-2">
        <div className="col-md-10">
          <div className="float-right">
            <BSBtnDropdown links={this.adminDropDownLinks()} header={"Admin"} />
          </div>
          <TitleAndDescription cref={cref} document={document} description={description} assignee={assignee} />
          {this.renderUploadedFile()}

          <div className="row align-items-center my-2 justify-content-between ">
            <div className="col-md-3">
              <button className="btn-sm btn-secondary cursor-pointer px-1 py-0" onClick={dropzoneRef.open}>
                Upload File
              </button>
              {this.renderSelectedFile()}
            </div>

            <div className="col-md-4">{this.renderDatePicker()}</div>

            <div className="col-md-2 BS-btn-sm-text">
              <BSBtnDropdown links={this.actionDropDownLinks()} header={this.props.action} />
            </div>

            <div className="col-md-1">
              <button className="btn-sm btn-primary cursor-pointer px-1 py-0 float-right" onClick={this.props.save}>
                Save
              </button>
            </div>
          </div>
        </div>

        <DocumentStatus docStatus={this.props.docStatus}></DocumentStatus>
      </div>
    );
  }
}
