import React from "react";
import { ErrorBoundary } from "traec-react/errors";

export function RowErrorBoundary(props) {
  let msg = props.msg || (
    <td colSpan="100%">
      <span>Error loading report row</span>
    </td>
  );

  return (
    <ErrorBoundary title={null} ContainerTag="tr" className="alert alert-warning m-0 p-0" msg={msg}>
      {props.children}
    </ErrorBoundary>
  );
}
