// Import token helper function
import mongoose from "mongoose";
import { verifytoken } from "../../helper/token.js";
import { Restaurant } from "../../Model/restaurant.model.js";

// Middleware to authenticate user
const authenticate = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.cookies.token;
        // console.log(token);
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }

        // Verify token
        let result = verifytoken(token);
        if (!result) {
            return res.status(403).json({ msg: "Forbidden" });
        }
        // Add id_restaurant
        const RestaurantId = await Restaurant.findOne({
            ownerId: new mongoose.Types.ObjectId(`${result.userId}`),
        });

        // Check result
        if (result) {
            // Set payload to req
            result.restaurantId = RestaurantId ? RestaurantId._id : null;
            req.user = result;
            next();
        } else {
            res.status(401).json({ msg: "Unauthorized" });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Role-based authorization middleware
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ msg: "Access denied" });
        }
        next();
    };
};

const getMe = async (req, res, next) => {
    try {
        // Get token from header
        console.log("test", req.cookies.token);
        const token = req.cookies.token;
        console.log(token);
        // console.log(token)
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" });
        }
        // Verify token
        let result = verifytoken(token);
        if (!result) {
            return res.status(403).json({ msg: "Forbidden" });
        }
        // Add id_restaurant
        const RestaurantId = await Restaurant.findOne({
            ownerId: new mongoose.Types.ObjectId(`${result.userId}`),
        });
        console.log(RestaurantId, "rest", result.userId);
        // Check result

        // Set payload to req
        result.restaurantId = RestaurantId ? RestaurantId._id : null;
        req.user = result;
        return res.status(200).json({ msg: "Token valid", user: result });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Export middleware
export { authenticate, authorizeRoles, getMe };
