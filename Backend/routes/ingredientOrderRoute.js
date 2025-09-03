import express from "express"
import { 
    createIngredientOrder, 
    getChefOrders, 
    getAllOrders, 
    updateOrderStatus, 
    getOrderDetails, 
    cancelOrder, 
    getOrderStats 
} from "../controllers/ingredientOrderController.js"
import { requireRole, requireAnyRole } from "../middleware/roleAuth.js"

const ingredientOrderRouter = express.Router();

// Chef routes
ingredientOrderRouter.post("/create", requireRole('chef'), createIngredientOrder)
ingredientOrderRouter.get("/chef", requireRole('chef'), getChefOrders)
ingredientOrderRouter.post("/cancel", requireRole('chef'), cancelOrder)

// Admin routes
ingredientOrderRouter.get("/all", requireRole('admin'), getAllOrders)
ingredientOrderRouter.post("/updatestatus", requireRole('admin'), updateOrderStatus)
ingredientOrderRouter.get("/stats", requireRole('admin'), getOrderStats)

// Shared routes
ingredientOrderRouter.get("/details/:orderId", requireAnyRole(['chef', 'admin']), getOrderDetails)

export default ingredientOrderRouter;
