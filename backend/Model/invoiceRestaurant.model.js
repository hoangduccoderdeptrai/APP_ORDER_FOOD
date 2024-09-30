import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const InvoiceRestaurantSchema = new Schema({
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
    items: [
        {
            menuItemId: {
                type: Schema.Types.ObjectId,
                ref: "MenuItem",
                required: true,
            },
            quatity: { type: Number, require: true },
        },
    ],
    totalPayment: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const InvoiceRestaurant = mongoose.model("InvoiceRestaurant", InvoiceRestaurantSchema);
