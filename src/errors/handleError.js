import React from "react";
export const RenderErrorMessage = function(props) {
  return (
    <div>
      <h3>Something went wrong</h3>
      <h3>{`Please report the following error: ${props.error}`}</h3>
    </div>
  );
};
