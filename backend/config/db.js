import mongoose from "mongoose";

export const connectDB =async() => {
    await mongoose.connect('mongodb+srv://saikumar:saikumar@cluster1.8ni026f.mongodb.net/project').then(()=>console.log('DB connected'));
}