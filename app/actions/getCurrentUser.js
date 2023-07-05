import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import connectDB from "../libs/database";
import User from "../models/userModel";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(){
  try {
    connectDB()
    const session = await getSession();
    
    if(!session) {
      return null;
    }

    const currentUser = await User.findOne({ email: session.user.email });
    console.log(currentUser)

    if (!currentUser) {
      return null;
    }

    return currentUser;

  }catch(error) {
    return null;
  }
}