import express from "express";
const paymentRouter = express.Router();

import {
    sendRequestToVnpay,
    returnVnpay,
} from "../../Controller/customer/paymentOrder.controller.js";

// Send request to Vnpay
paymentRouter.post("/", sendRequestToVnpay);

// Check return Url from Vnpay
paymentRouter.get("/return", returnVnpay);

export default paymentRouter;
