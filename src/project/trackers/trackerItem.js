import React from "react";
import { Link } from "react-router-dom";

import { BSBtnDropdown } from "traec-react/utils/bootstrap";

export class TrackerItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onClick = this.onClick.bind(this);
    this.addFromTemplate = this.addFromTemplate.bind(this);
  }

  onClick(e) {
    e.preventDefault();
  }

  addFromTemplate(e) {
    e.preventDefault();
  }

  dropDownLinks() {
    return [
      { name: "Edit", onClick: this.onClick },
      { name: "Add from template", linkTo: `/tracker/${this.props.tracker.get("uid").slice(0, 8)}/template` }
    ];
  }

  render() {
    const i = this.props.index;
    const item = this.props.tracker;

    let trackerId = item.get("uid");
    trackerId = trackerId ? trackerId.substring(0, 8) : trackerId;

    return (
      <div className="row" key={i} style={{ backgroundColor: (i + 1) % 2 ? "#ddd" : "" }}>
        <div className="col-sm-10">
          <Link to={`/tracker/${trackerId}`}>{item.get("name")}</Link>
        </div>
        <div className="col-sm-2">
          <BSBtnDropdown links={this.dropDownLinks()} />
        </div>
      </div>
    );
  }
}
