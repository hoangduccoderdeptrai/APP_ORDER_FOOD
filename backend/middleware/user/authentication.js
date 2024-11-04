// Import token helper function
import mongoose from "mongoose";
import { verifytoken } from "../../helper/token.js";
import { Restaurant } from "../../Model/restaurant.model.js";
// Middleware to authenticate user
const authenticate = async (req, res, next) => {
    try {
        // Get token from header
       console.log('test',req.cookies.token)
        const token = req.cookies.token
        
        console.log(token)

        if(!token)return res.json({msg:"Unauthorization"})
        // console.log(token)
        if(!token){
            return res.status(401).json({msg:'No token, authorization denied'})
        }
        // Verify token
        let result = verifytoken(token);
        
        // Add id_restaurant
        const RestaurantId = await Restaurant.findOne({ ownerId: new mongoose.Types.ObjectId(`${result.userId}`) })



        console.log(RestaurantId, 'rest',result.userId)


        // Check result
        if (result) {
            // Set payload to req
            result.restaurantId =RestaurantId ? RestaurantId._id:null
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

const authorizeRoles =(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({msg:'Access denied'})
        }
        next()
    }
}


// Export middleware
export { authenticate,authorizeRoles };
