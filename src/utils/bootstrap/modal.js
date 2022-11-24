import React from "react";
import modal from "traec-react/utils/bootstrap/modal";

export function BSModalHeader({ title, id, hideClose }) {
  let _id = `${id}Label`;
  let _title = title ? (
    <h5 className="modal-title" id={_id}>
      {title}
    </h5>
  ) : null;
  return (
    <div className="modal-header">
      {_title}
      {hideClose ? null : (
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
}

export function BSModalFooter({ footer }) {
  if (!footer) {
    return null;
  }
  return (
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-dismiss="modal">
        Close
      </button>
      {footer}
    </div>
  );
}

export function BSModelCloseButton({ className }) {
  return (
    <button type="button" className={className} data-dismiss="modal">
      Close
    </button>
  );
}

export function BSModalButton({ id, text, className }) {
  return (
    <button type="button" className={className} data-toggle="modal" data-target={`#${id}`}>
      {text}
    </button>
  );
}

export function BSModal(props) {
  let { id, body, fullWidth, hideClose, fullScreen } = props;

  let modalClassNames = "";
  fullWidth ? (modalClassNames += "modal-dialog modal-dialog-centered pl-4 pr-2") : null;
  fullScreen ? (modalClassNames += "modal-dialog modal-dialog-centered mt-0 mb-0 ") : null;
  if (!fullScreen && !fullWidth) {
    classNames += "modal-dialog modal-lg modal-dialog-centered";
  }
  let classNames = modalClassNames;

  let modalStyle = {};
  fullWidth || fullScreen ? (modalStyle = { maxWidth: "none", width: "100%" }) : null;

  return (
    <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={`${id}Label`} aria-hidden="true">
      <div className={classNames} role="document" style={modalStyle}>
        <div className="modal-content modal-content-scrollable" style={fullScreen ? { height: "100vh" } : null}>
          {fullScreen ? null : <BSModalHeader {...props} />}

          <div className={fullScreen ? "modal-body p-0 bg-white" : "modal-body"}>{body}</div>

          <BSModalFooter {...props} />
        </div>
      </div>
    </div>
  );
}

export function WizardModal(props) {
  let { id, heading, subheading, body, hideClose } = props;

  return (
    <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={`${id}Label`} aria-hidden="true">
      <div
        className="modal-dialog modal-dialog-centered mt-0 mb-0 "
        role="document"
        style={{ maxWidth: "none", width: "100%" }}
      >
        <div className="jumbotron jumbotron-fluid text-white " style={{ backgroundColor: "#337ab7" }}>
          <div className="container">
            <h3 className="display-4 pb-2">{heading}</h3>
            <p className="lead pt-3">{subheading}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BSModal;
