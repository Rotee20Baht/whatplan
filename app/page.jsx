"use client"
import styles from "./page.module.css"
import React from 'react'
import Select from 'react-select'
import Button from "./components/Button/Button"
import Container from "./components/Container"
import Link from "next/link"
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
          <h1 className={styles.heroText}>WP What Plan.</h1>
        </div>
        <div className={styles.selectBar}>
          <Select className={styles.selecter} options={place} styles={customStyles} />
          <Select className={styles.selecter} options={types} styles={customStyles} />
          <Select className={styles.selecter} options={days} styles={customStyles} />
          <Button text="ค้านหาแผนการท่องเที่ยว" url="#" />
        </div>
      </div>
      <Container>
      {/* ----ท่องเที่ยวแนะนำ----- */}
        <div className={styles.cardContainer}>
          <div className={styles.title}>แผนการท่องเที่ยวแนะนำ</div>
          <div className={styles.cardLists}>
            <Link href="#" className={styles.card}>
              <div className={styles.cardImg}></div>
            </Link>
            <Link href="#" className={styles.card}>
              <div className={styles.cardImg}></div>
            </Link>
            <Link href="#" className={styles.card}>
              <div className={styles.cardImg}></div>
            </Link>
            <Link href="#" className={styles.viewMore}>
              <h1 className={styles.vText}>--View More--</h1>
            </Link>
          </div>
        </div>
      {/* ----ท่องเที่ยวยอดนิยม----- */}
        <div className={styles.cardContainer}>
          <div className={styles.title}>แผนการท่องเที่ยวยอดนิยม</div>
          <div className={styles.cardLists}>
            <Link href="#" className={styles.card}>
              <div className={styles.cardImg}></div>
            </Link>
            <Link href="#" className={styles.card}>
              <div className={styles.cardImg}></div>
            </Link>
            <Link href="#" className={styles.card}>
              <div className={styles.cardImg}></div>
            </Link>
            <Link href="#" className={styles.viewMore}>
              <h1 className={styles.vText}>--View More--</h1>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
