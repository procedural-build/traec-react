import React from "react";
import { Link } from "react-router-dom";
import Octicon from "react-octicon";

export class BSBtnDropdown extends React.Component {
  renderItem(item, i) {
    if (item.name != undefined) {
      if ("onClick" in item) {
        return (
          <a key={i} className="dropdown-item" onClick={e => item.onClick(e, item.id)}>
            {item.name}
          </a>
        );
      } else if ("linkTo" in item) {
        return (
          <Link key={i} to={item.linkTo} className="dropdown-item">
            {item.name}
          </Link>
        );
      } else if ("download" in item) {
        return (
          <a key={i} className="dropdown-item" href={item.href} download={item.download}>
            {item.name}
          </a>
        );
      } else if ("href" in item) {
        return (
          <a key={i} className="dropdown-item" href={item.href}>
            {item.name}
          </a>
        );
      }
    } else {
      return <div key={i} className="dropdown-divider" />;
    }
  }

  renderLinks() {
    const links = this.props.links;
    if (!links || !links.length) {
      return null;
    }
    return links.map((item, i) => this.renderItem(item, i));
  }

  menuHeader() {
    return this.props.header || <Octicon name="gear" />;
  }

  floatStyle() {
    if (this.props.floatStyle == null) {
      return "float-right";
    } else {
      return this.props.floatStyle;
    }
  }

  getClass(links) {
    if (!this.hasItems(links)) {
      return "";
    }
    return "dropdown-toggle";
  }

  hasItems(links) {
    return links.length == 0 || links.size == 0 ? false : true;
  }

  render_items(links) {
    if (!this.hasItems(links)) {
      return "";
    }
    return (
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="btnDropdown">
        {links}
      </div>
    );
  }

  data_toggle(links) {
    return this.hasItems(links) ? "dropdown" : "";
  }

  render() {
    const links = this.renderLinks();
    if (!links) {
      return this.props.alwaysShowHeader ? this.menuHeader() : null;
    }

    return (
      <div className={`btn-group ${this.floatStyle()}`} role="group" aria-label="proj-admin-menu">
        <a
          className={this.getClass(links)}
          id="btnDropdown"
          role="button"
          data-toggle={this.data_toggle(links)}
          aria-haspopup="true"
          aria-expanded="false"
        >
          {this.menuHeader()}
        </a>
        {this.render_items(links)}
      </div>
    );
  }
}
