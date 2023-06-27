'use client';

import { useState } from "react";
import { signOut } from "next-auth/react";

import Avatar from "../Avatar";
import { FaMapMarkedAlt } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import MenuItem from "./MenuItem";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function UserMenu({ links, currentUser }) {
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
          <Avatar src={currentUser?.image}/>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-12 right-0 z-10 w-56">
          <div className="w-full flex flex-col bg-white border rounded-2xl shadow-md overflow-hidden">
            {currentUser ? (
              <>
                <MenuItem
                  label="ออกจากระบบ"
                  onClick={() => {
                    signOut()
                    .then(() => toast.success("ออกจากระบบ"))
                    .catch(() => toast.error("ล้มเหลว"))
                  }}
                />
                <Link
                  className="py-3 px-4 hover:bg-neutral-100 cursor-pointer border-b"
                  href={'/planned'} 
                >
                  แผนการเดินทางของฉัน
                </Link>
              </>
            ) : (
              <>
                <MenuItem
                  label="เข้าสู่ระบบ"
                  onClick={loginModal.onOpen}
                />
                <MenuItem
                  label="สมัครสมาชิก"
                  onClick={registerModal.onOpen}
                />
              </>
            )}
            {
              links.map((link, index) => (
                <Link
                  key={index}
                  className="py-3 px-4 hover:bg-neutral-100 cursor-pointer border-b block md:hidden"
                  href={link.href} 
                >
                  {link.title}
                </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
