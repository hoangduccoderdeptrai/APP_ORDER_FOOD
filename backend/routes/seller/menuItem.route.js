import express from "express";
const menuItemRoute = express.Router();
import multer from "multer";
import { authenticate, authorizeRoles } from "../../middleware/user/authentication.js";
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

// Test authorization
menuItemRoute.get("/test-auth", authenticate, authorizeRoles("admin", "seller"), (req, res) => {
    return res.status(200).json({ msg: "Accept grant", role: req.user.role });
});
menuItemRoute.get("/test-author-user", authenticate, (req, res) => {
    return res.status(200).json({ user: req.user });
});

export default menuItemRoute;
