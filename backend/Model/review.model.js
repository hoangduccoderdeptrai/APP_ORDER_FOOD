import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const ReviewSchema = new Schema({
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
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    reviewText: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Review = mongoose.model("Review", ReviewSchema);
