import express from "express";
const menuItemRoute = express.Router();
import multer from "multer";

// Import controller
import {
    createMenuItem,
    deleteMenuItem,
    updateMenuItem,
    fetchAllItems,
} from "../../Controller/seller/menuItem.controller.js";

//Temporory storage before Cloundinary upload
const upload = multer({ dest: "uploads/" });

menuItemRoute.post(
    "/upload-items",
    upload.fields([{ name: "images", maxCount: 3 }]),
    createMenuItem
);

menuItemRoute.delete("/delete-items/:id", deleteMenuItem);

menuItemRoute.patch(
    "/update-items/:id",
    upload.fields([{ name: "images", maxCount: 3 }]),
    updateMenuItem
);

menuItemRoute.get("/all-items", fetchAllItems);

export default menuItemRoute;
