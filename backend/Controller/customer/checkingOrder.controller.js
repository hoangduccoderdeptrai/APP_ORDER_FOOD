import { InvoiceUser } from "../../Model/invoiceUser.model.js";
import { Order } from "../../Model/order.model.js";
import { Review } from "../../Model/review.model.js";
import { MenuItem } from "../../Model/menuItem.model.js";
import { Restaurant } from "../../Model/restaurant.model.js";

// Import pagination helper
import { pagination } from "../../helper/pagination.js";

// Get order that is pending
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

        // Get all orders that are pending
        const orders = await Order.find({ status: status, accountId: userId })
            .sort({ orderDate: -1 })
            .skip(objectPagination.skip)
            .limit(objectPagination.limit);

        console.log(orders);

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
            console.log(order);

            // Get listItemsOrder
            let listItemsOrder = order.items;
            let newListItemsOrder = [];

            // Loop listItemsOrder
            for (let item of listItemsOrder) {
                // Get id food from food
                const idFood = item.menuItemId;

                // Get food
                const food = await MenuItem.findOne({ _id: idFood }).select("_id title price");

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
        const order = await Order.findById(idOrder);

        // Check if order is null
        if (!order) {
            return res.status(200).json({ message: "Order not found" });
        }

        const restaurant = await Restaurant.findById(order.restaurantId);

        if (!restaurant) {
            return res.status(200).json({ message: "Restaurant not found" });
        }

        // Check if listFood is null
        if (!listFood || listFood.length === 0) {
            return res.status(200).json({ message: "List food is empty" });
        }

        // Get userId from order
        const accountId = order.accountId;

        // Check is correct user
        if (userId != accountId) {
            return res
                .status(200)
                .json({ message: "You are not allowed to comment on this order" });
        }

        // Check if order is completed
        if (order.status != "completed") {
            return res.status(200).json({ message: "Order is not completed" });
        }

        // Check if user has already commented
        if (comment) {
            // Create comment for user
            const review = new Review({
                accountId: userId,
                restaurantId: order.restaurantId,
                reviewText: comment,
            });

            // Save comment
            await review.save();
        }

        const countQuantity = 0;
        const countRating = 0;
        // Calculate rating for each food
        for (let food of listFood) {
            // Get id food and star food
            const idFood = food.idFood;
            const star = food.star;
            const quantity = food.quantity;

            // Get food
            const oldfood = await MenuItem.findById(idFood);
            if (!oldfood) {
                continue;
            }
            // calculate rating
            countQuantity += quantity;
            countRating += star * quantity;
            oldfood.starMedium =
                (oldfood.starMedium * oldfood.quantitySolded + star * quantity) /
                (quantity + oldfood.quantitySolded);

            await oldfood.save();
        }

        // Calculate rating for restaurant
        restaurant.starMedium =
            (restaurant.starMedium * restaurant.quantitySolded + countRating) /
            (countQuantity + restaurant.quantitySolded);
        await restaurant.save();

        // Return Json
        return res.status(200).json({ message: "Comment successfully" });
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
        const order = await Order.findById(idOrder);

        // Check if order is null
        if (!order) {
            return res.status(200).json({ message: "Order not found" });
        }

        // Get userId from order
        const accountId = order.accountId;

        // Check is correct user
        if (userId != accountId) {
            return res.status(200).json({ message: "You are not allowed to cancel this order" });
        }

        // Check if order is pending
        if (order.status != "pending") {
            return res.status(200).json({ message: "Order is not pending" });
        }

        // Cancel order
        order.status = "canceled";
        await order.save();

        // Return Json
        return res.status(200).json({ message: "Cancel order successfully" });
    } catch (error) {
        // return error message
        return res.status(500).json({ message: error.message });
    }
};

export { getOrder, postEvaluation, deleteOrder };
