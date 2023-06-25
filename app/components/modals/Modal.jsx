'use client';

import { useCallback, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import Button from "../Button";
import Input from "../inputs/Input";
import { IoMdClose } from "react-icons/io"

export default function Modal({ 
  isOpen
}) {
  const [showModal, setShowModal] = useState(isOpen);

  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {  
    setShowModal(false);
    setTimeout(() => {
    }, 300)
  }, []);

  if (!isOpen) {
    return null;
  }
  
  return (
    <div
      className="
        fixed 
        inset-0 
        z-50 
        h-full 
        w-full 
        flex
        items-center
        bg-neutral-800/70 
        overflow-y-auto 
        overflow-x-hidden 
        outline-none 
        focus:outline-none
      "
    >
      <div className="relative h-full sm:h-auto w-full sm:w-3/4 md:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto">
        {/* Modal Content */}
        <div 
          className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="bg-white h-full sm:h-auto w-full rounded-lg shadow-lg flex flex-col">
            {/* Modal Header */}
            <div class="flex items-center justify-between p-4">
              <h3 class="text-xl font-semibold text-black">
                Modal Title
              </h3>
              <button
                onClick={handleClose}
                className="
                  text-neutral-400 
                  bg-transparent 
                  hover:bg-gray-600 
                  hover:text-white 
                  rounded-lg 
                  text-sm 
                  p-1.5
                  transition
                "
              >
                <IoMdClose size={24} />
              </button>
            </div>
            <hr />
            {/* Modal Body */}
            <div className="p-6 flex-auto relative">
              <h1>Body</h1>
            </div>
            {/* Modal Footer */}
            <div className="flex flex-col gap-2 p-6 border-t border-gray-200">
              <h1>Footer</h1>
              <Button label="ยืนยัน" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}