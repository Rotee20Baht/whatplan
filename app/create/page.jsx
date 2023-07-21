"use client";
import styles from "./page.module.css";
import PageContainer from "../components/PageContainer/Pagecontainer";
// import Button from "../components/Button"
import Button from "../components/Button/Button";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SiAddthis } from "react-icons/si";
import { BsInfoSquareFill, BsFillXSquareFill } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import moment from "moment";
// import PlaceData from "@/public/placeData"

// const allListItems = PlaceData

export default function Create() {
  const [ListItems, updateListItems] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [endTime, setEndTime] = useState();
  const [alldates, setAlldates] = useState(1);
  const [currentDay, setCurrentDay] = useState(0);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterType, setFilterType] = useState();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/place`)
      .then((data) => {
        console.log(data.data);
        setPlaces(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // const allListItems = places;
  // console.log(alldates);
  // console.log(ListItems);

  const handleAdd = (item) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    const newData = {
      id: result,
      hours: 0,
      min: 0,
      minUnit: 0,
      name: item.name,
      types: item.types,
      images: item.images,
    }; // สร้างอาร์เรย์ใหม่โดยเพิ่ม 'New Data' ลงในอาร์เรย์

    // console.log(newData);
    updateListItems((prevState) => {
      let updatedArray = [...prevState];
      if (updatedArray[currentDay]?.length > 0) {
        updatedArray[currentDay].push(newData);
        return updatedArray;
      }
      updatedArray[currentDay] = [newData];
      return updatedArray;
    }); // อัปเดตสถานะข้อมูลใหม่
  };

  const handleDelete = (deleteData) => {
    const newData = ListItems[currentDay].filter(
      ({ id }) => id !== deleteData.id
    );
    updateListItems((prevState) => {
      let updatedArray = [...prevState];
      updatedArray[currentDay] = newData;
      return updatedArray;
    }); // อัปเดตสถานะข้อมูลใหม่
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(ListItems[currentDay]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateListItems((prevState) => {
      let updatedArray = [...prevState];
      updatedArray[currentDay] = items;
      return updatedArray;
    }); // อัปเดตสถานะข้อมูลใหม่
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
    ListItems[currentDay]?.forEach((item) => {
      const hours = parseFloat(item.hours);
      if (!isNaN(hours)) {
        total += hours;
      }
    });
    return total;
  };
  const sumMin = () => {
    let total = 0;
    ListItems[currentDay]?.forEach((item) => {
      const min = parseFloat(item.min);
      if (!isNaN(min)) {
        total = total + min * 10;
      }
    });
    return total;
  };
  const sumMinUnit = () => {
    let total = 0;
    ListItems[currentDay]?.forEach((item) => {
      const minUnit = parseFloat(item.minUnit);
      if (!isNaN(minUnit)) {
        total += minUnit;
      }
    });
    return total;
  };

  let totalHours = sumHours();
  let totalMin = sumMin();
  let totalMinUnit = sumMinUnit();
  let finalMin = totalMin + totalMinUnit;
  let finalHours = totalHours;

  if (finalMin >= 60) {
    const hourToAdd = Math.floor(finalMin / 60);
    finalHours += hourToAdd;
    finalMin -= hourToAdd * 60;
  }
  const time = moment(selectedTime[currentDay], "HH:mm");
  const result = time.add(finalHours, "hour").add(finalMin, "minutes");
  // setEndTime(result.format('h:mm A'))
  // console.log();
  // console.log(finalHours, "hours", finalMin, "Minutes");

  if (finalHours > 24) {
    alert("You can't add more than a day to the selected date.");
  }
  const setHours = (item) => {
    const newList = ListItems[currentDay].map((list) => {
      if (list.id === item.id) {
        const newData = { ...list, hours: item.hours * 1 };
        return newData;
      }
      return list;
    });
    updateListItems((prevState) => {
      let updatedArray = [...prevState];
      updatedArray[currentDay] = newList;
      return updatedArray;
    });
  };
  const setMin = (item) => {
    const newList = ListItems[currentDay].map((list) => {
      if (list.id === item.id) {
        const newData = { ...list, min: item.min * 1 };
        return newData;
      }
      return list;
    });
    updateListItems((prevState) => {
      let updatedArray = [...prevState];
      updatedArray[currentDay] = newList;
      return updatedArray;
    });
  };
  const setMinUnit = (item) => {
    const newList = ListItems[currentDay].map((list) => {
      if (list.id === item.id) {
        const newData = { ...list, minUnit: item.minUnit * 1 };
        return newData;
      }
      return list;
    });
    updateListItems((prevState) => {
      let updatedArray = [...prevState];
      updatedArray[currentDay] = newList;
      return updatedArray;
    });
  };
  // console.log(filterType);
  // --------------------------------------------------------------Time function End

  function create() {
    // console.log(ListItems)
    // console.log("time start current",selectedTime);
    console.log(endTime);
  }

	function handleSearch(){
		let searchUrl = "http://localhost:3000/api/place?"

		if(filterTitle)
			searchUrl += `&name=${filterTitle}`
		if(filterType)	
			searchUrl += `&types=${filterType}`
		
		axios.get(searchUrl)
		.then(({data}) => {
			console.log(data)
			setPlaces(data)
		})
		.catch(err => console.log(err))
	}

  return (
    <PageContainer>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="ค้นหาสถานที่.."
              className={styles.input}
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
            />
            <button onClick={handleSearch} className="bg-emerald-500 hover:bg-emerald-400 transition text-white px-4 rounded-xl">ค้นหา</button>
          </div>
          <div className={styles.categories}>
            <div
              className={filterType == null ? styles.category_checked : styles.category }
              onClick={() => setFilterType(null)}
            >
              ทั้งหมด
            </div>
            <div
              className={filterType == "ร้านอาหาร" ? styles.category_checked : styles.category }
              onClick={() => setFilterType("ร้านอาหาร")}
            >
              ร้านอาหาร
            </div>
            <div
              className={filterType == "ที่พัก" ? styles.category_checked : styles.category }
              onClick={() => setFilterType("ที่พัก")}
            >
              ที่พัก
            </div>
            <div
              className={filterType == "ทะเล" ? styles.category_checked : styles.category }
              onClick={() => setFilterType("ทะเล")}
            >
              ทะเล
            </div>
            <div
              className={filterType == "ธรรมชาติ" ? styles.category_checked : styles.category }
              onClick={() => setFilterType("ธรรมชาติ")}
            >
              ธรรมชาติ
            </div>
          </div>
          <div className={styles.itemsContainer}>
            {places.map((item) => {
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
                        <button
                          className={styles.addButton}
                          onClick={() =>
                            handleAdd({
                              id: item.id,
                              hours: 0,
                              name: item.name,
                              types: item.types,
                              images: item.images[0],
                            })
                          }
                        >
                          <SiAddthis size={30} color="rgb(16, 185, 129)" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.mapContainer}></div>

        {/* -------------  user list ------------------ */}
        <div className={styles.listContainer}>
          <div className={styles.tripName}>
            <input
              type="text"
              placeholder="ชื่อแผนการท่องเที่ยว"
              className={styles.inputTripname}
            />
          </div>
          <div className={styles.time}>
            <div className={styles.start}>
              <h4>เริ่มต้น</h4>
              <input
                type="time"
                value={selectedTime[currentDay]}
                onChange={handleTimeChange}
              />
            </div>
            <div className={styles.end}>
              <h4>สิ้นสุด</h4>
              <h1>{result.format("h:mm A")}</h1>
            </div>
          </div>
          <div className={styles.days}>
            <div className={styles.date}>วันที่</div>
            {Array(alldates)
              .fill(null)
              .map((_, index) => (
                <div
                  key={`date` + index}
                  className={`${
                    currentDay == index
                      ? `${styles.daySelect}`
                      : `${styles.day}`
                  }`}
                  onClick={() => setCurrentDay(index)}
                >
                  {index + 1}
                </div>
              ))}
            <div
              className={styles.addDay}
              onClick={() => setAlldates(() => alldates + 1)}
            >
              +
            </div>
          </div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="ListItems">
              {(provided) => (
                <div
                  className={styles.userItemsContainer}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {ListItems[currentDay]?.map(
                    (
                      { id, name, types, hours, min, minUnit, images },
                      index
                    ) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className={styles.userItem}
                            >
                              <div className={styles.con}>
                                <div className={styles.userImgContainer}>
                                  <Image
                                    src={images}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className={styles.userimg}
                                  />
                                </div>
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
                                  <select
                                    className={styles.userInput}
                                    value={hours}
                                    onChange={(event) =>
                                      setHours({
                                        id: id,
                                        name: name,
                                        hours: event.target.value,
                                        images: images,
                                      })
                                    }
                                  >
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                  </select>
                                  <h1>ชม.</h1>
                                  <select
                                    className={styles.userInput}
                                    value={min}
                                    onChange={(event) =>
                                      setMin({
                                        id: id,
                                        name: name,
                                        min: event.target.value,
                                        images: images,
                                      })
                                    }
                                  >
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                  </select>
                                  <select
                                    className={styles.userInput}
                                    value={minUnit}
                                    onChange={(event) =>
                                      setMinUnit({
                                        id: id,
                                        name: name,
                                        minUnit: event.target.value,
                                        images: images,
                                      })
                                    }
                                  >
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
                                    <button className={styles.infoButton}>
                                      <BsInfoSquareFill
                                        size={32}
                                        color="#aaaa"
                                      />
                                    </button>
                                  </a>

                                  <button
                                    className={styles.deleteButton}
                                    onClick={() =>
                                      handleDelete({
                                        id: id,
                                      })
                                    }
                                  >
                                    <BsFillXSquareFill
                                      size={32}
                                      color="#d11c1c"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <button className={styles.button} onClick={create}>
            สร้างแผนการเดินทาง
          </button>
        </div>
      </div>
    </PageContainer>
  );
}
