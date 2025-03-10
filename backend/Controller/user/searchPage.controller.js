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

        // Check have information search
        if (Object.keys(infoSearch).length == 0) {
            return res.status(200).json({
                msg: "Not found information search",
            });
        }

        // Find condition
        let findFood = {
            isAvailable: true,
        };
        let findRestaurant = {
            status: "active",
        };
        let sortRestaurant = {
            quantitySolded: -1,
        };

        // Search food
        let categories = infoSearch.categories || [];
        let nameFood = infoSearch.nameFood || "";

        // Search restaurant
        let nameRestaurant = infoSearch.nameRestaurant;
        let boroughRestaurant = infoSearch.boroughRestaurant;
        let starMedium = infoSearch.starMedium;
        let typeSort = infoSearch.typeSort || "Best seller";

        if (nameRestaurant) {
            const objectSearchRestaurant = search(nameRestaurant);
            findRestaurant["name"] = objectSearchRestaurant.regex;
        }

        if (boroughRestaurant.length > 0) {
            findRestaurant["address.borough"] = {
                $in: boroughRestaurant,
            };
        }

        if (starMedium) {
            // Conver starMedium to number
            starMedium = parseInt(starMedium);
            findRestaurant["starMedium"] = { $gte: starMedium };
        }

        // Type sort restaurant
        if (typeSort !== "Best seller") {
            sortRestaurant = {
                createdAt: -1,
            };
        }

        // list food
        let listFood = [];

        if ((categories && categories.length > 0) || nameFood) {
            // Create object search nameFood
            const objectSearchName = search(nameFood);

            const newCategories = categories.map((category) => {
                return search(category).regex;
            });
            if (categories && categories.length > 0) {
                findFood["category"] = {
                    $in: newCategories,
                };
            }

            if (objectSearchName.regex) {
                findFood["title"] = objectSearchName.regex;
            }

            // Find food
            listFood = await MenuItem.find(findFood);

            // Check have list food
            if (!listFood || listFood.length === 0) {
                return res.status(200).json({
                    msg: "Not found food",
                });
            }

            // Check have list food
            // Get list id restaurant
            let listIdRestaurant = listFood.map((food) => food.restaurantId.toString());

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
            .sort(sortRestaurant)
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
                // Convert restaurant to object
                restaurant = restaurant.toObject();

                // Assign list id food for restaurant
                restaurant["listIdFood"] = listFood
                    .filter((food) => {
                        return food.restaurantId.toString() === restaurant._id.toString();
                    })
                    .map((food) => food._id.toString());

                return restaurant;
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
