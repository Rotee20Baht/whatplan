import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request) {
  const body = await request.json();
  
  try{
    const place = await prisma.place.create({
      data: {
        name: body.name,
        types: body.types,
        province: body.province,
        amphure: body.amphure,
        description: body.description,
        location: {
          create: {
            lat: body.location.lat,
            lng: body.location.lng,
          },
        },
        openingHours: {
          createMany: {
            data: body.opening_hours
          },
        },
        images: {
          createMany: {
            data: body.images
          }
        },
      },
    });
    console.log(place)
    return NextResponse.json(place);
  }catch(err){
    console.log(err)
    return NextResponse.json(err);
  }
}
