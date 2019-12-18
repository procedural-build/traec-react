import React from "react";
import Traec from "traec";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import { toggleShowDescription } from "../tasks/utils/cardUtils";
import BaseFormConnected from "traec-react/utils/form";
import { titleDescriptionFields } from "./form";

export class TitleAndDescription extends React.Component {
  constructor(props) {
    super(props);

    /* 
    The fetch for this component is based on the props passed which are static 
    so we can safely define the fetch here once.
     */
    let { description: item, cref, document } = props;
    this.fetch = new Traec.Fetch("tracker_ref_document", "put", {
      trackerId: cref.get("tracker"),
      documentId: document.get("uid"),
      refId: cref.get("uid"),
      commitId: cref.getInPath("latest_commit.uid")
    });

    // Reshape the post data just before fetching
    this.fetch.updateFetchParams({
      headers: { "content-type": "application/json" },
      rawBody: false,
      preFetchHook: body => ({
        description: {
          uid: item.get("uid"),
          title: body.title,
          text: body.description
        }
      })
    });

    this.state = {
      formParams: this.fetch.params,
      initFields: Traec.Im.Map({
        title: item.get("title"),
        description: item.get("text")
      })
    };
  }

  render_edit_dropdown() {
    let { showEdit = true } = this.props;
    if (!showEdit) {
      return null;
    }
    return (
      <BSBtnDropdown
        links={[
          {
            name: "Edit Description",
            onClick: e => {
              this.fetch.toggleForm();
            }
          }
        ]}
        header={" "}
      />
    );
  }

  render_content() {
    let { description: item } = this.props;
    const TitleTag = this.props.TitleTag || "H2";
    return (
      <React.Fragment>
        <TitleTag>
          {item.get("title")}
          {this.render_edit_dropdown()}
        </TitleTag>
        <div className="tinymce_html" dangerouslySetInnerHTML={{ __html: item.get("text") }} />
      </React.Fragment>
    );
  }

  render_form() {
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
    let { item } = this.props;
    let isFormVisible = this.fetch.isFormVisible();
    //const created = Moment(item.get("created")).format("MMMM Do YYYY, h:mm:ss a");
    //const creator = `${item.getInPath("creator.first_name")} ${item.getInPath("creator.last_name")}`;
    return (
      <div className="m-0">
        <div className={`row m-0 p-0`} style={{ borderTop: "1px solid #F6F6F6" }}>
          <div className="col-sm-12 m-0 p-0">{isFormVisible ? this.render_form() : this.render_content()}</div>
        </div>
      </div>
    );
  }
}

export class TitleAndDescription_OLD extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDescription: false
    };
    this.toggleShowDescription = toggleShowDescription.bind(this);
  }

  renderDescription(description) {
    if (this.state.showDescription) {
      return <div dangerouslySetInnerHTML={{ __html: description.get("text") }} />;
    } else {
      return null;
    }
  }

  renderTitle(description) {
    return (
      <div className="col-sm-11 pl-0">
        <h5 className="">{description.get("title")}</h5>
        <i>{this.props.Assingee}</i>
        <div dangerouslySetInnerHTML={{ __html: description.get("text") }} />
      </div>
    );
  }

  render() {
    if (!this.props.description) {
      return null;
    }
    return (
      <React.Fragment>
        {this.renderTitle(this.props.description)}
        {this.renderDescription(this.props.description)}
      </React.Fragment>
    );
  }
}
