import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const ReviewSchema = new Schema({
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
