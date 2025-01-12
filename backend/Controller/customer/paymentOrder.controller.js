// Import moment
import moment from "moment";

// import qs
import qs from "qs";

// import crypto
import crypto from "crypto";

// Import sortObject helper function
import { sortObject } from "../../helper/sort.js";

const sendRequestToVnpay = async (req, res) => {
    try {
        // Set timezone for server
        process.env.TZ = "Asia/Ho_Chi_Minh";

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
        let orderId = moment(date).format("DDHHmmss");
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
        vnp_Params["vnp_TxnRef"] = orderId;
        vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
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

        // Return json
        res.status(200).json({ vnpUrl: vnpUrl });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export { sendRequestToVnpay };
