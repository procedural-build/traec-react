import React from "react";
import { connect } from "react-redux";
import Im from "traec/immutable";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import Octicon from "react-octicon";

class DocumentRow extends React.Component {
  constructor(props) {
    super(props);
    this.editDoc = this.editDoc.bind(this);
    this.clickedName = this.clickedName.bind(this);
  }

  dropDownLinks() {
    return [{ name: "Rename", onClick: this.editDoc }];
  }

  treeDocFormStateParams() {
    const basePath = `documents.editById.${this.props.docId}`;
    return {
      objPath: `${basePath}.newDocItem`,
      formVisPath: `${basePath}.SHOW_DOC_FORM`,
      itemListPath: "documents.byId"
    };
  }

  editDoc(e) {
    e.preventDefault();
    console.log(e);
    this.props.dispatch(toggleForm(this.treeDocFormStateParams()));
  }

  clickedName(e) {
    e.preventDefault();
    const docId = this.props.document.get("uid");
    let payload = {
      type: this.isSelected() ? null : "documents",
      uid: this.isSelected() ? null : docId,
      refId: this.props.cref.get("uid"),
      parentCommitId: this.props.headCommitId
    };
    if (e.ctrlKey && !this.isActiveSelection() && this.props.activeSelection) {
      payload.uid = docId;
      this.props.dispatch({
        type: "UI_ADD_OR_REMOVE_FROM_DICT",
        stateParams: { itemPath: "explorer.selected" },
        payload
      });
    } else {
      this.props.dispatch({
        type: "UI_SET_IN",
        stateParams: { itemPath: "explorer.activeSelection" },
        payload
      });
      // Clear the other selection if there is no ctrl key held
      this.props.dispatch({
        type: "UI_SET_IN",
        stateParams: { itemPath: "explorer.selected" },
        payload: {}
      });
    }
  }

  isActiveSelection() {
    const docId = this.props.document.get("uid");
    const selection = this.props.activeSelection;
    return selection ? docId === selection.get("uid") : false;
  }

  isSelected() {
    const docId = this.props.document.get("uid");
    const selection = this.props.allSelection;
    if (!selection) {
      return false;
    }
    return selection.has(docId);
  }

  get_document_name(document) {
    let descriptions = document.get("descriptions");
    if (descriptions.size) {
      return descriptions.first().get("title");
    }
    return document.get("name");
  }

  render() {
    const document = this.props.document;
    if (!document) {
      return "";
    }

    // Get the Selection type
    let bgColor = "";
    if (this.isActiveSelection()) {
      bgColor = "bg-info";
    } else if (this.isSelected()) {
      bgColor = "bg-secondary";
    }

    // Return the element
    return (
      <div className="m-0 ml-2">
        <div className={`row m-0 p-0 ${bgColor}`} style={{ borderTop: "1px solid #F6F6F6" }}>
          <div className="col-sm-10">
            <p className="m-0 p-0" onClick={this.clickedName}>
              <Octicon name="file" />
              {this.get_document_name(document)}
            </p>
          </div>
          <div className="col-sm-2">
            <BSBtnDropdown links={this.dropDownLinks()} header={<Octicon name="gear" />} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { headCommitId: commitId, docId } = ownProps;
  const activeSelection = state.getInPath(`ui.explorer.activeSelection`);
  const allSelection = state.getInPath(`ui.explorer.selected`);

  let document = state.getInPath(`entities.documents.byId.${docId}`);
  // Append on any descriptions if they exist
  if (document) {
    const basePath = `entities.commitEdges.byId.${commitId}.documents.${docId}`;
    const descriptionIds = state.getInPath(`${basePath}.descriptions`);
    let descriptions = descriptionIds
      ? descriptionIds.map(id => state.getInPath(`entities.descriptions.byId.${id}`))
      : Im.List();
    document = document.set("descriptions", descriptions);
  }

  return {
    document,
    activeSelection,
    allSelection
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentRow);
