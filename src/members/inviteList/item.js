import React from "react";
import Traec from "traec";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import { ProjectPermission } from "traec/utils/permissions/project";
import { CompanyPermission } from "traec/utils/permissions/company";

export default class InviteItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { index: i, item, projectId, companyId } = this.props;

    let PermissionWrapper = projectId ? ProjectPermission : CompanyPermission;

    return (
      <div className="row" key={i} style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
        <div className="col-sm-6">{item.get("email")}</div>
        {projectId ? <div className="col-sm-5">{item.getIn(["project_discipline", "name"])}</div> : null}
        {companyId ? <div className="col-sm-5">{item.getIn(["auth", "name"])}</div> : null}
        <PermissionWrapper {...this.props} requiresAdmin={true}>
          <DropdownActions companyId={companyId} projectId={projectId} item={item} />
        </PermissionWrapper>
      </div>
    );
  }
}

const DropdownActions = props => {
  const respondInvite = e => {
    e.preventDefault();
    let { companyId, projectId } = props;
    let inviteId = props.item.get("uid");

    let accept = true;
    let status = accept ? "accepted" : "rejected";

    let fetch = null;
    if (projectId) {
      fetch = new Traec.Fetch("project_invite", "put", { projectId, inviteId });
    } else if (companyId) {
      fetch = new Traec.Fetch("company_invite", "put", { companyId, inviteId });
    }
    // Set the payload and dispatch
    fetch.updateFetchParams({
      preFetchHook: body => ({ status }),
      postSuccessHook: () => {
        location.reload();
      }
    });
    fetch.dispatch();
  };

  const deleteItem = e => {
    e.preventDefault();
    let { companyId, projectId } = props;
    let inviteId = props.item.get("uid");
    if (projectId) {
      new Traec.Fetch("project_invite", "delete", { projectId, inviteId }).dispatch();
    } else if (companyId) {
      new Traec.Fetch("company_invite", "delete", { companyId, inviteId }).dispatch();
    }
  };

  const dropDownLinks = () => {
    return [
      { name: "Accept on behalf of", onClick: respondInvite },
      { name: "Delete", onClick: deleteItem }
    ];
  };
  return (
    <div className="col-sm-1">
      <BSBtnDropdown links={dropDownLinks()} />
    </div>
  );
};
