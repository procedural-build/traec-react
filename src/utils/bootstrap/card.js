import React from "react";

export class BSCard extends React.Component {
  form() {
    return this.props.form ? this.props.form : "";
  }

  render() {
    return (
      <div className={this.props.widthOffset} id={this.props.id ? this.props.id : ""}>
        <div className="card">
          <div className="card-header">
            <h5 className="card-title float-left">{this.props.title}</h5>
            {this.props.button}
          </div>

          <div className="card-body">
            {this.form()}
            {this.props.body}
          </div>
        </div>
      </div>
    );
  }
}

export class BSCardGrid extends React.Component {
  form() {
    return this.props.form ? this.props.form : "";
  }

  render() {
    return (
      <div className={this.props.widthOffset}>
        <div className="card">
          <div className="card-header">
            <h5 className="card-title float-left">{this.props.title}</h5>
            {this.props.button}
          </div>

          <div className="card-body">
            {this.form()}
            <div className="row">{this.props.body}</div>
          </div>
        </div>
      </div>
    );
  }
}
