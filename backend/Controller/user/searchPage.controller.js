// Import menuItem model
import { MenuItem } from "../../Model/menuItem.model.js";

// Import restaurant model
import { Restaurant } from "../../Model/restaurant.model.js";

// Import search fucntion helper
import { search } from "../../helper/search.js";

// Import pagination function helper
import { pagination } from "../../helper/pagination.js";

// Get Search page
const searchPage = async (req, res) => {
    try {
        // Get information search
        const infoSearch = req.body;

        // Find condition
        let findFood = {};
        let findRestaurant = {
            status: "active",
        };

        // Check if user search restaurant
        const nameRestaurant = infoSearch.nameRestaurant;
        const boroughRestaurant = infoSearch.boroughRestaurant;
        const starMedium = infoSearch.starMedium;
        const typeSort = infoSearch.typeSort || "Best seller";

        if (nameRestaurant) {
            const objectSearchRestaurant = search(nameRestaurant);
            findRestaurant["name"] = objectSearchRestaurant.regex;
        }

        if (boroughRestaurant) {
            findRestaurant["address.borough"] = {
                $in: boroughRestaurant,
            };
        }

        if (starMedium) {
            findRestaurant["starMedium"] = { $gte: starMedium };
        }

        // Type sort restaurant
        if (typeSort === "Best seller") {
            findRestaurant["quantitySolded"] = -1;
        } else {
            findRestaurant["updatedAt"] = -1;
        }

        // Check if user search food
        const caterogy = infoSearch.caterogy;
        const nameFood = infoSearch.nameFood;

        // list food
        let listFood = [];

        if (caterogy || nameFood) {
            // Create object search nameFood
            const objectSearchName = search(nameFood);

            if (caterogy) {
                findFood["caterogy"] = {
                    $in: caterogy,
                };
            }

            if (objectSearchName.regex) {
                findFood["title"] = objectSearchName.regex;
            }

            // Find food
            listFood = await MenuItem.find(findFood);
        }

        // Check have list food
        if (listFood.length > 0) {
            // Get list id restaurant
            const listIdRestaurant = listFood.map((food) => food.restaurantId);

            // Filter unique id restaurant
            listIdRestaurant = [...new Set(listIdRestaurant)];

            // Update find restaurant to save id restaurant
            findRestaurant["_id"] = {
                $in: listIdRestaurant,
            };
        }

        // Object pagination
        const numRestaurants = await Restaurant.countDocuments(findRestaurant);
        const objectPagination = pagination(req.query, numRestaurants, {
            currentPage: 1,
            limit: 20,
        }); // Object pagination

        // Find restaurant
        let restaurants = await Restaurant.find(findRestaurant)
            .skip(objectPagination.skip)
            .limit(objectPagination.limit);

        // Check have restaurants
        if (!restaurants || restaurants.length === 0) {
            return res.status(200).json({
                msg: "Not found restaurant",
            });
        }

        // Get id food for each restaurant if have list food
        if (listFood.length > 0) {
            const newRestaurants = restaurants.map((restaurant) => {
                restaurant["listIdFood"] = listFood
                    .filter((food) => {
                        return food.restaurantId.toString() === restaurant._id.toString();
                    })
                    .map((food) => food._id);
            });

            // Assign new value for restaurants
            restaurants = newRestaurants;
        }

        // Return data
        res.status(200).json({
            restaurants: restaurants,
            objectPagination: objectPagination,
        });
    } catch (error) {
        // Return error message
        res.status(500).json({
            msg: error.message,
        });
    }
};

export { searchPage };
