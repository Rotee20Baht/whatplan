"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { provinces } from "@/app/providers/SelectDataProvider";
import { placttype } from "@/app/providers/SelectDataProvider";

import Container from "@/app/components/Container";
import { BsChevronCompactLeft,BsChevronCompactRight } from "react-icons/bs";

import "swiper/css";
import "swiper/css/free-mode";
import "react-loading-skeleton/dist/skeleton.css";
import SelectItem from "@/app/components/select/SelectItem";
import axios from "axios";

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
      console.log(data.data[0])
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
    console.log(currentIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === places.images.length - 1;
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
            <div role="status">
                <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
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
                  <h1 className="font-semibold text-xl">{places.name}</h1>
                  <Link href={`/place/edit/${places.name}`} className="bg-neutral-200 px-3 py-2 rounded-md ">แก้ไขข้อมูลสถานที่</Link>
                </div>
                  <div className="flex flex-row  w-full p-3 space-x-4">
                      <div className="flex flex-col w-1/2  space-y-4">
                          <div className="relative w-full h-auto">
                            <Image src={places?.images[currentIndex]} alt={`place_image_${places?.images[currentIndex]}`} width={0} height={0} sizes="100vw" className="h-[280px] w-full bg-neutral-500  rounded-lg object-cover"/>
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
                          <h1>จังหวัด : {places.province}</h1>
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