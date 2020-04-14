import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import { BSCard, BSBtn } from "traec-react/utils/bootstrap";
import { ProjectAuthGroupForm } from "./projectForm";
import CompanyAuthGroupForm from "./companyForm";
import AuthGroupItem from "./item";

export class AuthGroupList extends React.Component {
  constructor(props) {
    super(props);

    if (props.projectId) {
      const projectId = props.projectId;
      this.fetch = new Traec.Fetch("project_authgroup", "post", { projectId });
      this.requiredFetches = [new Traec.Fetch("project_authgroup", "list")];
    } else if (props.companyId) {
      const companyId = props.companyId;
      this.fetch = new Traec.Fetch("company_authgroup", "post", { companyId });
      this.requiredFetches = [new Traec.Fetch("company_authgroup", "list")];
    }

    let { fetchParams, stateParams } = this.fetch.params;

    this.state = {
      showForm: false,
      formParams: {
        fetchParams,
        stateParams,
        initFields: {}
      }
    };

    this.onClick = this.onClick.bind(this);
    this.showFormHandler = this.showFormHandler.bind(this);
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  onClick(e) {
    e.preventDefault();
    this.fetch.toggleForm();
  }

  showFormHandler(e, showForm) {
    this.setState({ showForm });
  }

  /* RENDERING */

  renderForm() {
    if (!this.state.showForm) {
      return null;
    }

    if (this.props.projectId) {
      return (
        <ProjectAuthGroupForm
          item={null}
          projectId={this.props.projectId}
          showFormHandler={this.showFormHandler}
          fetchHandler={this.fetch}
          dispatch={this.props.dispatch}
        />
      );
    }

    if (this.props.companyId) {
      return (
        <CompanyAuthGroupForm
          item={null}
          companyId={this.props.companyId}
          showFormHandler={this.showFormHandler}
          fetchHandler={this.fetch}
          dispatch={this.props.dispatch}
        />
      );
    }
  }

  render() {
    let { authGroups, projectId, companyId, dispatch } = this.props;
    if (!authGroups) {
      return null;
    }

    let itemList = authGroups
      .toList()
      .sortBy((obj, i) => obj.get("name"))
      .map((item, i) => (
        <AuthGroupItem key={i} index={i} item={item} projectId={projectId} companyId={companyId} dispatch={dispatch} />
      ));

    return (
      <div className="row">
        <BSCard
          widthOffset="col-sm-12"
          title="Authority Groups"
          button={<BSBtn onClick={e => this.showFormHandler(e, !this.state.showForm)} text="Add an Authority Group" />}
          body={itemList}
          form={this.renderForm()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { projectId, companyId } = ownProps;

  let project = null;
  let company = null;
  let authGroups = null;

  if (projectId) {
    project = state.getInPath(`entities.projects.byId.${projectId}`);
    authGroups = state.getInPath(`entities.projectObjects.byId.${projectId}.authGroups`);
  }

  if (companyId) {
    company = state.getInPath(`entities.companies.byId.${companyId}`);
    authGroups = state.getInPath(`entities.companyObjects.byId.${companyId}.authGroups`);
  }
  let isAuthenticated = state.getInPath("auth.isAuthenticated");
  return { project, company, authGroups, isAuthenticated };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthGroupList);
