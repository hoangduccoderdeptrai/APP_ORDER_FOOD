// Import restaurant model
import { Restaurant } from "../../Model/restaurant.model.js";

// Import menuItem model
import { MenuItem } from "../../Model/menuItem.model.js";

// Import review model
import { Review } from "../../Model/review.model.js";

// Get detail page restaurant
const detailRestaurant = async (req, res) => {
    try {
        // Get id restaurant
        const idRestaurant = req.params.id;

        // Get list id food of restaurant
        const listIdFood = [] || req.body.listIdFood;

        // Get restaurant
        const restaurant = await Restaurant.findById(idRestaurant);

        if (!restaurant || restaurant.length === 0) {
            return res.status(404).json({
                msg: "Restaurant not found",
            });
        }

        // Get list food of restaurant
        const listAllFood = await MenuItem.find({
            restaurantId: idRestaurant,
        });

        // Get comment of restaurant
        const listComment = await Review.find({ restaurantId: idRestaurant });

        // Arrange list food that food has id in listIdFood will be first
        if (listIdFood.length > 0) {
            const listFoodFirt = listAllFood.filter((food) =>
                listIdFood.includes(food._id.toString())
            );
            const listFoodSecond = listAllFood.filter(
                (food) => !listIdFood.includes(food._id.toString())
            );
            listAllFood = listFoodFirt.concat(listFoodSecond);
        }

        // Return data
        res.status(200).json({
            restaurant: restaurant,
            listAllFood: listAllFood,
            listComment: listComment,
        });
    } catch (error) {
        // Return message error
        return res.status(500).json({
            msg: error.message,
        });
    }
};

export { detailRestaurant };