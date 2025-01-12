import express from "express";
const paymentRouter = express.Router();

import { sendRequestToVnpay } from "../../Controller/customer/paymentOrder.controller.js";

paymentRouter.post("/", sendRequestToVnpay);

export default paymentRouter;
