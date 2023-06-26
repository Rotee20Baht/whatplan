'use client'

import { usePathname } from 'next/navigation';

import Container from "../Container"
import UserMenu from "./UserMenu";
import Link from 'next/link';

const links = [
  {
    title: "แผนการท่องเที่ยว",
    href: "/plan"
  },
  {
    title: "สถานที่ท่องเที่ยว",
    href: "/place"
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="w-full fixed shadow-sm border-b z-10 bg-white">
      <Container>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2 sm:gap-5 md:gap-6 lg:gap-10 py-4 md:py-0">
            <Link href={'/'} className="text-2xl font-semibold text-emerald-500 tracking-tighter cursor-pointer">
              Whatplan
            </Link>
            <div className="hidden md:flex flex-row gap-1 md:gap-6 lg:gap-10 items-center justify-between">
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
            </div>
          </div>
          <UserMenu links={links}/>
        </div>
      </Container>
    </div>
  )
}