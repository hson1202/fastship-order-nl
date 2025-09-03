import mongoose from "mongoose"

const ingredientRequestSchema = new mongoose.Schema({
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    chefName: { type: String, required: true },
    chefRole: { type: String, required: true },
    restaurant: { type: String, required: true },
    
    // Thông tin nguyên liệu chef muốn nhập
    ingredientName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true }, // bó, kg, ml, l, etc.
    description: { type: String, default: '' }, // ghi chú cho nhà cung cấp
    
    // Trạng thái xử lý
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected', 'completed'], 
        default: 'pending' 
    },
    
    // Thông tin admin xử lý
    adminNotes: { type: String, default: '' },
    approvedBy: { type: String, default: '' },
    approvedDate: { type: Date },
    rejectionReason: { type: String, default: '' },
    
    // Thông tin giá và nhà cung cấp (admin sẽ điền)
    estimatedPrice: { type: Number, default: 0 },
    supplier: { type: String, default: '' },
    actualPrice: { type: Number, default: 0 },
    
    // Ngày yêu cầu và ngày cần
    requestDate: { type: Date, default: Date.now },
    neededByDate: { type: Date, required: true }
}, { timestamps: true })

const ingredientRequestModel = mongoose.models.ingredientRequest || mongoose.model("ingredientRequest", ingredientRequestSchema);

export default ingredientRequestModel;
