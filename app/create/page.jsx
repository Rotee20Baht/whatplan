"use client"
import styles from "./page.module.css"
import PageContainer from "../components/PageContainer/Pagecontainer"
// import Button from "../components/Button"
import Button from "../components/Button/Button"
import Image from "next/image"
import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { SiAddthis } from 'react-icons/si'
import { BsInfoSquareFill } from 'react-icons/bs'
import { FaWindowClose } from 'react-icons/fa'
import AllListItems from "@/public/Allplace"
import moment from 'moment';
import { Calligraffitti } from "next/font/google"



const allListItems = AllListItems

export default function Create() {

    const [ListItems, updateListItems] = useState([])
    const [selectedTime, setSelectedTime] = useState([]);
    const [alldates, setAlldates] = useState(1)
    const [currentDay, setCurrentDay] = useState(0)
    console.log(alldates);

    console.log(ListItems);

    const handleAdd = (item) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        const newData = { id: result, hours: 0, min: 0, minUnit: 0, title: item.title, img: item.img }; // สร้างอาร์เรย์ใหม่โดยเพิ่ม 'New Data' ลงในอาร์เรย์

        updateListItems((prevState) => {
            let updatedArray = [...prevState]
            if (updatedArray[currentDay]?.length > 0) {
                updatedArray[currentDay].push(newData)
                return updatedArray
            }
            updatedArray[currentDay] = [newData]
            return updatedArray
        }
        ); // อัปเดตสถานะข้อมูลใหม่
    };

    const handleDelete = (deleteData) => {
        const newData = ListItems[currentDay].filter(({ id }) => id !== deleteData.id);
        updateListItems((prevState) => {
            let updatedArray = [...prevState]
            updatedArray[currentDay] = newData
            return updatedArray
        }
        ); // อัปเดตสถานะข้อมูลใหม่
    }



    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(ListItems[currentDay])
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)
        updateListItems((prevState) => {
            let updatedArray = [...prevState]
            updatedArray[currentDay] = items
            return updatedArray
        }
        ); // อัปเดตสถานะข้อมูลใหม่
    }

    // --------------------------------------------------------------Time function start 
    const handleTimeChange = (event) => {
        const value = event.target.value;
        const updatedSelectedTime = [...selectedTime];

        updatedSelectedTime[currentDay] = value;
        setSelectedTime(updatedSelectedTime);
    };
    const sumHours = () => {
        let total = 0;
        ListItems[currentDay]?.forEach(item => {
            const hours = parseFloat(item.hours);
            if (!isNaN(hours)) {
                total += hours;
            }
        });
        return total;
    };
    const sumMin = () => {
        let total = 0
        ListItems[currentDay]?.forEach(item => {
            const min = parseFloat(item.min);
            if (!isNaN(min)) {
                total = total + (min * 10);
            }
        });
        return total;
    };
    const sumMinUnit = () => {
        let total = 0
        ListItems[currentDay]?.forEach(item => {
            const minUnit = parseFloat(item.minUnit);
            if (!isNaN(minUnit)) {
                total += minUnit;
            }
        });
        return total;
    };

    let totalHours = sumHours();
    let totalMin = sumMin()
    let totalMinUnit = sumMinUnit()
    let finalMin = totalMin + totalMinUnit
    let finalHours = totalHours

    if (finalMin >= 60) {
        const hourToAdd = Math.floor(finalMin / 60);
        finalHours += hourToAdd;
        finalMin -= hourToAdd * 60;
    }
    const time = moment(selectedTime[currentDay], 'HH:mm');
    const result = time.add(finalHours, 'hour').add(finalMin, 'minutes');
    console.log(result.format('h:mm A'));
    console.log(finalHours, "hours", finalMin, "Minutes");

    if (finalHours > 24) {
        alert("You can't add more than a day to the selected date.");
    }
    const setHours = (item) => {
        const newList = ListItems[currentDay].map((list) => {
            if (list.id === item.id) {
                const newData = { ...list, hours: (item.hours * 1) };
                return newData
            }
            return list
        })
        updateListItems((prevState) => {
            let updatedArray = [...prevState]
            updatedArray[currentDay] = newList
            return updatedArray
        }
        );
    };
    const setMin = (item) => {
        const newList = ListItems[currentDay].map((list) => {
            if (list.id === item.id) {
                const newData = { ...list, min: (item.min * 1) };
                return newData
            }
            return list
        })
        updateListItems((prevState) => {
            let updatedArray = [...prevState]
            updatedArray[currentDay] = newList
            return updatedArray
        }
        );
    };
    const setMinUnit = (item) => {
        const newList = ListItems[currentDay].map((list) => {
            if (list.id === item.id) {
                const newData = { ...list, minUnit: (item.minUnit * 1) };
                return newData
            }
            return list
        })
        updateListItems((prevState) => {
            let updatedArray = [...prevState]
            updatedArray[currentDay] = newList
            return updatedArray
        }
        );
    };

    // --------------------------------------------------------------Time function End

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
                                                        hours: 0,
                                                        title: item.title,
                                                        img: item.img
                                                    }
                                                )}><SiAddthis size={30} color="rgb(16, 185, 129)" />
                                            </button>
                                            <button className={styles.infoButton}
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
                        <input type="text" placeholder="ชื่อแผนการท่องเที่ยว" className={styles.inputTripname} />
                    </div>
                    <div className={styles.time}>
                        <div className={styles.start}>
                            <h3>เริ่มสถานที่แรก :</h3>
                            <input type="time" value={selectedTime[currentDay]} onChange={handleTimeChange} />
                        </div>
                        <div className={styles.end}>
                            <h3>จบวันนี้ :</h3>
                            <h1>{result.format('h:mm A')}</h1>
                        </div>
                    </div>
                    <div className={styles.days}>
                        <div className={styles.date}>วันที่</div>
                        {Array(alldates).fill(null).map((_, index) => (
                            <div key={`date` + index}
                                className={`${currentDay == index ? `${styles.daySelect}` : `${styles.day}`}`} onClick={() => setCurrentDay(index)}>
                                {index + 1}
                            </div>
                        ))}
                        <div className={styles.addDay} onClick={() => setAlldates(() => alldates + 1)}>
                            addday
                        </div>
                    </div>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="ListItems">
                            {(provided) => (
                                <div className={styles.userItemsContainer} {...provided.droppableProps} ref={provided.innerRef}>
                                    {ListItems[currentDay]?.map(({ id, title, hours, min, minUnit, img }, index) => {
                                        return (
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => (
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={styles.userItem}>
                                                        <div className={styles.userImgContainer}>
                                                            <Image
                                                                src={img}
                                                                alt=""
                                                                fill
                                                                className={styles.userimg}
                                                            />
                                                        </div>
                                                        <div className={styles.userTextContainer}>
                                                            <div className={styles.textUser}>
                                                                <div className={styles.header}>
                                                                    {title}
                                                                </div>
                                                                <div className={styles.timeContainer}>
                                                                    <h1>เวลา:</h1>
                                                                    <select className={styles.userInput} value={hours} onChange={(event) => setHours(
                                                                        {
                                                                            id: id,
                                                                            title: title,
                                                                            hours: event.target.value,
                                                                            img: img
                                                                        }
                                                                    )}>
                                                                        <option value={0}>0</option>
                                                                        <option value={1}>1</option>
                                                                        <option value={2}>2</option>
                                                                        <option value={3}>3</option>
                                                                        <option value={4}>4</option>
                                                                        <option value={5}>5</option>
                                                                    </select>
                                                                    <h1>ชม.</h1>
                                                                    <select className={styles.userInput} value={min} onChange={(event) => setMin(
                                                                        {
                                                                            id: id,
                                                                            title: title,
                                                                            min: event.target.value,
                                                                            img: img
                                                                        }
                                                                    )}>
                                                                        <option value={0}>0</option>
                                                                        <option value={1}>1</option>
                                                                        <option value={2}>2</option>
                                                                        <option value={3}>3</option>
                                                                        <option value={4}>4</option>
                                                                        <option value={5}>5</option>
                                                                    </select>
                                                                    <select className={styles.userInput} value={minUnit} onChange={(event) => setMinUnit(
                                                                        {
                                                                            id: id,
                                                                            title: title,
                                                                            minUnit: event.target.value,
                                                                            img: img
                                                                        }
                                                                    )}>
                                                                        <option value={0}>0</option>
                                                                        <option value={1}>1</option>
                                                                        <option value={2}>2</option>
                                                                        <option value={3}>3</option>
                                                                        <option value={4}>4</option>
                                                                        <option value={5}>5</option>
                                                                        <option value={6}>6</option>
                                                                        <option value={7}>7</option>
                                                                        <option value={8}>8</option>
                                                                        <option value={9}>9</option>

                                                                    </select>
                                                                    <h1>นาที</h1>
                                                                </div>

                                                            </div>
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