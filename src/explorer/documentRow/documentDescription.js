import React from "react";

export const DocumentDescription = props => {
  if (!props.show) {
    return null;
  }
  let description = props.document
    .get("descriptions")
    .first()
    .get("text");
  return <div className="m-3" dangerouslySetInnerHTML={{ __html: description }} />;
};
