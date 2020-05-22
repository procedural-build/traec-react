import React from "react";
import TaskDocumentStatusContainerConnected from "AppSrc/tasks/taskStatus/taskDocumentStatusContainer";

export const TaskStatusContainer = function({ selectionLevel, selected, trackerId }) {
  if (selectionLevel === "2" && selected) {
    return <TaskDocumentStatusContainerConnected trackerId={trackerId} />;
  } else {
    return null;
  }
};
