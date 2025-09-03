import express from "express"
import { addIngredient, listIngredient, listAllIngredients, removeIngredient, updateIngredient, updateStock } from "../controllers/ingredientController.js"
import multer from "multer"
import { requireRole, requireAnyRole } from "../middleware/roleAuth.js"

const ingredientRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

// Routes
ingredientRouter.post("/add", requireRole('admin'), upload.single("image"), addIngredient)
ingredientRouter.get("/list", requireAnyRole(['chef', 'admin']), listIngredient)
ingredientRouter.get("/listall", requireRole('admin'), listAllIngredients)
ingredientRouter.post("/remove", requireRole('admin'), removeIngredient)
ingredientRouter.post("/update", requireRole('admin'), upload.single("image"), updateIngredient)
ingredientRouter.post("/updatestock", requireRole('admin'), updateStock)

export default ingredientRouter;
