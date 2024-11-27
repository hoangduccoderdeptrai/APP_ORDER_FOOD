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
async function informationRestaurant(restaurantName, borough) {
    try {
        // Find condition
        let find = {
            status: "active",
        };

        // Search the restaurant by name and borough
        const objectSearchRestaurant = search(restaurantName);
        const objectSearchBorough = search(borough);
        if (objectSearchRestaurant.regex) {
            find.name = objectSearchRestaurant.regex;
        }
        if (objectSearchBorough.regex) {
            find["address.borough"] = objectSearchBorough.regex;
        }

        // Find the restaurant
        const restaurants = await Restaurant.find(find).select(
            "name address phone time_open time_close starMedium"
        );

        // If the restaurant is not found
        if (!restaurants || restaurants.length === 0) {
            return "Không tìm thấy nhà hàng";
        }
        return restaurants;
    } catch (error) {
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
            restaurantName: {
                type: "string",
                description: "Tên nhà hàng",
            },
            borough: {
                type: "string",
                description: "Quận",
            },
        },
        required: ["restaurantName"],
    },
};

// 2 Recommend restaurant fot user - API function
async function recommendedRestaurant(borough, street, rating, time_open, time_close, categories) {
    try {
        // Find condition
        let find = {
            status: "active",
        };

        // Recommend restaurant by information that user give
        const objectSearchBorough = search(borough);
        const objectSearchStreet = search(street);
        const starMedium = parseInt(rating);
        const objectSearchTimeOpen = search(time_open);
        const objectSearchTimeClose = search(time_close);

        if (objectSearchBorough.regex) {
            find["address.borough"] = objectSearchBorough.regex;
        }
        if (objectSearchStreet.regex) {
            find["address.street"] = objectSearchStreet.regex;
        }
        if (starMedium) {
            find["starMedium"] = { $gte: starMedium };
        }
        if (objectSearchTimeOpen.regex) {
            find.time_open = objectSearchTimeOpen.regex;
        }
        if (objectSearchTimeClose.regex) {
            find.time_close = objectSearchTimeClose.regex;
        }

        // Find the restaurant
        const restaurants = await Restaurant.find(find).select("name address");

        if (categories && categories.length > 0) {
            // New categories array
            const newCategories = categories.map((category) => {
                return search(category).regex;
            });

            // Find the food of the restaurant
            const promiseRestaurant = restaurants.map(async (restaurant) => {
                // Get id of the restaurant
                const restaurantId = restaurant._id;

                // Find the food of the restaurant
                const foods = await MenuItem.find({
                    restaurantId: restaurantId,
                    category: { $in: newCategories },
                }).select("title");

                return {
                    ...restaurant._doc,
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
        return "Đã xảy ra lỗi khi tìm kiếm nhà hàng. Vui lòng thử lại sau.";
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
                description: "Đường",
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
                description: "Danh mục món ăn của nhà hàng",
                items: {
                    type: "string",
                    description: "Tên loại món ăn",
                },
            },
        },
    },
};

// Create list of function
const functions = {
    informationOfRestaurant: ({ restaurantName, borough }) => {
        return informationRestaurant(restaurantName, borough);
    },
    recommendRestaurantForUser: ({
        borough,
        street,
        rating,
        time_open,
        time_close,
        categories,
    }) => {
        return recommendedRestaurant(borough, street, rating, time_open, time_close, categories);
    },
};

// Create a new instance of the GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatetiveModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
        "Bạn là một chatbot của ứng dụng Yummy. Nhiệm vụ của bạn là hỗ trợ người dùng tìm hiểu về thông tin của website Yummy. Website Yummy là trang web cho phép mọi người đặt và bán đồ ăn, thức uống. Những thông tin cơ bản mà người dùng cần chủ yếu là các thông tin của món ăn và nhà hàng, đơn đặt hàng của họ.Bạn có thể giúp tôi không?",
    tools: {
        functionDeclarations: [informationRestaurantDeclaration, recommendedRestaurantDeclaration],
    },
});

const questionGemini = async (req, res) => {
    // Get hisstory from the request body
    const historyChat = req.body.historyChat;
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

        // Reget the response from the generative model
        const result2 = await chat.sendMessage([
            {
                functionResponse: {
                    name: callingFunction.name,
                    response: apiResponse,
                },
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
