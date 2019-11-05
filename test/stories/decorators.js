import React from "react";

export const Card = (storyFn, title) => {
  return (
    <div className="col-sm-3">
      <div className={"pt-3 pb-3 mt-3 mb-3 col-sm-12 popcard"}>
        <h5>{title}</h5>
        {storyFn()}
      </div>
    </div>
  );
};

export const Column = (storyFn, title, cardType) => {
  return (
    <div className="container-fluid">
      <div className="col-sm-3">
        <h4>{title}</h4>
        {storyFn()}
      </div>
      <div>{cardType}</div>
    </div>
  );
};

export const DocumentCard = storyFn => Card(storyFn, "I'm a Document");
