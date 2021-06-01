import React from "react";
import Traec from "traec";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import { ProjectPermission } from "traec/utils/permissions/project";
import { CompanyPermission } from "traec/utils/permissions/company";
import { alertSuccess } from "traec-react/utils/sweetalert";

const roleName = invite => {
  return invite.getInPath("project_discipline.name") || invite.getInPath("auth.name");
};

const getCompanyAndProjectId = invite => {
  return {
    projectId: invite.getInPath("project_discipline.project.uid"),
    companyId: invite.getInPath("company.uid")
  };
};

const getHandler = invite => {
  return invite.has("project_discipline") ? "project_invite" : "company_invite";
};

export function RequestItem(props) {
  let { index: i, item: invite, projectId, companyId } = props;

  let PermissionWrapper = projectId ? ProjectPermission : CompanyPermission;

  return (
    <div className="row" key={i} style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
      <div className="col-sm-6">{invite.get("email")}</div>
      <div className="col-sm-5">{roleName(invite)}</div>
      <div className="col-sm-1">
        <PermissionWrapper {...props} requiresAdmin={true}>
          <BSBtnDropdown
            links={[
              { name: "Approve Request", onClick: e => respondInvite(invite, true) },
              { name: "Reject Request", onClick: e => respondInvite(invite, false) }
            ]}
          />
        </PermissionWrapper>
      </div>
    </div>
  );
}

export default function InviteItem(props) {
  let { index: i, item: invite, projectId, companyId } = props;

  let PermissionWrapper = projectId ? ProjectPermission : CompanyPermission;

  return (
    <div className="row" key={i} style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
      <div className="col-sm-6">{invite.get("email")}</div>
      <div className="col-sm-5">{roleName(invite)}</div>
      <div className="col-sm-1">
        <PermissionWrapper {...props} requiresAdmin={true}>
          <BSBtnDropdown
            links={[
              { name: "Accept on behalf of", onClick: e => respondInvite(invite, true) },
              { name: "Delete", onClick: e => deleteItem(invite) }
            ]}
          />
        </PermissionWrapper>
      </div>
    </div>
  );
}

const respondInvite = (invite, accept) => {
  let inviteId = invite.get("uid");
  let status = accept ? "accepted" : "rejected";

  let fetch = new Traec.Fetch(getHandler(invite), "put", { ...getCompanyAndProjectId(invite), inviteId });

  // Set the payload and dispatch
  fetch.updateFetchParams({
    preFetchHook: body => ({ status }),
    postSuccessHook: () => {
      location.reload();
    },
    postFailureHook: errors => {
      console.log("Handling request errors", errors);
      alertSuccess({
        iconType: "error",
        title: "Error",
        text: errors
      });
    }
  });

  fetch.dispatch();
};

const deleteItem = invite => {
  let inviteId = invite.get("uid");
  new Traec.Fetch(getHandler(invite), "delete", { ...getCompanyAndProjectId(invite), inviteId }).dispatch();
};
