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

// Import moment
import moment from "moment";

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
            const restaurantId = restaurant._id.toString();

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
    description:
        "Lấy ra thông tin chi tiết các nhà hàng, quán ăn dựa vào danh sách tên của các nhà hàng, quán ăn được cung cấp bởi người dùng.",
    parameters: {
        type: "object",
        description: "Danh sách tên các nhà hàng mà người dùng muốn tìm hiểu thông tin chi tiết",
        properties: {
            listRestaurantName: {
                type: "array",
                description: "Danh sách tên nhà hàng, quán ăn khách hàng muốn tìm kiếm",
                items: {
                    type: "string",
                    description:
                        "Tên của từng nhà hàng, quán ăn người dùng muốn tìm hiểu thông tin",
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
    time_open = "00:00",
    time_close = "23:59",
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
        const objectSearchDescription = search(description);
        if (blackList && blackList.length > 0) {
            find.name = { $nin: blackList };
        }
        if (objectSearchBorough.regex) {
            find["address.borough"] = objectSearchBorough.regex;
        }
        if (objectSearchDescription.regex) {
            find.description = objectSearchDescription.regex;
        }
        if (objectSearchStreet.regex) {
            find["address.street"] = objectSearchStreet.regex;
        }
        if (rating) {
            find["starMedium"] = { $gte: rating };
        }

        // Format time open and time close follow H:mm
        const timeOpen = moment(time_open, "HH:mm").format("HH:mm");
        const timeClose = moment(time_close, "HH:mm").format("HH:mm");
        find.time_open = { $gte: timeOpen };
        find.time_close = { $lte: timeClose };
        let listFood = []; // List food has category
        if (categories && categories.length > 0) {
            const newCategories = categories.map((category) => {
                return search(category).regex;
            });

            listFood = await MenuItem.find({ category: { $in: newCategories } }).select(
                "restaurantId title"
            );
            let listIdRestaurantHasCategory = new Set(
                listFood.map((food) => {
                    return food.restaurantId.toString();
                })
            );
            find._id = { $in: [...listIdRestaurantHasCategory] };
        }
        console.log(find);
        // Find the restaurant
        let restaurants = await Restaurant.find(find)
            .sort({
                quantitySolded: -1,
                starMedium: -1,
            })
            .select("name address")
            .limit(3);

        if (listFood && listFood.length > 0) {
            // Find the food of the restaurant
            restaurants = restaurants.map((restaurant) => {
                // Convert the restaurant to object
                restaurant = restaurant.toObject();

                let foods = listFood.filter((food) => {
                    return food.restaurantId.toString() === restaurant._id.toString();
                });

                // Sort foods by quantity solded and star medium
                foods.sort((a, b) => {
                    if (a.quantitySolded === b.quantitySolded) {
                        return b.starMedium - a.starMedium;
                    }
                    return b.quantitySolded - a.quantitySolded;
                });

                // Get maximum 2 foods if the restaurant has more than 2 foods
                foods = foods.slice(0, 2);

                return {
                    ...restaurant,
                    foods: foods,
                };
            });
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
        "Tìm kiếm, gợi ý nhà hàng theo yêu cầu của người dùng website Yummy cung cấp(nếu có). Ví dụ như quận của nhà hàng, đường phố nơi nhà hàng mở cửa, đánh giá sao của nhà hàng, thời gian mở cửa, thời gian đóng cửa, danh mục món ăn của nhà hàng, mô tả chi tiết của nhà hàng.",
    parameters: {
        type: "object",
        description:
            "Thông tin yêu cầu của người dùng về quán ăn, nhà hàng môn muốn tìm kiếm, gợi ý",
        properties: {
            borough: {
                type: "string",
                description: "Quận của nhà hàng",
            },
            street: {
                type: "string",
                description: "Đường phố nơi nhà hàng mở cửa",
            },
            rating: {
                type: "number",
                description: "Đánh giá sao trung bình của nhà hàng",
            },
            time_open: {
                type: "string",
                description: "Thời gian mở cửa của nhà hàng ví dụ như là 8:00",
            },
            time_close: {
                type: "string",
                description: "Thời gian đóng cửa của nhà hàng ví dụ như là 23:00",
            },
            categories: {
                type: "array",
                description:
                    "Danh sách các danh mục món ăn của nhà hàng như là: ăn vặt, đồ uống, trà sữa, món chay, bún phở, cơm, món á,...",
                items: {
                    type: "string",
                    description:
                        "Tên danh mục món ăn như: ăn vặt, đồ uống, trà sữa, món chay, bún phở, cơm, món á,...",
                },
            },
            description: {
                type: "string",
                description: "Mô tả chi tiết nhà hàng, quán ăn",
            },
            blackList: {
                type: "array",
                description: "Danh sách tên các nhà hàng mà người dùng không muốn xem",
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

        if (blackList && blackList.length > 0) {
            // Search the specialty food by name
            find.name = { $nin: blackList };
        }

        // Find the specialty food
        const specialtyFoods = await SpecialtyFood.find(find).limit(3).select("name");

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
    description:
        "Tìm kiếm món ăn đặc biệt, đặc trưng nhất của trang web Yummy, những món ăn này là đại diện cho website không phải của bất cứ nhà hàng nào",
    parameters: {
        type: "object",
        description: "Thông tin danh sách các món ăn đặc biệt, đặc trưng mà người dùng ko muốn xem",
        properties: {
            blackList: {
                type: "array",
                description: "Danh sách món ăn đặc biệt mà người dùng không muốn xem lại",
                items: {
                    type: "string",
                    description: "Tên của từng món ăn đặc trưng",
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
        if (blackList && blackList.length > 0) {
            find.title = { $nin: blackList };
        }
        if (objectSearchDescription.regex) {
            find.description = objectSearchDescription.regex;
        }
        if (starMedium) {
            find.starMedium = { $gte: starMedium };
        }
        if (categories && categories.length > 0) {
            const newCategories = categories.map((category) => {
                return search(category).regex;
            });
            find.category = { $in: newCategories };
        }
        if (discount) {
            find.discount = { $gte: discount };
        }
        find.price = { $gte: minPrice, $lte: maxprice };

        // Find the food
        const foods = await MenuItem.find(find)
            .sort({ starMedium: -1 })
            .limit(3)
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
        "Gợi ý, tìm kiếm thông tin các món ăn dựa vào mô tả của khách hàng(nếu có).Ví dụ như tên món ăn, mô tả chi tiết món ăn, giá cả món ăn, loại món ăn, phần trăm giảm giá, đánh giá số sao của món ăn",
    parameters: {
        type: "object",
        description: "Thông tin tìm kiếm chi tiết của món ăn mà khách hàng muốn tìm kiếm",
        properties: {
            description: {
                type: "string",
                description: "Mô tả chi tiết của món ăn",
            },
            minPrice: {
                type: "number",
                description: "Giá thấp nhất của món ăn người dùng muốn tìm",
            },
            maxPrice: {
                type: "number",
                description: "Giá cao nhất của món ăn người dùng muốn tìm",
            },
            categories: {
                type: "array",
                description:
                    "Danh sách các loại danh mục món ăn như: ăn vặt, đồ uống, trà sữa, món chay, bún phở, cơm, món á,..",
                items: {
                    type: "string",
                    description:
                        "Tên danh mục món ăn như: ăn vặt, đồ uống, trà sữa, món chay, bún phở, cơm, món á,..",
                },
            },
            discount: {
                type: "number",
                description: "Phần trăm giảm giá của món ăn",
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
async function informationFoods(listFoodName, listRestaurantNameOfFood) {
    try {
        // Find condition
        let find = {
            isAvailable: true,
        };

        // Search information of list food
        const newListFoodName = listFoodName.map((foodName) => {
            return search(foodName).regex;
        });
        find.title = { $in: newListFoodName };

        if (listRestaurantNameOfFood && listRestaurantNameOfFood.length > 0) {
            const newListRestaurantNameOfFood = listRestaurantNameOfFood.map((restaurantName) => {
                return search(restaurantName).regex;
            });

            const listIdRestaurant = await Restaurant.find({
                name: { $in: newListRestaurantNameOfFood },
            }).select("_id");
            const newListIdRestaurant = listIdRestaurant.map((restaurant) => {
                return restaurant._id.toString();
            });
            find.restaurantId = { $in: newListIdRestaurant };
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
    description:
        "Lấy ra thông tin cơ bản của một món ăn dựa vào tên món ăn và tên nhà hàng mà món ăn thuộc về(nếu có)",
    parameters: {
        type: "object",
        description:
            "Thông tin danh sách tên của các món ăn, có thể là tên nhà hàng mà món ăn thuộc về",
        properties: {
            listFoodName: {
                type: "array",
                description:
                    "Danh sách tên món ăn khách hàng muốn tìm kiếm được sắp xếp theo thứ tự ưu tiên. Ví dụ: bánh mochi, bánh tét thì tôi cần nhận danh sách món ăn theo thứ tự như sau: ['bánh mochi', 'bánh tét']",
                items: {
                    type: "string",
                    description: "Tên của từng món ăn",
                },
            },
            listRestaurantNameOfFood: {
                type: "array",
                description:
                    "Danh sách tên nhà hàng mà món ăn thuộc về. Ví dụ: bánh mochi quán A, bánh tét quán B thì tôi cần cung cấp danh sách tên nhà hàng theo thứ tự như sau: ['A', 'B']",
                items: {
                    type: "string",
                    description: "Tên của từng nhà hàng tướng ứng với món ăn thuộc về",
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
    informationOfFoods: ({ listFoodName, listRestaurantNameOfFood }) => {
        return informationFoods(listFoodName, listRestaurantNameOfFood);
    },
};

// Create a new instance of the GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generatetiveModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
        "Bạn là một chatbot của ứng dụng Yummy. Nhiệm vụ của bạn là hỗ trợ người dùng tìm hiểu về thông tin của website Yummy. Website Yummy là trang web cho phép mọi người đặt và bán đồ ăn, thức uống. Những thông tin cơ bản mà người dùng cần chủ yếu là các thông tin của món ăn và nhà hàng, đơn đặt hàng của họ.Bạn cố gắng hỗ trợ nhiệt tình nhé?",
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
    for (let history of historyChat) {
        console.log(history.parts[0].text);
    }

    // Start chat with the generative model
    const chat = generatetiveModel.startChat({
        history: historyChat,
    });

    // Send the question to the generative model
    const result = await chat.sendMessage(newQuestion);
    console.log(result.response.functionCalls(), "calling function");
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
