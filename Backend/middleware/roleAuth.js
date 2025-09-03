import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";

// Middleware to check if user has specific role
const requireRole = (requiredRole) => {
    return async (req, res, next) => {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Not Authorized! Login Again" })
        }
        try {
            const token_decode = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findById(token_decode.id);
            
            if (!user) {
                return res.json({ success: false, message: "User not found" })
            }
            
            if (user.role !== requiredRole) {
                return res.json({ success: false, message: `Access denied. ${requiredRole} role required.` })
            }
            
            req.body.userId = token_decode.id;
            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Error" })
        }
    }
}

// Middleware to check if user has any of the specified roles
const requireAnyRole = (roles) => {
    return async (req, res, next) => {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Not Authorized! Login Again" })
        }
        try {
            const token_decode = jwt.verify(token, process.env.JWT_SECRET);
            const user = await userModel.findById(token_decode.id);
            
            if (!user) {
                return res.json({ success: false, message: "User not found" })
            }
            
            if (!roles.includes(user.role)) {
                return res.json({ success: false, message: `Access denied. One of these roles required: ${roles.join(', ')}` })
            }
            
            req.body.userId = token_decode.id;
            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Error" })
        }
    }
}

export { requireRole, requireAnyRole };
