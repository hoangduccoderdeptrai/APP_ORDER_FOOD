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
        // Find the restaurant if have the same name and borough
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
        const restaurant = await Restaurant.find(find).select(
            "name address phone time_open time_close starMedium"
        );

        // If the restaurant is not found
        if (!restaurant || restaurant.length === 0) {
            return "Không tìm thấy nhà hàng";
        }
        return restaurant;
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

// 2

// Create list of function
const functions = {
    informationOfRestaurant: ({ restaurantName, borough }) => {
        return informationRestaurant(restaurantName, borough);
    },
};

// Create a new instance of the GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatetiveModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
        "Bạn là một chatbot của ứng dụng Yummy. Nhiệm vụ của bạn là hỗ trợ người dùng tìm hiểu về thông tin của website Yummy. Website Yummy là trang web cho phép mọi người đặt và bán đồ ăn, thức uống. Những thông tin cơ bản mà người dùng cần chủ yếu là các thông tin của món ăn và nhà hàng, đơn đặt hàng của họ.Bạn có thể giúp tôi không?",
    tools: {
        functionDeclarations: [informationRestaurantDeclaration],
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
