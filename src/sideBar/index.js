import Im from "traec/immutable";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Octicon from "react-octicon";
import { setSideBarItems } from "traec/redux/actionCreators";

export { setSideBarItems };

/* Demos for Collapsable sidebar here:
 * https://bootstrapious.com/p/bootstrap-sidebar
 * Partially collapsing sidebar:
 * https://bootstrapious.com/tutorial/sidebar/index4.html
 */

export class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.smCounter = 0;
  }

  renderItem(item, keyIndex) {
    const label = item.get("label");
    if (!label) {
      return <hr />;
    }
    const to = item.get("to");
    if (Im.List.isList(to)) {
      return this.renderSubmenu(item, keyIndex);
    } else if (to === "#") {
      return <h5 key={keyIndex}>{item.get("label")}</h5>;
    } else {
      return (
        <li className="nav-item" key={keyIndex}>
          <Link className="nav-link" to={to}>
            {renderIcon(item)} {item.get("label")}
          </Link>
        </li>
      );
    }
  }

  renderItems() {
    let { items } = this.props;
    if (items === undefined) {
      return "";
    }
    return items.map((item, i) => this.renderItem(item, i));
  }

  renderSubmenu(item, keyIndex) {
    this.smCounter += 1;
    let targetId = `#submenu${this.smCounter}`;
    let items = item.get("to"); // This should be a list!
    if (items === undefined) {
      return "";
    }
    return (
      <li className="nav-item" key={keyIndex}>
        <a className="nav-link collapsed" href={targetId} data-toggle="collapse" data-target={targetId}>
          {renderIcon(item)} {item.get("label")}
        </a>
        <div className="collapse" id="submenu1" aria-expanded="false">
          <ul className="flex-column pl-2 nav">{items.map((item, i) => this.renderItem(item, i))}</ul>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div>
        <ul className="nav flex-column flex-nowrap">{this.renderItems()}</ul>
      </div>
    );
  }
}

const renderIcon = function(item) {
  let iconName = item.get("octicon");
  if (iconName) {
    return <Octicon name={iconName} />;
  }
  return "";
};

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.getInPath(`ui.sidebar.items`)
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
)(SideBar);
