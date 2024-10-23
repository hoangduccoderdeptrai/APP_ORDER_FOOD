// Import express and express router
import express from "express";
const logInlogOutRouter = express.Router();

// Import handleLogInLogOut controller
import {
    signIn,
    signUp,
    signOut,
    changePassword,
    forgotPassword,
} from "../../Controller/user/handleLogInLogOut.controller.js";

// Sign in
logInlogOutRouter.post("/signin", signIn);

// Sign up
logInlogOutRouter.post("/signup", signUp);

// Sign out
logInlogOutRouter.get("/signout", signOut);

// Change password
logInlogOutRouter.patch("/change-password", changePassword);

// Forgot password
logInlogOutRouter.patch("/forgot-password", forgotPassword);

export default logInlogOutRouter;
