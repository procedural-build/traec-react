import React from "react";
import { Link } from "react-router-dom";

export const TraecFooter = function() {
  return (
    <div className="footer fixed-bottom">
      <div className="footer-inner row">
        <div className="col-sm-3" />
        <Link to={"/news"} className="col-sm-3">
          News
        </Link>
        <Link to={"/about"} className="col-sm-3">
          About
        </Link>
        <Link to={"/help"} className="col-sm-3">
          Help
        </Link>
      </div>
      <div className="footer-tools">
        <span className="go-top" />
      </div>
    </div>
  );
};
