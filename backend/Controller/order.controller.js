import { User } from "../Model/user.model";
import { Restaurant } from "../Model/restaurant.model";
import { MenuItem } from "../Model/menuItem.model";
import { Order } from "../Model/order.model";

// Create Order
const createOrder = async (req, res) => {
    try {
        const { userId, restaurantId, items } = req.body;
        const ItemArr = [];
        const totalPrice = 0;
        // Check if the user exists
        const user = await User.findById({ _id: userId });
        if (!user) return res.status(404).jsono({ msg: "Not found user" });
        // Check if the restaurant exists
        const restaurant = await Restaurant.findById({ restaurantId });
        if (!restaurant) return res.status(404).json({ msg: "Not found Restaurant" });

        items.forEach(async (val) => {
            const { menuItemId, quantity } = val;
            const menuItem = await MenuItem.findById(menuItemId);
            if (!menuItem) return res.status(404).json({ msg: "Item not found" });

            // Calculate total price
            const itemprice = menuItem.price * quantity;
            totalPrice += itemprice;
            ItemArr.push({
                menuItemId: menuItemId,
                quantity: quantity,
                price: menuItem.price,
            });
        });

        const newOrder = new Order({
            userId,
            restaurantId,
            item: ItemArr,
            totalPrice: totalPrice,
            deliveryAddress,
            status: "pending",
        });
        await newOrder.save();

        // add id order to User's order (reference)
        User.order.push(newOrder._id);
        await user.save();
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
// request body looke like to create an order (json format)
// {
//     "userId":"123",
//     "restaurantId":"123",
//     "items":[
//         {
//             "menuItemId":"",
//             "quantity":""
//         },
//         {
//             "menuItemId":"",
//             "quantity":""
//         }
//     ],
//     "deliveryAddress":{
//         "street":"",
//         "city":"",
//         "zip":""
//     }

// }
