import React from "react";
import { deleteCategory, editCard } from "AppSrc/tasks/utils/cardUtils";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import { projectPermissionFilter } from "traec/utils/permissions/project";

export class GearDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  dropdownLinks() {
    const { trackerId, refId, commitId, treeId } = this.props;
    return [
      {
        name: "Delete Task",
        requiresAdmin: true,
        onClick: e => deleteCategory(e, { trackerId, refId, commitId, treeId })
      },
      { name: "Edit Task", requiresAdmin: true, onClick: editCard },
      { name: "Assign Discipline", onClick: this.props.toggleDisciplines },
      { name: "Set Target", requiresAdmin: true, onClick: this.props.toggleTargets }
    ];
  }

  permittedLinks() {
    let links = this.dropdownLinks();
    return projectPermissionFilter(this.props.projectId, links);
  }
  render() {
    let links = this.permittedLinks();
    if (!links.length) {
      return null;
    }
    return <BSBtnDropdown links={links} />;
  }
}
