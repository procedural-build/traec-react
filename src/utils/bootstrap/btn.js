import React from "react";
import ReactDOM from "react-dom";

export class BSBtn extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    let { extra_className } = this.props;
    let floatStr = this.props.noFloatRight ? "" : "float-right";
    return (
      <button
        onClick={this.handleClick}
        className={`btn btn-sm btn-primary ${floatStr} ${extra_className}`}
        disabled={this.props.disabled ? true : false}
      >
        {this.props.text}
      </button>
    );
  }
}
