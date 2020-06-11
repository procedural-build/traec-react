import React from "react";
import Traec from "traec";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import { projectPermissionRender } from "traec/utils/permissions/project";
import { companyPermissionRender } from "traec/utils/permissions/company";

export default class InviteItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const i = this.props.index;
    const item = this.props.item;

    let permissionMethod = this.props.projectId ? projectPermissionRender : companyPermissionRender
    let permissionId = this.props.projectId || this.props.companyId

    return (
      <div className="row" key={i} style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
        <div className="col-sm-6">{item.get("email")}</div>
        {this.props.projectId ? <div className="col-sm-5">{item.getIn(["project_discipline", "name"])}</div> : null}
        {this.props.companyId ? <div className="col-sm-5">{item.getIn(["auth", "name"])}</div> : null}
        {permissionMethod(
          permissionId,
          true,
          [],
          <DropdownActions companyId={this.props.companyId} projectId={this.props.projectId} item={item} />
        )}
      </div>
    );
  }
}

const DropdownActions = props => {
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
    return [{ name: "Delete", onClick: deleteItem }];
  };
  return (
    <div className="col-sm-1">
      <BSBtnDropdown links={dropDownLinks()} />
    </div>
  );
};
