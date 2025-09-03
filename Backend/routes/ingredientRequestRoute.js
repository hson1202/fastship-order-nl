import express from "express"
import { 
    createIngredientRequest, 
    getChefRequests, 
    getAllRequests, 
    updateRequestStatus, 
    getRequestDetails, 
    cancelRequest,
    updateChefRestaurant,
    getRequestStats 
} from "../controllers/ingredientRequestController.js"
import { requireRole, requireAnyRole } from "../middleware/roleAuth.js"

const ingredientRequestRouter = express.Router();

// Chef routes
ingredientRequestRouter.post("/create", requireRole('chef'), createIngredientRequest)
ingredientRequestRouter.get("/chef", requireRole('chef'), getChefRequests)
ingredientRequestRouter.post("/cancel", requireRole('chef'), cancelRequest)
ingredientRequestRouter.post("/update-restaurant", requireRole('chef'), updateChefRestaurant)

// Admin routes
ingredientRequestRouter.get("/all", requireRole('admin'), getAllRequests)
ingredientRequestRouter.post("/updatestatus", requireRole('admin'), updateRequestStatus)
ingredientRequestRouter.get("/stats", requireRole('admin'), getRequestStats)

// Shared routes
ingredientRequestRouter.get("/details/:requestId", requireAnyRole(['chef', 'admin']), getRequestDetails)

export default ingredientRequestRouter;
