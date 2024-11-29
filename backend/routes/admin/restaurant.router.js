// Import express and create a router
import express from "express";
const restaurantRouter = express.Router();

// Import controller
import {
    getPageRestaurants,
    getDetailRetaurant,
    changeStatusRestaurant,
} from "../../Controller/admin/restaurant.controller.js";

// Get all restaurants
restaurantRouter.get("/", getPageRestaurants);

// Get detail restaurant
restaurantRouter.get("/detail/:id", getDetailRetaurant);

// Patch Change status restaurant
restaurantRouter.patch("/change-status-restaurant/:id", changeStatusRestaurant);

export default restaurantRouter;
