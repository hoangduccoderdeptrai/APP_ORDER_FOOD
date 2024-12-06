import { Order } from "../../Model/order.model.js";
import { Restaurant } from "../../Model/restaurant.model.js";
import { MenuItem } from "../../Model/menuItem.model.js";

// Get order pending
const getOrder = async (req, res) => {
    try {
        // Get status and skip page
        const status = req.query.status || "pending";
        const skipPage = parseInt(req.query.skip) || 0;

        // Get restaurant of seller
        const restaurantId = req.user.restaurantId;

        // Get order of restaurant
        const orders = await Order.find({ restaurantId: restaurantId, status: status })
            .sort({ orderDate: -1 })
            .limit(10)
            .skip(skipPage * 10)
            .populate({ path: "items.menuItemId",select:"name", model: "MenuItem" })
            .populate({ path: "accountId", select: "name phone", model: "Account" });
        return res.status(200).json({ data: orders });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: err.message });
    }
};

// Update status order
const updateStatusOrder = async (req, res) => {
    try {
        // Get restaurant ID, order ID, and status
        const restaurantId = req.user.restaurantId;
        const { orderId, status } = req.body;

        if (!restaurantId || !orderId || !status) {
            return res
                .status(400)
                .json({ msg: "Restaurant ID, order ID, and status are required" });
        }

        // Find order
        const order = await Order.findOne({ restaurantId: restaurantId, _id: orderId });
        if (!order) {
            return res.status(404).json({ msg: "Not found Order" });
        }

        // If status is canceled, check if order is pending
        if (status.toLowerCase() === "canceled" && order.status !== "pending") {
            return res.status(400).json({ msg: "Order can't not canceled" });
        }

        // If status is completed, calculate profit and quantity solded
        if (status.toLowerCase() === "completed" && order.status == "in-progress") {
            // Get restaurant
            const restaurant = await Restaurant.findById(restaurantId);
            if (!restaurant) {
                return res.status(404).json({ msg: "Not found Restaurant" });
            }

            // Update profit and quantity solded of restaurant
            let totalPrice = order.totalPrice;
            let quantitySolded = 0;
            promiseOrders = order.items.map(async (item) => {
                // Get menuItem by id
                const menuItem = await MenuItem.findById(item.menuItemId);

                // Update quantity solded
                menuItem.quantitySolded += item.quantity;
                menuItem.quantity -= item.quantity;

                // Save menuItem
                await menuItem.save();

                quantitySolded += item.quantity;
            });

            // Wait for all promises
            await Promise.all(promiseOrders);

            // Update profit and quantity solded
            restaurant.profit += totalPrice;
            restaurant.quantitySolded += quantitySolded;

            // Save restaurant
            await restaurant.save();
        }

        // Update status
        order.status = status.toLowerCase();

        // Save order
        await order.save();

        // Return response
        return res.status(200).json({ msg: "Order was updated " });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: err.message });
    }
};

export { getOrder, updateStatusOrder };
