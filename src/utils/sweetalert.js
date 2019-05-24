
import Swal from 'sweetalert2'


export const confirmDelete = ({
        text='This will delete the object and all associated data.  Are you sure you would like to proceed?', 
        title="Confirm deletion",
        onConfirm = (() => {return null}), 
        onCancel = (() => {return null})
    }) => {
    Swal.fire({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
            onConfirm()
        } else {
            onCancel()
        }
      })
}

export const confirmProceed = ({
    text='Are you sure you would like to proceed?', 
    title="Proceed?",
    onConfirm = (() => {return null}), 
    onCancel = (() => {return null})
}) => {
Swal.fire({
    title: title,
    text: text,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Proceed'
  }).then((result) => {
    if (result.value) {
        onConfirm()
    } else {
        onCancel()
    }
  })
}


export const alertSuccess = ({
  text='Data submitted', 
  title="Success",
  onConfirm = (() => {return null}), 
  onCancel = (() => {return null}),
  iconType = 'success'
}) => {
Swal.fire({
  title: title,
  text: text,
  type: iconType,
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'OK'
}).then((result) => {
  if (result.value) {
      onConfirm()
  } else {
      onCancel()
  }
})
}