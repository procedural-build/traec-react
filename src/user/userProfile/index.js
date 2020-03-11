import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { authFailed } from "traec-react/auth/utils";
import { setNavBarItems } from "traec-react/navBar";

import CompanyInvites from "../userCompanies/companyInvite";
import UserCompanies from "../userCompanies/company";
import ProjectInvites from "../userProjects/projectInvite";
import UserProjects from "../userProjects/project";

export class TraecUserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.dispatch(setNavBarItems(navBarLinks()));
  }

  render() {
    if (this.props.authFailed) {
      return <Redirect to="/accounts/login?next=/accounts/profile/" />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>User Dashboard</h3>
            <p>
              This page lists Projects and Companies that you are a member of as well as Reports that you have assigned
              responsibility for.
            </p>
          </div>
        </div>
        <div className="row">
          <CompanyInvites />
        </div>
        <div className="row">
          <ProjectInvites />
        </div>
        <div className="row">
          <UserProjects />
        </div>
        <div className="row">
          <UserCompanies />
        </div>
      </div>
    );
  }
}

TraecUserProfile.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  authFailed: authFailed(state)
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(TraecUserProfile);
