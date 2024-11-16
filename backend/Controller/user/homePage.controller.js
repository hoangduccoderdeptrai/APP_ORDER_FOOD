import { MenuItem } from "../../Model/menuItem.model.js";

// Import restaurant model
import { Restaurant } from "../../Model/restaurant.model.js";

// Import specialtyFood model
import { SpecialtyFood } from "../../Model/specialtyFood.model.js";

// Import search function
import { search } from "../../helper/search.js";

// Get keywork from search bar
const getKeySearchFood = async (req, res) => {
    try {
        // Get keyword from search bar query
        const nameFood = req.query.nameFood;
        const nameRestaurant = req.query.nameRestaurant;

        const keyword = nameFood || nameRestaurant;

        // Create a set to store all the results
        const result = new Set();

        // Find condition
        let find = {};

        // Get objectSearch
        const objectSearch = search(keyword);

        // List all the menuItems
        let menuItems = [];

        // Check if user search restaurant or food
        if (nameRestaurant) {
            find["name"] = objectSearch.regex;
            // Find all the restaurants that contain the keyword
            menuItems = await Restaurant.find(find).select("name");
        } else {
            find["title"] = objectSearch.regex;
            // Find all the food that contain the keyword
            menuItems = await MenuItem.find(find).select("title");
        }

        // Loop through all the menuItems
        for (let menuItem of menuItems) {
            // Add the menuItem to the result set
            result.add(menuItem);
        }

        // Rerturn all the results
        res.status(200).json({
            menuItemsKeyword: [...result],
        });
    } catch (err) {
        // Return error message
        res.status(500).json({ msg: err.message });
    }
};

// Get home page
const getHomePage = async (req, res) => {
    try {
        // Get 9 specialty foods
        const specialtyFoods = await SpecialtyFood.find({}).limit(9);

        // Get 9 restaurants top rating
        const restaurants = await Restaurant.find({ status: "active" })
            .sort({ starMedium: -1 })
            .limit(9);

        // Get 9 foods top rating
        const foods = await MenuItem.find({}).sort({ starMedium: -1 }).limit(9);
        const newFoods = await Promise.all(
            foods.map(async (food) => {
                // Get restaurant of the food
                const restaurantOfFood = await Restaurant.findById(food.restaurantId);
                return {
                    ...food._doc,
                    restaurantName: restaurantOfFood.name,
                    restaurantAddress: restaurantOfFood.address,
                };
            })
        );

        // Rerturn all the results
        res.status(200).json({
            specialtyFoods: specialtyFoods,
            restaurants: restaurants,
            foods: newFoods,
        });
    } catch (err) {
        // Return error message
        res.status(500).json({ msg: err.message });
    }
};

export { getKeySearchFood, getHomePage };
