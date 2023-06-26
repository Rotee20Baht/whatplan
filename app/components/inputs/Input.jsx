'use client';

export default function Input({
  id,
  label,
  type = "text", 
  disabled, 
  register,
  required,
  errors,
  autoComplete
}) {
  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        autoComplete={autoComplete}
        className={`
          peer
          w-full
          py-2
          pt-6
          px-4
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors[id] ? 'border-emerald-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-emerald-500' : 'focus:border-black'}
        `}
      />
      <label
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          left-4
          top-4 
          z-10 
          origin-[0] 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-emerald-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
   );
};