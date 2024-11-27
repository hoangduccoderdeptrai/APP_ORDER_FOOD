// Import express
import express from "express";
const manageOderRoute = express.Router();

import {
    getOrderPending,
    updateStatusOrder,
} from "../../Controller/seller/manageOrder.controller.js";

manageOderRoute.get("/:id", getOrderPending);
manageOderRoute.patch("/:id", updateStatusOrder);

export default manageOderRoute;
