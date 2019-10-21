import React from "react";
import Traec from "traec";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";

import { companyPermissionRender } from "traec/utils/permissions/company";
import { projectPermissionRender } from "traec/utils/permissions/project";
import { confirmDelete } from "traec-react/utils/sweetalert";

export default class MemberItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAssignments: false
    };

    this.emailRef = React.createRef();
    this.editMember = this.editMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.seeAssignments = this.seeAssignments.bind(this);
    this.toggleAssignments = this.toggleAssignments.bind(this);
  }

  stateParams() {
    const company = this.props.item.company;
    const basePath = `${company.uid}.members`;
    return {
      formObjPath: `entities.members.items`,
      formVisPath: `${basePath}.SHOW_FORM`
    };
  }

  editMember(e) {
    e.preventDefault();
  }

  deleteMember(e) {
    e.preventDefault();
    let { projectId, companyId, member } = this.props;
    let memberName = this.get_member_name();
    let ID = projectId ? projectId : companyId;
    confirmDelete({
      text: `This will delete ${
        projectId ? "project" : "company"
      } member ${memberName}.  Are you sure you would like to proceed?`,
      onConfirm: () => {
        new Traec.Fetch(`${projectId ? "project" : "company"}_member`, "delete", {
          projectId: ID,
          companyId: ID,
          memberId: member.get("uid")
        }).dispatch();
      }
    });
  }

  toggleAssignments() {
    let currentState = this.state.showAssignments;
    this.setState({ showAssignments: !currentState });
  }

  seeAssignments() {
    let { member, disciplineList, trackerId, crefId, commitId, commit, treeId } = this.props;
    // console.log("member", member)
    // console.log("disciplineList", disciplineList)

    // Get the selected user to see Assignments
    let userToDisplay = this.emailRef.current.innerText;
    console.log("trackerId", trackerId);
    console.log("crefId", crefId);
    console.log("commitId", commitId);
    console.log("treeId", treeId);
    // Toggle dropdown under username
    this.toggleAssignments();

    // Get Task and documents of selected user

    // Render in DOM
  }

  dropDownLinks() {
    let { seeAssignments } = this.props;
    if (!seeAssignments) {
      return [
        //{ name: "Edit", onClick: this.editMember },
        { name: "Delete", onClick: this.deleteMember }
      ];
    } else if (seeAssignments) {
      return [
        //{ name: "Edit", onClick: this.editMember },
        { name: "Delete", onClick: this.deleteMember },
        { name: "See assignments", onClick: this.seeAssignments }
      ];
    }
  }

  get_member_name() {
    let { member: item } = this.props;
    return `${item.getIn(["user", "first_name"])} ${item.getIn(["user", "last_name"])}`;
  }

  renderCompany(companyId, item) {
    return (
      <React.Fragment>
        <div className="col-sm-2">{item.getIn(["auth", "name"])}</div>
        <div className="col-sm-2">
          {companyPermissionRender(companyId, true, [], <BSBtnDropdown links={this.dropDownLinks()} />)}
        </div>
      </React.Fragment>
    );
  }

  renderProject(projectId, item) {
    return (
      <React.Fragment>
        <div className="col-sm-2">{item.getIn(["project_discipline", "name"])}</div>
        <div className="col-sm-2">
          {projectPermissionRender(projectId, true, [], <BSBtnDropdown links={this.dropDownLinks()} />)}
        </div>
      </React.Fragment>
    );
  }

  render() {
    let { projectId, companyId, member: item, index: i, task: task } = this.props;

    if (this.state.showAssignments) {
      return (
        <div>
          <div className="row" key={i} style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
            <div className="col-sm-4">{this.get_member_name()}</div>
            <div className="col-sm-4" ref={this.emailRef}>
              {item.getIn(["user", "email"])}
            </div>
            {projectId ? this.renderProject(projectId, item) : this.renderCompany(companyId, item)}
          </div>

          <div className="row" style={{ backgroundColor: i % 2 ? "#ddd" : "" }}>
            <div className="col-sm-4"></div>
            <div className="col-sm-4">DATA HERE {item.getIn(["user", "email"])}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row" key={i} style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
          <div className="col-sm-4">{this.get_member_name()}</div>
          <div className="col-sm-4" ref={this.emailRef}>
            {item.getIn(["user", "email"])}
          </div>
          {projectId ? this.renderProject(projectId, item) : this.renderCompany(companyId, item)}
        </div>
      );
    }
  }
}
