'use client';

import { useState } from "react";

import Avatar from "../Avatar";
import { FaMapMarkedAlt } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import MenuItem from "./MenuItem";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <div className="relative flex flex-row items-center gap-1 sm:gap-4">
      <div
        className="sm:hidden py-2 px-5 bg-emerald-500 hover:bg-emerald-400 transition text-white rounded-full 
              cursor-pointer"
      >
        <FaMapMarkedAlt size={24} />
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
        <HiOutlineMenu size={24} className="text-neutral-500" />
        <div className="rounded-full overflow-hidden">
          <Avatar />
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-12 right-0 z-10 w-40">
          <div className="w-full flex flex-col bg-white border rounded-2xl shadow-md overflow-hidden">
            <MenuItem
              label="เข้าสู่ระบบ"
              onClick={() => loginModal.onOpen}
            />
            <MenuItem
              label="สมัครสมาชิก"
              onClick={() => registerModal.onOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}
