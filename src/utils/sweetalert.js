import Swal from "sweetalert2";

export const confirmDelete = ({
  text = "This will delete the object and all associated data.  Are you sure you would like to proceed?",
  title = "Confirm deletion",
  onConfirm = () => {
    return null;
  },
  onCancel = () => {
    return null;
  }
}) => {
  Swal.fire({
    title: title,
    text: text,
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete"
  }).then(result => {
    if (result.value) {
      onConfirm();
    } else {
      onCancel();
    }
  });
};

export const confirmDeleteSync = ({
  text = "This will delete the object and all associated data.  Are you sure you would like to proceed?",
  title = "Confirm deletion",
  errtext = "There was an error deleting this object.  Please contact support if the problem persists",
  fetch = null,
  handleResponse = response => {
    return response.status == 204;
  }
}) => {
  Swal.queue([
    {
      title,
      text,
      type: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return fetch
          .rawFetch()
          .then(response => handleResponse(response))
          .then(success => {
            // This will dispatch an action "ENTITY_SET_FUNC" which will run the
            // stateSetFunc in fetch.stateParams.  This should set the state on success
            fetch.dispatchActionType();
            // Pop up the new dialogue confirming success
            Swal.insertQueueStep({
              showConfirmButton: false,
              showCancelButton: false,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "OK",
              type: "success",
              title: "Object deleted",
              text: ""
            });
          })
          .catch(err => {
            console.log("ERROR", err);
            Swal.insertQueueStep({
              type: "error",
              title: "Error",
              text: errtext
            });
          });
      }
    }
  ]);
};

export const confirmProceed = ({
  text = "Are you sure you would like to proceed?",
  title = "Proceed?",
  onConfirm = () => {
    return null;
  },
  onCancel = () => {
    return null;
  }
}) => {
  Swal.fire({
    title: title,
    text: text,
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Proceed"
  }).then(result => {
    if (result.value) {
      onConfirm();
    } else {
      onCancel();
    }
  });
};

export const alertSuccess = ({
  text = "Data submitted",
  title = "Success",
  onConfirm = () => {
    return null;
  },
  onCancel = () => {
    return null;
  },
  iconType = "success"
}) => {
  Swal.fire({
    title: title,
    text: text,
    type: iconType,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "OK"
  }).then(result => {
    if (result.value) {
      onConfirm();
    } else {
      onCancel();
    }
  });
};
