import mongoose from "mongoose"

const ingredientOrderSchema = new mongoose.Schema({
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    chefName: { type: String, required: true },
    items: [{
        ingredientId: { type: mongoose.Schema.Types.ObjectId, ref: 'ingredient', required: true },
        ingredientName: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
        pricePerUnit: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected', 'completed'], 
        default: 'pending' 
    },
    requestedDate: { type: Date, default: Date.now },
    neededByDate: { type: Date, required: true },
    notes: { type: String },
    adminNotes: { type: String },
    approvedBy: { type: String },
    approvedDate: { type: Date },
    rejectionReason: { type: String }
}, { timestamps: true })

const ingredientOrderModel = mongoose.models.ingredientOrder || mongoose.model("ingredientOrder", ingredientOrderSchema);

export default ingredientOrderModel;
