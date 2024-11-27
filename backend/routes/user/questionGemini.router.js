// Import express and router
import express from "express";
const questionGeminiRouter = express.Router();

// Import gemini model
import { questionGemini } from "../../Controller/user/questionGemini.controller.js";

// Import authenticate middleware
import { authenticate } from "../../middleware/user/authentication.js";

// Handle the post request from user to ask Yummy chatbot
questionGeminiRouter.post("/", authenticate, questionGemini);

// Export the questionGeminiRouter
export default questionGeminiRouter;
