import React from "react";
import { connect } from "react-redux";
import Traec from "traec";
import { BSCard, BSBtn } from "traec-react/utils/bootstrap";
import DisciplineForm, { disciplineFields } from "./form";
import { ProjectPermission } from "traec/utils/permissions/project";
import DisciplineItem from "./item";

export class DisciplineList extends React.Component {
  constructor(props) {
    super(props);

    const projectId = props.projectId;
    this.fetch = new Traec.Fetch("project_discipline", "post", { projectId });
    let { fetchParams, stateParams } = this.fetch.params;

    this.state = {
      formParams: {
        fetchParams,
        stateParams,
        initFields: {}
      }
    };

    this.requiredFetches = [new Traec.Fetch("project_discipline", "list")];

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.fetch.toggleForm();
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  render() {
    let {
      projectId,
      dispatch,
      disciplines,
      tree,
      title = "Project Suppliers",
      buttonText = "Add a Supplier"
    } = this.props;
    if (!disciplines) {
      return null;
    }

    let rootChildren = [...tree["root"].children];
    let rootItems = Traec.Im.fromJS(rootChildren.map(id => tree[id].obj));

    let itemList = rootItems
      .sortBy(i => i.get("name"))
      .filter(i => !i.get("approver"))
      .map((discipline, i) => (
        <DisciplineItem key={i} index={i} item={discipline} tree={tree} projectId={projectId} dispatch={dispatch} />
      ));

    let fields = {
      name: Object.assign({}, disciplineFields.name),
      auth: Object.assign({}, disciplineFields.auth),
      approver: Object.assign({}, disciplineFields.approver)
    };

    return (
      <div className="row">
        <BSCard
          widthOffset="col-sm-12"
          title={title}
          button={
            <ProjectPermission projectId={projectId} requiresAdmin={true}>
              <BSBtn onClick={this.onClick} text={buttonText} />
            </ProjectPermission>
          }
          body={itemList}
          form={
            <DisciplineForm
              projectId={this.props.projectId}
              stateParams={this.state.formParams.stateParams}
              fetchParams={this.state.formParams.fetchParams}
              fields={fields}
            />
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let { projectId } = ownProps;
  let project = state.getInPath(`entities.projects.byId.${projectId}`);
  let disciplines = state.getInPath(`entities.projectObjects.byId.${projectId}.disciplines`);
  // Make a tree of the discipline approval heirarchy
  let tree = {};
  if (disciplines) {
    disciplines = disciplines.filter(discipline => !discipline.getInPath("meta_json.user_discipline"));
    for (let [itemId, item] of disciplines) {
      let approverId = item.get("approver") || "root";
      // Add the item to the tree
      let treeItem = tree[itemId] || { obj: item, children: new Set() };
      Object.assign(treeItem, { obj: item });
      Object.assign(tree, { [itemId]: treeItem });
      // Add this to the children set of the parent
      treeItem = tree[approverId] || { obj: null, children: new Set() };
      treeItem.children.add(itemId);
      Object.assign(tree, { [approverId]: treeItem });
    }
  }
  // Return this
  return { project, disciplines, tree };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisciplineList);
