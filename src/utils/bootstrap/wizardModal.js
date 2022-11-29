import React from "react";

export default function WizardModal(props) {
  let { id, heading, subheading, body, hideClose } = props;

  return (
    <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={`${id}Label`} aria-hidden="true">
      <div
        className="modal-dialog modal-dialog-centered mt-0 mb-0 "
        role="document"
        style={{ maxWidth: "none", width: "100%" }}
      >
        <div className="modal-content modal-content-scrollable" style={{ height: "100vh" }}>
          <div className={"modal-body p-0 bg-white container"}>{body}</div>
        </div>
      </div>
    </div>
  );
}
