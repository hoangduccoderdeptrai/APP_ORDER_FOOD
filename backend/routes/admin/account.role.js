// Require express and create a router
import express from "express";

const accountRouter = express.Router();

// Import controller
import {
    getPageUsers,
    getDetailUser,
    deleteUser,
} from "../../Controller/admin/account.controller.js";

// Get all account
accountRouter.get("/", getPageUsers);

// Get detail user
accountRouter.get("/detail/:id", getDetailUser);

// Delete user
accountRouter.delete("/delete/:id", deleteUser);

export default accountRouter;
