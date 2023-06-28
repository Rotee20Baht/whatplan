"use client";
import Link from "next/link";
import Card from "../components/Card";
import Container from "../components/Container";
export default function Planned() {
  const items = [
    {
      id: 1,
      title: "Palm tree",
      img: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80",
    },
    {
      id: 2,
      title: "Palm tree with road",
      img: "https://images.unsplash.com/photo-1565340076637-825894a74ca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    },
  ];

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
                {items.map(item => (
                  <Link href={`/plan/${item.id}`} key={item.title}>
                    <Card title={item.title} img={item.img} />
                  </Link>
                ))}
            </div>
          </div>
        </div>  
      </Container>
    </div>
  );
}
