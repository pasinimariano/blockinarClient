import Swal from "sweetalert2";

const SwalError = (message) => {
  return Swal.fire({
    text: message,
    icon: "error",
    confirmButtonColor: "#606060",
    allowOutsideClick: false,
  });
};

export default SwalError;
