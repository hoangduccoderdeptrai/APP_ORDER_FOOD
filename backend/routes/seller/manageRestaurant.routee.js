// Import express
import express from "express";
const manageRestaurantRoute = express.Router();
import multer from "multer";

// Import controller
import {
    editRestaurant,
    getRestaurant,
} from "../../Controller/seller/manageRestaurant.controller.js";

//Temporory storage before Cloundinary upload
const upload = multer({ dest: "uploads/" });

// Get restaurant
manageRestaurantRoute.get("/get-restaurant", getRestaurant);

// Edit restaurant
manageRestaurantRoute.patch(
    "/edit-restaurant",
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "images", maxCount: 3 },
    ]),
    editRestaurant
);

// Export router
export default manageRestaurantRoute;
