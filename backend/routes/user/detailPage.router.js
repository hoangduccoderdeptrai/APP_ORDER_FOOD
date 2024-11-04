// Import express and router
import express from "express";
const detailPageRouter = express.Router();

// Import detailpage controller
import { detailRestaurant } from "../../Controller/user/detailPage.controller.js";

// Get detail page restaurant
detailPageRouter.post("/detail-restaurant/:id", detailRestaurant);

export default detailPageRouter;
