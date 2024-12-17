import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const OTPSchema = new Schema({
    otp: {
        type: String,
        required: true,
        unique: true,
    },
    email: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 120 }, // 2 minutes for exist
    },
    updatedAt: { type: Date, default: Date.now },
});

// Export Schema
export const Otp = mongoose.model("Otp", OTPSchema);
