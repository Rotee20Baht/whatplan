"use client"

import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import Link from "next/link";

import Card from "../components/Card";
import Container from "../components/Container";
import axios from "axios";
import Loader from "../components/Loader/Loader";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { MdDeleteForever } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';

export default function Planned() {

  const { data: session } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const [plansData, setPlansData] = useState([]);

  const MySwal = withReactContent(Swal);

  const fetchData = () => {
    axios.get(`/api/plan?author=${session?.user._id}`)
    .then(data => {
      setPlansData(data.data)
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoaded(true))
  }

  useEffect(() => {
    fetchData()
  }, [session])

  const handleClick = (id, name, img, province) => {
    MySwal.fire({
      title: <p>คุณต้องการลบแผนการท่องเที่ยว?</p>,
      html: (
        <Card title={name} img={img} province={province} />
      ),  
      showCancelButton: true,
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ลบ',
      confirmButtonColor: '#ef4444'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/plan?id=${id}`)
        .then(data => {
          console.log(data)
          MySwal.fire({
            icon: 'success',
            title: data?.data.msg,
            showConfirmButton: false,
            showCloseButton: true,
            didDestroy: () => fetchData()
          })
        })
        .catch(data => {
          Swal.fire({
            icon: 'error',
            title: data?.data.msg
          })
        })
      }
    })
  }

  if(!isLoaded){
    return (
      <div className="py-20 pb-4">
        <Container>
          <div className="w-full flex flex-row justify-center">
            <Loader />
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="py-20 pb-4">
      <Container>
        <div className="w-full h-auto flex flex-col gap-4 mt-4">
          <div className="w-full border rounded-lg shadow-sm relative">
            <h1 className="font-semibold text-xl absolute bg-white -top-4 left-4 px-2">แผนการท่องเที่ยวของฉัน</h1>
            <div 
              className="
                w-full 
                h-auto 
                px-4
                pb-4
                pt-5
                grid 
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-4"
              >
                {plansData?.length <= 0 && (
                  <div className="text-center col-span-full">ไม่พบข้อมูลแผนการท่องเที่ยว</div>
                )}

                {plansData?.map(item => (
                  <div className="relative">
                    <div className="flex flex-row items-center justify-end gap-2 absolute top-3 right-3 w-full h-auto z-10">
                      <button 
                        className="
                          bg-white
                          p-2
                          rounded-md
                        " 
                        onClick={() => handleClick(item._id, item.name, item.lists[0][0].placeId.images[0], item.lists[0][0].placeId.province)}
                      >
                        <BiEditAlt className="text-neutral-600 text-xl"/>
                      </button>
                      <button 
                        className="
                          bg-red-500
                          p-2 
                          rounded-md
                        " 
                        onClick={() => handleClick(item._id, item.name, item.lists[0][0].placeId.images[0], item.lists[0][0].placeId.province)}
                      >
                        <MdDeleteForever className="text-white text-xl"/>
                      </button>
                    </div>
                    <Link href={`/plan/${item._id}`} key={item._id}>
                      <Card title={item.name} img={item.lists[0][0].placeId.images[0]} province={item.lists[0][0].placeId.province}/>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>  
      </Container>
    </div>
  );
}
