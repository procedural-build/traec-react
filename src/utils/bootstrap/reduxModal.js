import React from "react";
import { connect } from "react-redux";

import Traec from "traec";
import { BSModal } from "traec-react/utils/bootstrap";
import { ErrorBoundary } from "traec-react/errors";

import store from "traec/redux/store";
import { setUIItems } from "traec/redux/actionCreators";

/* ###################
  Function to set the modal in Redux
*/

export const setAndShowModal = (modalId, body) => {
  store.dispatch(setUIItems(body, { itemPath: `modals.${modalId}` }));
  setTimeout(() => {
    $(`#${modalId}`).modal("show");
  }, 100);
};

/* ###################
  Component that watches Redux and renders modals that are sent there
*/

function ReduxModals({ modals }) {
  if (!modals || !modals.size) {
    return null;
  }

  return modals
    .map((value, key) => {
      let _value = value.toJS();
      // If a prop immutableBodyProps was pass then do a shallow conversion of the body props
      if (value.get("immutableBodyProps")) {
        _value["body"]["props"] = value.getInPath("body.props").toJSON();
      }
      return (
        <ErrorBoundary key={key}>
          <BSModal id={key} {..._value} />
        </ErrorBoundary>
      );
    })
    .toList();
}

const mapStateToProps = state => {
  let modals = state.getInPath(`ui.modals`) || Traec.Im.Map();
  return { modals };
};

export default connect(mapStateToProps)(ReduxModals);
