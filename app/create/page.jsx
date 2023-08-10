"use client"
import styles from "./page.module.css"
import PageContainer from "../components/PageContainer/Pagecontainer"
// import Button from "../components/Button"
import Button from "../components/Button/Button"
import Image from "next/image"
import { useState, useEffect } from "react"
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { SiAddthis } from 'react-icons/si'
import { BsInfoSquareFill, BsFillXSquareFill, BsSearch } from 'react-icons/bs'
import { MdLocationPin } from 'react-icons/md'
import moment from 'moment';
import GoogleMapComponent from "../components/GoogleMap/GoogleMapComponent"
import { useLoadScript } from "@react-google-maps/api";
import Loader from "../components/Loader/Loader"
import { useMemo } from "react"
import { useSession } from 'next-auth/react';

export default function Create() {
    const [ListItems, updateListItems] = useState([]);
    const [selectedTime, setSelectedTime] = useState([]);
    const [endTime, setEndTime] = useState([]);
    const [alldates, setAlldates] = useState(1);
    const [currentDay, setCurrentDay] = useState(0);
    const [filterTitle, setFilterTitle] = useState("");
    const [filterType, setFilterType] = useState();
    const [places, setPlaces] = useState([]);
    const [isLoadedData, setIsLoadedData] = useState(false);
    const [planName, setPlanName] = useState('');

    const { data: session } = useSession()

    useEffect(() => {
        axios.get(`/api/place`)
            .then((data) => {
                console.log(data.data)
                setPlaces(data.data);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setIsLoadedData(true))
    }, []);

    const mapDirectionData = useMemo(
      () => (
        ListItems[currentDay]?.map((item) => ({
          id: item.id,
          location: {
            lat: parseFloat(item.location.lat),
            lng: parseFloat(item.location.lng),
          },
          name: item.name,
        }))),
      [ListItems, currentDay]
    );


    const handleAdd = (item) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        const newData =
        {
            id: result,
            _id: item._id,
            hours: 0, min: 0, minUnit: 0,
            name: item.name,
            types: item.types,
            location:item.location
        }; // สร้างอาร์เรย์ใหม่โดยเพิ่ม 'New Data' ลงในอาร์เรย์

        // console.log(newData);
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

    // useEffect(() => {
    //     let totalHours = sumHours();
    //     let totalMin = sumMin()
    //     let totalMinUnit = sumMinUnit()
    //     let finalMin = totalMin + totalMinUnit
    //     let finalHours = totalHours
    
    //     if (finalMin >= 60) {
    //         const hourToAdd = Math.floor(finalMin / 60);
    //         finalHours += hourToAdd;
    //         finalMin -= hourToAdd * 60;
    //     }

    //     if (finalHours > 24) {
    //         alert("You can't add more than a day to the selected date.");
    //     }

    //     const time = moment(selectedTime[currentDay], 'HH:mm');
    //     let result = time.add(finalHours, 'hour').add(finalMin, 'minutes');
    //     result.format('h:mm A')
    //     handleEndTimeChange(result)
    // }, [ListItems])
    // let totalHours = sumHours();
    // let totalMin = sumMin()
    // let totalMinUnit = sumMinUnit()
    // let finalMin = totalMin + totalMinUnit
    // let finalHours = totalHours

    // if (finalMin >= 60) {
    //     const hourToAdd = Math.floor(finalMin / 60);
    //     finalHours += hourToAdd;
    //     finalMin -= hourToAdd * 60;
    // }
    // const time = moment(selectedTime[currentDay], 'HH:mm');
    // const result = time.add(finalHours, 'hour').add(finalMin, 'minutes');
    // handleEndTimeChange(result)
    // setEndTime(result.format('h:mm A'))
    // console.log();
    // console.log(finalHours, "hours", finalMin, "Minutes");

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

    function handleEndTimeChange(){
        let totalHours = sumHours();
        let totalMin = sumMin()
        let totalMinUnit = sumMinUnit()
        let finalMin = totalMin + totalMinUnit
        let finalHours = totalHours
        
        console.log(finalHours, "hours", finalMin, "Minutes");

        if (finalMin >= 60) {
            const hourToAdd = Math.floor(finalMin / 60);
            finalHours += hourToAdd;
            finalMin -= hourToAdd * 60;
        }

        if (finalHours > 24) {
            alert("You can't add more than a day to the selected date.");
        }

        const time = moment(selectedTime[currentDay], 'HH:mm');
        let result = time.add(finalHours, 'hour').add(finalMin, 'minutes');

        // console.log(result.format('H:mm A'))

        const updatedEndTime = [...endTime];
        updatedEndTime[currentDay] = result.format("h:mm A");
        setEndTime(updatedEndTime);
    };

    useEffect(() => {
        handleEndTimeChange()
    }, [ListItems, selectedTime])

    // console.log(filterType);
    // --------------------------------------------------------------Time function End

    function handleDeleteDay(){
        updateListItems(ListItems.slice(0, alldates-1))
        setSelectedTime(selectedTime.slice(0, alldates-1))
        setEndTime(endTime.slice(0, alldates-1))
        setAlldates(alldates - 1)
    }
    
    function isValidTime(timeArr){
        if(timeArr.length <= 0) 
            return false

        for(let i of timeArr){
            if(i === '--:--' || i === 'Invalid date'){
                return false;
            }
          }
        return true;
    }

    const isValidInput = useMemo(() => {
        if(!planName)
            return false;

        if(!isValidTime(selectedTime))
            return false;

        for(let i = 0; i < alldates; i++){
            if(ListItems[i]?.length <= 0)
                return false;
            
            for(let place of ListItems[i]){
                if(!place.hours && !place.min && !place.minUnit)
                    return false;
            }
        }

        return true;
    }, [selectedTime, ListItems, planName])

    function create() {
        const formatedData = {
            name: planName,
            author: session?.user._id,
            starts: JSON.stringify(selectedTime),
            lists: ListItems.map(lists => {
                return lists.map(list => {
                    return {
                        id: list.id,
                        placeId: list._id,
                        hours: list.hours,
                        min: list.min,
                        minUnit: list.minUnit,
                    }
                })
            })
        }
        
        console.log(formatedData)

        axios.post("/api/plan", formatedData)
        .then(({ data }) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })

    }

    useEffect(() => {
        setIsLoadedData(false);
        let searchUrl = "/api/place?"

        if (filterTitle)
            searchUrl += `&name=${filterTitle}`
        if (filterType)
            searchUrl += `&types=${filterType}`

        axios.get(searchUrl)
            .then(({ data }) => {
                console.log(data)
                setPlaces(data)
            })
            .catch(() => {
                setPlaces([])
            })
            .finally(() => setIsLoadedData(true))
    }, [filterType, filterTitle])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY // Add your API key
    });

    return (
        <PageContainer>
            <div className={styles.container}>
                <div className={styles.listContainer}>
                    <div className={styles.tripName}>
                        <input type="text" placeholder="ชื่อแผนการท่องเที่ยว" className={styles.inputTripname} value={planName}
                            onChange={e => setPlanName(e.target.value)}
                        />
                    </div>
                    <div className={styles.time}>
                        <div className={styles.start}>
                            <h4>เริ่มต้น</h4>
                            <input type="time" value={selectedTime[currentDay]} onChange={handleTimeChange} />
                        </div>
                        <div className={styles.end}>
                            <h4>สิ้นสุด</h4>
                            <h1>{endTime[currentDay]}</h1>
                        </div>
                    </div>
                    <div className={styles.days}>
                        <div className={styles.date}>วันที่</div>
                        {alldates > 1 && (<div className={styles.decDay} onClick={() => handleDeleteDay()}>-</div>)}
                        <div className={`flex flex-row gap-1.5 flex-grow ${alldates > 6 ? 'justify-evenly' : ''}`}>
                            {Array(alldates).fill(null).map((_, index) => (
                                <div key={`date` + index}
                                    className={`${currentDay == index ? `${styles.daySelect}` : `${styles.day}`}`} onClick={() => setCurrentDay(index)}>
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                        <div className={styles.addDay} onClick={() => {
                            setAlldates(() => alldates + 1)
                            setSelectedTime(() => {
                                let updatedArray = [...selectedTime]
                                updatedArray[alldates] = "--:--"
                                return updatedArray
                            })
                        }}>
                            +
                        </div>
                    </div>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="ListItems">
                            {(provided) => (
                                <div className={styles.userItemsContainer} {...provided.droppableProps} ref={provided.innerRef}>
                                    {ListItems[currentDay]?.map(({
                                        id,
                                        name,
                                        types,
                                        hours,
                                        min,
                                        minUnit,
                                        images,
                                        location
                                    }, index) => {
                                        return (
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => (
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={styles.userItem}>
                                                        <div className={styles.con}>
                                                            {/* <div className={styles.userImgContainer}>
                                                                <Image
                                                                    src={images}
                                                                    alt=""
                                                                    fill
                                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                                    className={styles.userimg}
                                                                />
                                                            </div> */}
                                                        </div>
                                                        <div className={styles.header}>
                                                            <h6>{name}</h6>
                                                        </div>
                                                        <div className={styles.cate}>
                                                            <h6>{types}</h6>
                                                        </div>
                                                        <div className={styles.footer}>
                                                            <div className={styles.settime}>
                                                                <h1>เวลา:</h1>
                                                                <select className={styles.userInput} value={hours} onChange={(event) => setHours(
                                                                    {
                                                                        id: id,
                                                                        hours: event.target.value,
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
                                                                        min: event.target.value,
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
                                                                        minUnit: event.target.value,
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
                                                            <div className={styles.userBtnContainer}>
                                                                <a href={`/place/${name}`} target="_blank">
                                                                    <button className={styles.infoButton}
                                                                    ><BsInfoSquareFill size={25} color="#aaaa" />
                                                                    </button>
                                                                </a>

                                                                <button className={styles.deleteButton}
                                                                    onClick={() => handleDelete(
                                                                        {
                                                                            id: id
                                                                        }
                                                                    )}><BsFillXSquareFill size={25} color="#d11c1c" />
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
                    <button className={styles.button} onClick={create} disabled={!isValidInput}>สร้างแผนการเดินทาง</button>
                </div>
 {/* map ---------------------------------------------------------------------------------------------- */}
                <div className={styles.mapContainer}>
                    {isLoaded ? <GoogleMapComponent data={mapDirectionData}/> : (<Loader />)}
                </div>

                <div className={styles.searchContainer}>
                    <div className={styles.search}>
                        <input
                            type="text"
                            placeholder="ค้นหาสถานที่.."
                            className={styles.input}
                            value={filterTitle}
                            onChange={(e) => setFilterTitle(e.target.value)}
                        />
                        <BsSearch size={20} color="#d4d4d4" />
                        {/* <button onClick={handleSearch} className="bg-emerald-500 hover:bg-emerald-400 transition text-white px-4 rounded-xl">ค้นหา</button> */}
                    </div>
                    <div className={styles.categories}>
                        <div
                            className={filterType == null ? styles.category_checked : styles.category}
                            onClick={() => setFilterType(null)}
                        >
                            ทั้งหมด
                        </div>
                        <div
                            className={filterType == "สถานที่ท่องเที่ยว" ? styles.category_checked : styles.category}
                            onClick={() => setFilterType("สถานที่ท่องเที่ยว")}
                        >
                            สถานที่ท่องเที่ยว
                        </div>
                        <div
                            className={filterType == "ร้านอาหาร" ? styles.category_checked : styles.category}
                            onClick={() => setFilterType("ร้านอาหาร")}
                        >
                            ร้านอาหาร
                        </div>
                        <div
                            className={filterType == "ที่พัก" ? styles.category_checked : styles.category}
                            onClick={() => setFilterType("ที่พัก")}
                        >
                            ที่พัก
                        </div>
                    </div>
                    <div className={styles.itemsContainer}>
                        {!isLoadedData && (
                            <div role="status">
                                <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                        {isLoadedData && places.length <= 0 && (
                            <div className="bg-white w-[95%] text-center py-3 rounded-lg">ไม่พบข้อมูลสถานที่</div>
                        )}
                        {isLoadedData && places.map((item) => {
                            return (
                                <div className={styles.item} key={item._id}>
                                    <div className={styles.imgContainer}>
                                        <Image
                                            src={item.images[0]}
                                            alt=""
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className={styles.img}
                                        />
                                    </div>
                                    <div className={styles.textContainer}>
                                        <div className={styles.text}>
                                            {item.name}
                                            <div className={styles.types}>
                                                {/* {item.map(type => {
                                                    return (
                                                        <div className={styles.type}>
                                                            <div>{type}</div>
                                                        </div>
                                                    )
                                                })} */}
                                            </div>

                                            <div className={styles.icon}>
                                                <MdLocationPin size={20} color="rgb(16, 185, 129)" />
                                                {item.province}
                                            </div>
                                        </div>
                                        <div className={styles.btnContainer}>
                                            <div className={styles.info}>
                                                <a href={`/place/${item.name}`} target="_blank">
                                                    ดูรายละเอียด
                                                </a>
                                            </div>
                                            <div>
                                                <button className={styles.addButton}
                                                    onClick={() => handleAdd(
                                                        {
                                                            id: item.id,
                                                            _id: item._id,
                                                            hours: 0,
                                                            name: item.name,
                                                            types: item.types,
                                                            location:item.location
                                                        }
                                                    )}><SiAddthis size={30} color="rgb(16, 185, 129)" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                
                {/* -------------  user list ------------------ */}

            </div>
        </PageContainer>
    )
}