"use client";

import Container from "@/app/components/Container";
import Selectbar from "@/app/components/select/Selectbar";
import Card from "@/app/components/Card";
import { useState, useMemo, useCallback, useRef } from "react";
import { placttype } from "@/app/providers/SelectDataProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import Image from "next/image";
import { BsChevronCompactLeft,BsChevronCompactRight } from "react-icons/bs";

import "swiper/css";
import "swiper/css/free-mode";
import { toast } from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useLoadScript } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { GoogleMap, Marker } from "@react-google-maps/api";

export default function Places() {

    const libraries = ["places"];

    const imgTest = [
        {
            img: "https://youimg1.tripcdn.com/target/0ww5o12000acgzwvi54CC_C_880_350_R5.jpg",
        },
        {
            img: "https://youimg1.tripcdn.com/target/10090s000000hlt6kB60F_C_880_350_R5.jpg?proc=source%2ftrip",
        },
    ]
     
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
       
      const [currentIndex,setcurrentIndex] = useState(0);

      const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? imgTest.length - 1 : currentIndex - 1;
        setcurrentIndex(newIndex);
        console.log(currentIndex);
      };
      const nextSlide = () => {
        const isLastSlide = currentIndex === imgTest.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setcurrentIndex(newIndex);
        console.log(currentIndex);
      };

      const [marker, setMarker] = useState();

    //   const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    //     libraries,
    //   });
    //   // 13.7563309 100.5017651
    //   const mapRef = useRef();
    //   const center = useMemo(() => ({ lat: 13.7563309, lng: 100.5017651 }), []);
    //   const options = useMemo(
    //     () => ({
    //       disableDefaultUI: true,
    //       clickableIcons: false,
    //     }),
    //     []
    //   );
    
    //   const onLoad = useCallback((map) => (mapRef.current = map), []);

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
              
              gap-4"
            >
            <div className=" w-full p-3">
                <h1 className="font-semibold text-xl">{places[0].title}</h1>
                <div className="flex flex-row  w-full p-3 space-x-4">
                    <div className="flex flex-col w-1/2  space-y-4">
                        <div className="relative w-full h-auto">
                          <Image src={imgTest[currentIndex].img} alt={`place_image_${imgTest[currentIndex].img}`} width={0} height={0} sizes="100vw" className="h-[280px] w-full bg-neutral-500  rounded-lg object-cover"/>
                          <div className="absolute top-1/2 -translate-x-[-5px] -translate-y-1/2 bg-black/30 text-white text-2xl rounded-full">
                              <BsChevronCompactLeft onClick={prevSlide} size={30}/>
                          </div>
                          <div className="absolute top-1/2 right-0 translate-x-[-5px] -translate-y-1/2 bg-black/30 text-white text-2xl rounded-full">
                              <BsChevronCompactRight onClick={nextSlide} size={30}/>
                          </div>
                        </div>
                        
                        <div className="h-[250px] w-full bg-neutral-500 flex justify-center items-center rounded-lg overflow-hidden">
                            {/* {isLoaded ? (
                            <GoogleMap
                                zoom={12}
                                center={center}
                                mapContainerClassName="w-full h-full rounded-lg"
                                options={options}
                                onLoad={onLoad}
                                onClick={(e) => handleMapClick(e)}
                            >
                                {marker && (
                                <div className="bg-red-500 text-white shadow-md py-1.5 px-3 rounded-full z-40 absolute left-1/2 top-3 -translate-x-1/2">
                                    ไปยังตำแหน่งที่ปักหมุด
                                </div>
                                )}
                                {marker && <Marker position={marker} />}
                            </GoogleMap>
                            ) : (
                            <SkeletonTheme baseColor="#f5f5f5" highlightColor="#a3a3a3">
                                <Skeleton className="w-full h-full absolute top-0 left-0" />
                            </SkeletonTheme>
                            )}   */}
                        </div>
                        
                    </div>
                    <div className="w-full  h-full ">
                        <h1 className="font-semibold text-xl">คำอธิบายสถานที่</h1>
                        <div className="w-full h-full border bg-neutral-300 "></div>   
                        <div className="w-full h-full border  my-4 p-3 rounded-lg space-y-2">
                        <h1>จังหวัด : {places[0].provice}</h1>
                        <h1>ที่อยู่ : </h1>
                        <div className="flex flex-row">
                        <h1>เวลา เปิด-ปิด : </h1>
                        <div className="ml-1 space-y-2">
                          <h1>วันทร์ 9.00 AM - 18.00 PM.</h1>
                          <h1>อังคาร 9.00 AM - 18.00 PM.</h1>
                          <h1>พุธ 9.00 AM - 18.00 PM.</h1>
                          <h1>พฤหัสบดี 9.00 AM - 18.00 PM.</h1>
                          <h1>ศุกร์ 9.00 AM - 18.00 PM.</h1>
                          <h1>เสาร์ 9.00 AM - 18.00 PM.</h1>
                          <h1>อาทิตย์ 9.00 AM - 18.00 PM.</h1>
                        </div>
                        </div>
                        <h1>เรตติ้ง : {places[0].rating}</h1>
                        </div>
                    </div>        
                </div>
            </div>
            <div className=" w-full p-3">
                <h1 className="font-semibold text-xl">สถานที่ใกล้เคียง "{places[0].title}"</h1>
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
          <div className=" w-full p-3 mt-5">
                <h1 className="font-semibold text-xl">สถานที่ที่คล้ายกับ "{places[0].title}"</h1>
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
        </div>  
      </Container>
    </div>
  )
}