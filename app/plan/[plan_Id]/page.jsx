'use client'
import Container from "@/app/components/Container";
import styles from "./page.module.css"
import PageContainer from "@/app/components/PageContainer/Pagecontainer";
import { BiSolidPlaneAlt, BiSolidTimeFive } from "react-icons/bi"
import { MdLocationPin, MdDeleteOutline } from 'react-icons/md'
import { LuEdit3 } from 'react-icons/lu'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Loader from "@/app/components/Loader/Loader";
import moment from 'moment';



export default function PlanInfo() {

    const [currentDay, setCurrentDay] = useState(0);
    const [plan, setPlan] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const pathname = usePathname();
    // const [endTime,setEndTime] = useState(12.00)

    useEffect(() => {
        const planId = pathname.replace('/plan/', '');
        console.log(planId)

        axios.get(`/api/plan?id=${planId}`)
            .then(data => {
                console.log(data.data);
                setPlan(data.data);
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoaded(true))
    }, [])

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
    const time = moment(plan.starts[currentDay], 'HH:mm');
    let result = time.add(getTotalTime(plan.lists[currentDay]), 'minutes');
    console.log(result.format('H:mm A'))

    return (
        <Container>
            <PageContainer>
                <div className={styles.Container}>
                    <div className={styles.title}>
                        <h1></h1>

                        <div className="flex flex-row items-center gap-1.5">
                            <div
                                className="
                                    px-3 
                                    py-1.5 
                                    flex 
                                    flex-row 
                                    items-center 
                                    gap-1.5 
                                    text-sm 
                                    text-white 
                                    bg-blue-500 
                                    rounded-lg 
                                    cursor-pointer
                                    transition
                                    hover:bg-blue-600
                                    hover:shadow-md
                                "
                            >
                                <LuEdit3 />
                                แก้ไข
                            </div>
                            <div
                                className="
                                    px-3 
                                    py-1.5 
                                    flex 
                                    flex-row 
                                    items-center 
                                    gap-1.5 
                                    text-sm 
                                    text-white 
                                    bg-red-500 
                                    rounded-lg 
                                    cursor-pointer
                                    transition
                                    hover:bg-red-600
                                    hover:shadow-md
                                "
                            >
                                <MdDeleteOutline />
                                ลบ
                            </div>
                        </div>
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
                    <div className={styles.daylist}>
                        <div className={styles.day}>
                            <h1>วันที่</h1>
                        </div>
                        {plan.lists.map((item, index) => (
                            <div className={`${currentDay == index ? `${styles.daySelect}` : `${styles.dayUnselect}`}`} onClick={() => setCurrentDay(index)} key={index}>{index + 1}</div>
                        ))}
                    </div>
                    <div className={styles.start}>
                        <h1>เริ่มต้นวัน : {plan.starts[currentDay]} น.</h1>
                    </div>
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