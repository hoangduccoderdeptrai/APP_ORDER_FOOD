// Import express
import express from "express";
const manageOderRoute = express.Router();

import { getOrder, updateStatusOrder } from "../../Controller/seller/manageOrder.controller.js";

manageOderRoute.get("/:id", getOrder);
manageOderRoute.patch("/:id", updateStatusOrder);

export default manageOderRoute;
