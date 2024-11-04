import express from "express";
import {
    getOrderPending,
    updateStatusOrder,
} from "../../Controller/seller/manageOrder.controller.js";

const manageOderRoute = express.Router();

manageOderRoute.get("/:id", getOrderPending);
manageOderRoute.patch("/:id", updateStatusOrder);
export default manageOderRoute;
