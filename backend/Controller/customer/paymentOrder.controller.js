// Import moment
import moment from "moment";

// import qs
import qs from "qs";

// import crypto
import crypto from "crypto";

// Import oders model
import { Order } from "../../Model/order.model.js";

// Import transaction model
import { TransactionOrder } from "../../Model/transactionOrder.model.js";

// Import sortObject helper function
import { sortObject } from "../../helper/sort.js";

const sendRequestToVnpay = async (req, res) => {
    try {
        // Set timezone for server
        process.env.TZ = "Asia/Ho_Chi_Minh";

        // Get orderId from req
        let orderId = req.body.orderId;

        // Get day time and format
        let date = new Date();
        let createDate = moment(date).format("YYYYMMDDHHmmss");

        // Get IP address of client
        let ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

        // Get information to send to Vnpay
        let tmnCode = process.env.vnp_TmnCode;
        let secretKey = process.env.vnp_HashSecret;
        let vnpUrl = process.env.vnp_Url;
        let returnUrl = process.env.vnp_ReturnUrl;
        let orderIdPayment = moment(date).format("DDHHmmss");
        let amount = req.body.amount;
        let bankCode = req.body.bankCode;
        let locale = req.body.language || "vn";
        let currCode = "VND";

        // config query
        let vnp_Params = {};
        vnp_Params["vnp_Version"] = "2.1.0";
        vnp_Params["vnp_Command"] = "pay";
        vnp_Params["vnp_TmnCode"] = tmnCode;
        vnp_Params["vnp_Locale"] = locale;
        vnp_Params["vnp_CurrCode"] = currCode;
        vnp_Params["vnp_TxnRef"] = orderIdPayment;
        vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderIdPayment;
        vnp_Params["vnp_OrderType"] = "other";
        vnp_Params["vnp_Amount"] = amount * 100;
        vnp_Params["vnp_ReturnUrl"] = returnUrl;
        vnp_Params["vnp_IpAddr"] = ipAddr;
        vnp_Params["vnp_CreateDate"] = createDate;
        if (bankCode) {
            vnp_Params["vnp_BankCode"] = bankCode;
        }

        // Sort all params of VnPay and hash
        vnp_Params = sortObject(vnp_Params);

        let signData = qs.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
        vnp_Params["vnp_SecureHash"] = signed;
        vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });

        // Create order transaction
        const infortransaction = {
            orderId: orderId,
            orderIdPayment: orderIdPayment,
            status: false,
        };
        const transaction = new TransactionOrder(infortransaction);
        await transaction.save();

        // Return json
        res.status(200).json({ vnpUrl: vnpUrl });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Check return Url from Vnpay
const returnVnpay = async (req, res) => {
    try {
        let vnp_Params = { ...req.query };

        let secureHash = vnp_Params["vnp_SecureHash"];

        delete vnp_Params["vnp_SecureHash"];
        delete vnp_Params["vnp_SecureHashType"];

        vnp_Params = sortObject(vnp_Params);

        let tmnCode = process.env.vnp_TmnCode;
        let secretKey = process.env.vnp_HashSecret;

        let signData = qs.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

        if (secureHash === signed) {
            // Get transaction
            let status = vnp_Params["vnp_ResponseCode"];
            let orderIdPayment = vnp_Params["vnp_TxnRef"];

            // If status is 00, transaction is success else transaction is fail
            if (status !== "00") {
                return res.status(200).json({ code: status, msg: "Fail to payment order" });
            }

            // Find transaction
            let transactions = await TransactionOrder.find({
                orderIdPayment: orderIdPayment,
                status: false,
            });
            if (!transactions || transactions.length === 0) {
                return res.status(404).json({ msg: "Transaction not found" });
            }
            let transaction = transactions[0];

            // Update order status
            const orderId = transaction.orderId.toString();

            // Find order
            let order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({ msg: "Order not found" });
            }

            // Update order status
            order.status = "completed";
            await order.save();

            // Update transaction status
            transaction.status = true;
            await transaction.save();

            res.status(200).json({ code: status, msg: "Success to payment order" });
        } else {
            res.status(400).json({ msg: "Fail to payment order", code: "97" });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export { sendRequestToVnpay, returnVnpay };
