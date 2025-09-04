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
console.log("Starting FASTSHIP ORDER NL Backend...");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

const app=express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
console.log("Attempting to connect to database...");
connectDB()
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch(err => {
        console.error("Database connection failed:", err);
        // Don't exit immediately, let server run without DB for testing
        console.log("Continuing without database connection...");
    });

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

app.get("/health",(req,res)=>{
    res.status(200).json({status: "OK", message: "Server is healthy"})
})

console.log("Setting up routes...");

console.log("Starting server...");
app.listen(port,()=>{
    console.log(`✅ Server started successfully on port ${port}`);
    console.log(`Health check: http://localhost:${port}/health`);
}).on('error', (err) => {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
});

//mongodb+srv://greatstack:186312@cluster0.ovanjzw.mongodb.net/?
//retryWrites=true&w=majority&appName=Cluster0