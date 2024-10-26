// Import express and express router
import express from "express";
const searchPageRouter = express.Router();

// Import detailPage controller
import { searchPage } from "../../Controller/user/searchPage.controller.js";

// Get search page
searchPageRouter.post("/", searchPage);

export default searchPageRouter;
