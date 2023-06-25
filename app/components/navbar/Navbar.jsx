'use client'

import { useState } from "react"

import Container from "../Container"
import NavMenu from "./NavMenu";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [selectedMenu, setSelectedMenu] = useState('');

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
          <UserMenu />
        </div>
      </Container>
    </div>
  )
}