import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fastship_order_nl').then(()=>console.log("FASTSHIP ORDER NL DB Connected"));
}
