import multer from "multer";
import express from "express";
import {
    createMenuItem,
    deleteMenuItem,
    updateMenuItem,
} from "../../Controller/seller/menuItem.controller.js";
//Temporory storage before Cloundinary upload
const menuItemRoute = express.Router();
const upload = multer({ dest: "uploads/" });

menuItemRoute.post("/upload-items", upload.array("images", 3), createMenuItem);
menuItemRoute.delete("/delete-items", deleteMenuItem);
menuItemRoute.patch("/update-items", updateMenuItem);
menuItemRoute.get("/all-items", (req, res) => {
    res.status(200).json({ msg: "hello world" });
});

export default menuItemRoute;
