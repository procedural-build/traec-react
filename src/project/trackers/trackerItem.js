import React from "react";
import { Link } from "react-router-dom";

import { BSBtnDropdown } from "traec-react/utils/bootstrap";

export class TrackerItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
  }

  dropDownLinks() {
    return [{ name: "Edit", onClick: this.onClick }];
  }

  render() {
    const i = this.props.index;
    const item = this.props.tracker;

    return (
      <div className="row" key={i} style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
        <div className="col-sm-12">
          <Link to={`/tracker/${item.get("uid")}`}>{item.get("name")}</Link>
        </div>
        <div className="col-sm-4">
          <BSBtnDropdown />
        </div>
      </div>
    );
  }
}
