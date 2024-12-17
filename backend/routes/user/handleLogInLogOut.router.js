// Import express and express router
import express from "express";
const logInlogOutRouter = express.Router();

// Import Multer
import multer from "multer";
const upload = multer({ dest: "uploads/" });

// Import handleLogInLogOut controller
import {
    signIn,
    signUp,
    signOut,
    changePassword,
    forgotPassword,
    getOtp,
} from "../../Controller/user/handleLogInLogOut.controller.js";

// Import getMe middleware
import { getMe } from "../../middleware/user/authentication.js";

// Import middleware authentication
import { authenticate } from "../../middleware/user/authentication.js";

// Sign in
logInlogOutRouter.post("/signin", signIn);

// Sign up
const cpUpload = upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "images", maxCount: 4 },
]);
logInlogOutRouter.post("/signup", cpUpload, signUp);

// Sign out
logInlogOutRouter.get("/signout", signOut);

// Change password
logInlogOutRouter.patch("/change-password", authenticate, changePassword);

// Forgot password
logInlogOutRouter.patch("/forgot-password", forgotPassword);

// Get OTP
logInlogOutRouter.post("/get-otp", getOtp);

// Get me
logInlogOutRouter.get("/get-me", getMe);

export default logInlogOutRouter;
