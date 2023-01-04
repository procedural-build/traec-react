import React from "react";
import { ErrorBoundary } from "traec-react/errors/handleError";

export default function WizardModal(props) {
  let { id, heading, body, hideClose } = props;

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
      style={{ background: "white" }}
    >
      <div
        className="modal-dialog modal-dialog-centered mt-0 mb-0"
        role="document"
        style={{ maxWidth: "none", width: "100%" }}
      >
        <div className="modal-content modal-content-scrollable border-0 d-flex" style={{ height: "100vh" }}>
          <div className="modal-header border-0">
            <div className="modal-title">{heading} </div>
            {!hideClose ? (
              <button type="button" className="close " data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" className="">
                  &times;
                </span>
              </button>
            ) : null}
          </div>
          <ErrorBoundary>
            <div className={"modal-body p-0 bg-white container"}>{body}</div>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
