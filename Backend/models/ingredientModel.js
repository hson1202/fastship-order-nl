import mongoose from "mongoose"

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    unit: { type: String, required: true }, // kg, lít, cái, etc.
    pricePerUnit: { type: Number, required: true },
    category: { 
        type: String, 
        required: true,
        enum: ['Thịt', 'Rau củ', 'Gia vị', 'Hải sản', 'Ngũ cốc', 'Sữa & trứng', 'Khác']
    },
    supplier: { type: String, required: true },
    currentStock: { type: Number, default: 0 },
    minStockLevel: { type: Number, default: 10 },
    image: { type: String, required: false },
    isActive: { type: Boolean, default: true }
}, { timestamps: true })

const ingredientModel = mongoose.models.ingredient || mongoose.model("ingredient", ingredientSchema);

export default ingredientModel;
