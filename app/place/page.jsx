"use client";


import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";
import { provinces } from "@/app/providers/SelectDataProvider";
import { placttype } from "@/app/providers/SelectDataProvider";

import Container from "../components/Container";
import Card from "../components/Card";
import Link from "next/link";
import SelectItem from "../components/select/SelectItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Places() {
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [province, setProvince] = useState();
  const [types, setTypes] = useState();
  const [amphure ,setAmphure] = useState();

  const [amphures ,setAmphures] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/place`)
    .then((data) => {
      console.log(data.data)
      setPlaces(data.data);
    })
    .catch((err) => {
      setDataState('ไม่พบข้อมูลสถานที่')
    })
    .finally(() => setIsLoading(false))
  }, []);

  const onProvinceChange = async (value) => {
    setProvince(value)
    setAmphure("")

    const amphure_data = await axios.get(
      `/api/amphure?province=${value}`
    );

    const data = amphure_data.data[0]?.amphure;
    if(data){
      const formattedData = [
        {
          options: data?.map((item) => {
            return { label: item, value: item };
          }),
        },
      ]
      setAmphures(formattedData);
      return;
    }
    setAmphures([]);
  }

  const onAmphureChange = (value) => {
    setAmphure(value)
  }

  const onTypesChange = (value) => {
    setTypes(value)
  }

  useEffect(() => {
    setIsLoading(true)
    setPlaces([])
    let searhUrl = `http://localhost:3000/api/place?`

    console.log({province, amphure, types})

    if(province)
      searhUrl+= `&province=${province}` 
    if(amphure)
      searhUrl+= `&amphure=${amphure.value}` 
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
    })
    .finally(() => setIsLoading(false))
  }, [province, amphure, types])

  return (
    <div className="pt-20 pb-4">
      <Container>
        <div className="w-full h-auto flex flex-col gap-4">
          <h1 className="font-semibold text-xl">ค้นหาสถานที่ทั้งหมด</h1>
<<<<<<< HEAD
          <Selectbar title1="จังหวัด" title2="ประเภทสถานที่" title3="วันเปิดทำการ" options2={placttype} />
          <div
=======
          <div className="w-full border shadow-sm rounded-xl p-4 bg-white">
            <div className="w-full flex flex-col lg:flex-row gap-4">
              <div className="w-full flex flex-col flex-1">
                <SelectItem label="จังหวัด" options={provinces} onChange={(value) => onProvinceChange(value?.value)} />
              </div>
              <div className="w-full flex flex-col flex-1">
                <SelectItem label="อำเภอ" options={amphures} onChange={(value) => onAmphureChange(value)} value={amphure}/>
              </div>
              <div className="w-full flex flex-col flex-1">
                <SelectItem label="ประเภทสถานที่" options={placttype} onChange={(value) => onTypesChange(value?.value)} />
              </div>
              {/* <div className="w-full flex flex-col flex-1">
                <Button label="ค้นหา" onClick={onSubmit} />
              </div> */}
            </div>
          </div>
          <div 
>>>>>>> c34662820b28bf56cdcccb4ed694def13ab298dc
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
<<<<<<< HEAD
              gap-4"
          >
            {places.map((item) => (
              <Link href={`/place/${item.title}`}>
                <Card
                  key={item.title}
                  title={item.title}
                  province={item.provice}
                  img={item.img}
                  rating={item.rating}
                />
              </Link>


            ))}
=======
              gap-4
              relative
            "
            >
              {isLoading && (
                <SkeletonTheme baseColor="#f5f5f5" highlightColor="#d4d4d4">
                  <Skeleton className="w-full h-96 sm:h-80 rounded-md" />
                  <Skeleton className="w-full h-96 sm:h-80 rounded-md" />
                  <Skeleton className="w-full h-96 sm:h-80 rounded-md" />
                  <Skeleton className="w-full h-96 sm:h-80 rounded-md" />
                </SkeletonTheme>
              )}
              {places.length <= 0 && !isLoading && (
                <div className="text-center col-span-full">ไม่พบข้อมูลสถานที่</div>
              )}
              {places.length > 0 && places.map((item) => (
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
>>>>>>> c34662820b28bf56cdcccb4ed694def13ab298dc
          </div>
        </div>
      </Container>
    </div>
  )
}