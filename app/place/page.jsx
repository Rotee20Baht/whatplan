'use client';

import Container from "../components/Container";
import Selectbar from "../components/select/Selectbar";
import Card from "../components/Card";

export default function Place() {
  return (
    <div className="pt-20 pb-4">
      <Container>
        <div className="w-full h-auto flex flex-col gap-4">
          <h1 className="font-semibold text-xl">ค้นหาสถานที่ทั้งหมด</h1>
          <Selectbar title1="จังหวัด" title2="ประเภทสถานที่" title3="วันเปิดทำการ" />
          <div 
            className="
              w-full 
              h-auto 
              border 
              rounded-lg 
              shadow-sm 
              p-4 
              grid 
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-4"
            >
              <Card />
              <Card />
              <Card />
              <Card />
          </div>
        </div>  
      </Container>
    </div>
  )
}