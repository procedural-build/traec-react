import React from "react";

export const BSCard = props => {
  let { widthOffset, id, extraBodyClass = "", title, extraBodyStyle, form, body, button, footer } = props;

  return (
    <div className={widthOffset} id={id ? id : ""}>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title float-left">{title}</h5>
          {button}
        </div>

        <div className={`card-body ${extraBodyClass}`} style={extraBodyStyle}>
          {form}
          {body}
        </div>
        {footer ? <div className="card-footer">{footer}</div> : null}
      </div>
    </div>
  );
};

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

          <div className={`card-body ${this.props.extraBodyClass}`}>
            {this.form()}
            <div className="row">{this.props.body}</div>
          </div>
        </div>
      </div>
    );
  }
}
