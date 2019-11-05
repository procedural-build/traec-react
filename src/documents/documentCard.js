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
    this.state = {};
  }

  adminDropDownLinks() {
    let items = [
      { name: "copy", onClick: this.copyDocument },
      { name: "Edit", onClick: this.editDocument },
      { name: "Delete", onClick: this.deleteDocument }
    ];
    return items;
  }

  actionDropDownLinks() {
    let items = [
      { name: "Nothing Received", onClick: this.deleteIndicator },
      { name: "Pending Review", onClick: this.toggleSetTargetForm },
      { name: "Requires Revision", onClick: this.changeRevision },
      { name: "OK for submission", onClick: this.changeRevision },
      { name: "Not for submission", onClick: this.changeRevision }
    ];
    return items;
  }

  rendActionDropDown() {
    if (this.props.renderActionDropDown) {
      return (
        <div className="col-sm-2">
          <BSBtnDropdown links={this.actionDropDownLinks()} header={"Actions"} />
        </div>
      );
    }
  }

  rendSaveBtn() {
    if (this.props.renderSaveBtn) {
      return (
        <div className="col-sm-1">
          <BSBtn text={"Save"} />
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
              onChange={value => this.setDueDate(Moment.utc(Moment(value).format("YYYY-MM-DDTHH:mm:ss")).toDate())}
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
    let { descriptions, commitId, rootTreeId, document, cref } = this.props;
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
  console.log(descriptions);
  let cref = state.getInPath(`entities.refs.byId.${refId}`);
  const treeDoc = state.getInPath(`entities.commitEdges.byId.${commitId}.documents.${docId}`);
  let currentDocObject = getCurrentObject(state, commitId, docId);
  let docStatus = state.getInPath(`entities.docStatuses.byId.${docId}`);
  return {
    document,
    descriptions,
    cref,
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

//   <div className="row border-bottom border-secondary my-2">
//     <div className="col-md-10">
//       <b>{description.get("title")}</b>
//       <br />
//       <i>Assingee</i>
//       <div className="float-right">
//         <BSBtnDropdown links={this.adminDropDownLinks()} header={"Admin"} />
//       </div>

//       <div className="row">
//         <div className="col-12" dangerouslySetInnerHTML={{ __html: description.get("text") }} />
//       </div>

//       <div className="row align-items-center mb-2">
//         <div className="col-sm-4">
//           <UploadDocumentButton commitId={commitId} rootTreeId={rootTreeId} subDoc={document} cref={cref} />
//         </div>
//         <div className="col-sm-1">Due:</div>
//         <div className="col-sm-4">
//           <DatePicker
//             className="form-control datepicker-fullwidth"
//             onChange={value => this.setDueDate(Moment.utc(Moment(value).format("YYYY-MM-DDTHH:mm:ss")).toDate())}
//           />
//         </div>
//         <div className="col-sm-2">
//           <BSBtnDropdown links={this.actionDropDownLinks()} header={"Actions"} />
//         </div>
//         <div className="col-sm-1">
//           <BSBtn text={"Save"} />
//         </div>
//       </div>
//     </div>

//     {this.renderDocStatus()}
//   </div>
