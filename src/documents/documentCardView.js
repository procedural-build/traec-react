import React, { Component } from "react";
import Traec from "traec";
import { TitleAndDescription } from "./titleAndDescription";
import { DocumentStatus } from "./documentStatus";
import { BSBtnDropdown } from "traec-react/utils/bootstrap/btnDropdown";
import DatePicker from "react-date-picker";
import moment from "moment";
/**
 * DocumentCardView Component:
 * @namespace DocumentCardView
 * @memberof DocumentCard
 * @property {string} cref the cref is an id
 * @example
 * return <DocumentCardView
 * cref={cref}
 * document={document}
 * description={description}
 * assignee={assignee}
 * docStatus={docStatus}
 * setDueDate={this.setDueDate.bind(this)}
 * dueDate={this.state.dueDate}
 * setAction={this.setAction.bind(this)}
 * action={this.state.action}
 * deleteDocument={this.deleteDocument}
 * editDocument={this.editDocument}
 * copyDocument={this.copyDocument}
 * dropzoneRef={this.dropzoneRef}
 * selectedFiles={files}
 * currentDocObject={currentDocObject}
 * save={this.save.bind(this)}
 * doUpload={this.doUpload.bind(this)}
 * >
 */
export class DocumentCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dueDate: "",
      action: "Nothing Recieved"
    };

    this.renderSelectedFile = this.renderSelectedFile.bind(this);
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
    return (
      <div className="row align-items-center justify-content-center">
        <div className="col-auto BS-btn-sm-text pb-2">Due:</div>
        <div className="col-auto">
          <DatePicker
            className="form-control btn-sm datepicker-fullwidth p-0 mb-1"
            onChange={value => this.props.setDueDate(value)}
            value={this.props.dueDate}
            style={{ height: "12px" }}
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

  renderFileUpload() {
    let { selectedFiles, dropzoneRef } = this.props;
    if (!dropzoneRef) return "";
    let buttonText = selectedFiles.length ? "Upload File" : "Select or Drop File";
    let buttonAction = selectedFiles.length ? this.props.doUpload : dropzoneRef.open;
    return (
      <React.Fragment>
        <button
          className="btn-sm btn-secondary cursor-pointer mb-1"
          onClick={buttonAction}
          style={{ padding: "2px 4px 2px" }}
        >
          {buttonText}
        </button>
        {this.renderSelectedFile()}
      </React.Fragment>
    );
  }

  renderSelectedFile() {
    let { selectedFiles } = this.props;
    if (selectedFiles.length) {
      return (
        <span className="badge badge-primary m-1">
          <a className="BS-btn-sm-text text-white">{selectedFiles}</a>
        </span>
      );
    }
  }

  render() {
    let { cref, documentId, description, assignee } = this.props;

    return (
      <div className="row mb-4 mt-2">
        <div className="col-md-10" style={{ borderBottom: "1px solid lightgray" }}>
          <TitleAndDescription
            cref={cref}
            documentId={documentId}
            description={description}
            assignee={assignee}
            TitleTag={"h5"}
            showEdit={true}
          />

          {this.renderUploadedFile()}

          <div className="row">
            <div className="col-md-4">{this.renderFileUpload()}</div>

            <div className="col-md-4">{this.renderDatePicker()}</div>

            <div className="col-md-3 BS-btn-sm-text">
              <BSBtnDropdown links={this.actionDropDownLinks()} header={this.props.action} />
            </div>

            <div className="col-md-1">
              <button
                className="btn-sm btn-primary cursor-pointer mb-1 float-right"
                onClick={this.props.save}
                style={{ padding: "2px 4px 2px" }}
              >
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
