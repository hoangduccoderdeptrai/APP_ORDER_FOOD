// Import restaurant model
import { Restaurant } from "../../Model/restaurant.model.js";

// Import menuItem model
import { MenuItem } from "../../Model/menuItem.model.js";

// Import review model
import { Review } from "../../Model/review.model.js";

// Import account model
import { Account } from "../../Model/account.model.js";

// Import pagination helper
import { pagination } from "../../helper/pagination.js";

// Get detail page restaurant
const detailRestaurant = async (req, res) => {
    try {
        // Get id restaurant
        const idRestaurant = req.params.id;

        // Get list id food of restaurant
        const listIdFood = req.body.listIdFood || [];

        // Get restaurant
        const restaurant = await Restaurant.findById(idRestaurant).select(
            "_id name address phone time_open time_close description imageUrl starMedium review"
        );

        if (!restaurant) {
            return res.status(404).json({
                msg: "Restaurant not found",
            });
        }

        // Get list food of restaurant
        let listAllFood = await MenuItem.find({
            restaurantId: idRestaurant,
        });

        // Get comment of restaurant
        const numberComments = await Review.countDocuments({ restaurantId: idRestaurant });
        const objectPagination = pagination(req.query, numberComments, {
            currentPage: 1,
            limit: 5,
        });
        const listComment = await Review.find({ restaurantId: idRestaurant })
            .sort({ createdAt: -1 })
            .skip(objectPagination.skip)
            .limit(objectPagination.limit);

        const promiseComment = listComment.map(async (comment) => {
            const userId = comment.accountId.toString();
            const user = await Account.findById(userId).select("name avatar");
            return {
                _id: comment._id,
                userId: userId,
                userName: user.name,
                userAvatar: user.avatar,
                content: comment.reviewText,
                star: comment.rating,
            };
        });
        const listNewComment = await Promise.all(promiseComment);

        // Arrange list food that food has id in listIdFood will be first
        if (listAllFood.length > 0) {
            const listFoodFirt = listAllFood.filter((food) => {
                let idFood = food._id.toString();
                return listIdFood.includes(idFood);
            });

            const listFoodSecond = listAllFood.filter(
                (food) => !listIdFood.includes(food._id.toString())
            );
            listAllFood = listFoodFirt.concat(listFoodSecond);
        }

        // Return data
        res.status(200).json({
            restaurant: restaurant,
            listAllFood: listAllFood,
            listComment: listNewComment,
            objectPagination: objectPagination,
        });
    } catch (error) {
        // Return message error
        return res.status(500).json({
            msg: error.message,
        });
    }
};

export { detailRestaurant };
