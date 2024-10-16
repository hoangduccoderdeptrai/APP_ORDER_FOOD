// Import token helper function
import { verifytoken } from "../../helper/token.js";

// Middleware to authenticate user
const authenticate = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.headers.Authentication;

        // Verify token
        const result = verifytoken(token);

        // Check result
        if (result) {
            // Set payload to req
            req.body.payload = result;
            next();
        } else {
            res.status(401).json({ msg: "Unauthorized" });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Export middleware
export { authenticate };
