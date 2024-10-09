// Import express and create a router
import express from "express";
const specialtyFoodRouter = express.Router();

// Import multer
import multer from "multer";

// Create Temporary storage before Cloundinary upload
const upload = multer({ dest: "uploads/" });

// Import controller
import {
    getAllSpecialtyFood,
    getPageCreateSpecialtyFood,
    createSpecialtyFood,
    getPageEditSpecialtyFood,
    editSpecialtyFood,
    deleteSpecialtyFood,
} from "../../Controller/admin/specialtyFood.controller.js";

// Get all specialtyFood
specialtyFoodRouter.get("/", getAllSpecialtyFood);

// Get page create specialtyFood
specialtyFoodRouter.get("/create", getPageCreateSpecialtyFood);

// Create specialtyFood
specialtyFoodRouter.post("/create", upload.single("image"), createSpecialtyFood);

// Get page edit specialtyFood
specialtyFoodRouter.get("/edit/:id", getPageEditSpecialtyFood);

// Edit specialtyFood
specialtyFoodRouter.patch("/edit/:id", upload.single("image"), editSpecialtyFood);

// Delete specialtyFood
specialtyFoodRouter.delete("/delete/:id", deleteSpecialtyFood);

// Export router
export default specialtyFoodRouter;
