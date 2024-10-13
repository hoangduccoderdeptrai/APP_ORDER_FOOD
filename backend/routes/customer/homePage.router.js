// Import express and express router
import express from "express";
const homeCustomerRouter = express.Router();

// Import homePage controller
import { getKeySearchFood, getHomePage } from "../../Controller/customer/homePage.controller.js";

// Get home page
homeCustomerRouter.get("/", getHomePage);

// Get keyword from search bar
homeCustomerRouter.get("/search", getKeySearchFood);

export default homeCustomerRouter;
