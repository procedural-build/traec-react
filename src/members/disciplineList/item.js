import React from "react";
import Traec from "traec";
import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import { ProjectPermission } from "traec/utils/permissions/project";
import { confirmDelete } from "traec-react/utils/sweetalert";
import DisciplineForm, { disciplineFields } from "./form";
import BaseFormConnected from "../../utils/form";
import { setAndShowModal } from "../../utils/bootstrap/reduxModal";

export default class DisciplineItem extends React.Component {
  constructor(props) {
    super(props);

    this.fetch = this.getFetch(props);
    this.state = {
      formParams: {
        ...this.fetch.params
      }
    };

    // action bindings
    this.dropDownLinks = this.dropDownLinks.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.assignLeader = this.assignLeader.bind(this);
  }

  deleteItem(e) {
    e.preventDefault();
    let { projectId } = this.props;
    let projectDisciplineId = this.props.item.get("uid");

    confirmDelete({
      text: `This will delete the Project Supplier: ${this.props.item.get(
        "name"
      )}.  Are you sure you would like to proceed?`,
      onConfirm: () => {
        new Traec.Fetch("project_discipline", "delete", { projectId, projectDisciplineId }).dispatch();
      }
    });
  }

  getFetch(props) {
    let { item, projectId } = props;
    const itemId = item.get("uid");

    let fetch = new Traec.Fetch("project_discipline", "put", { projectId, projectDisciplineId: itemId });
    fetch.updateFetchParams({
      preFetchHook: body => {
        body.approver = body.approver || null;
        return body;
      },
      postSuccessHook: () => location.reload()
    });

    return fetch;
  }

  editItem(e) {
    e.preventDefault();
    let fetch = this.getFetch(this.props);
    this.setState({ formParams: { ...fetch.params } });
    fetch.toggleForm();
  }

  assignLeader(e) {
    e.preventDefault();
    let { item, projectId, disciplineMembers = Traec.Im.Map() } = this.props;
    const itemId = item.get("uid");

    let modalId = "assignLeaderModal";

    let fetch = new Traec.Fetch("project_discipline", "patch", { projectId, projectDisciplineId: itemId });

    fetch.updateFetchParams({
      preFetchHook: body => {
        body.leader = { uid: body.leader } || null;
        return body;
      },
      postSuccessHook: () => {
        $(`#${modalId}`).modal("hide");
      }
    });

    let fields = {
      leader: {
        value: "",
        endRow: true,
        label: "",
        placeholder: "Chose a Leader",
        inputType: "select",
        defaultValue: "",
        options: disciplineMembers
          .toList()
          .unshift(null)
          .map((member, i) => (
            <option key={i} value={member?.get("uid")}>
              {member?.getInPath("user.first_name")} {member?.getInPath("user.last_name")}
            </option>
          ))
      }
    };
    setAndShowModal(modalId, {
      title: "Assign Leader",
      body: (
        <BaseFormConnected
          params={fetch.params}
          fields={fields}
          initFields={Traec.Im.fromJS({
            leader: `${item.getInPath("leader.user.first_name")} ${item.getInPath("leader.user.last_name")}`
          })}
          forceShowForm={true}
          hideUnderline={true}
        />
      )
    });
  }

  dropDownLinks() {
    let { canAssignLeader } = this.props;

    let links = [
      { name: "Edit", onClick: this.editItem },
      { name: "Delete", onClick: this.deleteItem }
    ];
    if (canAssignLeader) {
      links.push({ name: "Assign Leader", onClick: this.assignLeader });
    }
    return links;
  }

  render_edit_form() {
    let { item, projectId } = this.props;
    let fields = {
      name: Object.assign({}, disciplineFields.name, { value: item.get("name") || "" }),
      auth: Object.assign({}, disciplineFields.auth, { value: item.getInPath("auth.uid") || "" }),
      approver: Object.assign({}, disciplineFields.approver, { value: item.get("approver") || "" })
    };

    let fetch = this.getFetch(this.props);
    return <DisciplineForm projectId={projectId} itemId={item.get("uid")} {...fetch.params} fields={fields} />;
  }

  render_children() {
    let { tree, item, projectId, dispatch, indent = 0 } = this.props;
    let childIds = [...tree[item.get("uid")].children];
    let children = Traec.Im.fromJS(childIds.map(id => tree[id].obj));
    return children
      .sortBy(i => i.get("name"))
      .map((child, i) => {
        return (
          <DisciplineItem
            key={i}
            index={i}
            item={child}
            tree={tree}
            projectId={projectId}
            dispatch={dispatch}
            indent={indent + 1}
          />
        );
      });
  }

  render() {
    let { index: i, item, projectId, indent = 0, canAssignLeader } = this.props;

    return (
      <>
        <div className="row" key={i} style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
          <DisciplineName indent={indent} item={item} />
          <DisciplineAuth item={item} />
          <DisciplineLeader item={item} show={canAssignLeader} />
          <DisciplineLinks projectId={projectId} links={this.dropDownLinks()} />
        </div>
        {this.render_edit_form()}
        {this.render_children()}
      </>
    );
  }
}

const DisciplineName = props => {
  let { indent, item } = props;

  return (
    <div className="col-sm-4">
      <span style={{ marginLeft: `${indent * 1.5}em` }}>{item.get("name")}</span>
    </div>
  );
};

const DisciplineAuth = props => {
  let { item } = props;

  return <div className="col-sm-3">{item.getInPath("auth.name")}</div>;
};

const DisciplineLeader = props => {
  let { item } = props;

  return (
    <div className="col-sm-3">
      {item.getInPath("leader.user.first_name")} {item.getInPath("leader.user.last_name")}
    </div>
  );
};

const DisciplineLinks = props => {
  let { projectId, links } = props;
  return (
    <div className="col-sm-2">
      <ProjectPermission projectId={projectId} requiresAdmin={true}>
        <BSBtnDropdown links={links} />
      </ProjectPermission>
    </div>
  );
};
