'use client';

import { IoStar } from "react-icons/io5"
import { BsFillFileEarmarkImageFill } from "react-icons/bs"
import Image from "next/image";

export default function Card({ title = "ชื่อสถานที่", province = "จังหวัด", img, rating = "5"}) {
  return (
    <div className="border h-96 sm:h-80 rounded-md shadow-sm bg-neutral-100 overflow-hidden hover:shadow-lg transition cursor-pointer">
      <div className="w-full h-full flex flex-col">
        <div className="w-full bg-neutral-100 h-3/4 overflow-hidden relative">
          <div className="flex flex-row gap-2 items-center absolute top-3 right-3 z-10 bg-emerald-500 text-white rounded-md px-2 py-1">
            <IoStar />
            <h1 className="text-lg">{rating}</h1>
          </div>
          {img ? (
            <Image
              src={img}
              width={0}
              height={0}
              sizes="100vw"
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition"
            />
          ) : (<BsFillFileEarmarkImageFill 
                size={50} 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-300"
              />)
          }
        </div>
        <div className="w-full bg-white h-auto flex-grow py-3 px-4">
          <h1 className="font-semibold text-xl">{title}</h1>
          <h1 className="text-neutral-500">{province}</h1>
        </div>
      </div>
    </div>
  );
}
