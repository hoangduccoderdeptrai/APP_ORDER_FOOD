import express from "express";
const manageAccountRoute = express.Router();

// Import multer
import multer from "multer";

// Create Temporary storage before Cloundinary upload
const upload = multer({ dest: "uploads/" });

import {
    getdetailAccount,
    updateAccount,
} from "../../Controller/customer/manageAccount.controller.js";

manageAccountRoute.get("/", getdetailAccount);

manageAccountRoute.patch("/", upload.single("avatar"), updateAccount);

export default manageAccountRoute;
