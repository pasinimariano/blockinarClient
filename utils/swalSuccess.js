import Swal from "sweetalert2";

const SwalSuccess = (message) => {
  return Swal.fire({
    text: message,
    icon: "success",
    confirmButtonColor: "#00ff99ff",
    allowOutsideClick: false,
  });
};

export default SwalSuccess;
