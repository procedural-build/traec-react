import React from "react";

export class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-inner">
          <p>News</p>
          <p>About</p>
          <p>Help</p>
        </div>
        <div className="footer-tools">
          <span className="go-top" />
        </div>
      </div>
    );
  }
}
