import React, { Component } from "react";

export class DocumentStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { docStatus } = this.props;
    let style = {};
    let name = "Nothing Recieved";
    if (!docStatus) {
      style["backgroundColor"] = "rgb(255,150,150)";
    } else {
      style["backgroundColor"] = docStatus.getInPath("status.color");
      name = docStatus.getInPath("status.name");
    }
    return (
      <div className="col-md-2 text-center" style={style}>
        <span className="abs-center h6">{name}</span>
      </div>
    );
  }
}
