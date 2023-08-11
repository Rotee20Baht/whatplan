"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from 'next-auth/react';
import Link from "next/link";

import Card from "../components/Card";
import Container from "../components/Container";
import axios from "axios";
import Loader from "../components/Loader/Loader";

export default function Planned() {

  const { data: session } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const [plansData, setPlansData] = useState();

  useEffect(() => {
    axios.get(`/api/plan?author=${session?.user._id}`)
    .then(data => {
      setPlansData(data.data)
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoaded(true))
  }, [session])

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
                {plansData?.map(item => (
                  <Link href={`/plan/${item._id}`} key={item._id}>
                    <Card title={item.name} img={item.lists[0][0].placeId.images[0]} province={item.lists[0][0].placeId.province}/>
                  </Link>
                ))}
            </div>
          </div>
        </div>  
      </Container>
    </div>
  );
}
