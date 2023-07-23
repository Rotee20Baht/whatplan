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

export async function GET(request) {
  try{
    let filters = {};
    if(request.nextUrl.searchParams.has('name'))
      filters.name = request.nextUrl.searchParams.get('name')

    if(request.nextUrl.searchParams.has('province'))
      filters.province = request.nextUrl.searchParams.get('province')

    if(request.nextUrl.searchParams.has('amphure'))
      filters.amphure = request.nextUrl.searchParams.get('amphure')

    if(request.nextUrl.searchParams.has('types'))
      filters.types = request.nextUrl.searchParams.get('types')

    const limits = request.nextUrl.searchParams.get('limit') || 12;
    const start = request.nextUrl.searchParams.get('start') || 0;
      
    const place = await Place.find({ ...filters, name: new RegExp(filters.name, 'i') }).limit(limits).skip(start);
    if(!place || place.length <= 0) throw new Error('ไม่พบข้อมูลสถานที่ในระบบ');

    return NextResponse.json(place);
  }
  catch(error){
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}
