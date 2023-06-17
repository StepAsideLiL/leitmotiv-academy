import { toast } from "react-toastify";

const toastSuccess = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 1500,
  });
};

const toastError = (message) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 1500,
  });
};

export { toastSuccess, toastError };
