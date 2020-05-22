import React, { Component } from "react";

export class DocumentStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { docStatus } = this.props;
    let divStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
    let name = "Nothing Received";
    if (!docStatus) {
      divStyle["backgroundColor"] = "rgb(255,150,150)";
    } else {
      divStyle["backgroundColor"] = docStatus.getInPath("status.color");
      name = docStatus.getInPath("status.name");
    }

    return (
      <div className="col-md-2 text-center" style={divStyle}>
        <h6>{name}</h6>
      </div>
    );
  }
}
