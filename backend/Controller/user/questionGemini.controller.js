// Import Menu model
import { MenuItem } from "../../Model/menuItem.model.js";

// Import restaurant model
import { Restaurant } from "../../Model/restaurant.model.js";

// Import SpecialtyFood model
import { SpecialtyFood } from "../../Model/specialtyFood.model.js";

// Import search helper function
import { search } from "../../helper/search.js";

// Import gemini model
import { GoogleGenerativeAI } from "@google/generative-ai";

// Calling function to ask question to the generative model

// 1. Ask for the information of a restaurant - API function
async function informationRestaurant(listRestaurantName) {
    try {
        // Find condition
        let find = {
            status: "active",
        };

        // Search the restaurant by name
        let newListRestaurantName = listRestaurantName.map((restaurantName) => {
            return search(restaurantName).regex;
        });

        if (newListRestaurantName && newListRestaurantName.length > 0) {
            find["name"] = { $in: newListRestaurantName };
        }

        // Find the restaurant
        let restaurants = await Restaurant.find(find).select(
            "name address phone time_open time_close starMedium"
        );

        // If the restaurant is not found
        if (!restaurants || restaurants.length === 0) {
            return "Không tìm thấy nhà hàng";
        }

        // Get some hot food of the restaurant
        const promiseRestaurant = restaurants.map(async (restaurant) => {
            // Convert the restaurant to object
            restaurant = restaurant.toObject();

            // Get id of the restaurant
            const restaurantId = restaurant._id;

            // Find the hot food of the restaurant
            const hotFoods = await MenuItem.find({
                restaurantId: restaurantId,
            })
                .sort({ quantitySolded: -1, starMedium: -1 })
                .limit(3)
                .select("title price");

            return {
                ...restaurant,
                hotFoods: hotFoods,
            };
        });

        // Wait for all promise
        restaurants = await Promise.all(promiseRestaurant);

        // Return the restaurant
        return restaurants;
    } catch (error) {
        console.log(error.message);
        return "Đã xảy ra lỗi khi tìm kiếm nhà hàng. Vui lòng thử lại sau.";
    }
}

// 1.1 Create fuction declarations for the information of a restaurant
const informationRestaurantDeclaration = {
    name: "informationOfRestaurant",
    description: "Tìm kiếm thông tin của một nhà hàng dựa vào tên và thêm quận nếu có",
    parameters: {
        type: "object",
        description: "Tìm kiếm thông tin của một nhà hàng",
        properties: {
            listRestaurantName: {
                type: "array",
                description: "Danh sách tên nhà hàng khách hàng muốn tìm kiếm",
                items: {
                    type: "string",
                    description: "Tên của từng nhà hàng",
                },
            },
        },
        required: ["listRestaurantName"],
    },
};

// 2. Recommend restaurant fot user - API function
async function recommendedRestaurant(
    borough,
    street,
    rating,
    time_open,
    time_close,
    categories,
    description,
    blackList
) {
    try {
        // Find condition
        let find = {
            status: "active",
        };

        // Recommend restaurant by information that user give
        const objectSearchBorough = search(borough);
        const objectSearchStreet = search(street);
        const objectSearchTimeOpen = search(time_open);
        const objectSearchTimeClose = search(time_close);
        const objectSearchDescription = search(description);
        if (blackList && blackList.length > 0) {
            const newBlackList = blackList.map((restaurantName) => {
                return search(restaurantName).regex;
            });
            find.name = { $nin: newBlackList };
        }
        if (objectSearchBorough.regex) {
            find["address.borough"] = objectSearchBorough.regex;
        }
        if (objectSearchDescription.regex) {
            find.name = objectSearchDescription.regex;
        }
        if (objectSearchStreet.regex) {
            find["address.street"] = objectSearchStreet.regex;
        }
        if (rating) {
            find["starMedium"] = { $gte: rating };
        }
        if (objectSearchTimeOpen.regex) {
            find.time_open = objectSearchTimeOpen.regex;
        }
        if (objectSearchTimeClose.regex) {
            find.time_close = objectSearchTimeClose.regex;
        }

        // Find the restaurant
        const restaurants = await Restaurant.find(find).select("name address").limit(5);

        if (categories && categories.length > 0) {
            // New categories array
            const newCategories = categories.map((category) => {
                return search(category).regex;
            });

            // Find the food of the restaurant
            const promiseRestaurant = restaurants.map(async (restaurant) => {
                // Convert the restaurant to object
                restaurant = restaurant.toObject();

                // Get id of the restaurant
                const restaurantId = restaurant._id;

                // Find the food of the restaurant
                const foods = await MenuItem.find({
                    restaurantId: restaurantId,
                    category: { $in: newCategories },
                })
                    .sort({ quantitySolded: -1, starMedium: -1 })
                    .limit(3)
                    .select("title");

                return {
                    ...restaurant,
                    foods: foods,
                };
            });

            // Wait for all promise
            restaurants = await Promise.all(promiseRestaurant);
        }

        // If the restaurant is not found
        if (!restaurants || restaurants.length === 0) {
            return "Không tìm thấy nhà hàng";
        }

        return restaurants;
    } catch (error) {
        console.log(error.message);
        return "Đã xảy ra lỗi khi tìm kiếm nhà hàng. Vui lòng thử lại sau!";
    }
}

// 2.1 Create fuction declarations for the recommend restaurant
const recommendedRestaurantDeclaration = {
    name: "recommendRestaurantForUser",
    description:
        "Gợi ý các nhà hàng và kèm theo món ăn của nhà hàng nếu có dựa trên thông tin người dùng cung cấp",
    parameters: {
        type: "object",
        description:
            "Gợi ý các nhà hàng và kèm theo món ăn của nhà hàng nếu có theo yêu cầu của người dùng cung cấp",
        properties: {
            borough: {
                type: "string",
                description: "Quận",
            },
            street: {
                type: "string",
                description: "Đường phố của nhà hàng",
            },
            rating: {
                type: "number",
                description: "Đánh giá sao trung bình của nhà hàng",
            },
            time_open: {
                type: "string",
                description: "Thời gian mở cửa của nhà hàng",
            },
            time_close: {
                type: "string",
                description: "Thời gian đóng cửa của nhà hàng",
            },
            categories: {
                type: "array",
                description: "Danh sách loại món ăn",
                items: {
                    type: "string",
                    description: "Tên loại món ăn",
                },
            },
            description: {
                type: "string",
                description: "Mô tả chi tiết nhà hàng",
            },
            blackList: {
                type: "array",
                description: "Danh sách nhà hàng mà người dùng không muốn xem",
                items: {
                    type: "string",
                    description: "Tên của từng nhà hàng",
                },
            },
        },
    },
};

// 3. Find specialty food - API function
async function specialtyFood(blackList) {
    try {
        // Find condition
        let find = {};

        // Search the specialty food by name
        const newBlackList = blackList.map((foodName) => {
            return search(foodName).regex;
        });

        if (blackList && blackList.length > 0) {
            find.name = { $nin: newBlackList };
        }
        // Find the specialty food
        const specialtyFoods = await SpecialtyFood.find({}).limit(3).select("name");

        // If the specialty food is not found
        if (!specialtyFoods || specialtyFoods.length === 0) {
            return "Không tìm thấy món ăn đặc biệt";
        }

        return specialtyFoods;
    } catch (error) {
        console.log(error.message);
        return "Đã xảy ra lỗi khi tìm kiếm món ăn đặc biệt. Vui lòng thử lại sau!";
    }
}

// 3.1 Create fuction declarations for the specialty food
const specialtyFoodDeclaration = {
    name: "specialtyFood",
    description: "Tìm kiếm món ăn đặc biệt của trang web Yummy",
    parameters: {
        type: "object",
        description: "Tìm kiếm món ăn đặc biệt của trang web Yummy",
        properties: {
            blackList: {
                type: "array",
                description: "Danh sách món ăn mà người dùng không muốn xem",
                items: {
                    type: "string",
                    description: "Tên của từng món ăn",
                },
            },
        },
    },
};

// 4. Recommended food by name - API function
async function recommendedFoods(
    description,
    minPrice = 0,
    maxprice = 1e9,
    categories,
    discount,
    starMedium,
    blackList
) {
    try {
        // Find condition
        let find = {
            isAvailable: true,
        };

        // Search information of list food
        const objectSearchDescription = search(description);
        const newCategories = categories.map((category) => {
            return search(category).regex;
        });
        if (blackList && blackList.length > 0) {
            const newBlackList = blackList.map((foodName) => {
                return search(foodName).regex;
            });
            find.title = { $nin: newBlackList };
        }
        if (objectSearchDescription.regex) {
            find.description = objectSearchDescription.regex;
        }
        if (starMedium) {
            find.starMedium = { $gte: starMedium };
        }
        if (categories && categories.length > 0) {
            find.category = { $in: newCategories };
        }
        if (discount) {
            find.discount = { $gte: discount };
        }
        find.price = { $gte: minPrice, $lte: maxprice };

        // Find the food
        const foods = await MenuItem.find(find)
            .sort({ starMedium: -1 })
            .limit(5)
            .select("title price category discount starMedium category");

        // If the food is not found
        if (!foods || foods.length === 0) {
            return "Không tìm thấy món ăn";
        }

        return foods;
    } catch (error) {
        console.log(error.message);
        return "Đã xảy ra lỗi khi tìm kiếm món ăn. Vui lòng thử lại sau!";
    }
}

// 4.1 Create fuction declarations for the recommended food by name
const recommendedFoodsDeclaration = {
    name: "recommendedFoods",
    description:
        "Gợi ý các món ăn dựa vào mô tả của khách hàng như tên, mô tả, giá, loại món ăn, giảm giá, đánh giá",
    parameters: {
        type: "object",
        description: "Gợi ý các món ăn dựa vào tên, mô tả, giá, loại món ăn, giảm giá, đánh giá",
        properties: {
            description: {
                type: "string",
                description: "Mô tả chi tiết món ăn",
            },
            minPrice: {
                type: "number",
                description: "Giá thấp nhất của món ăn",
            },
            maxPrice: {
                type: "number",
                description: "Giá cao nhất của món ăn",
            },
            categories: {
                type: "array",
                description: "Danh sách loại món ăn",
                items: {
                    type: "string",
                    description: "Tên loại món ăn",
                },
            },
            discount: {
                type: "number",
                description: "Giảm giá của món ăn",
            },
            starMedium: {
                type: "number",
                description: "Đánh giá sao trung bình của món ăn",
            },
            blackList: {
                type: "array",
                description: "Danh sách món ăn mà người dùng không muốn xem",
                items: {
                    type: "string",
                    description: "Tên của từng món ăn",
                },
            },
        },
    },
};

// 5. Find information of a foods - API function
async function informationFoods(listFoodName) {
    try {
        // Find condition
        let find = {
            isAvailable: true,
        };

        // Search information of list food
        const newListFoodName = listFoodName.map((foodName) => {
            return search(foodName).regex;
        });

        if (newListFoodName && newListFoodName.length > 0) {
            find.title = { $in: newListFoodName };
        }

        // Find the food
        const foods = await MenuItem.find(find).select("title price category discount starMedium");

        // If the food is not found
        if (!foods || foods.length === 0) {
            return "Không tìm thấy món ăn";
        }

        return foods;
    } catch (error) {
        console.log(error.message);
        return "Đã xảy ra lỗi khi tìm kiếm món ăn. Vui lòng thử lại sau!";
    }
}

// 5.1 Create fuction declarations for the information of a foods
const informationFoodsDeclaration = {
    name: "informationOfFoods",
    description: "Tìm kiếm thông tin của một món ăn dựa vào tên",
    parameters: {
        type: "object",
        description: "Tìm kiếm thông tin của một món ăn",
        properties: {
            listFoodName: {
                type: "array",
                description: "Danh sách tên món ăn khách hàng muốn tìm kiếm",
                items: {
                    type: "string",
                    description: "Tên của từng món ăn",
                },
            },
        },
        required: ["listFoodName"],
    },
};

// Create list of function
const functions = {
    informationOfRestaurant: ({ listRestaurantName }) => {
        return informationRestaurant(listRestaurantName);
    },
    recommendRestaurantForUser: ({
        borough,
        street,
        rating,
        time_open,
        time_close,
        categories,
        description,
        blackList,
    }) => {
        return recommendedRestaurant(
            borough,
            street,
            rating,
            time_open,
            time_close,
            categories,
            description,
            blackList
        );
    },
    specialtyFood: ({ blackList }) => {
        return specialtyFood(blackList);
    },
    recommendedFoods: ({
        description,
        minPrice,
        maxPrice,
        categories,
        discount,
        starMedium,
        blackList,
    }) => {
        return recommendedFoods(
            description,
            minPrice,
            maxPrice,
            categories,
            discount,
            starMedium,
            blackList
        );
    },
    informationOfFoods: ({ listFoodName }) => {
        return informationFoods(listFoodName);
    },
};

// Create a new instance of the GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatetiveModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
        "Bạn là một chatbot của ứng dụng Yummy. Nhiệm vụ của bạn là hỗ trợ người dùng tìm hiểu về thông tin của website Yummy. Website Yummy là trang web cho phép mọi người đặt và bán đồ ăn, thức uống. Những thông tin cơ bản mà người dùng cần chủ yếu là các thông tin của món ăn và nhà hàng, đơn đặt hàng của họ.Bạn có thể giúp tôi không?",
    tools: {
        functionDeclarations: [
            informationRestaurantDeclaration,
            recommendedRestaurantDeclaration,
            specialtyFoodDeclaration,
            recommendedFoodsDeclaration,
            informationFoodsDeclaration,
        ],
    },
});

const questionGemini = async (req, res) => {
    // Get hisstory from the request body
    const historyChat = req.body.history;
    const newQuestion = req.body.question;

    // Start chat with the generative model
    const chat = generatetiveModel.startChat({
        history: historyChat,
    });

    // Send the question to the generative model
    const result = await chat.sendMessage(newQuestion);
    console.log(result.response.functionCalls());
    let answer = "";

    // Get function calling is recommended
    const callingFunctions = result.response.functionCalls();

    if (callingFunctions && callingFunctions.length > 0) {
        // Get the first calling function
        const callingFunction = callingFunctions[0];

        // Call the function
        const apiResponse = await functions[callingFunction.name](callingFunction.args);
        console.log(apiResponse);

        // Ensure apiResponse is properly formatted
        const functionResponse = {
            name: callingFunction.name,
            response: { items: apiResponse },
        };

        // Reget the response from the generative model
        const result2 = await chat.sendMessage([
            {
                functionResponse: functionResponse,
            },
        ]);

        // Get answer from the generative model
        answer = result2.response.text();
    } else {
        // Get answer from the generative model
        answer = result.response.candidates[0].content.parts[0].text;
    }

    // Send the response to the client
    res.status(200).json({
        message: "Success",
        answer: answer,
    });
};

// Export the questionGemini
export { questionGemini };
