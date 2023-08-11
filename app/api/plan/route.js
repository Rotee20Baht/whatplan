import { NextResponse } from "next/server";
import connectDB from "@/app/libs/database";
import Place from "@/app/models/placeModel";
import User from "@/app/models/userModel";
import Plan from "@/app/models/planModel";
connectDB();


export async function POST(request) {
  try{
    const body = await request.json();
    console.log(body)

    const newPlan = new Plan(body);
    await newPlan.save();

    return NextResponse.json({ msg: "เพิ่มข้อมูลสถานที่สำเร็จ!"}, { status: 200 });
  }
  catch(error){
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

export async function GET(request) {
  try{

    const placeId = request.nextUrl.searchParams.get('id');
    const name = request.nextUrl.searchParams.get('name');
    const author = request.nextUrl.searchParams.get('author');
    const limits = request.nextUrl.searchParams.get('limit') || 12;
    const start = request.nextUrl.searchParams.get('start') || 0;

    let planQuery;

    if (placeId) {
      planQuery = Plan.findById(placeId)
      .populate('author', '_id name email image role')
      .populate('lists.placeId', '_id name province amphure types description images');
    }else{
      planQuery = Plan
      .find()
      .populate('author', '_id name email image role')
      .populate('lists.placeId', '_id name province amphure types description images');
      planQuery = planQuery.limit(limits).skip(start);
    }

    if(author)
      planQuery.where('author', author)
    
    const plans = await planQuery.exec();
    if(!plans || plans.length <= 0) throw new Error('ไม่พบข้อมูลสถานที่ในระบบ');

    return NextResponse.json(plans);
  }
  catch(error){
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

export async function DELETE(request){
  try{
    const planId = request.nextUrl.searchParams.get('id');
    console.log(planId)

    if(!planId)
      throw new Error('กรุณาระบุไอดีแผนที่ต้องการลบ');
    
    const plan = await Plan.findByIdAndDelete(planId);

    if(!plan)
      throw new Error('ไม่พบแผนที่ตต้องการลบ');

    return NextResponse.json({ msg: "ลบแผนการท่องเที่ยวสำเร็จ!"}, { status: 200 });
  }catch(error){
    return NextResponse.json({ error: String(error)}, { status: 400 })
  }
}
