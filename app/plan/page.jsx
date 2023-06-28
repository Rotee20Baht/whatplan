"use client"
import styles from "./page.module.css"
import Button from "../components/Button/Button"
import Select from 'react-select'
import Link from "next/link"
import Container from "../components/Container"
import Image from "next/image"
export default function Planned() {


    // -------------------------------------Selecter section-------------
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

      const items = [
        {
            id:1,
            title: "Palm tree",
            img:"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80"
        },
        {
            id:2,
            title: "Palm tree with road",
            img : "https://images.unsplash.com/photo-1565340076637-825894a74ca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
        }
      ]


    return(
        <div className={styles.container}>
            <div className={styles.selectBar}>
                <Select className={styles.selecter} options={place} styles={customStyles} />
                <Select className={styles.selecter} options={types} styles={customStyles} />
                <Select className={styles.selecter} options={days} styles={customStyles} />
                <Button text="ค้านหาแผนการท่องเที่ยว" url="#" />
            </div>
            <div className={styles.cardContainer}>
                    <div className={styles.cardLists}>
                        {items.map(item=>(
                            <Link href={`/plan/${item.id}`} className={styles.card}>
                            <div className={styles.cardImg}>
                            <Image
                                src={item.img}
                                alt=''
                                fill
                                className={styles.image}
                                />
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
        </div>
    )
}