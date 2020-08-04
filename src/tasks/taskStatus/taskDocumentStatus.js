import React from "react";
import Traec from "traec/index";
import Moment from "moment";
import { isOverDue } from "../../documents/documentStatus";

export class TaskDocumentStatusBar extends React.Component {
  renderBar() {
    let { documentStatuses } = this.props;
    if (!documentStatuses) {
      return null;
    }

    let statusFields = documentStatuses.valueSeq().map((status, index) => {
      return <StatusField key={index} status={status} />;
    });
    return statusFields;
  }
  render() {
    return <div className="pt-2">{this.renderBar()}</div>;
  }
}

const StatusField = function({ status }) {
  if (isUploaded(status)) {
    return <div className="btn btn-success disabled" />;
  } else if (isOverDueToUpload(status)) {
    return <div className="btn btn-danger disabled" />;
  } else {
    return <div className="btn btn-secondary disabled" />;
  }
};

const isUploaded = function(status) {
  try {
    if (status.getIn(["status", "name"]).startsWith("OK")) {
      return true;
    }
  } catch (e) {
    return false;
  }
};

const isOverDueToUpload = function(status) {
  try {
    let dueDate = Moment(status.get("due_date"));

    if (isOverDue(dueDate)) {
      return true;
    }
  } catch (e) {
    return false;
  }
};
