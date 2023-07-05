import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/app/models/userModel";
import connectDB from "@/app/libs/database";

connectDB();

export async function POST(request) {
  try{
    const body = await request.json();
    let { email, name, password } = body;

    const user = await User.findOne({ email: email });
    if(user) throw new Error('Email already existed!');

    if(password){
      password  = await bcrypt.hash(password, 12);
    }
    
    const newUser = new User({
      name: name,
      email: email,
      password: password,
    })
  
    await newUser.save();

    return NextResponse.json({ msg: "Successfully created new User: " + newUser}, { status: 200 });
  }catch(error){
    return NextResponse.json({ error: "Error on '/api/register': " + error }, {status: 400 });
  }
}
