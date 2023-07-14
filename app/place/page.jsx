import Container from "../components/Container";
import Selectbar from "../components/select/Selectbar";
import Card from "../components/Card";
import Link from "next/link";

import { placttype } from "@/app/providers/SelectDataProvider";


export default function Places() {

  const places = [
    {
      title: "วัดพระมหาธาตุวรมหาวิหาร",
      provice: "นครศรีธรรมราช",
      img: "https://youimg1.tripcdn.com/target/0ww5o12000acgzwvi54CC_C_880_350_R5.jpg",
      rating: "5"
    },
    {
      title: "หาดขนอม",
      provice: "นครศรีธรรมราช",
      img: "https://youimg1.tripcdn.com/target/10090s000000hlt6kB60F_C_880_350_R5.jpg?proc=source%2ftrip",
      rating: "4.9"
    },
    {
      title: "หอนาฬิกาตรัง",
      provice: "ตรัง",
      img: "https://youimg1.tripcdn.com/target/0ww6z120008zanvdt0EA9_C_760_506_R5.jpg?proc=source/trip",
      rating: "5"
    },
    {
      title: "ชินตาการ์เด้น",
      provice: "ตรัง",
      img: "https://youimg1.tripcdn.com/target/0ww5e120006oej226D8DB_C_760_506_R5.jpg?proc=source/trip",
      rating: "4.9"
    },
  ]

  return (
    <div className="pt-20 pb-4">
      <Container>
        <div className="w-full h-auto flex flex-col gap-4">
          <h1 className="font-semibold text-xl">ค้นหาสถานที่ทั้งหมด</h1>
          <Selectbar title1="จังหวัด" title2="ประเภทสถานที่" title3="วันเปิดทำการ" options2={placttype}/>
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
              {places.map((item) => (
                
                <Card
                  key={item.title}
                  title={item.title}
                  province={item.provice}
                  img={item.img}
                  rating={item.rating}
                />
                
              ))}
          </div>
        </div>  
      </Container>
    </div>
  )
}