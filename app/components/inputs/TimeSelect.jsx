"use client";

export default function TimeSelect({ label, open, close, register = () => {} , errors }) {
  return (
    <div className="relative mt-6 border border-neutral-300 rounded-md flex flex-row items-center p-3 gap-3">
      <label className="absolute bg-white -top-3 left-3 px-[3px]">
        {label}
      </label>
      <input
        id={open}
        type="time"
        className={`
          border
          w-full 
          rounded-md
          pt-3 
          pb-2 
          px-4 
          shadow-sm 
          outline-none 
          ${errors[open] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[open] ? 'focus:border-rose-500' : 'focus:border-emerald-500'}
        `}
        {...register(open, { required: true })}
      />
      <input
        id={close}
        type="time"
        min="07:00:00"
        className={`
          border
          w-full 
          rounded-md
          pt-3 
          pb-2 
          px-4 
          shadow-sm 
          outline-none 
          ${errors[close] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[close] ? 'focus:border-rose-500' : 'focus:border-emerald-500'}
        `}
          {...register(close, { required: true })}
      />
      </div>
  )
}