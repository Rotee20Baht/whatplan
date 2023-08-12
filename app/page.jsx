"use client"
import styles from "./page.module.css"
import React from 'react'
import Select from 'react-select'
import Button from "./components/Button/Button"
import Container from "./components/Container"
import Link from "next/link"
import Image from "next/image"
import Selectbar from "./components/select/Selectbar"
export default function Home() {
  const place = [
    { value: 'จังหวัด', label: 'จังหวัด' },
    { value: 'นครศรีธรรมราช', label: 'นครศรีธรรมราช' },

  ]
  const types = [
    { value: 'นิเวศ', label: 'นิเวศ' },
    { value: 'วัฒนธรรม', label: 'วัฒนธรรม' },

  ]
  const days = [
    { value: '1 วัน', label: '1 วัน' },
    { value: '2-5วัน', label: '2-5วัน' },

  ]

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#fff" : "#fff",
      backgroundColor: state.isSelected ? "#53c28b" : "#53c28b",
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#fff",
      padding: "10px",
      border: "1px solid #666",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#333", }),
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.text}>
          {/* <h2>What <span>A</span> Plan</h2> */}
        </div>
        <div className={styles.textp}>
          "การจัดแผนการท่องเที่ยวไม่เพียงแค่การวางแผนเพื่อเตรียมตัวสำหรับการเดินทางเท่านั้น แต่เป็นกระบวนการที่เต็มไปด้วยความคิดสร้างสรรค์และการเตรียมความพร้อมให้กับการผจญภัยที่กำลังจะเกิดขึ้น เหมือนกับการเปิดตำนานใหม่ที่ไม่เคยเป็นที่รู้จักมาก่อน"
        </div>
        <Link href="/plan">
          <div className={styles.btn}>
            
          </div>
        </Link>

        {/* <Container>
          <div className={styles.selectBar}>
            <Selectbar title1="จังหวัด" title2="รูปแบบการท่องเที่ยว" title3="จำนวนวัน" />
          </div>
        </Container> */}
      </div>
      {/* <div className="mt-2 py-4">
        <Container>
          <div className="flex flex-col gap-6 px-0 lg:px-10">
            ----ท่องเที่ยวแนะนำ-----
            <div className={styles.cardContainer}>
              <div className={styles.title}>แผนการท่องเที่ยวสำหรับคุณ</div>
                <div className="flex flex-row gap-5 mt-1">
                  <Link href="#" className="flex-1 h-full rounded-xl overflow-hidden shadow-lg">
                    <div className="h-[284px] w-full bg-zinc-300"></div>
                  </Link>
                  <Link href="#" className="flex-1 h-full rounded-xl overflow-hidden shadow-lg">
                    <div className="h-[284px] w-full bg-zinc-300"></div>
                  </Link>
                  <Link href="#" className="hidden lg:block flex-1 h-full rounded-xl overflow-hidden shadow-lg">
                    <div className="h-[284px] w-full bg-zinc-300"></div>
                  </Link>
                  <Link href="#" className="hidden md:block flex-1 h-full rounded-xl overflow-hidden shadow-lg">
                    <div className="h-[284px] w-full bg-zinc-300"></div>
                  </Link>
                </div>
            </div>
            ----ท่องเที่ยวยอดนิยม-----
            <div className={styles.cardContainer}>
              <div className={styles.title}>แผนการท่องเที่ยวยอดนิยม</div>
                <div className="flex flex-row gap-5 mt-1">
                  <Link href="#" className="flex-1 h-full rounded-xl overflow-hidden shadow-lg">
                    <div className="h-[284px] w-full bg-zinc-300"></div>
                  </Link>
                  <Link href="#" className="flex-1 h-full rounded-xl overflow-hidden shadow-lg">
                    <div className="h-[284px] w-full bg-zinc-300"></div>
                  </Link>
                  <Link href="#" className="hidden lg:block flex-1 h-full rounded-xl overflow-hidden shadow-lg">
                    <div className="h-[284px] w-full bg-zinc-300"></div>
                  </Link>
                  <Link href="#" className="hidden md:block flex-1 h-full rounded-xl overflow-hidden shadow-lg">
                    <div className="h-[284px] w-full bg-zinc-300"></div>
                  </Link>
                </div>
            </div>
          </div>
        </Container>
      </div> */}
    </div>
  )
}
