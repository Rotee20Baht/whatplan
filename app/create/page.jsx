"use client"
import styles from "./page.module.css"
import PageContainer from "../components/PageContainer/Pagecontainer"
// import Button from "../components/Button"
import Button from "../components/Button/Button"
import Image from "next/image"
import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import AllListItems from "@/public/Allplace"
import { SiAddthis } from 'react-icons/si'
import { BsInfoSquareFill } from 'react-icons/bs'
import { FaWindowClose } from 'react-icons/fa'



const allListItems = AllListItems

// const allListItems = [
//     {
//         id: '1',
//         title: "สถานที่ที่ 1",
//         img: "https://images.unsplash.com/photo-1580715911453-d6d9cffd5771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2007&q=80"
//     },
//     {
//         id: 'กหดหกด',
//         title: "สถานที่ที่ 2",
//         img: "https://images.unsplash.com/photo-1580715911453-d6d9cffd5771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2007&q=80"
//     },
//     {
//         id: 'asda',
//         title: "สถานที่ที่ 3",
//         img: "https://images.unsplash.com/photo-1580715911453-d6d9cffd5771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2007&q=80"
//     },
//     {
//         id: '44',
//         title: "สถานที่ที่ 4",
//         img: "https://images.unsplash.com/photo-1580715911453-d6d9cffd5771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2007&q=80"
//     },
//     {
//         id: 'cvcv',
//         title: "สถานที่ที่ 5",
//         img: "https://images.unsplash.com/photo-1580715911453-d6d9cffd5771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2007&q=80"
//     },
//     {
//         id: '6',
//         title: "สถานที่ที่ 6",
//         img: "https://images.unsplash.com/photo-1580715911453-d6d9cffd5771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2007&q=80"
//     }

// ]

export default function Create() {

    const handleAdd = (item) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        const newData = [...ListItems, { id: result, title: item.title, img: item.img }]; // สร้างอาร์เรย์ใหม่โดยเพิ่ม 'New Data' ลงในอาร์เรย์
        updateListItems(newData); // อัปเดตสถานะข้อมูลใหม่
    };

    const handleDelete = (deleteData) => {
        // const updateData = [ { id: deleteData.id, title: deleteData.title, img: deleteData.img }];
        const newData = ListItems.filter(({ id }) => id !== deleteData.id);
        updateListItems(newData)
        console.log(ListItems);
        // updateListItems((ListItems)=>{

        // })
    }

    const [ListItems, updateListItems] = useState([])
    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(ListItems)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        updateListItems(items)
    }

    function create() {
        console.log(ListItems)
    }

    return (
        <PageContainer >
            <div className={styles.container}>
                <div className={styles.searchContainer}>
                    <div className={styles.search}>
                        <input type="text" placeholder="ค้นหาสถานที่.." className={styles.input} />
                        <Button text="ค้นหา" url="#" />
                    </div>
                    <div className={styles.categories}>
                        <div className={styles.category}>ร้านอาหาร</div>
                        <div className={styles.category}>ที่พัก</div>
                        <div className={styles.category}>ทะเล</div>
                    </div>
                    <div className={styles.itemsContainer}>
                        {allListItems.map(item => {
                            return (
                                <div className={styles.item} key={item.id}>
                                    <div className={styles.imgContainer}>
                                        <Image
                                            src={item.img}
                                            alt=""
                                            fill
                                            className={styles.img}
                                        />
                                    </div>
                                    <div className={styles.textContainer}>
                                        <div className={styles.text}>{item.title}</div>
                                        <div className={styles.btnContainer}>
                                            <button className={styles.addButton}
                                                onClick={() => handleAdd(
                                                    {
                                                        id: item.id,
                                                        title: item.title,
                                                        img: item.img
                                                    }
                                                )}><SiAddthis size={30} color="rgb(16, 185, 129)" />
                                            </button>
                                            <button className={styles.infoButton}
                                            // onClick={() => handleAdd(
                                            //     {
                                            //         id: item.id,
                                            //         title: item.title,
                                            //         img: item.img
                                            //     }
                                            // )}
                                            ><BsInfoSquareFill size={30} color="#aaaa" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.mapContainer}>
                </div>


                {/* -------------  user list ------------------ */}
                <div className={styles.listContainer}>
                    <div className={styles.tripName}>
                        <input type="text" placeholder="ชื่อแผนการท่องเที่ยว" className={styles.input} />
                    </div>
                    <div className={styles.days}>
                        <div className={styles.date}>วันที่</div>
                        <div className={styles.daySelect}>1</div>
                        <div className={styles.day}>2</div>
                        <div className={styles.addDay}>+</div>
                    </div>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="ListItems">
                            {(provided) => (
                                <div className={styles.itemsContainer} {...provided.droppableProps} ref={provided.innerRef}>
                                    {ListItems.map(({ id, title, img }, index) => {
                                        return (
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => (
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={styles.item}>
                                                        <div className={styles.imgContainer}>
                                                            <Image
                                                                src={img}
                                                                alt=""
                                                                fill
                                                                className={styles.img}
                                                            />
                                                        </div>
                                                        <div className={styles.textContainer}>
                                                            <div className={styles.text}>{title}</div>
                                                            <div className={styles.btnContainer}>
                                                                <button className={styles.deleteButton}
                                                                    onClick={() => handleDelete(
                                                                        {
                                                                            id: id,
                                                                            title: title,
                                                                            img: img
                                                                        }
                                                                    )}><FaWindowClose size={30} color="#d11c1c" />
                                                                </button>
                                                                <button className={styles.infoButton}
                                                                // onClick={() => handleAdd(
                                                                //     {
                                                                //         id: item.id,
                                                                //         title: item.title,
                                                                //         img: item.img
                                                                //     }
                                                                // )}
                                                                ><BsInfoSquareFill size={30} color="#aaaa" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <button className={styles.button} onClick={create}>สร้างแผนการเดินทาง</button>
                </div>
            </div>
        </PageContainer>
    )
}