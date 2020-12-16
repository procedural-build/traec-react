import React from "react";
import { connect } from "react-redux";
import Im from "traec/immutable";
import DropdownLogin from "./loginDropdown";
import { MenuItem } from "./item";
import { DropDownItem } from "./dropdown";
import { setNavBarItems } from "traec/redux/actionCreators";

export { setNavBarItems };

export class NavBar extends React.Component {
  renderItems() {
    if (this.props.items == null) {
      return null;
    }
    return this.props.items.map((item, i) => renderItem(item, i));
  }

  renderBrand() {
    let { brand } = this.props;
    if (brand) {
      return brand;
    }
    return (
      <React.Fragment>
        Traec | <b>Procedural</b>.build
      </React.Fragment>
    );
  }

  render() {
    let { extraClass } = this.props;
    return (
      <div className="navbar-area">
        <nav
          className={`navbar navbar-expand-lg navbar-light bg-light navbar-static-top ${extraClass}`}
          role="navigation"
        >
          <div className="container-fluid m-0 p-0">
            <div className="navbar-brand">{this.renderBrand()}</div>

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
                {this.props.preUserItems}
                <DropdownLogin />
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const renderItem = function(item, keyIndex) {
  const label = item.get("label");
  const to = item.get("to");

  if (Im.List.isList(to)) {
    return <DropDownItem key={keyIndex} label={label} items={to} />;
  } else {
    return <MenuItem key={keyIndex} label={label} to={to} item={item} />;
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.getInPath(`ui.navbar.items`)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
