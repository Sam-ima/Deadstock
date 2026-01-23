// utils/toastConfig.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

// Initialize in your App.js
toast.configure(toastConfig);