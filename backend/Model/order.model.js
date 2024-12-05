import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const OrderSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    items: [
        {
            menuItemId: {
                type: Schema.Types.ObjectId,
                ref: "MenuItem",
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed", "canceled"],
        default: "pending",
    },
    phone: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export const Order = mongoose.model("Order", OrderSchema);
