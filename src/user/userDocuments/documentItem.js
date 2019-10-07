import React from "react";

export const UserDocumentItem = function(props) {
  return (
    <div className="row" key={props.index} style={{ backgroundColor: (props.index + 1) % 2 ? "#ddd" : "" }}>
      <div className="col-sm-7">{props.document.title}</div>
      <div className="col-sm-4">{props.document.status}</div>
    </div>
  );
};
