import mongoose from "mongoose";

const connectDB = async () => {
  if(mongoose.connections[0].readyState){
    return true;
  }

  try{
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB");
    return true;
  }catch(err){
    console.log(err)
  }
}

export default connectDB;