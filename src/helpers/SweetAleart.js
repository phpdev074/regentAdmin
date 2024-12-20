import { createRef } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
export const toastRef = createRef();
const MySwal = withReactContent(Swal)

export const SweetAleart = () => {
    MySwal.fire({
       
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
          
      })
     
}