import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Im from "traec/immutable";
import store from "traec/redux/store";

import LoginForm from "traec-react/auth/form";
import { logoutToken } from "traec-react/auth/_redux/actions";
import { DropDownItem } from "./dropdown";
import Octicons from 'react-octicon';

export class DropdownLogin extends React.Component {
  logoutClicked(e) {
    console.log("Logout button clicked");
    e.preventDefault();

    // Call action when form submitted
    store.dispatch(logoutToken());
  }

  getUserLabel() {
    let { tokenData } = this.props;
    let label = tokenData ? tokenData.get("username") : "User Menu";
    //label = label.split("@")[0]
    return label
  }

  userDropDownItems() {
    return Im.fromJS([
      { label: this.getUserLabel(), to: '#'},
      { label: "My Profile", to: "/accounts/profile", octicon:"home"},
      { label: null },
      { label: "Logout", onClick: this.logoutClicked, octicon:"sign-out" }
    ]);
  }

  render() {
    let label = "User"
    if (!this.props.isAuthenticated) {
      //console.log("I am not Authenticated")
      return (
        <li className="dropdown order-1">
          <button
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            className="btn btn-outline-secondary dropdown-toggle"
          >
            Login <span className="caret" />
          </button>
          <ul className="dropdown-menu dropdown-menu-right mt-1 dropdown-login-form">
            <li className="p-3">
              <LoginForm />
            </li>
          </ul>
        </li>
      );
    } else {
      //console.log("I am Authenticated")
      return <DropDownItem label={label} items={this.userDropDownItems()} extraDropdownClass={"dropdown-menu-right"} />;
    }
  }
}

LoginForm.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  let isAuthenticated = state.getInPath("auth.isAuthenticated");
  let tokenData = state.getInPath("auth.decoded_token");
  return { isAuthenticated, tokenData };
};

export default connect(
  mapStateToProps,
  null
)(DropdownLogin);
