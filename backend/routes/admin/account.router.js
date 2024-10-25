// Require express and create a router
import express from "express";

const accountRouter = express.Router();

// Import controller
import {
    getPageAccount,
    getDetailAccount,
    deleteAccount,
} from "../../Controller/admin/account.controller.js";

// Get all account
accountRouter.get("/", getPageAccount);

// Get detail user
accountRouter.get("/detail/:id", getDetailAccount);

// Delete user
accountRouter.delete("/delete/:id", deleteAccount);

export default accountRouter;
