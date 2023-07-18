"use client";


import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";
import { provinces } from "@/app/providers/SelectDataProvider";
import { placttype } from "@/app/providers/SelectDataProvider";

import Container from "../components/Container";
import Selectbar from "../components/select/Selectbar";
import Card from "../components/Card";
import Link from "next/link";
import SelectItem from "../components/select/SelectItem";
import Button from "../components/Button";


export default function Places() {
  const [dataState, setDataState] = useState('กำลังโหลดข้อมูลสถานที่');
  const [places, setPlaces] = useState([]);
  const [province, setProvince] = useState();
  const [types, setTypes] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/place`)
    .then((data) => {
      console.log(data.data)
      setPlaces(data.data);
    })
    .catch((err) => {
      setDataState('ไม่พบข้อมูลสถานที่')
    })
  }, []);

  const onProvinceChange = (value) => {
    setProvince(value)
  }

  const onTypesChange = (value) => {
    setTypes(value)
  }

  const onSubmit = () => {
    let searhUrl = `http://localhost:3000/api/place?`

    console.log({province, types})

    if(province)
      searhUrl+= `&province=${province}` 
    if(types)
      searhUrl+= `&types=${types}` 

    console.log(searhUrl)

    axios.get(searhUrl)
    .then((data) => {
      console.log(data.data)
      setPlaces(data.data);
    })
    .catch((err) => {
      setPlaces([]);
      setDataState('ไม่พบข้อมูลสถานที่')
    })
  }

  return (
    <div className="pt-20 pb-4">
      <Container>
        <div className="w-full h-auto flex flex-col gap-4">
          <h1 className="font-semibold text-xl">ค้นหาสถานที่ทั้งหมด</h1>
          <div className="w-full border shadow-sm rounded-xl p-4 bg-white">
            <div className="w-full flex flex-col lg:flex-row gap-4">
              <div className="w-full flex flex-col flex-1">
                <SelectItem label="จังหวัด" options={provinces} onChange={(value) => onProvinceChange(value?.value)} />
              </div>
              <div className="w-full flex flex-col flex-1">
                <SelectItem label="ประเภทสถานที่" options={placttype} onChange={(value) => onTypesChange(value?.value)}/>
              </div>
              <div className="w-full flex flex-col flex-1">
                <SelectItem label="วันเวลาเปิด-ปิด" />
              </div>
              <div className="w-full flex flex-col flex-1">
                <Button label="ค้นหา" onClick={onSubmit} />
              </div>
            </div>
          </div>
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
              gap-4
              relative
            "
            >
              {places.length <= 0 && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-1">{dataState}</div>
              )}
              {places && places.map((item) => (
                <Link href={`/place/${item._id}`}>
                  <Card
                    key={item.name}
                    title={item.name}
                    province={item.province}
                    img={item.images[0]}
                    rating={item.rating}
                  />
                </Link>
              ))}
          </div>
        </div>  
      </Container>
    </div>
  )
}