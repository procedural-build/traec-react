import React from "react";
import { connect } from "react-redux";

import Traec from "traec";
import BaseFormConnected from "traec-react/utils/form";
import { TrackerItem } from "./trackerItem";
import { BSBtn, BSCard } from "traec-react/utils/bootstrap";
import Swal from "sweetalert2";
import Im from "traec/immutable";
import { ProjectPermission } from "traec/utils/permissions/project";

export const counter = { row: 0 };

class TraecUserTrackers extends React.Component {
  constructor(props) {
    super(props);

    const projectId = props.projectId;
    this.fetch = new Traec.Fetch("tracker", "post", { projectId });
    this.state = {
      formParams: this.fetch.params
    };

    this.requiredFetches = [
      new Traec.Fetch("project_tracker", "list"),
      new Traec.Fetch("tracker", "list", { onlyTemplates: true })
    ];

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  onClick(e) {
    e.preventDefault();
    let { projectId } = this.props;
    let fetch = new Traec.Fetch("tracker", "post", { projectId });
    this.setState({ formParams: fetch.params });
    /*fetch.updateFetchParams({
      postSuccessHook: data => {
        return Swal.fire({
          title: "Tracker Created!",
          text: "Would you like to add categories from a template?",
          type: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then(result => {
          if (result.value) {
            return this.props.history.push(`/tracker/${data.uid}/template`);
          } else {
            return null;
          }
        });
      }
    });*/
    fetch.toggleForm();
  }

  title() {
    return this.props.title ? this.props.title : "Trackers";
  }
  addButtonText() {
    return this.props.addButtonText ? this.props.addButtonText : "Add a Tracker";
  }

  render_tracker_list() {
    let { trackers } = this.props;
    if (!trackers || !trackers.size) {
      return <p className="text-center">No trackers. Add a Tracker to get started</p>;
    }
    return trackers
      .toList()
      .sortBy((obj, i) => obj.get("created"))
      .map((tracker, i) => <TrackerItem key={i} index={i} tracker={tracker} />);
  }

  render() {
    let { projectId } = this.props;
    return (
      <div className="row">
        <BSCard
          widthOffset="col-sm-12"
          title={this.title()}
          button={
            <ProjectPermission projectId={projectId} requiresAdmin={true}>
              <BSBtn onClick={this.onClick} text={this.addButtonText()} />
            </ProjectPermission>
          }
          body={this.render_tracker_list()}
          form={
            <BaseFormConnected params={this.state.formParams} fields={trackerFields(this.props.trackerTemplates)} />
          }
        />
      </div>
    );
  }
}

const trackerFields = trackerTemplates => {
  if (!trackerTemplates || !trackerTemplates.size) {
    return { name: "" };
  }
  trackerTemplates = trackerTemplates.toList().insert(0, Im.Map({ uid: null, name: "Select a Template" }));
  return {
    name: { value: "", endRow: true },
    from_template: {
      endRow: true,
      inputType: "select",
      options: trackerTemplates.map((template, index) => (
        <option key={index} value={template.get("uid")}>
          {template.get("name")}
        </option>
      ))
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  let { projectId } = ownProps;
  let project = state.getInPath(`entities.projects.byId.${projectId}`);
  let trackers = state.getInPath(`entities.trackers.byId`);
  let trackerTemplates = trackers ? trackers.filter(item => item.get("is_template")) : Im.List();
  if (trackers) {
    trackers = trackers.toList().filter(i => i.getInPath("project.uid") === projectId);
  }

  return {
    project,
    trackers,
    trackerTemplates,
    isAuthenticated: state.getInPath("auth.isAuthorized")
  };
};

export default connect(mapStateToProps)(TraecUserTrackers);
