import multer from "multer";
import express from "express";
import {
    createMenuItem,
    deleteMenuItem,
    updateMenuItem,
    fetchAllItems
} from "../../Controller/seller/menuItem.controller.js";
//Temporory storage before Cloundinary upload
const menuItemRoute = express.Router();
const upload = multer({ dest: "uploads/" });

menuItemRoute.post("/upload-items", upload.array("images", 3), createMenuItem);
menuItemRoute.delete("/delete-items/:id",deleteMenuItem);
menuItemRoute.patch("/update-items/:id",upload.array("images",3), updateMenuItem);
menuItemRoute.get("/all-items/:id",fetchAllItems)
    


export default menuItemRoute;
