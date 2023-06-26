'use client';

import { ToastContainer } from 'react-toastify';
import './ReactToastify.css';

const ToasterProvider = () => {
  return ( 
    <ToastContainer 
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
   );
}
 
export default ToasterProvider;