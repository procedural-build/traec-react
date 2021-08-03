import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BSBtnDropdown } from "traec-react/utils/bootstrap";
import Traec from "traec";
import { ErrorBoundary } from "../../errors";
import BaseFormConnected from "traec-react/utils/form";

export const TrackerItem = props => {
  let { index, tracker } = props;
  let trackerId = tracker?.get("uid").substring(0, 8);
  let trackerName = tracker?.get("name");
  let fetch = new Traec.Fetch("tracker", "patch", { trackerId });
  const [formParams, setFormParams] = useState(fetch.params);

  const dropDownLinks = () => {
    return [
      { name: "Edit", onClick: () => fetch.toggleForm() },
      { name: "Add from template", linkTo: `/tracker/${trackerId}/template` },
      {},
      {
        name: "Delete",
        onClick: () => {
          console.log("Deleting Tracker");
          new Traec.Fetch("tracker", "delete", { trackerId }).dispatch();
        }
      }
    ];
  };

  return (
    <ErrorBoundary>
      <div className="row" key={index} style={{ backgroundColor: (index + 1) % 2 ? "#ddd" : "" }}>
        <div className="col-sm-10">
          <Link to={`/tracker/${trackerId}`}>{trackerName}</Link>
        </div>
        <div className="col-sm-2">
          <BSBtnDropdown links={dropDownLinks()} />
        </div>
      </div>
      <BaseFormConnected
        params={formParams}
        fields={{ name: { value: "", endRow: true } }}
        initFields={{ name: trackerName }}
      />
    </ErrorBoundary>
  );
};
