import React from "react";
import Traec from "traec";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import { toggleShowDescription } from "../tasks/utils/cardUtils";
import BaseFormConnected from "traec-react/utils/form";
import { titleDescriptionFields } from "./form";
import { Link } from "react-router-dom";

export class TitleAndDescription extends React.Component {
  constructor(props) {
    super(props);
    /* 
    The fetch for this component is based on the props passed which are static 
    so we can safely define the fetch here once.
     */
    let { description, cref, documentId, showEdit, fetch } = props;
    this.fetch = fetch;
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
            text: body.text
          }
        })
      });
    }

    this.state = {};
  }

  edit() {
    let { description } = this.props;
    this.setState({
      initFields: Traec.Im.Map({
        title: description.get("title") || "",
        text: description.get("text") || ""
      })
    });
    this.fetch.toggleForm();
  }

  renderEditDropdown() {
    let { showEdit, dropdownLinks, dropdownHeader } = this.props;
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
        header={dropdownHeader ? dropdownHeader : "Admin"}
      />
    );
  }

  renderContent() {
    let { description, showTreeTitle } = this.props;
    const TitleTag = this.props.TitleTag || "h2";
    return (
      <React.Fragment>
        <TitleTag className="mb-0 pb-1">
          <b>{description.get("title")}</b>
          <span style={{ fontSize: "0.875rem" }}>{this.renderEditDropdown()}</span>
        </TitleTag>
        <Link to={description.getInPath("tree.url") ? description.getInPath("tree.url") : "#"}>
          <i style={{ fontSize: "1rem", color: "#555" }}>{showTreeTitle ? description.getInPath("tree.title") : ""}</i>
        </Link>
        <div className="tinymce_html" dangerouslySetInnerHTML={{ __html: description.get("text") }} />
      </React.Fragment>
    );
  }

  renderForm() {
    return (
      <BaseFormConnected
        params={this.fetch.params}
        fields={titleDescriptionFields}
        initFields={this.state.initFields || Traec.Im.Map()}
        toggleForm={() => {
          this.fetch.toggleForm();
        }}
      />
    );
  }

  render() {
    let isFormVisible = this.fetch ? this.fetch.isFormVisible() : false;
    return (
      <div className={`row m-0 p-0`} style={{ borderTop: "1px solid #F6F6F6" }}>
        <div className="col-sm-12 m-0 p-0">{isFormVisible ? this.renderForm() : this.renderContent()}</div>
      </div>
    );
  }
}
