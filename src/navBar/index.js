import React from "react";
import { connect } from "react-redux";
import Im from "traec/immutable";
import DropdownLogin from "./loginDropdown";
import { MenuItem } from "./item";
import { DropDownItem } from "./dropdown";
import { setNavBarItems } from "traec/redux/actionCreators";
import { isSuperuser } from "../utils";
import { getProjectPermissions } from "traec/utils/permissions/project";

export { setNavBarItems };

export const NavBar = props => {
  let {
    items,
    user,
    brand,
    extraClass,
    preUserItems,
    include_myprofile,
    includeUser,
    userLabel,
    getUserItemLabel,
    createText,
    permission
  } = props;

  return (
    <div className="navbar-area">
      <nav
        className={`navbar navbar-expand-lg navbar-light bg-light navbar-static-top ${extraClass}`}
        role="navigation"
      >
        <div className="container-fluid m-0 p-0">
          <div className="navbar-brand">
            <NavBrand brand={brand} />
          </div>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-toggle="collapse"
            data-target="#exCollapsingNavbar"
          >
            &#9776;
          </button>

          <div className="collapse navbar-collapse" id="exCollapsingNavbar">
            <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
              <NavItems items={items} user={user} permission={permission} />
              {preUserItems}
              <DropdownLogin
                include_myprofile={include_myprofile}
                includeUser={includeUser}
                userLabel={userLabel}
                getUserItemLabel={getUserItemLabel}
                createText={createText}
              />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const NavItems = props => {
  if (props.items == null) {
    return null;
  }
  return props.items.map((item, i) => <NavItem key={i} item={item} user={props.user} permission={props.permission} />);
};

const NavBrand = props => {
  let { brand } = props;
  if (brand) {
    return brand;
  }
  return (
    <>
      Traec | <b>Procedural</b>.build
    </>
  );
};

const NavItem = props => {
  const { item, permission, user } = props;
  const label = item.get("label");
  const to = item.get("to");
  const requiresAdmin = item.get("requiresAdmin");

  if (requiresAdmin && !isSuperuser(user) && !permission?.get("is_admin")) {
    return null;
  }

  if (Im.List.isList(to)) {
    return <DropDownItem label={label} items={to} />;
  } else {
    return <MenuItem label={label} to={to} item={item} />;
  }
};

const mapStateToProps = (state, ownProps) => {
  let { location } = ownProps;

  let locationParts = location.pathname.split("/");
  let projectPermission = null;
  if (locationParts[1] === "project") {
    let projectId = state.getInPath(`entities.projects.byId.${locationParts[2]}.uid`);
    projectPermission = getProjectPermissions(state, projectId);
  }

  return {
    items: state.getInPath(`ui.navbar.items`),
    user: state.getInPath("auth.user"),
    permission: projectPermission
  };
};

export default connect(mapStateToProps)(NavBar);
