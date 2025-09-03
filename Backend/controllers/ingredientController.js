import ingredientModel from "../models/ingredientModel.js";
import fs from 'fs'

// Thêm nguyên liệu mới (Admin only)
const addIngredient = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const ingredient = new ingredientModel({
        name: req.body.name,
        description: req.body.description,
        unit: req.body.unit,
        pricePerUnit: req.body.pricePerUnit,
        category: req.body.category,
        supplier: req.body.supplier,
        currentStock: req.body.currentStock || 0,
        minStockLevel: req.body.minStockLevel || 10,
        image: image_filename
    })

    try {
        await ingredient.save();
        res.json({ success: true, message: "Ingredient Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// Lấy danh sách tất cả nguyên liệu
const listIngredient = async (req, res) => {
    try {
        const ingredients = await ingredientModel.find({ isActive: true });
        res.json({ success: true, data: ingredients })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Lấy danh sách tất cả nguyên liệu cho admin (bao gồm cả inactive)
const listAllIngredients = async (req, res) => {
    try {
        const ingredients = await ingredientModel.find({});
        res.json({ success: true, data: ingredients })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Xóa nguyên liệu (Admin only)
const removeIngredient = async (req, res) => {
    try {
        const ingredient = await ingredientModel.findById(req.body.id);
        if (ingredient.image) {
            fs.unlink(`uploads/${ingredient.image}`, () => { })
        }

        await ingredientModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Ingredient Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Cập nhật nguyên liệu (Admin only)
const updateIngredient = async (req, res) => {
    try {
        const updateData = {
            name: req.body.name,
            description: req.body.description,
            unit: req.body.unit,
            pricePerUnit: req.body.pricePerUnit,
            category: req.body.category,
            supplier: req.body.supplier,
            currentStock: req.body.currentStock,
            minStockLevel: req.body.minStockLevel,
            isActive: req.body.isActive
        };

        if (req.file) {
            // Xóa ảnh cũ nếu có
            const ingredient = await ingredientModel.findById(req.body.id);
            if (ingredient.image) {
                fs.unlink(`uploads/${ingredient.image}`, () => { })
            }
            updateData.image = req.file.filename;
        }

        await ingredientModel.findByIdAndUpdate(req.body.id, updateData);
        res.json({ success: true, message: "Ingredient Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Cập nhật stock
const updateStock = async (req, res) => {
    try {
        await ingredientModel.findByIdAndUpdate(req.body.id, {
            currentStock: req.body.currentStock
        });
        res.json({ success: true, message: "Stock Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { addIngredient, listIngredient, listAllIngredients, removeIngredient, updateIngredient, updateStock }
