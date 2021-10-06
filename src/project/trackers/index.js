import React from "react";
import { connect } from "react-redux";

import Traec from "traec";
import BaseFormConnected from "traec-react/utils/form";
import { TrackerItem } from "./trackerItem";
import { BSBtn, BSCard } from "traec-react/utils/bootstrap";
import Im from "traec/immutable";
import { ProjectPermission } from "traec/utils/permissions/project";

export const counter = { row: 0 };

const TrackerList = props => {
  let { trackers, TrackerItemComponent = TrackerItem, project } = props;

  if (!trackers || !trackers.size) {
    return <p className="text-center">No trackers. Add a Tracker to get started</p>;
  }

  return trackers
    .toList()
    .sortBy(obj => obj.get("created"))
    .map((tracker, i) => <TrackerItemComponent key={i} index={i} tracker={tracker} project={project} />);
};

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
    fetch.updateFetchParams({
      postSuccessHook: data => {
        if (data.from_template) {
          location.reload();
        }
      }
    });
    this.setState({ formParams: fetch.params });
    fetch.toggleForm();
  }

  render() {
    let {
      project,
      projectId,
      trackers,
      trackerTemplates,
      title,
      addButtonText,
      TrackerItemComponent = TrackerItem
    } = this.props;

    return (
      <div className="row">
        <BSCard
          widthOffset="col-sm-12"
          title={title || "Trackers"}
          button={
            <ProjectPermission projectId={projectId} _test={true} requiresAdmin={true}>
              <BSBtn onClick={this.onClick} text={addButtonText || "Add a Tracker"} />
            </ProjectPermission>
          }
          body={<TrackerList trackers={trackers} TrackerItemComponent={TrackerItemComponent} project={project} />}
          form={<BaseFormConnected params={this.state.formParams} fields={trackerFields(trackerTemplates)} />}
        />
      </div>
    );
  }
}

const trackerFields = trackerTemplates => {
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
  let trackers = state.getInPath(`entities.trackers.byId`) || Traec.Im.List();
  let trackerTemplates = trackers.filter(item => item.get("is_template"));
  if (trackers) {
    trackers = trackers.toList().filter(i => i.getInPath("project.uid") === projectId);
  }
  // This is used to just force refresh of the component if/when ProjectPermission fetches the permissions
  let userPermission = state.getInPath(`entities.projectObjects.byId.${projectId}.userPermission`);

  return {
    project,
    trackers,
    trackerTemplates,
    isAuthenticated: state.getInPath("auth.isAuthorized"),
    userPermission
  };
};

export default connect(mapStateToProps)(TraecUserTrackers);
