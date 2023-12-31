'use client'

import { useCallback } from "react";

export default function Button({
  label, 
  onClick = () => {},
  disabled, 
  outline,
  small,
  icon: Icon,
}) {
  const handleClick = useCallback(() => onClick(), [onClick])

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        h-full
        ${outline ? 'bg-white' : 'bg-emerald-500'}
        ${outline ? 'border-black' : 'border-emerald-500'}
        ${outline ? 'hover:border-black/70' : ''}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-2.5'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className={`
            absolute
            left-4
            top-2.5
          `}
        />
      )}
      {label}
    </button>
  );
}