'use client'

import { usePathname, useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import moment from 'moment';

import Container from "@/app/components/Container";
import styles from "./page.module.css"
import PageContainer from "@/app/components/PageContainer/Pagecontainer";
import Loader from "@/app/components/Loader/Loader";
import { BiSolidShare } from "react-icons/bi"
import { MdLocationPin, MdDeleteOutline } from 'react-icons/md'
import { LuEdit3 } from 'react-icons/lu'
import { FaRoute } from 'react-icons/fa'
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'

import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// import Modal from "@/app/components/modals/Modal";

export default function PlanInfo() {

    const [currentDay, setCurrentDay] = useState(0);
    const [plan, setPlan] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    
    // const [showShareModel, setShowShareModel] = useState(false);

    const pathname = usePathname();
    const { data: session } = useSession();
    const router = useRouter();

    const MySwal = withReactContent(Swal);

    useEffect(() => {
        const planId = pathname.replace('/plan/', '');

        axios.get(`/api/plan?id=${planId}`)
            .then(data => {
                setPlan(data.data);
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoaded(true))
    }, [])

    if(isLoaded && !plan) router.push("/404")

    if (!isLoaded) {
        return (
            <div className="pt-20 pb-4">
                <Container>
                    <div className="flex flex-row justify-center">
                        <Loader />
                    </div>
                </Container>
            </div>
        )
    }
    const getTotalTime = (list) => {
        let totalMinutes = 0;
        list.forEach((item) => {
            totalMinutes += item.hours * 60 + item.min * 10 + item.minUnit;
        });
        return totalMinutes;
    };

    const handleDelete = () => {
        MySwal.fire({
          title: <p>คุณต้องการลบแผนการท่องเที่ยว?</p>,
          showCancelButton: true,
          cancelButtonText: 'ยกเลิก',
          confirmButtonText: 'ลบ',
          confirmButtonColor: '#ef4444'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`/api/plan?id=${plan._id}`)
            .then(data => {
              console.log(data)
              MySwal.fire({
                icon: 'success',
                title: data?.data.msg,
                showConfirmButton: false,
                showCloseButton: true,
                didDestroy: () => router.push('/plan')
              })
            })
            .catch(data => {
              Swal.fire({
                icon: 'error',
                title: data?.data.msg
              })
            })
          }
        })
      }

    const getMapUrl = () => {
        // console.log(plan.lists[currentDay]);
        let mapUrl = "https://www.google.co.th/maps/dir/";
        for (let i = 0; i < plan.lists[currentDay].length; i++) {
        //   console.log(plan.lists[currentDay][i].placeId.location);
          mapUrl += plan.lists[currentDay][i].placeId.location.lat;
          mapUrl += ",";
          mapUrl += plan.lists[currentDay][i].placeId.location.lng;
          mapUrl += "/";
        }
        // console.log(mapUrl);
        return mapUrl
    }

    const generatePDF = async () => {

    };
    
    const time = moment(plan.starts[currentDay], 'HH:mm');
    let result = time.add(getTotalTime(plan.lists[currentDay]), 'minutes');

    const formatMapUrl = getMapUrl()

    return (
        <Container>
            {/* <Modal 
                title={(
                    <div className="flex flex-row items-center gap-2 text-2xl">
                        <BiShareAlt /> 
                        แบ่งปันแผนการท่องเที่ยว
                    </div>
                )}
                isOpen={showShareModel} 
                onClose={() => setShowShareModel(!showShareModel)}
            /> */}
            <PageContainer>
                <div className={styles.Container}>
                    <div className={styles.title}>
                        <h1></h1>
                    </div>
                    {/* <div className={styles.categories}>
                        <div className={styles.category}>ร้านอาหาร</div>
                        <div className={styles.category}>ที่พัก</div>
                        <div className={styles.category}>ชายทะเล</div>
                        <div className={styles.category}>ภูเขา</div>
                    </div> */}
                    <div className={styles.imgContainer}>
                        <div className={styles.mainImg}>
                            <div className={styles.textImg}>
                                {plan.name}
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.manualContainer}>
                        <Link href="#">
                            <div className={styles.manual}><BiSolidPlaneAlt size={30}/> การเดินทางไปยังจุดเริ่มต้นแผนการเดินทาง</div>
                        </Link>
                        <Link href="#">
                            <div className={styles.manual}><BiSolidTimeFive size={30}/> ช่วงเวลาที่น่าไปเที่ยวในแผนการเดินทางนี้</div>
                        </Link>
                        <Link href="#">
                            <div className={styles.manual}><BsCloudSunFill size={30}/> สภาพอากาศ</div>
                        </Link>
                    </div> */}
                    <div className={styles.daylists}>
                        <div className={styles.daylist}>
                            <div className={styles.day}>
                                <h1>วันที่</h1>
                            </div>
                            {plan.lists.map((item, index) => (
                                <div className={`${currentDay == index ? `${styles.daySelect}` : `${styles.dayUnselect}`}`} onClick={() => setCurrentDay(index)} key={index}>{index + 1}</div>
                            ))}
                        </div>
                        <div className="flex flex-row h-full gap-1.5">
                        {session?.user._id === plan?.author._id && (
                                <>
                                    <Link
                                        href={`/plan/edit/${plan._id}`}
                                        className="
                                            p-4
                                            flex 
                                            flex-row 
                                            items-center 
                                            gap-1.5 
                                            bg-neutral-200
                                            rounded-full 
                                            cursor-pointer
                                            transition
                                            hover:bg-neutral-300
                                            hover:shadow-md
                                            font-semibold 
                                            text-lg 
                                            text-dark
                                        "
                                    >
                                        <LuEdit3 className=""/>
                                        <span className="hidden md:block">แก้ไข</span>
                                    </Link>
                                    <div
                                        onClick={handleDelete}
                                        className="
                                            p-4
                                            flex 
                                            flex-row 
                                            items-center 
                                            gap-1.5 
                                            bg-red-500 
                                            rounded-full 
                                            cursor-pointer
                                            transition
                                            hover:bg-red-600
                                            hover:shadow-md
                                            font-semibold 
                                            text-lg 
                                            text-white
                                        "
                                    >
                                        <MdDeleteOutline className="font-semibold text-lg text-white"/>
                                        <span className="hidden md:block">ลบ</span>
                                    </div>
                                </>
                        )}
                            <div
                                className="
                                    p-4
                                    flex 
                                    flex-row 
                                    items-center 
                                    gap-1.5 
                                    bg-emerald-500 
                                    rounded-full 
                                    cursor-pointer
                                    transition
                                    hover:bg-emerald-600
                                    hover:shadow-md
                                    font-semibold 
                                    text-lg 
                                    text-white
                                "
                                onClick={async () => {
                                    await navigator.clipboard.writeText(location.href);
                                    toast.success('คัดลอกไปที่คลิปบอร์ดแล้ว!');
                                }}
                            >
                                <BiSolidShare className="font-semibold text-lg text-white"/>
                                <span className="hidden md:block">คัดลอกลิงก์</span>
                            </div>
                            {/* <div
                                className="
                                    p-4
                                    flex 
                                    flex-row 
                                    items-center 
                                    gap-1.5 
                                  bg-emerald-500 
                                    rounded-full 
                                    cursor-pointer
                                    transition
                                    hover:bg-emerald-600
                                    hover:shadow-md
                                    font-semibold 
                                    text-lg 
                                    text-white
                                "
                                onClick={generatePDF}
                            >
                                <BsFillFileEarmarkPdfFill className="font-semibold text-lg text-white"/>
                                <span className="hidden md:block">บันทึกเป็น PDF</span>
                            </div> */}
                        </div>
                    </div>
                    <div className={styles.start}>
                        <h1>เริ่มต้นวัน : {plan.starts[currentDay]} น.</h1>
                    </div>
                    <Link
                        href={formatMapUrl}
                        target="_blank"
                        className="
                            w-full
                            sm:w-fit
                            p-2
                            px-4
                            mt-3
                            mx-auto
                            flex
                            flex-row
                            items-center
                            gap-2
                            rounded-full
                            bg-emerald-500 
                            hover:bg-emerald-600
                            text-center
                            text-white
                            text-xl
                            font-semibold
                            transition
                            cursor-pointer
                        ">
                        <FaRoute />
                        เส้นทางการเดินทาง
                    </Link>
                    <div className={styles.infoDay}>
                        {plan.lists[currentDay].map((item, index) => {
                            const totalMinutes = item.hours * 60 + item.min * 10 + item.minUnit;
                            return (
                                <div className={styles.dayData} key={item.id}>
                                    <div className={styles.dayImgContainer}>
                                        <Image
                                            src={item.placeId.images[0]}
                                            alt=""
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className={styles.dayImage}
                                        />
                                    </div>
                                    <div className={styles.textContainer}>
                                        <div className={styles.placeTitle}>
                                            {item.placeId.name}
                                        </div>
                                        <div className={styles.location}>
                                            <MdLocationPin size={20} color="rgb(16, 185, 129)" />
                                            {item.placeId.province},{item.placeId.amphure}
                                        </div>
                                        <div className={styles.desc}>
                                            {item.placeId.description}
                                        </div>
                                        <div className={styles.typesOfPlace}>{item.placeId.types}</div>
                                        <div className={styles.footer}>
                                            <div className={styles.time}>
                                                ใช้เวลา {Math.floor(totalMinutes / 60)} ชั่วโมง {totalMinutes % 60} นาที
                                            </div>
                                            <div className={styles.viewMore}>
                                                <a href={`/place/${item.placeId.name}`}>
                                                    รายละเอียดสถานที่เพิ่มเติม...
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.start}>
                        <h1>จบวัน : {result.format('H:mm ')} น.</h1>
                    </div>
                </div>
            </PageContainer>
        </Container>
    )
}