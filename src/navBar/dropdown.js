import React from "react";
import { Link } from "react-router-dom";
import Octicon from "react-octicon";

class DropDownItem extends React.Component {
  renderIcon(item) {
    let iconName = item.get("octicon");
    if (!iconName) {
      return null;
    }
    return <Octicon name={iconName} />;
  }

  renderItem(item, keyIndex) {
    let labelText = item.get("label");
    if (!labelText) {
      return <hr key={keyIndex} />;
    }
    const label = (
      <span>
        {this.renderIcon(item)} {labelText}
      </span>
    );
    const to = item.get("to");
    const onClick = item.get("onClick");
    if (!(label == undefined)) {
      if (onClick) {
        return (
          <a key={keyIndex} onClick={onClick} className="dropdown-item">
            {label}
          </a>
        );
      } else {
        return (
          <Link key={keyIndex} to={to} className="dropdown-item">
            {label}
          </Link>
        );
      }
    } else {
      return <div key={keyIndex} className="dropdown-divider" />;
    }
  }

  renderItems() {
    let { items } = this.props;
    if (!items) {
      return null;
    }
    return items.map((item, i) => this.renderItem(item, i));
  }

  render() {
    let { label, extraDropdownClass } = this.props;
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {label}
        </a>
        <div className={`dropdown-menu dropdown-menu-right ${extraDropdownClass}`} aria-labelledby="navbarDropdown">
          {this.renderItems()}
        </div>
      </li>
    );
  }
}

export { DropDownItem };
