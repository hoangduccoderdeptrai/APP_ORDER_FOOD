import { Restaurant } from "../../Model/restaurant.model.js";
import { MenuItem } from "../../Model/menuItem.model.js";
import { Order } from "../../Model/order.model.js";

// Create Order
const createOrder = async (req, res) => {
    try {
        const { restaurantId, items, deliveryAddress, phone, note } = req.body;
        const userId = req.user.userId;
        const ItemArr = [];
        let totalPrice = 0;

        if (!restaurantId || !deliveryAddress || !phone)
            return res.status(400).json({ msg: "Information is not fully" });

        // Check if the items exist
        if (!items || items.length == 0) return res.status(404).json({ msg: "Items not exist" });

        // Check if the restaurant exists
        const restaurant = await Restaurant.findById({ _id: restaurantId });
        if (!restaurant) return res.status(404).json({ msg: "Not found Restaurant" });

        // Check if the restaurant is active
        if (restaurant.status !== "active")
            return res.status(400).json({ msg: "Restaurant is not active" });

        // Handle order items for customer
        for (const val of items) {
            const { menuItemId, quantity } = val;
            const menuItem = await MenuItem.findById(menuItemId);
            if (!menuItem) return res.status(404).json({ msg: "Item not found" });

            quantity = parseInt(quantity);
            if (!Number.isInteger(quantity))
                return res.status(400).json({ msg: "Quantity have to interger" });
            if (quantity <= 0)
                return res.status(400).json({ msg: "Quantity have to greater than 0" });

            // Calculate total price
            const itemprice = menuItem.price * quantity;
            totalPrice += itemprice;
            ItemArr.push({
                menuItemId: menuItemId,
                quantity: quantity,
            });
            console.log(ItemArr);
        }

        const newOrder = new Order({
            accountId: userId,
            restaurantId,
            items: ItemArr,
            totalPrice: totalPrice,
            deliveryAddress: deliveryAddress,
            phone: phone,
            note: note || "",
            status: "pending",
        });

        // Save order
        await newOrder.save();

        // Return response
        return res.status(200).json({ data: newOrder });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { createOrder };
