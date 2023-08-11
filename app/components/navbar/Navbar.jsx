'use client'

import { usePathname } from 'next/navigation';

import Container from "../Container"
import UserMenu from "./UserMenu";
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const links = [
  {
    title: "แผนการท่องเที่ยว",
    href: "/plan"
  },
  {
    title: "สถานที่ท่องเที่ยว",
    href: "/place"
  },
  {
    title: "วางแผนการท่องเที่ยว",
    href: "/create"
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession()

  return (
    <div className="w-full fixed shadow-sm border-b z-50 bg-white">
      <Container>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2 sm:gap-5 md:gap-6 lg:gap-10 py-4 lg:py-0">
            <Link href={'/'} className="text-2xl font-semibold text-emerald-500 tracking-tighter cursor-pointer">
              whatAplan
            </Link>
            <div className="hidden lg:flex flex-row md:gap-6 lg:gap-10 items-center justify-between">
              {links.map((link, index) => (
                <Link
                  key={index}
                  className={`
                    py-4 border-b-2 cursor-pointer border-transparent hover:border-emerald-500 transition
                    ${pathname === link.href ? 'text-black' : 'text-neutral-400'}              
                  `}
                  href={link.href} 
                >
                  {link.title}
                </Link>
              ))}
              {session?.user?.role === "admin" && (
                <Link
                    className={`
                      py-4 border-b-2 cursor-pointer border-transparent hover:border-emerald-500 transition
                      ${pathname === "/addplace" ? 'text-black' : 'text-neutral-400'}              
                    `}
                    href={"/addplace"} 
                  >
                    เพิ่มสถานที่
                </Link>
              )}
            </div>
          </div>
          <UserMenu links={links} currentUser={session?.user}/>
        </div>
      </Container>
    </div>
  )
}