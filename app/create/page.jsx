"use client"
import styles from "./page.module.css"
import Container from "../components/Container"
import PageContainer from "../components/PageContainer/Pagecontainer"
import {AiOutlineSearch} from "react-icons/ai"
// import Button from "../components/Button"
import Button from "../components/Button/Button"
import Link from "next/link"
export default function Create() {
    return (
        <PageContainer>
            <div className={styles.container}>
                <div className={styles.searchContainer}>
                    <div className={styles.search}>
                        <input type="text" placeholder="ค้นหาสถานที่.." className={styles.input}/>
                        <Button text = "ค้นหา" url="#"/>
                    </div>
                    <div className={styles.categories}>
                        <div className={styles.category}>ร้านอาหาร</div>
                        <div className={styles.category}>ที่พัก</div>
                        <div className={styles.category}>ทะเล</div>
                    </div>
                    <div className={styles.itemsContainer}>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>

                    </div>
                </div>
                <div className={styles.mapContainer}>
                </div>
                <div className={styles.listContainer}>
                <div className={styles.tripName}>
                        <input type="text" placeholder="ชื่อแผนการท่องเที่ยว" className={styles.input}/>
                    </div>
                    <div className={styles.days}>
                        <div className={styles.date}>วันที่</div>
                        <div className={styles.daySelect}>1</div>
                        <div className={styles.day}>2</div>
                        <div className={styles.addDay}>+</div>
                    </div>
                    <div className={styles.itemsContainer}>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                        <div className={styles.item}></div>
                    </div>           
                        <button className={styles.button}>สร้างแผนการเดินทาง</button>
                </div>
            </div>
        </PageContainer>
    )
}