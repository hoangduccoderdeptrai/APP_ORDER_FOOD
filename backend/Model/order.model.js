import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    deliveryAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        borough: { type: String, required: true },
        zip: { type: String },
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
        enum: ["pending", "in-progress", "accept", "completed", "canceled"],
        default: "pending",
    },
    orderDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export const Order = mongoose.model("Order", OrderSchema);
