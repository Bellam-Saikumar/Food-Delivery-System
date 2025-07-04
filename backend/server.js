import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


//app configg
const app= express();
const port= process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors())



//DB Connetion
connectDB();

//API Endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter); 

app.get('/',(req,res)=>{
    res.send("API working");
})


app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`)
})
