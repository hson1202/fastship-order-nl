import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import ingredientRouter from "./routes/ingredientRoute.js"
import ingredientOrderRouter from "./routes/ingredientOrderRoute.js"
import ingredientRequestRouter from "./routes/ingredientRequestRoute.js"
import "dotenv/config.js"

//app config
const app=express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter )
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/ingredient",ingredientRouter)
app.use("/api/ingredient-order",ingredientOrderRouter)
app.use("/api/ingredient-request",ingredientRequestRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

//mongodb+srv://greatstack:186312@cluster0.ovanjzw.mongodb.net/?
//retryWrites=true&w=majority&appName=Cluster0