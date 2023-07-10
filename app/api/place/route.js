import { NextResponse } from "next/server";
import Place from "@/app/models/placeModel";
import connectDB from "@/app/libs/database";

connectDB();

export async function POST(request) {
  try{
    const body = await request.json();
    const { name } = body;
    
    const place = await Place.findOne({ name: name });
    if(place) throw new Error('สถานที่นี้มีอยู่ในระบบแล้ว');

    const newPlace = new Place(body);
    await newPlace.save();

    return NextResponse.json({ msg: "เพิ่มข้อมูลสถานที่สำเร็จ!"}, { status: 200 });
  }
  catch(error){
    console.log(error)
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}
