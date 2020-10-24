import React from "react";

export function BSModalHeader({ title, id }) {
  let _id = `${id}Label`;
  let _title = title ? (
    <h5 className="modal-title" id={_id}>
      {title}
    </h5>
  ) : null;
  return (
    <div className="modal-header">
      {_title}
      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
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
  let { id, body } = props;
  return (
    <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={`${id}Label`} aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
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