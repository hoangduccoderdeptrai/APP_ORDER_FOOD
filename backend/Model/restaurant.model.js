import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const RestaurantSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        borough: { type: String, required: true },
        zip: { type: String },
    },
    profit: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
