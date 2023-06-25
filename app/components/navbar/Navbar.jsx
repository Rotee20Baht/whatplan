'use client'

import { useState } from "react"
import Image from "next/image";

import Container from "../Container"
import NavMenu from "./NavMenu";
import { HiOutlineMenu } from "react-icons/hi"
import { FaMapMarkedAlt } from "react-icons/fa"
import Avatar from "../Avatar";

export default function Navbar() {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect =  (menu) => {
    setSelectedMenu(menu);
  }

  return (
    <div className="w-full fixed shadow-sm z-10 bg-white border-b">
      <Container>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2 sm:gap-5 md:gap-6 lg:gap-10 py-4 md:py-0">
            <div className="text-2xl font-semibold text-emerald-500 tracking-tighter cursor-pointer">
              Whatplan
            </div>
            <div className="hidden md:flex flex-row gap-1 md:gap-6 lg:gap-10 items-center justify-between">
              <NavMenu 
                title="แผนการท่องเที่ยว"
                param="plan"
                onClick={handleSelect}
                selected={selectedMenu}
              />
              <NavMenu 
                title="สถานที่ท่องเที่ยว"
                param="place"
                onClick={handleSelect}
                selected={selectedMenu}
              />
            </div>
          </div>
          <div className="relative flex flex-row items-center gap-1 sm:gap-4">
            <div 
              className="sm:hidden py-2 px-5 bg-emerald-500 hover:bg-emerald-400 transition text-white rounded-full 
              cursor-pointer"
              >
              <FaMapMarkedAlt size={24}/>
            </div>
            <div 
              className="py-2 px-4 hidden sm:block bg-emerald-500 hover:bg-emerald-400 transition text-white rounded-full 
              cursor-pointer"
            >
              วางแผนการท่องเที่ยว
            </div>
            <div 
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-row items-center gap-2 py-1.5 px-2 border border-neutral-300 rounded-full cursor-pointer"
            >
              <HiOutlineMenu size={24} className="text-neutral-500"/>
              <div className="rounded-full overflow-hidden">
                <Avatar />
              </div>
            </div>
            {isOpen && (
              <div className="absolute top-12 right-0 z-10 w-40">
                <div className="w-full flex flex-col bg-white border rounded-2xl shadow-md overflow-hidden">
                  <div className="py-3 px-4 hover:bg-neutral-100 cursor-pointer border-b">เข้าสู่ระบบ</div>
                  <div className="py-3 px-4 hover:bg-neutral-100 cursor-pointer border-b">สมัครสมาชิก</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}