import { NextResponse } from "next/server";
import mongoose from 'mongoose';
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
    const limits = request.nextUrl.searchParams.get('limit') || 12;
    const start = request.nextUrl.searchParams.get('start') || 0;
    
    let planQuery = Plan
    .find()
    .populate('author', '_id name email image role')
    .populate('lists.placeId', '_id name province amphure types description images');
    
    if (placeId) {
      planQuery = planQuery.where('_id').equals(placeId);
    }

    planQuery = planQuery.limit(limits).skip(start);
    
    const plans = await planQuery.exec();
    if(!plans || plans.length <= 0) throw new Error('ไม่พบข้อมูลสถานที่ในระบบ');

    return NextResponse.json(plans);
  }
  catch(error){
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}

export async function GET(request) {
  try{
    const placeId = request.nextUrl.searchParams.get('id')
    const province = request.nextUrl.searchParams.get('province')
    const amphure = request.nextUrl.searchParams.get('amphure')
    const limits = request.nextUrl.searchParams.get('limit') || 12;
    const start = request.nextUrl.searchParams.get('start') || 0;

    const pipeline = [];

    if (placeId) {
      // If the 'id' parameter is present, find a specific plan by that 'id'
      pipeline.push(
        { $match: { _id: mongoose.Types.ObjectId(placeId) } }
      );
    } else {
      // If the 'id' parameter is not present, add conditions for province and amphure
      if (province) {
        pipeline.push(
          { $unwind: '$lists' }, // Unwind the 'lists' array
          { $match: { 'lists.placeId.province': province } } // Match based on 'province' in nested 'placeId'
        );
      }
      if (amphure) {
        pipeline.push(
          { $unwind: '$lists' }, // Unwind the 'lists' array
          { $match: { 'lists.placeId.amphure': amphure } } // Match based on 'amphure' in nested 'placeId'
        );
      }
      pipeline.push(
        { $limit: parseInt(limits) }
      );
    }

    pipeline.push(
      { 
        $lookup: {
          from: 'users', // The collection name for 'author'
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: '$author' }, // Flatten the 'author' array
      {
        $unwind: '$lists'
      },
      {
        $lookup: {
          from: 'places', // The collection name for 'place'
          localField: 'lists.placeId',
          foreignField: '_id',
          as: 'lists.placeId'
        }
      },
      {
        $unwind: '$lists.placeId'
      },
      {
        $group: {
          _id: '$_id',
          author: { $first: '$author' },
          name: { $first: '$name' },
          starts: { $first: '$starts' },
          lists: { $push: '$lists' }
        }
      },
      {
        $project: {
          _id: 1,
          author: 1,
          name: 1,
          starts: 1,
          'lists._id': 1, // Include specific fields from 'lists.placeId'
          'lists.placeId.name': 1,
          'lists.placeId.province': 1,
          'lists.placeId.amphure': 1,
          'lists.placeId.types': 1,
          'lists.placeId.description': 1,
          'lists.placeId.images': 1,
        },
      }
    );

    const plans = await Plan.aggregate(pipeline);

    return NextResponse.json(plans);
  }
  catch(error){
    return NextResponse.json({ error: String(error) }, { status: 400 });
  }
}