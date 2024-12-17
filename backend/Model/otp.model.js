import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const OTPSchema = new Schema({
    otp: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 2 * 60 * 1000), // expires in 2 minutes
        index: { expires: 0 },
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Export Schema
export const Otp = mongoose.model("Otp", OTPSchema);
