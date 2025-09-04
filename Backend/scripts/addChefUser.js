import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import "dotenv/config.js";

const addChefUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/fastship_order_nl");
        
        // Check if any admin exists
        const adminExists = await userModel.findOne({ role: "admin" });
        if (!adminExists) {
            const email = process.env.ADMIN_EMAIL || "admin@fastship.com";
            const password = process.env.ADMIN_PASSWORD || "admin123";
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            const admin = new userModel({
                name: "System Admin",
                email: email,
                password: hashedPassword,
                role: "admin"
            });
            
            await admin.save();
            console.log(`Admin user created: ${email}`);
        } else {
            console.log("Admin user already exists");
        }
        
        console.log("Admin setup completed!");
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

addChefUser();
