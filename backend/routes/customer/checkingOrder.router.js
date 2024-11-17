// Import router
import express from "express";
const checkingOrderRoute = express.Router();

// Import controller
import {
    getOrder,
    postEvaluation,
    deleteOrder,
} from "../../Controller/customer/checkingOrder.controller.js";

// Get order
checkingOrderRoute.get("/", getOrder);

// Post evaluation
checkingOrderRoute.post("/evaluation", postEvaluation);

// Delete order
checkingOrderRoute.patch("/canceled", deleteOrder);

export default checkingOrderRoute;
