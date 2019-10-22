import React from "react";
import ReactDOM from "react-dom";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Traec from "traec";
import BaseFormConnected from "traec-react/utils/form";
import { TrackerItem } from "./trackerItem";
import { BSCard, BSBtn } from "traec-react/utils/bootstrap";
import { objToList } from "traec/utils";

export const counter = { row: 0 };

class TraecUserTrackers extends React.Component {
  constructor(props) {
    super(props);

    const projectId = props.projectId;
    this.fetch = new Traec.Fetch("tracker", "post", { projectId });
    let { fetchParams, stateParams } = fetch;
    this.state = {
      formParams: {
        fetchParams,
        stateParams,
        initFields: {}
      }
    };

    this.requiredFetches = [new Traec.Fetch("project_tracker", "list")];

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
    fetch.toggleForm();
  }

  title() {
    return this.props.title ? this.props.title : "Trackers";
  }
  addButtonText() {
    return this.props.addButtonText ? this.props.addButtonText : "Add a Tracker";
  }

  render() {
    let itemsAsArray = objToList(this.props.items).sortBy((obj, i) => obj.get("created"));

    const itemList = itemsAsArray.map((tracker, i) => <TrackerItem key={i} index={i} tracker={tracker} />);

    return (
      <div className="row">
        <BSCard
          widthOffset="col-sm-12"
          title={this.title()}
          button={<BSBtn onClick={this.onClick} text={this.addButtonText()} />}
          body={itemList}
          form={
            <BaseFormConnected
              stateParams={this.state.formParams.stateParams}
              fetchParams={this.state.formParams.fetchParams}
              fields={trackerFields}
            />
          }
        />
      </div>
    );
  }
}

const trackerFields = {
  name: ""
};

const mapStateToProps = (state, ownProps) => {
  let { projectId } = ownProps;
  let project = state.getInPath(`entities.projects.byId.${projectId}`);

  let trackers = state.getInPath(`entities.trackers.byId`);

  if (trackers) {
    trackers = trackers.toList().filter(i => i.getInPath("project.uid") === projectId);
  }

  return {
    project,
    items: trackers,
    newItem: state.getInPath(`entities.trackers.newItem`) || [],
    isAuthenticated: state.getInPath("auth.isAuthorized")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TraecUserTrackers);
