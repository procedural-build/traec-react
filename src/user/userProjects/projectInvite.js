import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Traec from "traec";
import { BSCard } from "traec-react/utils/bootstrap";
import BaseFormConnected from "traec-react/utils/form";
import ProjectInviteItem from "./projectInviteItem";

const projectInviteFields = {
  email: { value: "", class: "col", endRow: true }
};

class ProjectInvites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formParams: {
        stateParams: {},
        fetchParams: {},
        initFields: {}
      }
    };

    // Data required from the API for this Component
    this.requiredFetches = [new Traec.Fetch("project_invite_all", "list")];
  }

  componentDidMount() {
    Traec.fetchRequired.bind(this)();
  }

  componentDidUpdate() {
    Traec.fetchRequired.bind(this)();
  }

  render() {
    let { items } = this.props;
    if (!items || !items.size) {
      return (
        <div className="col-sm-12">
          <p>No outstanding Project Invites</p>
        </div>
      );
    }

    const itemList = items
      .toList()
      .map((item, i) => <ProjectInviteItem key={i} index={i} invite={item} dispatch={this.props.dispatch} />);

    return (
      <BSCard
        id="project-invite-list"
        widthOffset="col-sm-12"
        title="Project Invites"
        //button={<BSBtn onClick={this.onClick} text="Create a Company" />}
        body={itemList}
        form={
          <BaseFormConnected
            stateParams={this.state.formParams.stateParams}
            fetchParams={this.state.formParams.fetchParams}
            fields={projectInviteFields}
          />
        }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  items: state.getInPath("entities.projectInvites.byId"),
  isAuthenticated: state.getInPath("auth.isAuthenticated")
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInvites);
