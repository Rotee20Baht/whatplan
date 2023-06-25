'use client';
import Image  from "next/image";

export default function Avatar({ src }) {
  return ( 
    <Image 
      className="rounded-full" 
      height="28" 
      width="28" 
      alt="Avatar" 
      src={src || '/images/placeholder.jpg'}
    />
   );
}
