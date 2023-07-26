"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { provinces } from "@/app/providers/SelectDataProvider";
import { placttype } from "@/app/providers/SelectDataProvider";
import { MdLocationPin } from 'react-icons/md';
import Container from "@/app/components/Container";
import { BsChevronCompactLeft,BsChevronCompactRight } from "react-icons/bs";

import "swiper/css";
import "swiper/css/free-mode";
import "react-loading-skeleton/dist/skeleton.css";
import SelectItem from "@/app/components/select/SelectItem";
import axios from "axios";
import Loader from "@/app/components/Loader/Loader";

export default function Place() {
  const [province, setProvince] = useState();
  const [amphures ,setAmphures] = useState([]);
  const [places, setPlaces] = useState([]);
  const [types, setTypes] = useState();
  const [amphure ,setAmphure] = useState();
  const [currentIndex,setcurrentIndex] = useState(0);
  const [isLoaded,setIsLoaded] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const decodedPathname = decodeURIComponent(pathname).replace('/place/', '');
    console.log(decodedPathname)

    axios.get(`http://localhost:3000/api/place?name=${decodedPathname}`)
    .then((data) => {
      console.log(data.data[0]);
      setPlaces(data.data[0]);
      
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => setIsLoaded(true))
  }, []);

  const onProvinceChange = async (value) => {
    setProvince(value)
    setAmphure("")
    setTypes("")

    const amphure_data = await axios.get(
      `/api/amphure?province=${value}`
    );

    const data = amphure_data.data[0]?.amphure;
    console.log(data);
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
    console.log(value)
    setAmphure(value)
  }

  const onTypesChange = (value) => {
    console.log(value)
    setTypes(value)
  }


  const libraries = ["places"];
     
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? places.images.length - 1 : currentIndex - 1;
    setcurrentIndex(newIndex);
    // console.log(currentIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === places.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setcurrentIndex(newIndex);
    // console.log(currentIndex);
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
          <div className="w-full flex flex-col lg:flex-row gap-4">
              <div className="w-full flex flex-col flex-1">
                <SelectItem label="จังหวัด" options={provinces} onChange={(value) => onProvinceChange(value?.value)} />
              </div>
              <div className="w-full flex flex-col flex-1">
                <SelectItem label="อำเภอ" options={amphures} onChange={(value) => onAmphureChange(value)} value={amphure}/>
              </div>
              <div className="w-full flex flex-col flex-1">
                <SelectItem label="ประเภทสถานที่" options={placttype} onChange={(value) => onTypesChange(value)} value={types}/>
              </div>
            </div>
          {!isLoaded && (
            <div className="grid place-items-center w-full h-auto md:h-[80vh]">
              <Loader />
            </div>
          )}
          {isLoaded && !places.name && (
            <div>ไม่พบข้อมูลสถานที่</div>
          )}
          {isLoaded && places.name && (
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
                <div className="flex flex-row justify-between">
                  <h1 className="font-semibold text-xl"></h1>
                  <Link href={`/place/edit/${places.name}`} className="bg-neutral-200 px-3 py-2 rounded-md ">แก้ไขข้อมูลสถานที่</Link>
                </div>
                  <div className="flex flex-row  w-full p-3 space-x-4">
                      <div className="flex flex-col w-full  space-y-4">
                          <div className="relative w-full h-auto">
                            <Image src={places?.images[currentIndex]} alt={`place_image_${places?.images[currentIndex]}`} width={0} height={0} sizes="100vw" className="h-[400px] w-full bg-neutral-500  rounded-lg object-cover"/>
                            <div className="absolute top-1/2 -translate-x-[-5px] -translate-y-1/2 bg-black/30 text-white text-2xl rounded-full">
                                <BsChevronCompactLeft onClick={prevSlide} size={30}/>
                            </div>
                            <div className="absolute top-1/2 right-0 translate-x-[-5px] -translate-y-1/2 bg-black/30 text-white text-2xl rounded-full">
                                <BsChevronCompactRight onClick={nextSlide} size={30}/>
                            </div>
                          </div>
                          
                          <div className="h-[350px] w-full bg-neutral-500 flex justify-center items-center rounded-lg overflow-hidden">
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
                          <h1 className="font-semibold text-2xl">{places.name}</h1>
                          <div className="w-full h-full border bg-neutral-300 "></div>   
                          <div className="w-full h-full border  my-4 p-4 rounded-lg space-y-4">
                            <div className="flex flex-row space-x-2">
                            <div className="flex text-xl">
                                                <MdLocationPin size={30} color="rgb(16, 185, 129)" />
                                                {places.province}
                                            </div>
                            <h1 className="text-xl text-neutral-500">{places.amphure}</h1>
                            <div className="w-max p-1 rounded-lg bg-emerald-500 text-white text-sm">{places.types}</div>
                            </div>
                            
              
                <div className="relative mt-4">
                  <label
                    className={`absolute bg-white -top-3 left-3 px-[3px] "text-rose-500"`}
                  >
                    อธิบายสถานที่
                  </label>
                    <div
                      className={`
                        border 
                        w-full 
                        rounded-md
                        pt-3 
                        pb-2 
                        px-4 
                        shadow-sm 
                        outline-none`} 
                    >
                      <div className="w-5/6 mt-2 space-y-2 my-4 ml-5">
                        <h1>{places.description}</h1>
                      </div>
                  </div>
                  
                </div>
                          {/* <div className="flex flex-row">
                            <div className="w-1/6 mt-2">
                              <h1>รายละเอียด : </h1>
                            </div>
                            <div className="w-5/6 mt-2 space-y-2 my-4">
                              <h1>{places.description}</h1>
                            </div>
                          </div> */}
                          <div className=" flex flex-row ">
                          
                          <div className="ml-1 space-y-2">
                              {places.opening_hours.length > 0 && places.opening_hours.map((item) => (
                                item.isOpen === false ?(
                                  <div className="flex flex-row space-x-2">
                                    <div className="border 
                                                    w-[20px] 
                                                    rounded-md
                                                    bg-neutral-300
                                                    pl-2
                                                    pt-3 
                                                    pb-2 
                                                    px-4 
                                                    shadow-sm 
                                                    outline-none "></div>
                                    <h1>{item.day} ปิด</h1>
                                  </div>
                                  
                                ) : (
                                  <div className="flex flex-row space-x-2">
                                    <div className="border 
                                                    w-[20px] 
                                                    rounded-md
                                                    bg-emerald-500
                                                    pl-2
                                                    pt-3 
                                                    pb-2 
                                                    px-4 
                                                    shadow-sm 
                                                    outline-none"></div>
                                      <h1>{item.day} {item.open} น. - {item.close} น.</h1>
                                  </div>
                                )
                              ))}
                          </div>
                          </div>
                          {/* <h1>เรตติ้ง : {places.rating}</h1> */}
                          </div>
                      </div>        
                  </div>
              </div>
              <div className=" w-full p-3">
                  <h1 className="font-semibold text-xl">สถานที่ใกล้เคียง "{places.name}"</h1>
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
                {/* {places.map((item) => (
                  <Card
                    key={item.title}
                    title={item.title}
                    province={item.provice}
                    img={item.img}
                    rating={item.rating}
                  />
                  
                ))} */}
            </div>
            <div className=" w-full p-3 mt-5">
                  <h1 className="font-semibold text-xl">สถานที่ที่คล้ายกับ "{places.name}"</h1>
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
                {/* {places.map((item) => (
                  <Card
                    key={item.title}
                    title={item.title}
                    province={item.provice}
                    img={item.img}
                    rating={item.rating}
                  />
                  
                ))} */}
            </div>
            </div>
          )}
        </div>  
      </Container>
    </div>
  )
}