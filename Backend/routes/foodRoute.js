import express from "express"
import { addFood,listFood ,removeFood} from "../controllers/foodController.js"
import multer from "multer"//img storage system
import { requireRole } from "../middleware/roleAuth.js"

const foodRouter= express.Router();
//img storage engine
const storage =multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})

foodRouter.post("/add", requireRole('admin'), upload.single("image"), addFood)
foodRouter.get("/list", listFood) // Public - customers need to see food
foodRouter.post("/remove", requireRole('admin'), removeFood)


export default foodRouter;