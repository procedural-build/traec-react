import React from "react";
import Traec from "traec";

import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import { ProjectAuthGroupForm } from "./projectForm";
import CompanyAuthGroupForm from "./companyForm";

export default class AuthGroupItem extends React.Component {
  constructor(props) {
    super(props);

    const authGroupId = props.item.get("uid");

    if (props.projectId) {
      this.fetch = new Traec.Fetch("project_authgroup", "put");
    } else if (props.companyId) {
      this.fetch = new Traec.Fetch("company_authgroup", "put");
    }

    this.state = {
      formParams: {
        stateParams: {},
        fetchParams: {},
        initFields: {}
      }
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.showFormHandler = this.showFormHandler.bind(this);
  }

  deleteItem(e) {
    e.preventDefault();
    let { item, projectId, companyId } = this.props;
    let authGroupId = item.get("uid");
    let fetch = null;
    if (projectId) {
      fetch = new Traec.Fetch("project_authgroup", "delete", { projectId, authGroupId });
    } else if (companyId) {
      fetch = new Traec.Fetch("company_authgroup", "delete", { companyId, authGroupId });
    }
    fetch.updateFetchParams({
      postSuccessHook: () => {
        location.reload();
      }
    });
    fetch.dispatch();
  }

  editItem(e) {
    e.preventDefault();
    this.setState({ showForm: !this.state.showForm }, () => console.log("STATE", this.state));
  }

  showFormHandler(e, showForm) {
    this.setState({ showForm });
  }

  projectAuthForm() {
    if (this.props.projectId) {
      return (
        <div className="row">
          <div className="col-sm-12">
            <ProjectAuthGroupForm
              item={this.props.item}
              projectId={this.props.projectId}
              showFormHandler={this.showFormHandler}
              fetchHandler={this.fetch}
              dispatch={this.props.dispatch}
            />
          </div>
        </div>
      );
    }
  }

  companyAuthForm() {
    if (this.props.companyId) {
      return (
        <CompanyAuthGroupForm
          item={this.props.item}
          companyId={this.props.companyId}
          showFormHandler={this.showFormHandler}
          fetchHandler={this.fetch}
          dispatch={this.props.dispatch}
        />
      );
    }
  }

  renderForm() {
    if (!this.state.showForm) {
      return null;
    }
    return (
      <div className="row">
        <div className="col-sm-12">
          {this.projectAuthForm()}
          {this.companyAuthForm()}
        </div>
      </div>
    );
  }

  inUse() {
    let { item, disciplines } = this.props;
    if (!disciplines) {
      return true;
    }
    return disciplines.toList().filter(d => d.getInPath("auth.uid") == item.get("uid")).size > 0;
  }

  render() {
    let { item, index: i } = this.props;

    let inUse = this.inUse();

    let links = [{ name: "Edit", onClick: this.editItem }];
    if (!inUse) {
      links.push({ name: "Delete", onClick: this.deleteItem });
    }

    return (
      <React.Fragment>
        <div className="row" key={i} style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
          <div className="col-sm-8">
            <p className="m-0 p-0">{item.get("name")}</p>
          </div>
          <div className="col-sm-4 text-right">
            {!inUse ? <span className="badge badge-pill badge-info mr-3">Unused</span> : null}
            <BSBtnDropdown floatStyle={" "} links={links} />
          </div>
        </div>
        {this.renderForm()}
      </React.Fragment>
    );
  }
}
