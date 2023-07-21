"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Image from "next/image";

import Container from "@/app/components/Container";
import SelectItem from "@/app/components/select/SelectItem";
import { provinces } from "@/app/providers/SelectDataProvider";
import { placttype } from "@/app/providers/SelectDataProvider";
import TimeSelect from "@/app/components/inputs/TimeSelect";
import DaySelect from "@/app/components/inputs/DaySelect";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

import { toast } from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useLoadScript } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";

const libraries = ["places"];

export default function AddCreate() {
  const {data: session} = useSession()
  const router = useRouter();

  if(session?.user?.role !== "admin"){
    // router.push('/place')
  }

  const pathname = usePathname();
  const [isLoadedData, setIsLoadedData] = useState(false);
  const [initValue, setInitValue] = useState([]);

  useEffect(() => {
    const decodedPathname = decodeURIComponent(pathname).replace('/place/edit/', '');
    console.log(decodedPathname)

    axios.get(`http://localhost:3000/api/place?name=${decodedPathname}`)
    .then(data => {
      console.log(data)
      setTimeout(() => setIsLoadedData(true), 300)
    })
    .catch(err => {
      console.log(err)
      router.replace('/404/')
    })
  }, [])

  const [amphures, setAmphures] = useState([]);
  const [marker, setMarker] = useState();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: 'ไกกกก่',
    }
  });

  const mondayField = watch("monday");
  const tuesdayField = watch("tuesday");
  const wednesdayField = watch("wednesday");
  const thursdayField = watch("thursday");
  const fridayField = watch("friday");
  const saturdayField = watch("saturday");
  const sundayField = watch("sunday");
  const province = watch("province");
  const amphure = watch("amphure");
  const types = watch("types");
  const imageSrc = watch("imageSrc");
  const lat = watch("lat");
  const lng = watch("lng");

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleVisibleFieldChange = (current) => (e) => {
    setValue(current, e.target.checked);

    if (!e.target.checked) {
      setValue(`${current}_open`, "");
      setValue(`${current}_close`, "");
    }
  };

  const onSubmit = async (formValues) => {
    try {
      const formatedValues = {
        name: formValues.name,
        province: formValues.province.value,
        amphure: formValues.amphure.value,
        location: { lat: formValues.lat, lng: formValues.lng },
        types: formValues.types.value,
        description: formValues.description,
        opening_hours: [
          {
            day: "วันจันทร์",
            isOpen: formValues.monday,
            open: formValues.monday_open,
            close: formValues.monday_close,
          },
          {
            day: "วันอังคาร",
            isOpen: formValues.tuesday,
            open: formValues.tuesday_open,
            close: formValues.tuesday_close,
          },
          {
            day: "วันพุธ",
            isOpen: formValues.wednesday,
            open: formValues.wednesday_open,
            close: formValues.wednesday_close,
          },
          {
            day: "วันพฤหัสบดี",
            isOpen: formValues.thursday,
            open: formValues.thursday_open,
            close: formValues.thursday_close,
          },
          {
            day: "วันศุกร์",
            isOpen: formValues.friday,
            open: formValues.friday_open,
            close: formValues.friday_close,
          },
          {
            day: "วันเสาร์",
            isOpen: formValues.saturday,
            open: formValues.saturday_open,
            close: formValues.saturday_close,
          },
          {
            day: "วันอาทิตย์",
            isOpen: formValues.sunday,
            open: formValues.sunday_open,
            close: formValues.sunday_close,
          },
        ],
        images: formValues.imageSrc
      };
      console.log(formatedValues);
      const result = await axios.post('/api/place', formatedValues)
      toast.success("เพิ่มสถานที่สำเร็จ!")
      setTimeout(() => router.push('/place'), 1000)
      Navigator
    } catch (err) {
      toast.error("เพิ่มสถานที่ล้มเหลว!");
    }
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  // 13.7563309 100.5017651
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 13.7563309, lng: 100.5017651 }), []);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const getAmphure = async (province) => {
    const amphure_data = await axios.get(
      `/api/amphure?province=${province}`
    );
    const data = amphure_data.data[0]?.amphure;
    setAmphures(data);
  };

  const handleSelect = async (province) => {
    const results = await getGeocode({ address: province });
    const { lat, lng } = getLatLng(results[0]);
    mapRef.current?.panTo({ lat, lng });
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCustomValue("lat", lat.toFixed(6));
    setCustomValue("lng", lng.toFixed(6));
    const newMarker = { lat, lng };
    setMarker(newMarker);
  };

  if(!isLoadedData){
    return(
      <div className="pb-4 pt-20 lg:pt-24">
        <Container>
          <div className="text-center">
            <div role="status">
                <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="pb-4 pt-20 lg:pt-24">
      <Container>
        <div className="max-w-[1440px] grid grid-cols-1 lg:grid-cols-3 relative">
          <div
            className="
              lg:col-span-2
              h-80 lg:h-auto 
              rounded-tl-lg 
              rounded-tr-lg 
              lg:rounded-tr-none 
              lg:rounded-tl-lg 
              lg:rounded-bl-lg 
              bg-neutral-300
              relative
              overflow-hidden
          "
          >
            {isLoaded ? (
              <GoogleMap
                zoom={12}
                center={center}
                mapContainerClassName="w-full h-full"
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
            )}
          </div>
          <div className="border border-neutral-300 rounded-bl-lg rounded-br-lg md:rounded-bl-none lg:rounded-tr-lg md:rounded-br-lg shadow-sm relative">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-lg font-semibold absolute -top-5 left-6 px-4 py-1 rounded-full  bg-white border border-neutral-300 shadow-sm">
                แก้ไขข้อมูลสถานที่
              </h1>
              <div className="mt-4 lg:mt-6 p-4 flex flex-col gap-5">
                <div className="mt-4 lg:mt-0 relative">
                  <label
                    htmlFor="name"
                    className={`absolute bg-white -top-3 left-3 px-[3px] ${
                      errors["name"] ? "text-rose-500" : "text-black"
                    }`}
                  >
                    ชื่อสถานที่
                  </label>
                  <input
                    id="name"
                    {...register("name", { required: true })}
                    className={`
                      border 
                      w-full 
                      rounded-md
                      pt-3 
                      pb-2 
                      px-4 
                      shadow-sm 
                      outline-none 
                      ${
                        errors["name"]
                          ? "border-rose-500"
                          : "border-neutral-300"
                      }
                      ${
                        errors["name"]
                          ? "focus:border-rose-500"
                          : "focus:border-emerald-500"
                      }
                    `}
                    placeholder="ชื่อสถานที่"
                  />
                </div>
                <div>
                  <label className="ps-3">จังหวัด</label>
                  <SelectItem
                    value={province}
                    onChange={(value) => {
                      setCustomValue("province", value);
                      setCustomValue("amphure", "");
                      handleSelect(value?.value);
                      getAmphure(value?.value);
                    }}
                    label="เลือกจังหวัด"
                    options={provinces}
                    required={true}
                    errros={errors}
                    id="province"
                  />
                  {/* <input
                    value={value}
                    onChange={(e) => setAutocompleteValue(e.target.value)}
                    disabled={!ready}
                    placeholder="Where are you going?"
                  /> */}
                  {/* <SelectItem 
                    value={province} 
                    onChange={({value}) => {
                      // handleSelect(value)
                      console.log(value)
                      setCustomValue('province', value)
                    }} 
                    onInputChange={(value) => setAutocompleteValue(value)}
                    label="เลือกจังหวัด" 
                    options={[{
                        options: data?.map((item) => {
                            return { label: item.description, value: item.place_id}
                        })
                    }]}
                    required={true}
                    errros={errors}
                    id="province"
                  /> */}
                </div>
                {amphures?.length > 0 && (
                  <div>
                    <label className="ps-3">อำเภอ</label>
                    <SelectItem
                      value={amphure}
                      onChange={(value) => {
                        setCustomValue("amphure", value);
                        handleSelect(value?.value);
                      }}
                      label="เลือกอำเภอ"
                      options={[
                        {
                          options: amphures?.map((item) => {
                            return { label: item, value: item };
                          }),
                        },
                      ]}
                      required={true}
                      errros={errors}
                      id="amphure"
                    />
                  </div>
                )}
                <div>
                  <label className="ps-3">ประเภทสถานที่</label>
                  <SelectItem
                    value={types}
                    onChange={(value) => setCustomValue("types", value)}
                    label="เลือกประเภทสถานที่"
                    options={placttype}
                    required={true}
                  />
                </div>
                <div className="relative mt-4">
                  <label
                    htmlFor="description"
                    className={`absolute bg-white -top-3 left-3 px-[3px] ${
                      errors["description"] ? "text-rose-500" : "text-black"
                    }`}
                  >
                    อธิบายสถานที่
                  </label>
                  <textarea
                    {...register("description", { required: true })}
                    id="description"
                    className={`
                      border 
                      w-full 
                      rounded-md
                      pt-3 
                      pb-2 
                      px-4 
                      shadow-sm 
                      outline-none 
                      ${
                        errors["description"]
                          ? "border-rose-500"
                          : "border-neutral-300"
                      }
                      ${
                        errors["description"]
                          ? "focus:border-rose-500"
                          : "border-emerald-500"
                      }
                    `}
                    placeholder="อธิบายสถานที่ของคุณ"
                    rows={6}
                  />
                </div>
                <div className="relative mt-4">
                  <div className="flex flex-row item-center justify-between gap-3">
                    <div className="relative flex-1">
                      <label
                        className={`absolute bg-white -top-3 left-3 px-[3px] ${
                          errors["lat"] ? "text-rose-500" : "border-black"
                        }`}
                      >
                        ลาติจูด
                      </label>
                      <input
                        className={`
                          border 
                          border-neutral-300 
                          w-full 
                          rounded-md
                          pt-3 
                          pb-2 
                          px-4 
                          shadow-sm 
                          outline-none 
                          focus:border-emerald-500"
                          ${
                            errors["lat"]
                              ? "border-rose-500"
                              : "border-neutral-300"
                          }
                        `}
                        placeholder="-"
                        value={lat}
                        // {...register('lat', { required: true })}
                        disabled
                      />
                    </div>
                    <div className="relative flex-1">
                      <label
                        className={`absolute bg-white -top-3 left-3 px-[3px] ${
                          errors["lat"] ? "text-rose-500" : "border-black"
                        }`}
                      >
                        ลองติจูด
                      </label>
                      <input
                        className={`
                          border 
                          border-neutral-300 
                          w-full 
                          rounded-md
                          pt-3 
                          pb-2 
                          px-4 
                          shadow-sm 
                          outline-none 
                          focus:border-emerald-500"
                          ${
                            errors["lat"]
                              ? "border-rose-500"
                              : "border-neutral-300"
                          }
                        `}
                        placeholder="-"
                        value={lng}
                        // {...register('lng', { required: true })}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-3 relative">
                  { imageSrc?.length > 0 && (
                    <div className="relative w-full">
                      <Swiper
                        freeMode={true}
                        grabCursor={true}
                        modules={[FreeMode]}
                        spaceBetween={12}
                        slidesPerView={2}
                      >
                        { imageSrc.map((img, index) => (
                          <SwiperSlide key={img}>
                            <Image src={img} alt={`place_image_${index}`} width={0} height={0} sizes="100vw" className="w-full h-52 rounded-lg object-cover"/>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  )}
                  <ImageUpload
                    onChange={(value) => setCustomValue("imageSrc", value)}
                    value={imageSrc}
                  />
                  <input type="hidden" value={imageSrc} {...register('imageSrc', { required: true })} />
                  {errors['imageSrc'] && (<div className="text-emerald-500">กรุณาเพิ่มรูปภาพอย่างน้อย 1 รูปภาพ</div>)}
                </div>
                <div className="mt-4">
                  <label className="ps-3">วัน-เวลาที่เปิดทำการ</label>
                  <div className="mt-4 flex flex-row items-center gap-4">
                    <DaySelect
                      label="จ"
                      id="mondayField"
                      refWatch={mondayField}
                      field="monday"
                      register={register}
                      onChange={handleVisibleFieldChange("monday")}
                    />
                    <DaySelect
                      label="อ"
                      id="tuesdayField"
                      refWatch={tuesdayField}
                      field="tuesday"
                      register={register}
                      onChange={handleVisibleFieldChange("tuesday")}
                    />
                    <DaySelect
                      label="พ"
                      id="wednesdayField"
                      refWatch={wednesdayField}
                      field="wednesday"
                      register={register}
                      onChange={handleVisibleFieldChange("wednesday")}
                    />
                    <DaySelect
                      label="พฤ"
                      id="thursdayField"
                      refWatch={thursdayField}
                      field="thursday"
                      register={register}
                      onChange={handleVisibleFieldChange("thursday")}
                    />
                    <DaySelect
                      label="ศ"
                      id="fridayField"
                      refWatch={fridayField}
                      field="friday"
                      register={register}
                      onChange={handleVisibleFieldChange("friday")}
                    />
                    <DaySelect
                      label="ส"
                      id="saturdayField"
                      refWatch={saturdayField}
                      field="saturday"
                      register={register}
                      onChange={handleVisibleFieldChange("saturday")}
                    />
                    <DaySelect
                      label="อา"
                      id="sundayField"
                      refWatch={sundayField}
                      field="sunday"
                      register={register}
                      onChange={handleVisibleFieldChange("sunday")}
                    />
                  </div>
                  {mondayField && (
                    <TimeSelect
                      label="วันจันทร์"
                      open="monday_open"
                      close="monday_close"
                      register={register}
                      errors={errors}
                    />
                  )}
                  {tuesdayField && (
                    <TimeSelect
                      label="วันอังคาร"
                      open="tuesday_open"
                      close="tuesday_close"
                      register={register}
                      errors={errors}
                    />
                  )}
                  {wednesdayField && (
                    <TimeSelect
                      label="วันพุธ"
                      open="wednesday_open"
                      close="wednesday_close"
                      register={register}
                      errors={errors}
                    />
                  )}
                  {thursdayField && (
                    <TimeSelect
                      label="วันพฤหัสบดี"
                      open="thursday_open"
                      close="thursday_close"
                      register={register}
                      errors={errors}
                    />
                  )}
                  {fridayField && (
                    <TimeSelect
                      label="วันศุกร์"
                      open="friday_open"
                      close="friday_close"
                      register={register}
                      errors={errors}
                    />
                  )}
                  {saturdayField && (
                    <TimeSelect
                      label="วันเสาร์"
                      open="saturday_open"
                      close="saturday_close"
                      register={register}
                      errors={errors}
                    />
                  )}
                  {sundayField && (
                    <TimeSelect
                      label="วันอาทิตย์"
                      open="sunday_open"
                      close="sunday_close"
                      register={register}
                      errors={errors}
                    />
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full p-3 bg-emerald-500 text-white rounded-lg transition hover:opacity-70"
                >
                  เพิ่มสถานที่
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
