'use client';

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return ( 
    <Toaster containerClassName="z-[9999]"/>
   );
}
 
export default ToasterProvider;