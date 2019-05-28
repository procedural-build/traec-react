import React from "react";
import { connect } from "react-redux";
import Im from "traec/immutable";
import DropdownLogin from "./loginDropdown";
import { MenuItem } from "./item";
import { DropDownItem } from "./dropdown";
import { setNavbarItems } from './actionCreators';


export { setNavbarItems };


class Navbar extends React.Component {
  renderItem(item, keyIndex) {
    const label = item.get("label");
    const to = item.get("to");
    if (Im.List.isList(to)) {
      return <DropDownItem key={keyIndex} label={label} items={to} />;
    } else {
      return <MenuItem key={keyIndex} label={label} to={to} />;
    }
  }

  renderItems() {
    if (this.props.items == undefined) {
      return "";
    }
    return this.props.items.map((item, i) => this.renderItem(item, i));
  }

  render() {
    return (
      <div className="navbar-area">
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light navbar-static-top mb-3"
          role="navigation"
        >
          <div className="container-fluid">
            <span className="navbar-brand">
              Track | <b>Procedural</b>.build
            </span>

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
                {this.renderItems()}
                <DropdownLogin />
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.getInPath(`entities.ui.navbar.items`)
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
)(Navbar);
