import express from "express"
import cors from "cors"
import "dotenv/config.js"

//app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//basic endpoints
app.get("/",(req,res)=>{
    res.send("Minimal API Working")
})

app.get("/health",(req,res)=>{
    res.status(200).json({status: "OK", message: "Server is healthy"})
})

app.get("/test",(req,res)=>{
    res.json({
        message: "Test endpoint working",
        port: port,
        env: process.env.NODE_ENV || "development"
    })
})

app.listen(port,()=>{
    console.log(`Minimal server started on port ${port}`)
}).on('error', (err) => {
    console.error("Server failed to start:", err);
    process.exit(1);
});
