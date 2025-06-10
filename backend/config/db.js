import mongoose from "mongoose";
export const connectDB =async() => {
    await mongoose.connect(process.env.MongoDBStr).then(()=>console.log('DB connected'));
}