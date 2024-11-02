// Import token helper function
import { verifytoken } from "../../helper/token.js";
import { Restaurant } from "../../Model/restaurant.model.js";
// Middleware to authenticate user
const authenticate = async (req, res, next) => {
    try {
        // Get token from header
        let token = req.headers.authorization;
        // console.log(token)
        if(!token){
            return res.status(401).json({msg:'No token, authorization denied'})
        }
        // Verify token
        let result = verifytoken(token);
        
        // Add id_restaurant
        const RestaurantId = await Restaurant.findOne({ownerId:result.id})
        if(RestaurantId)result.push({restaurantId:RestaurantId})


        // Check result
        if (result) {
            // Set payload to req
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
