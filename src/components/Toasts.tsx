import { ToastContainer, ToastOptions, toast } from "react-toastify";
import { useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

// export function Toasts() {
//   useEffect(() => {
//     const handleToast = (event: any) => {
//       const { type, message } = event.detail;
      
//       const toastConfig: ToastOptions = {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       };

//       switch (type) {
//         case "success":
//           toast.success(message, toastConfig);
//           break;
//         case "error":
//           toast.error(message, toastConfig);
//           break;
//         case "info":
//           toast.info(message, toastConfig);
//           break;
//         case "warning":
//           toast.warn(message, toastConfig);
//           break;
//         default:
//           toast(message, toastConfig);
//       }
//     };

//     window.addEventListener("toast", handleToast);

//     return () => {
//       window.removeEventListener("toast", handleToast);
//     };
//   }, []);

//   return (
    
//   );
// }

export function showToast(type: "success" | "error" | "info" | "warning", message: string) {
  const event = new CustomEvent("toast", {
    detail: { type, message },
  });
  
  window.dispatchEvent(event);
}