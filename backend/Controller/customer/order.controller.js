import { Users } from "../../Model/user.model.js";
import { Restaurant } from "../../Model/restaurant.model.js";
import { MenuItem } from "../../Model/menuItem.model.js";
import { Order } from "../../Model/order.model.js";

// Create Order
const createOrder = async (req, res) => {
    try {
        const { userId, restaurantId, items,deliveryAddress } = req.body;
        const ItemArr = [];
        let totalPrice = 0;
        // Check if the user exists
        const user = await Users.findById({ _id: userId });
        if (!user) return res.status(404).jsono({ msg: "Not found user" });
        // Check if the restaurant exists
        const restaurant = await Restaurant.findById({_id: restaurantId });
        if (!restaurant) return res.status(404).json({ msg: "Not found Restaurant" });
        if(!items||items.length==0)return res.status(404).json({msg:"Items not exist"})
        for(const val of items) {
            const { menuItemId, quantity } = val;
            const menuItem = await MenuItem.findById(menuItemId);
            if (!menuItem) return res.status(404).json({ msg: "Item not found" });

            // Calculate total price
            const itemprice = parseInt(menuItem.price) * parseInt(quantity);
            totalPrice += itemprice;
            ItemArr.push({
                menuItemId: menuItemId,
                quantity: Number(quantity),
            });
            console.log(ItemArr)
        };

        const newOrder = new Order({
            userId,
            restaurantId,
            items:ItemArr,
            totalPrice:totalPrice,
            deliveryAddress,
            status: "pending",
        });
        await newOrder.save();

        // add id order to User's order (reference)
        // user.order.push(newOrder._id);
        // await user.save();
        return res.status(200).json({data:newOrder})
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export {createOrder}
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
//         "zip":"",
//          "borough":""
//     }

// }
