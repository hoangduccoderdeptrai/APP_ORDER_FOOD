// Import express anh create router
import express from "express";
const commentRouter = express.Router();

// Import controller comment
import {
    createComment,
    editComment,
    deleteComment,
} from "../../Controller/customer/comment.controller.js";

// Create comment
commentRouter.post("/comment", createComment);

// Edit comment
commentRouter.patch("/comment", editComment);

// Delete comment
commentRouter.delete("/comment", deleteComment);

export default commentRouter;
