import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import "dotenv/config.js";

const createChefAccount = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/fastship_order_nl");
        
        // Create chef user
        const chefEmail = "chef@fastship.com";
        const chefPassword = "chef123456";
        
        // Check if chef already exists
        const chefExists = await userModel.findOne({ email: chefEmail });
        if (chefExists) {
            console.log("Chef user already exists");
            console.log(`Email: ${chefEmail}`);
            console.log(`Password: ${chefPassword}`);
            process.exit(0);
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(chefPassword, salt);
        
        const chef = new userModel({
            name: "Head Chef",
            email: chefEmail,
            password: hashedPassword,
            role: "chef",
            restaurant: "FASTSHIP Kitchen"
        });
        
        await chef.save();
        console.log("🍳 Chef account created successfully!");
        console.log("=====================================");
        console.log(`📧 Email: ${chefEmail}`);
        console.log(`🔑 Password: ${chefPassword}`);
        console.log(`🏪 Restaurant: FASTSHIP Kitchen`);
        console.log("=====================================");
        
        process.exit(0);
    } catch (error) {
        console.error("Error creating chef account:", error);
        process.exit(1);
    }
};

createChefAccount();
