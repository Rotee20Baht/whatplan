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

const PlanedData = [
    [
        {
            id: "1",
            title: "ตลาดน้ำเมืองลิกอร์",
            types: ["ร้านอาหาร"],
            province: "นครศรีธรรมราช",
            amphure: "เมืองนครศรีธรรมราช",
            location: {
                lat: "8.428000",
                lng: "99.962917",
            },
            desc: "บรรยากาศของตลาดน้ำเมืองลิกอร์ ถูกผสมผสานด้วยความโบราณกับความเป็นสมัยใหม่ บริเวณทางเข้าติดกำแพง จัดให้เป็นมุมถ่ายรูปของผู้มาเยือน ส่วนด้านตรงข้ามเป็นคลองสายเล็กๆ ที่มีสะพานเก่าแก่เป็นฉากชวนให้เก็บภาพความทรงจำ ส่วนอาหารการกินที่พ่อค้าแม่ขายชาวนครฯ นำมาจำหน่าย ผสมผสานไปด้วยเครื่องคาว-หวานปะปนกันไป อย่างเช่น ปลาดุกร้า ที่ขึ้นชื่อมากๆ ทางภาคใต้ ซึ่งเป็นภูมิปัญญาท้องถิ่นของชาวใต้ในการถนอมอาหารที่มีแต่โบราณ มีลักษณะคล้ายปลาเค็ม หรือจะเป็นขนมหวานอย่างขนมหัวเราะ ที่มีลักษณะหน้ายิ้ม ขนมครกที่ทำจากข้าวเป็นเมล็ดแทนแป้ง และยังมีนิทรรศการจัดแสดงภาพถ่ายตลาดน้ำเมืองลิกอร์ในหลากหลายมุมมอง ทั้งบรรยากาศค้าขายและความสนุกสนานนอกจากในเรื่องของอาหารแล้ว ยังมีการแสดงเอกลักษณ์ของภาคใต้ คือจัดแสดงโนราอีกด้วย ซึ่งการแสดงโนรานี้จะมาเป็นส่วนหนึ่งของตลาดน้ำลิกอร์ ที่จะหมุนเวียนมามอบความสุขและเสียงหัวเราะให้ผู้คน มาเที่ยวที่นี่ได้ทุกวันศุกร์สุดท้ายของเดือน",
            images: [
                "https://thailandtourismdirectory.go.th/assets/upload/2017/12/12/20171212ae75e3c49829c7564e0bcae661eeca85124216.jpg",
                "https://thailandtourismdirectory.go.th/assets/upload/2017/11/09/201711094311f70b3e67379dd9666bc89125d7a5231014.jpg",
                "https://thailandtourismdirectory.go.th/assets/upload/2017/11/09/20171109704532b9c9e73c845048ea569214e666231010.jpg",
                "https://thailandtourismdirectory.go.th/assets/upload/2017/12/12/201712126aaa311965b2c5cdba5bedfa7074a0ac124358.jpg",
            ],
            opening: [
                { day: "วันจันทร์", isOpen: false, open: "", close: "" },
                { day: "วันอังคาร", isOpen: false, open: "", close: "" },
                { day: "วันพุท", isOpen: false, open: "", close: "" },
                { day: "วันพฤหัสบดี", isOpen: false, open: "", close: "" },
                { day: "วันศุกร์", isOpen: true, open: "16:00", close: "23:00" },
                { day: "วันเสาร์", isOpen: false, open: "", close: "" },
                { day: "วันอาทิตย์", isOpen: false, open: "", close: "" },
            ],
        },
        {
            id: "3",
            title: "น้ำตกคลองปาว",
            types: ["ธรรมชาติ"],
            province: "นครศรีธรรมราช",
            amphure: "นบพิตำ",
            location: {
                lat: "8.799070",
                lng: "99.574892",
            },
            desc: "น้ำตกคลองปาว เป็นน้ำตกที่สวยงามอีกแห่งหนึ่งในจังหวัดนครศรีธรรมราช มีลักษณะไหลลดหลั่นเป็นชั้น ๆ เป็นต้นกำเนิดของคลองกลาย ตลอดลำคลองกลายมีโขดหินสวยงาม การเดินทางใช้เส้นทางไปบ้านปากลงเข้าสู่หน่วยพิทักษ์อุทยานแห่งชาติเขานันที่ ขน. 1 (คลองกลาย) ระยะทาง 3.5 กม. แล้วเดินเท้าต่อประมาณ 1 กม.ถึงน้ำตก ในเขตอุทยานฯ มีสถานที่ตั้งเต๊นท์ให้บริการนักท่องเที่ยว โดยทำหนังสือแจ้งล่วงหน้าหรือติดต่อที่อุทยานฯ ด้วยตนเอง",
            images: [
                "https://thailandtourismdirectory.go.th/assets/upload/2017/11/30/201711309b90c5c3a9eaafa18cf4072e6d4cc8be091601.jpg",
                "https://thailandtourismdirectory.go.th/assets/upload/2017/11/30/201711307a35feaf9f1ee4c0dce7d548c25d6c9c091601.jpg",
                "https://thailandtourismdirectory.go.th/assets/upload/2017/11/30/201711307fb62e29b298975e0f5e1257a52aa156091601.jpg",
                "https://thailandtourismdirectory.go.th/assets/upload/2017/11/09/20171109d41d8cd98f00b204e9800998ecf8427e095917.jpg",
            ],
            opening: [
                { day: "วันจันทร์", isOpen: true, open: "08:00", close: "17:00" },
                { day: "วันอังคาร", isOpen: true, open: "08:00", close: "17:00" },
                { day: "วันพุท", isOpen: true, open: "08:00", close: "17:00" },
                { day: "วันพฤหัสบดี", isOpen: true, open: "08:00", close: "17:00" },
                { day: "วันศุกร์", isOpen: true, open: "08:00", close: "17:00" },
                { day: "วันเสาร์", isOpen: true, open: "08:00", close: "17:00" },
                { day: "วันอาทิตย์", isOpen: true, open: "08:00", close: "17:00" },
            ],
        },
    ],
    [
        {
            id: "3",
            title: "น้ำตกคลองปาว",
            types: ["ธรรมชาติ"],
            province: "นครศรีธรรมราช",
            amphure: "นบพิตำ",
            location: {
                lat: "8.799070",
                lng: "99.574892",
            },
            desc: "น้ำตกคลองปาว เป็นน้ำตกที่สวยงามอีกแห่งหนึ่งในจังหวัดนครศรีธรรมราช มีลักษณะไหลลดหลั่นเป็นชั้น ๆ เป็นต้นกำเนิดของคลองกลาย ตลอดลำคลองกลายมีโขดหินสวยงาม การเดินทางใช้เส้นทางไปบ้านปากลงเข้าสู่หน่วยพิทักษ์อุทยานแห่งชาติเขานันที่ ขน. 1 (คลองกลาย) ระยะทาง 3.5 กม. แล้วเดินเท้าต่อประมาณ 1 กม.ถึงน้ำตก ในเขตอุทยานฯ มีสถานที่ตั้งเต๊นท์ให้บริการนักท่องเที่ยว โดยทำหนังสือแจ้งล่วงหน้าหรือติดต่อที่อุทยานฯ ด้วยตนเอง",
            images: [
                "https://thailandtourismdirectory.go.th/assets/upload/2017/11/30/201711309b90c5c3a9eaafa18cf4072e6d4cc8be091601.jpg",
                "https://thailandtourismdirectory.go.th/assets/upload/2017/11/30/201711307a35feaf9f1ee4c0dce7d548c25d6c9c091601.jpg",
                "https://thailandtourismdirectory.go.th/assets/upload/2017/11/30/201711307fb62e29b298975e0f5e1257a52aa156091601.jpg",
                "https://thailandtourismdirectory.go.th/assets/upload/2017/11/09/20171109d41d8cd98f00b204e9800998ecf8427e095917.jpg",
            ],
            opening: [
                { day: "วันจันทร์", isOpen: true, open: "08:00", close: "17:00" },
                { day: "วันอังคาร", isOpen: true, open: "08:00", close: "17:00" },
                { day: "วันพุท", isOpen: true, open: "08:00", close: "17:00" },
                { day: "วันพฤหัสบดี", isOpen: true, open: "08:00", close: "17:00" },
                { day: "วันศุกร์", isOpen: true, open: "08:00", close: "17:00" },
                { day: "วันเสาร์", isOpen: true, open: "08:00", close: "17:00" },
                { day: "วันอาทิตย์", isOpen: true, open: "08:00", close: "17:00" },
            ],
        },
        {
            id: "1",
            title: "ตลาดน้ำเมืองลิกอร์",
            types: ["ร้านอาหาร"],
            province: "นครศรีธรรมราช",
            amphure: "เมืองนครศรีธรรมราช",
            location: {
                lat: "8.428000",
                lng: "99.962917",
            },
            desc: "บรรยากาศของตลาดน้ำเมืองลิกอร์ ถูกผสมผสานด้วยความโบราณกับความเป็นสมัยใหม่ บริเวณทางเข้าติดกำแพง จัดให้เป็นมุมถ่ายรูปของผู้มาเยือน ส่วนด้านตรงข้ามเป็นคลองสายเล็กๆ ที่มีสะพานเก่าแก่เป็นฉากชวนให้เก็บภาพความทรงจำ ส่วนอาหารการกินที่พ่อค้าแม่ขายชาวนครฯ นำมาจำหน่าย ผสมผสานไปด้วยเครื่องคาว-หวานปะปนกันไป อย่างเช่น ปลาดุกร้า ที่ขึ้นชื่อมากๆ ทางภาคใต้ ซึ่งเป็นภูมิปัญญาท้องถิ่นของชาวใต้ในการถนอมอาหารที่มีแต่โบราณ มีลักษณะคล้ายปลาเค็ม หรือจะเป็นขนมหวานอย่างขนมหัวเราะ ที่มีลักษณะหน้ายิ้ม ขนมครกที่ทำจากข้าวเป็นเมล็ดแทนแป้ง และยังมีนิทรรศการจัดแสดงภาพถ่ายตลาดน้ำเมืองลิกอร์ในหลากหลายมุมมอง ทั้งบรรยากาศค้าขายและความสนุกสนานนอกจากในเรื่องของอาหารแล้ว ยังมีการแสดงเอกลักษณ์ของภาคใต้ คือจัดแสดงโนราอีกด้วย ซึ่งการแสดงโนรานี้จะมาเป็นส่วนหนึ่งของตลาดน้ำลิกอร์ ที่จะหมุนเวียนมามอบความสุขและเสียงหัวเราะให้ผู้คน มาเที่ยวที่นี่ได้ทุกวันศุกร์สุดท้ายของเดือน",
            images: [
                "https://thailandtourismdirectory.go.th/assets/upload/2017/12/12/20171212ae75e3c49829c7564e0bcae661eeca85124216.jpg",
                "https://thailandtourismdirectory.go.th/assets/upload/2017/11/09/201711094311f70b3e67379dd9666bc89125d7a5231014.jpg",
                "https://thailandtourismdirectory.go.th/assets/upload/2017/11/09/20171109704532b9c9e73c845048ea569214e666231010.jpg",
                "https://thailandtourismdirectory.go.th/assets/upload/2017/12/12/201712126aaa311965b2c5cdba5bedfa7074a0ac124358.jpg",
            ],
            opening: [
                { day: "วันจันทร์", isOpen: false, open: "", close: "" },
                { day: "วันอังคาร", isOpen: false, open: "", close: "" },
                { day: "วันพุท", isOpen: false, open: "", close: "" },
                { day: "วันพฤหัสบดี", isOpen: false, open: "", close: "" },
                { day: "วันศุกร์", isOpen: true, open: "16:00", close: "23:00" },
                { day: "วันเสาร์", isOpen: false, open: "", close: "" },
                { day: "วันอาทิตย์", isOpen: false, open: "", close: "" },
            ],
        },
    ]
]

export default function PlanInfo() {
    
    const [currentDay, setCurrentDay] = useState(0);
    const [plan, setPlan] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const pathname = usePathname();
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

    if(!isLoaded){
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

    return (
        <Container>
            <PageContainer>
                <div className={styles.Container}>
                    <div className={styles.title}>
                        <h1>ชื่อแผนการท่องเที่ยว : เที่ยวนครศรีธรรมราช</h1>
                        
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
                    <div className={styles.categories}>
                        <div className={styles.category}>ร้านอาหาร</div>
                        <div className={styles.category}>ที่พัก</div>
                        <div className={styles.category}>ชายทะเล</div>
                        <div className={styles.category}>ภูเขา</div>
                    </div>
                    <div className={styles.imgContainer}>
                        <div className={styles.mainImg}>

                        </div>
                        <div className={styles.subContainer}>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
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
                        <h1>เริ่มต้นวัน : 09.00 น.</h1>
                    </div>
                    <div className={styles.infoDay}>
                        {plan.lists[currentDay].map((item, index) => (
                            <div className={styles.dayData} key={item.id}>
                                <div className={styles.dayImgContainer}>
                                    <Image
                                        src={item.placeId.images[0]}                                        alt=""
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
                                            ตั้งแต่เวลา 9.00 น. ถึง 11.00 น.
                                        </div>
                                        <div className={styles.viewMore}>
                                            <a href={`/place/${item.title}`}> 
                                        
                                                รายละเอียดสถานที่เพิ่มเติม...
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </PageContainer>
        </Container>
    )
}