'use client'

import { useCallback } from "react"

export default function NavMenu({ 
  title, 
  onClick, 
  param, 
  selected 
}) {
  const handleOnClick = useCallback((menu) => {
    onClick(menu);
  }, [param]);

  return (
    <div
      onClick={() => handleOnClick(param)}
      className={`
        py-4 border-b-2 cursor-pointer border-transparent hover:border-emerald-500 transition
        ${selected === param ? 'text-black' : 'text-neutral-400'}              
      `}
    >
      {title}
    </div>
  )
}