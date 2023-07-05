'use client';

import { CldUploadWidget } from "next-cloudinary";
import { useCallback, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { toast } from "react-hot-toast";

const uploadPreset = "gh6i6kuu";

export default function ImageUpload({ onChange }) {
  const [images, setImages] = useState([]);
  
  const handleUpload = useCallback((result) => {
    const img = result.info.secure_url;
    setImages([...images, img]);
    onChange([...images, img]);
  }, [images, onChange]);

  const handleUploadWidgetOpen = (open) => {
    if (images.length >= 7) {
      toast.error('จำนวนไฟล์ถึงขีดจำกัดแล้ว')
    } else {
      open?.();
    }
  }

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 7
      }}
    >
      {({ open }) => {
        return (
          <div>
            <div
              onClick={() => handleUploadWidgetOpen(open)}
              className="
                w-full 
                py-3 
                rounded-lg 
                bg-white
                text-dark 
                transition 
                hover:opacity-70 
                flex 
                flex-row 
                gap-2
                items-center 
                justify-center
                border
                border-neutral-300
                cursor-pointer
              "
            >
              <TbPhotoPlus
                size={20}
              />
              <div className="">
                เพิ่มรูปภาพ
              </div>
            </div>
          </div>
        ) 
      }}
    </CldUploadWidget>
  )
}
