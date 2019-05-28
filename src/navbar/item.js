import React from "react";
import { Link } from "react-router-dom";


class MenuItem extends React.Component {
  render() {
    return (
      <li className="nav-item">
        <Link to={this.props.to} className="nav-link">
          {this.props.label}
        </Link>
      </li>
    );
  }
}

export { MenuItem };
