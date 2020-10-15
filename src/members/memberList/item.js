import React from "react";
import Traec from "traec";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";

import { CompanyPermission } from "traec/utils/permissions/company";
import { ProjectPermission } from "traec/utils/permissions/project";
import { confirmDelete } from "traec-react/utils/sweetalert";

function LastColumns(props) {
  let { projectId, companyId, item, links } = props;
  let Permission = projectId ? ProjectPermission : CompanyPermission;
  let text = projectId ? item.getInPath("project_discipline.name") : item.getInPath("auth.name");

  return (
    <React.Fragment>
      <div className="col-sm-2">{text}</div>
      <div className="col-sm-2">
        <Permission {...props} requiresAdmin={true}>
          <BSBtnDropdown links={links} />
        </Permission>
      </div>
    </React.Fragment>
  );
}

export default class MemberItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAssignments: false
    };

    this.emailRef = React.createRef();
    this.editMember = this.editMember.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this.toggleAssignments = this.toggleAssignments.bind(this);
    this.renderDocuments = this.renderDocuments.bind(this);
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
        { name: "See assignments", onClick: this.toggleAssignments }
      ];
    }
  }

  get_member_name() {
    let { member: item } = this.props;
    if (!item) {
      return "undefined";
    }
    return `${item.getInPath("user.first_name")} ${item.getInPath("user.last_name")}`;
  }

  renderDocuments(descriptionTitleList, docDescriptions, docStatusList, item) {
    let descriptionToDisplay = [];
    // This list will hold the UID's of the descriptions to display for the selected user, based on the documents they are assigned to.
    // The descriptions object in redux checks against this list to ensure only the selected user's documents are displayed

    let cleanedList = [];
    // This list will hold all of the descriptions that have the same UID as the selected user.
    // This prevents an error in which switching from the tasks panel to the members panel does not update redux correctly,
    // causing every document & task in the project to appear under the user.

    let toDisplayDocuments = false;
    // A boolean value to check whether documents should be displayed once the 'see assignments'
    // toggle is pressed. There is likely a cleaner solution to this

    let selectedDisciplineId = item.getIn(["project_discipline", "base_uid"]);

    // Appends the docDescription Id's to 'descriptionToDisplay' array for the selected user which is later checked against for displaying the document titles
    docStatusList.toJS().map(status => {
      let assignedDisciplineId = status["docDisciplineId"];
      if (assignedDisciplineId === selectedDisciplineId) {
        let docStatusId = status["docStatusId"];

        docDescriptions.toJS().map(document => {
          if (document["descStatus"] == docStatusId) {
            descriptionToDisplay.push(document["descId"]);
          }
        });
      } else {
        return null;
      }
    });

    // Uses the 'descriptionToDisplay' array to populate the cleaned list which prevents a bug where all tasks/documents are displayed in members page due to redux states.
    descriptionTitleList.toJS().map((description, key) => {
      if (descriptionToDisplay.includes(description["uid"])) {
        cleanedList.push(
          <div className="row" key={key} style={{ paddingLeft: "1em" }}>
            {description["titleText"]}
          </div>
        );
        toDisplayDocuments = true;
      }
    });

    if (toDisplayDocuments) {
      return (
        <div className="col-sm-4">
          <div className="row"> Documents:</div>
          {cleanedList}
        </div>
      );
    } else {
      return <div style={{ paddingBottom: "2em" }}>No Documents</div>;
    }
  }

  render() {
    let { member: item, index: i, docDescriptions, descriptionTitleList, docStatusList } = this.props;

    if (this.state.showAssignments) {
      return (
        <div>
          <div className="row" key={i} style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
            <div className="col-sm-4">{this.get_member_name()}</div>
            <div className="col-sm-4" ref={this.emailRef}>
              {item.getInPath("user.email")}
            </div>
            <LastColumns {...this.props} item={item} links={this.dropDownLinks()} />
          </div>

          <div className="row" style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
            <div className="col-sm-4" />
            <div className="col-sm-4">
              {this.renderDocuments(descriptionTitleList, docDescriptions, docStatusList, item)}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row" key={i} style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
          <div className="col-sm-4">{this.get_member_name()}</div>
          <div className="col-sm-4" ref={this.emailRef}>
            {item.getInPath("user.email")}
          </div>
          <LastColumns {...this.props} item={item} links={this.dropDownLinks()} />
        </div>
      );
    }
  }
}
