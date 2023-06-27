'use client';

import { useCallback } from "react";

export default function MenuItem ({ label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="py-3 px-4 hover:bg-neutral-100 cursor-pointer border-b">
        {label}
    </div>
  )
}