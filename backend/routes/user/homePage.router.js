// Import express and express router
import express from "express";
const homeUserRouter = express.Router();

// Import homePage controller
import { getKeySearchFood, getHomePage } from "../../Controller/user/homePage.controller.js";

// Get home page
homeUserRouter.get("/", getHomePage);

// Get keyword from search bar
homeUserRouter.get("/search", getKeySearchFood);

export default homeUserRouter;
