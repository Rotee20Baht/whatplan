import Container from "@/app/components/Container";
import styles from "./page.module.css"
import PageContainer from "@/app/components/PageContainer/Pagecontainer";
import {BiSolidPlaneAlt,BiSolidTimeFive} from "react-icons/bi"
import {BsCloudSunFill} from "react-icons/bs"
import Link from "next/link";


  export default async function PlanInfo() {
    return(
        <Container>
            <PageContainer>
                <div className={styles.Container}>
                    <div className={styles.title}>
                        <h1>ชื่อแผนการท่องเที่ยว : เที่ยวนครศรีธรรมราช</h1>
                    
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
                    <div className={styles.manualContainer}>
                        <Link href="#">
                            <div className={styles.manual}><BiSolidPlaneAlt size={30}/> การเดินทางไปยังจุดเริ่มต้นแผนการเดินทาง</div>
                        </Link>
                        <Link href="#">
                            <div className={styles.manual}><BiSolidTimeFive size={30}/> ช่วงเวลาที่น่าไปเที่ยวในแผนการเดินทางนี้</div>
                        </Link>
                        <Link href="#">
                            <div className={styles.manual}><BsCloudSunFill size={30}/> สภาพอากาศ</div>
                        </Link>
                    </div>
                </div>
            </PageContainer>
        </Container>
    )
  }