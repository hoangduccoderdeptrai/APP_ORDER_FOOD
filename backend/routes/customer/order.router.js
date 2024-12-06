import express from "express";
import { createOrder } from "../../Controller/customer/order.controller.js";
const orderItemsRoute = express.Router();

orderItemsRoute.post("/", createOrder);

export default orderItemsRoute;
