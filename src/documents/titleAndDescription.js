import React from "react";
import Traec from "traec";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import { toggleShowDescription } from "../tasks/utils/cardUtils";
import BaseFormConnected from "traec-react/utils/form";
import { titleDescriptionFields } from "./form";

/**
 * TitleAndDescription component.
 *
 *
 * Example usage:
 * render(){
 *     const { cref, parentCommitId, treeId, descriptions, tree } = this.props;
 *     if(!descriptions.first()) return
 *     const fetch = new Traec.Fetch("tracker_ref_tree_description", "put", {
 *       trackerId: cref.get("tracker"),
 *       refId: cref.get("uid"),
 *       commitId: parentCommitId,
 *       treeId,
 *       descriptionId: descriptions.first().get("uid")
 *     });
 *     const titleAndDescriptionRef = React.createRef();
 *     const dropdownLinks = [
 *       {name: "Edit Description", onClick: e => {titleAndDescriptionRef.current.edit()}},
 *       {name: "Delete", onClick: e => {this.delete()}}
 *     ]
 *     return (
 *       <TitleAndDescription
 *         ref={titleAndDescriptionRef}
 *         cref={cref}
 *         parentCommitId={parentCommitId}
 *         tree={tree}
 *         fetch={fetch}
 *         showEdit={true}
 *         description={descriptions.first()}
 *         dropdownLinks={dropdownLinks}/>
 *     );
 * }
 *
 */
export class TitleAndDescription extends React.Component {
  constructor(props) {
    super(props);
    /* 
    The fetch for this component is based on the props passed which are static 
    so we can safely define the fetch here once.
     */
    let { description, cref, documentId, showEdit, fetch } = props;
    if (showEdit && !fetch) {
      this.fetch = new Traec.Fetch("tracker_ref_document", "put", {
        trackerId: cref.get("tracker"),
        documentId: documentId,
        refId: cref.get("uid"),
        commitId: cref.getInPath("latest_commit.uid")
      });
      // Reshape the post data just before fetching
      this.fetch.updateFetchParams({
        headers: { "content-type": "application/json" },
        rawBody: false,
        preFetchHook: body => ({
          description: {
            uid: description.get("uid"),
            title: body.title,
            text: body.description
          }
        })
      });
    }

    this.state = {};
  }

  edit() {
    let { description } = this.props;
    let fetch = this.props.fetch || this.fetch;
    this.setState({
      initFields: Traec.Im.Map({
        title: description.get("title") || "",
        description: description.get("text") || ""
      })
    });
    fetch.toggleForm();
  }

  renderEditDropdown() {
    let { showEdit, dropdownLinks } = this.props;
    if (!showEdit) {
      return null;
    }
    return (
      <BSBtnDropdown
        links={
          dropdownLinks
            ? dropdownLinks
            : [
                {
                  name: "Edit Description",
                  onClick: e => {
                    this.edit();
                  }
                }
              ]
        }
        header={"Admin"}
      />
    );
  }

  renderContent() {
    let { description } = this.props;
    const TitleTag = this.props.TitleTag || "h2";
    return (
      <React.Fragment>
        <TitleTag>
          <b>{description.get("title")}</b>
          <span style={{ fontSize: "0.875rem" }}>{this.renderEditDropdown()}</span>
        </TitleTag>

        <div className="tinymce_html" dangerouslySetInnerHTML={{ __html: description.get("text") }} />
      </React.Fragment>
    );
  }

  renderForm() {
    let fetch = this.props.fetch || this.fetch;
    return (
      <BaseFormConnected
        params={fetch.params}
        fields={titleDescriptionFields}
        initFields={this.state.initFields || Traec.Im.Map()}
        toggleForm={() => {
          fetch.toggleForm();
        }}
      />
    );
  }

  render() {
    let fetch = this.props.fetch || this.fetch;
    let isFormVisible = fetch ? fetch.isFormVisible() : false;
    return (
      <div className="m-0">
        <div className={`row m-0 p-0`} style={{ borderTop: "1px solid #F6F6F6" }}>
          <div className="col-sm-12 m-0 p-0">{isFormVisible ? this.renderForm() : this.renderContent()}</div>
        </div>
      </div>
    );
  }
}
