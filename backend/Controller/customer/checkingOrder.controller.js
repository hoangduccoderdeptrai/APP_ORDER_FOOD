import { InvoiceUser } from "../../Model/invoiceUser.model.js";
import { Order } from "../../Model/order.model.js";
import { Review } from "../../Model/review.model.js";
import { MenuItem } from "../../Model/menuItem.model.js";
import { Restaurant } from "../../Model/restaurant.model.js";

// Import pagination helper
import { pagination } from "../../helper/pagination.js";

// Get order of user
const getOrder = async (req, res) => {
    try {
        // Get user id
        const userId = req.user.userId;

        // Get type of order
        const status = req.query.status;

        // Pagination for order checking
        const numberOrders = await Order.countDocuments({
            accountId: userId,
            status: status,
        });

        // Object pagination
        const objectPagination = pagination(req.query, numberOrders, {
            currentPage: 1,
            limit: 4,
        });

        // Get all orders via status
        const orders = await Order.find({ status: status, accountId: userId })
            .sort({ orderDate: -1 })
            .skip(objectPagination.skip)
            .limit(objectPagination.limit);

        if (!orders || orders.length === 0) {
            return res.status(200).json({ message: "No order found" });
        }

        // Create new orders
        let newOrders = [];
        for (let order of orders) {
            // Convert order to object
            order = order.toObject();

            // Get id restaurant from order
            const idRestaurant = order.restaurantId;
            console.log(idRestaurant);

            // Get name restaurant
            const nameRestaurant = await Restaurant.findById(idRestaurant).select("name");
            order.nameRestaurant = nameRestaurant;

            // Get listItemsOrder
            let listItemsOrder = order.items;
            let newListItemsOrder = [];

            // Loop listItemsOrder
            for (let item of listItemsOrder) {
                // Get id food from food
                const idFood = item.menuItemId;

                // Get food
                const food = await MenuItem.findOne({ _id: idFood }).select(
                    "_id title price starMedium imageUrl"
                );

                newListItemsOrder.push({
                    food: food,
                    quantity: item.quantity,
                });
            }
            // Add new listItemsOrder to order
            order.items = newListItemsOrder;
            newOrders.push(order);
        }

        // Return Json
        return res.status(200).json({
            orders: newOrders,
            pagination: objectPagination,
        });
    } catch (error) {
        // return error message
        return res.status(500).json({ message: error.message });
    }
};

// Post comment to order
const postEvaluation = async (req, res) => {
    try {
        // Get user id
        const userId = req.user.userId;

        // Get from evaluation of customer
        const comment = req.body.comment;
        const idOrder = req.body.idOrder;
        const listFood = req.body.listFood;

        // Get order
        const order = await Order.findOne({ _id: idOrder, accountId: userId });

        // Check if order is null
        if (!order) {
            return res.status(200).json({ message: "Order not found" });
        }

        // Get restaurant
        const restaurant = await Restaurant.findById(order.restaurantId);
        if (!restaurant) {
            return res.status(200).json({ message: "Restaurant not found" });
        }

        // Check if listFood is null
        if (!listFood || listFood.length === 0) {
            return res.status(200).json({ message: "List food is empty" });
        }

        // Check if order is completed
        if (order.status != "completed") {
            return res.status(200).json({ message: "Order is not completed" });
        }

        // Validate listFood is in order
        if (listFood.length !== order.items.length) {
            return res.status(200).json({ message: "List food is not match with order" });
        }
        for (let food of listFood) {
            let check = false;
            for (let item of order.items) {
                if (food.idFood == item.menuItemId.toString()) {
                    food.quantity = item.quantity;
                    check = true;
                    break;
                }
            }
            if (!check) {
                return res.status(200).json({ message: "List food is not match with order" });
            }
        }

        let countQuantity = 0;
        let countRating = 0;
        // Calculate rating for each food
        for (let food of listFood) {
            // Get id food and star food
            const idFood = food.idFood;

            // convert star and quantity to number
            let star = 0;
            try {
                star = parseInt(food.star);
            } catch (error) {
                return res.status(400).json({ message: "Star is not number" });
            }

            // Get food
            const oldfood = await MenuItem.findById(idFood);
            if (!oldfood) {
                continue;
            } // if food not found because food is deleted

            // calculate rating
            countQuantity += food.quantity;
            countRating += star * food.quantity;
            oldfood.starMedium =
                (oldfood.starMedium * oldfood.quantitySolded + star * food.quantity) /
                oldfood.quantitySolded;

            // Save food
            await oldfood.save();
        }

        let ratingOrder = countRating / countQuantity;
        // Calculate rating for restaurant
        restaurant.starMedium =
            (restaurant.starMedium * restaurant.review + ratingOrder) / (restaurant.review + 1);
        restaurant.review += 1;

        // Save restaurant
        await restaurant.save();

        // Check if user has already commented
        if (comment) {
            // Create comment for user
            const review = new Review({
                accountId: userId,
                restaurantId: order.restaurantId,
                reviewText: comment,
                rating: ratingOrder,
            });

            // Save comment
            await review.save();
        }

        // Return Json
        return res.status(200).json({ message: "valuate your order successfully" });
    } catch (error) {
        // return error message
        return res.status(500).json({ message: error.message });
    }
};

// Cancel order
const deleteOrder = async (req, res) => {
    try {
        // Get user id
        const userId = req.user.userId;

        // Get id order
        const idOrder = req.body.idOrder;

        // Get order
        const order = await Order.findOne({ _id: idOrder, accountId: userId });

        // Check if order is null
        if (!order) {
            return res.status(200).json({ message: "Order not found" });
        }

        // Check if order is pending
        if (order.status != "pending") {
            return res.status(200).json({ message: "Order is not pending" });
        }

        // Cancel order
        order.status = "canceled";

        // Save order
        await order.save();

        // Return Json
        return res.status(200).json({ message: "Cancel order successfully" });
    } catch (error) {
        // return error message
        return res.status(500).json({ message: error.message });
    }
};

export { getOrder, postEvaluation, deleteOrder };
