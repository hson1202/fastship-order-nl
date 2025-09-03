import ingredientOrderModel from "../models/ingredientOrderModel.js";
import ingredientModel from "../models/ingredientModel.js";
import userModel from "../models/userModel.js";

// Tạo đơn đặt nguyên liệu (Chef only)
const createIngredientOrder = async (req, res) => {
    try {
        const { items, neededByDate, notes } = req.body;
        const chef = await userModel.findById(req.body.userId);

        if (!chef || chef.role !== 'chef') {
            return res.json({ success: false, message: "Only chefs can create ingredient orders" });
        }

        // Validate và tính toán giá
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const ingredient = await ingredientModel.findById(item.ingredientId);
            if (!ingredient || !ingredient.isActive) {
                return res.json({ success: false, message: `Ingredient ${item.ingredientName} not found or inactive` });
            }

            const totalPrice = item.quantity * ingredient.pricePerUnit;
            totalAmount += totalPrice;

            orderItems.push({
                ingredientId: item.ingredientId,
                ingredientName: ingredient.name,
                quantity: item.quantity,
                unit: ingredient.unit,
                pricePerUnit: ingredient.pricePerUnit,
                totalPrice: totalPrice
            });
        }

        const newOrder = new ingredientOrderModel({
            chefId: req.body.userId,
            chefName: chef.name,
            items: orderItems,
            totalAmount: totalAmount,
            neededByDate: neededByDate,
            notes: notes
        });

        await newOrder.save();
        res.json({ success: true, message: "Ingredient order created successfully", orderId: newOrder._id });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating order" });
    }
}

// Lấy đơn hàng của chef hiện tại
const getChefOrders = async (req, res) => {
    try {
        const orders = await ingredientOrderModel.find({ chefId: req.body.userId })
            .populate('items.ingredientId')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Lấy tất cả đơn hàng (Admin only)
const getAllOrders = async (req, res) => {
    try {
        const orders = await ingredientOrderModel.find({})
            .populate('items.ingredientId')
            .populate('chefId', 'name email')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Cập nhật trạng thái đơn hàng (Admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status, adminNotes, rejectionReason } = req.body;
        const admin = await userModel.findById(req.body.userId);

        const updateData = {
            status: status,
            adminNotes: adminNotes
        };

        if (status === 'approved') {
            updateData.approvedBy = admin.name;
            updateData.approvedDate = new Date();
        } else if (status === 'rejected') {
            updateData.rejectionReason = rejectionReason;
        }

        await ingredientOrderModel.findByIdAndUpdate(orderId, updateData);
        res.json({ success: true, message: `Order ${status} successfully` });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating order status" });
    }
}

// Lấy chi tiết đơn hàng
const getOrderDetails = async (req, res) => {
    try {
        const order = await ingredientOrderModel.findById(req.params.orderId)
            .populate('items.ingredientId')
            .populate('chefId', 'name email');
        
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, data: order });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Hủy đơn hàng (Chef chỉ có thể hủy đơn pending)
const cancelOrder = async (req, res) => {
    try {
        const order = await ingredientOrderModel.findById(req.body.orderId);
        
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        if (order.chefId.toString() !== req.body.userId) {
            return res.json({ success: false, message: "Not authorized" });
        }

        if (order.status !== 'pending') {
            return res.json({ success: false, message: "Can only cancel pending orders" });
        }

        await ingredientOrderModel.findByIdAndUpdate(req.body.orderId, { status: 'rejected', rejectionReason: 'Cancelled by chef' });
        res.json({ success: true, message: "Order cancelled successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Lấy thống kê đơn hàng
const getOrderStats = async (req, res) => {
    try {
        const stats = await ingredientOrderModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    totalAmount: { $sum: "$totalAmount" }
                }
            }
        ]);

        res.json({ success: true, data: stats });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { 
    createIngredientOrder, 
    getChefOrders, 
    getAllOrders, 
    updateOrderStatus, 
    getOrderDetails, 
    cancelOrder, 
    getOrderStats 
}
