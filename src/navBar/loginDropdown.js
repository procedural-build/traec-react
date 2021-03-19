import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Im from "traec/immutable";
import store from "traec/redux/store";

import LoginForm from "traec-react/auth/form";
import { logoutToken } from "traec-react/auth/_redux/actions";
import { DropDownItem } from "./dropdown";

const UserLabel = ({ user }) => {
  let label = user
    ? ((user.get("first_name") || "").charAt(0) + (user.get("last_name") || "").charAt(0)).trim() ||
      user.get("username")
    : "User";
  return label;
};

export class DropdownLogin extends React.Component {
  logoutClicked(e) {
    e.preventDefault();

    // Call action when form submitted
    store.dispatch(logoutToken());
  }

  userDropDownItems() {
    let { user, include_myprofile = true, includeUser = false } = this.props;
    let menu = [];
    // Include a link to myprofile
    if (include_myprofile) {
      menu = menu.concat([{ label: "My Profile", to: "/accounts/profile", octicon: "home" }]);
    }

    if (includeUser) {
      menu = menu.concat([{ label: UserLabel(user), to: "/user/", octicon: "person" }]);
    }
    // Superuser-related menus
    if (user && user.get("is_tenant_superuser")) {
      menu = menu.length ? menu.concat([{ label: null }]) : menu;
      menu = menu.concat([{ label: "Tenacy admin", to: "/tenant/admin/", octicon: "gear" }]);
    }
    // Password change
    menu = menu.concat([
      { label: null },
      { label: "Change Password", to: "/accounts/password/change/", octicon: "key" }
    ]);
    // Logout menu
    menu = menu.concat([{ label: null }, { label: "Logout", onClick: this.logoutClicked, octicon: "sign-out" }]);
    return Im.fromJS(menu);
  }

  render() {
    let { isAuthenticated, user } = this.props;
    if (!isAuthenticated) {
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
      return (
        <DropDownItem
          label={<span className="user-dropdown-header">{UserLabel({ user })}</span>}
          items={this.userDropDownItems()}
          extraDropdownClass={"dropdown-menu-right"}
        />
      );
    }
  }
}

LoginForm.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  let isAuthenticated = state.getInPath("auth.isAuthenticated");
  let tokenData = state.getInPath("auth.decoded_token");
  let user = state.getInPath("auth.user");
  return { isAuthenticated, tokenData, user };
};

export default connect(mapStateToProps, null)(DropdownLogin);
