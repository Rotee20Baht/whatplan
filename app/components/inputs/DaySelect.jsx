'use client';

import { useCallback } from "react";

export default function DaySelect({ label, id, refWatch, field, register = () => {}, onChange = () => {} }) {
  const handleChange = useCallback((e) => {
    onChange(e)
  }, [onChange])

  return (
    <div className="flex-1">
      <label
        htmlFor={id}
        className="h-10 border border-neutral-300 rounded-2xl relative flex flex-col items-center cursor-pointer">
        <div className="absolute -top-3  px-2 bg-white">{label}</div>
        <div className="p-1.5 w-full h-full z-10">
          <div className={`${refWatch ? 'bg-emerald-500' : 'bg-neutral-200'}  w-full h-full rounded-lg`}></div>
        </div>
      </label>
      <input 
        type="checkbox" 
        id={id} 
        className="hidden" 
        {...register(field)} 
        onChange={(e) => handleChange(e)}
      />
    </div>
  )
}