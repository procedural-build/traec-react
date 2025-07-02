import React from "react";
import modal from "traec-react/utils/bootstrap/modal";

export function BSModalHeader({ title, id, hideClose, onClose }) {
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
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => {
            if (!onClose) $(`#${id}`).modal("hide");
            else onClose();
          }}
        >
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
  let { id, body, fullWidth, hideClose } = props;
  let classNames = fullWidth
    ? "modal-dialog modal-dialog-centered pl-4 pr-2"
    : "modal-dialog modal-lg modal-dialog-centered";
  let modalStyle = fullWidth ? { maxWidth: "none", width: "100%" } : {};
  return (
    <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={`${id}Label`} aria-hidden="true">
      <div className={classNames} role="document" style={modalStyle}>
        <div className="modal-content">
          <BSModalHeader {...props} />

          <div className="modal-body">{body}</div>

          <BSModalFooter {...props} />
        </div>
      </div>
    </div>
  );
}

export default BSModal;
