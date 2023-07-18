import Container from "../components/Container";
import Selectbar from "../components/select/Selectbar";
import Card from "../components/Card";
import Link from "next/link";

export default function Plan() {
  const plans = [
    {

      title: "ประสบการณ์สนุกในกรุงเทพฯ",
      provice: "กรุงเทพมหานคร",
      img: "https://youimg1.tripcdn.com/target/fd/tg/g1/M04/5F/2C/CghzfFW4TKGAaaOlAAX9H1cljyU402_C_670_770_R5.jpg_.webp",
      rating: "5"
    },
    {
  
      title: "เที่ยว ณ เชียงใหม่",
      provice: "เชียงใหม่",
      img: "https://youimg1.tripcdn.com/target/100p0y000000lmg0c3B71_C_670_770_R5.jpg_.webp",
      rating: "5"
    },
    {
  
      title: "วนหอนาฬิกาตรัง",
      provice: "ตรัง",
      img: "https://youimg1.tripcdn.com/target/0ww6z120008zanvdt0EA9_C_760_506_R5.jpg?proc=source/trip",
      rating: "5"
    },
    {
      
      title: "เมืองเก่าภูเก็ต",
      provice: "ภูเก็ต",
      img: "https://youimg1.tripcdn.com/target/100v10000000p5dg64786_C_760_506_Q70.jpg?proc=source%2ftrip",
      rating: "5"
    },
  ]

  return (
    <div className="pt-20 pb-4">
      <Container>
        <div className="w-full h-auto flex flex-col gap-4">
          <h1 className="font-semibold text-xl">ค้นหาแผนการท่องเที่ยวทั้งหมด</h1>
          <Selectbar title1="จังหวัด" title2="ประเภทการท่องเที่ยว" title3="จำนวนวันในแผน" />
          <div
            className="
              w-full 
              h-auto 
              border 
              rounded-lg 
              shadow-sm 
              p-4 
              grid 
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-4"
          >
            {plans.map((item) => (
              <Link href={`/plan/${item.title}`}>
                <Card
                  key={item.title}
                  title={item.title}
                  province={item.provice}
                  img={item.img}
                  rating={item.rating}
                />
              </Link>

            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}