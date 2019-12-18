import React from "react";
import Octicon from "react-octicon";
import { Link } from "react-router-dom";

export const UserDocumentItem = function(props) {
  let status = convertStatus(props.document.status);
  return (
    <div className="row" key={props.index} style={{ backgroundColor: (props.index + 1) % 2 ? "#ddd" : "" }}>
      <div className="col-sm-3">
        <Link to={`/project/${props.document.project.get("uid")}/tasks/`}>{props.document.title}</Link>
      </div>
      <div className="col-sm-3">
        <Link to={`/project/${props.document.project.get("uid")}/`}>{props.document.project.get("name")}</Link>
      </div>
      <div className="col-sm-3">{props.document.company}</div>
      <div className="col-sm-2">{status}</div>
      <div className="col-sm-1">{getIcon(status)}</div>
    </div>
  );
};

export const getIcon = function(status) {
  if (status === "Approved") {
    return <Octicon name="check" />;
  } else {
    return <Octicon name="issue-opened" />;
  }
};

export const convertStatus = function(status) {
  if (!status) {
    return "Nothing Uploaded";
  }

  let name = status.get("name");
  if (name === "OK for Submission") {
    return "Approved";
  } else {
    return name;
  }
};

// import React from "react";
// import { connect } from "react-redux";
// import { BSBtn, BSBtnDropdown, BSCard } from "traec-react/utils/bootstrap";
// import UploadDocumentButton from "traec-react/utils/documentUpload";
// import DatePicker from "react-date-picker";
// import Moment from "moment";

// class Document extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       calledFetch: false,
//       selectedFiles: [],
//       uploadedFile: false,
//       dueDate: ""
//     };
//   }

//   componentDidUpdate(prevProps, prevState, snapshot) {
//     let isDocumentUploaded = this.checkIfDocumentIsUploaded();

//     if (this.state.uploadedFile !== isDocumentUploaded) {
//       this.setState({
//         uploadedFile: isDocumentUploaded
//       });
//     }
//   }

//   checkIfDocumentIsUploaded() {
//     let { currentDocObject } = this.props;
//     if (currentDocObject) {
//       return !(currentDocObject.created && currentDocObject.virus_checked);
//     }
//   }

//   actionDropDownLinks() {
//     let items = [
//       { name: "Nothing Received", onClick: this.deleteIndicator },
//       { name: "Pending Review", onClick: this.toggleSetTargetForm },
//       { name: "Requires Revision", onClick: this.changeRevision },
//       { name: "OK for submission", onClick: this.changeRevision },
//       { name: "Not for submission", onClick: this.changeRevision }
//     ];
//     return items;
//   }

//   adminDropDownLinks() {
//     let items = [
//       { name: "copy", onClick: this.copyDocument },
//       { name: "Edit", onClick: this.editDocument },
//       { name: "Delete", onClick: this.deleteDocument }
//     ];
//     return items;
//   }

//   setDueDate(value) {
//     console.log(value);
//     this.setState(() => {
//       return {
//         ...this.state,
//         dueDate: value.toISOString()
//       };
//     });
//     console.log(this.state.dueDate);
//   }

//   renderDocStatus() {
//     let { docStatus } = this.props;
//     let style = {};
//     let name = "Nothing Recieved";
//     if (!docStatus) {
//       style["backgroundColor"] = "rgb(255,150,150)";
//     } else {
//       style["backgroundColor"] = docStatus.getInPath("status.color");
//       name = docStatus.getInPath("status.name");
//     }
//     return (
//       <div className="col-md-2 text-center" style={style}>
//         {name}
//       </div>
//     );
//   }

//   render() {
//     let { descriptions, rootTreeId, commitId, document, cref, docStatus, docId } = this.props;
//     if (!descriptions) {
//       return null;
//     }

//     let description = descriptions.toList().first() || Traec.Im.Map();
//     console.log(description.get("title"), docStatus, docId);
//     return (
//       <div className="row border-bottom border-secondary my-2">
//         <div className="col-md-10">
//           <b>{description.get("title")}</b>
//           <br />
//           <i>Assingee</i>
//           <div className="float-right">
//             <BSBtnDropdown links={this.adminDropDownLinks()} header={"Admin"} />
//           </div>

//           <div className="row">
//             <div className="col-12" dangerouslySetInnerHTML={{ __html: description.get("text") }} />
//           </div>

//           <div className="row align-items-center mb-2">
//             <div className="col-sm-4">
//               <UploadDocumentButton commitId={commitId} rootTreeId={rootTreeId} subDoc={document} cref={cref} />
//             </div>
//             <div className="col-sm-1">Due:</div>
//             <div className="col-sm-4">
//               <DatePicker
//                 className="form-control datepicker-fullwidth"
//                 onChange={value => this.setDueDate(Moment.utc(Moment(value).format("YYYY-MM-DDTHH:mm:ss")).toDate())}
//               />
//             </div>
//             <div className="col-sm-2">
//               <BSBtnDropdown links={this.actionDropDownLinks()} header={"Actions"} />
//             </div>
//             <div className="col-sm-1">
//               <BSBtn text={"Save"} />
//             </div>
//           </div>
//         </div>

//         {this.renderDocStatus()}
//       </div>
//     );
//   }
// }

// const getCurrentObject = (state, commitId, docId) => {
//   let statusId = state.getInPath(`entities.commitEdges.byId.${commitId}.documents.${docId}.status`);
//   let objId = state.getInPath(`entities.docStatuses.byId.${statusId}.current_object`);
//   return state.getInPath(`entities.docObjects.byId.${objId}`);
// };

// const getDescriptions = (state, commitId, docId) => {
//   let descriptionIds =
//     state.getInPath(`entities.commitEdges.byId.${commitId}.documents.${docId}.descriptions`) || Traec.Im.Set();
//   return descriptionIds.map(id => state.getInPath(`entities.descriptions.byId.${id}`));
// };

// const getDocWithInfo = (state, commitId, docId) => {
//   let document = state.getInPath(`entities.documents.byId.${docId}`);
//   // Append the status
//   document = document.set("current_object", getCurrentObject(state, commitId, docId));
//   // Append the description(s)
//   document = document.set("descriptions", getDescriptions(state, commitId, docId));
//   return document;
// };

// const mapStateToProps = (state, ownProps) => {
//   let { descriptionId, refId, commitId, docId } = ownProps;
//   let document = state.getInPath(`entities.documents.byId.${docId}`);
//   let descriptions = getDescriptions(state, commitId, docId);
//   let cref = state.getInPath(`entities.refs.byId.${refId}`);
//   const treeDoc = state.getInPath(`entities.commitEdges.byId.${commitId}.documents.${docId}`);
//   let currentDocObject = getCurrentObject(state, commitId, docId);
//   let docStatus = state.getInPath(`entities.docStatuses.byId.${docId}`);
//   return {
//     document,
//     descriptions,
//     cref,
//     currentDocObject,
//     docStatus
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     dispatch: dispatch
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Document);
