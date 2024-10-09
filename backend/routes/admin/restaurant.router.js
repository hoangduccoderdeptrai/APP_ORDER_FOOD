// Import express and create a router
import express from "express";
const restaurantRouter = express.Router();

// Import controller
import {
    getPageRestaurants,
    getDetailRetaurant,
    changeStatusRestaurant,
    getPageAwaitRestaurants,
    acceptOrDenyRestaurant,
} from "../../Controller/admin/restaurant.controller.js";

// Get all restaurants
restaurantRouter.get("/", getPageRestaurants);

// Get detail restaurant
restaurantRouter.get("/detail/:id", getDetailRetaurant);

// Patch Change status restaurant
restaurantRouter.patch("/change-status-restaurant/:id", changeStatusRestaurant);

// Get all restaurants are waiting for accept or deny
restaurantRouter.get("/await", getPageAwaitRestaurants);

// Patch Accept or Deny restaurant
restaurantRouter.patch("/accept-or-deny-restaurant/:id", acceptOrDenyRestaurant);

export default restaurantRouter;
