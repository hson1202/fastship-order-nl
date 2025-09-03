import ingredientRequestModel from "../models/ingredientRequestModel.js";
import userModel from "../models/userModel.js";

// Tạo yêu cầu nguyên liệu mới (Chef only)
const createIngredientRequest = async (req, res) => {
    try {
        const { ingredientName, quantity, unit, description, neededByDate } = req.body;
        const chef = await userModel.findById(req.body.userId);

        if (!chef || chef.role !== 'chef') {
            return res.json({ success: false, message: "Only chefs can create ingredient requests" });
        }

        const newRequest = new ingredientRequestModel({
            chefId: req.body.userId,
            chefName: chef.name,
            chefRole: chef.role,
            restaurant: chef.restaurant || 'Chưa cập nhật',
            ingredientName: ingredientName,
            quantity: quantity,
            unit: unit,
            description: description || '',
            neededByDate: neededByDate
        });

        await newRequest.save();
        res.json({ 
            success: true, 
            message: "Ingredient request created successfully", 
            requestId: newRequest._id 
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating ingredient request" });
    }
}

// Lấy yêu cầu của chef hiện tại
const getChefRequests = async (req, res) => {
    try {
        const requests = await ingredientRequestModel.find({ chefId: req.body.userId })
            .sort({ createdAt: -1 });
        res.json({ success: true, data: requests });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching requests" });
    }
}

// Lấy tất cả yêu cầu (Admin only)
const getAllRequests = async (req, res) => {
    try {
        const requests = await ingredientRequestModel.find({})
            .populate('chefId', 'name email restaurant')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: requests });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching all requests" });
    }
}

// Cập nhật trạng thái yêu cầu (Admin only)
const updateRequestStatus = async (req, res) => {
    try {
        const { 
            requestId, 
            status, 
            adminNotes, 
            rejectionReason, 
            estimatedPrice, 
            supplier,
            actualPrice 
        } = req.body;
        
        const admin = await userModel.findById(req.body.userId);

        const updateData = {
            status: status,
            adminNotes: adminNotes || ''
        };

        if (status === 'approved') {
            updateData.approvedBy = admin.name;
            updateData.approvedDate = new Date();
            updateData.estimatedPrice = estimatedPrice || 0;
            updateData.supplier = supplier || '';
        } else if (status === 'rejected') {
            updateData.rejectionReason = rejectionReason || '';
        } else if (status === 'completed') {
            updateData.actualPrice = actualPrice || 0;
        }

        await ingredientRequestModel.findByIdAndUpdate(requestId, updateData);
        res.json({ success: true, message: `Request ${status} successfully` });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating request status" });
    }
}

// Lấy chi tiết yêu cầu
const getRequestDetails = async (req, res) => {
    try {
        const request = await ingredientRequestModel.findById(req.params.requestId)
            .populate('chefId', 'name email restaurant');
        
        if (!request) {
            return res.json({ success: false, message: "Request not found" });
        }

        res.json({ success: true, data: request });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching request details" });
    }
}

// Hủy yêu cầu (Chef chỉ có thể hủy yêu cầu pending)
const cancelRequest = async (req, res) => {
    try {
        const request = await ingredientRequestModel.findById(req.body.requestId);
        
        if (!request) {
            return res.json({ success: false, message: "Request not found" });
        }

        if (request.chefId.toString() !== req.body.userId) {
            return res.json({ success: false, message: "Not authorized" });
        }

        if (request.status !== 'pending') {
            return res.json({ success: false, message: "Can only cancel pending requests" });
        }

        await ingredientRequestModel.findByIdAndUpdate(req.body.requestId, { 
            status: 'rejected', 
            rejectionReason: 'Cancelled by chef' 
        });
        
        res.json({ success: true, message: "Request cancelled successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error cancelling request" });
    }
}

// Cập nhật thông tin restaurant của chef
const updateChefRestaurant = async (req, res) => {
    try {
        const { restaurant } = req.body;
        
        await userModel.findByIdAndUpdate(req.body.userId, { restaurant: restaurant });
        res.json({ success: true, message: "Restaurant updated successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating restaurant" });
    }
}

// Thống kê yêu cầu
const getRequestStats = async (req, res) => {
    try {
        const stats = await ingredientRequestModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    totalEstimatedValue: { $sum: "$estimatedPrice" },
                    totalActualValue: { $sum: "$actualPrice" }
                }
            }
        ]);

        res.json({ success: true, data: stats });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching stats" });
    }
}

export { 
    createIngredientRequest, 
    getChefRequests, 
    getAllRequests, 
    updateRequestStatus, 
    getRequestDetails, 
    cancelRequest,
    updateChefRestaurant,
    getRequestStats 
}
