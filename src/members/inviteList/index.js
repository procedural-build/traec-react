import React from "react";
import Traec from "traec";
import { connect } from "react-redux";
import { BSCard } from "traec-react/utils/bootstrap";
import InviteItem from "./item";

export class InviteList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    // Data required from the API for this Component
    if (props.projectId) {
      this.requiredFetches = [new Traec.Fetch("project_invite", "list")];
    } else if (props.companyId) {
      this.requiredFetches = [new Traec.Fetch("company_invite", "list")];
    }
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  render() {
    let { invites, companyId, projectId, dispatch } = this.props;
    if (!invites || !invites.size) {
      return null;
    }

    // Get the list of Invite components
    let itemList = invites
      .toList()
      .sortBy((obj, i) => obj.get("created"))
      .map((invite, i) => (
        <InviteItem key={i} index={i} item={invite} companyId={companyId} projectId={projectId} dispatch={dispatch} />
      ));

    return (
      <div className="row">
        <BSCard widthOffset="col-sm-12" title="Outstanding Invitations" button={null} body={itemList} form={null} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { companyId, projectId } = ownProps;
  let project = null;
  let company = null;
  let invites = null;

  if (ownProps.projectId) {
    project = state.getInPath(`entities.projects.byId.${projectId}`);
    invites = state.getInPath(`entities.projectObjects.byId.${projectId}.invites`);
    let disciplines = state.getInPath(`entities.projectObjects.byId.${projectId}.disciplines`);

    if (invites && disciplines) {
      for (let [key, invite] of invites) {
        let disciplineId = invite.get("project_discipline");
        invites = invites.setInPath(`${key}.project_discipline`, disciplines.get(disciplineId));
      }
    }
  } else if (ownProps.companyId) {
    company = state.getInPath(`entities.companies.byId.${companyId}`);
    invites = state.getInPath(`entities.companyObjects.byId.${companyId}.invites`);
  }

  return {
    project,
    company,
    invites,
    isAuthenticated: state.getInPath("auth.isAuthorized")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteList);
