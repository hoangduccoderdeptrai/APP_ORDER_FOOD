import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const InvoiceUserSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderMenuId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("InvoiceUser", InvoiceUserSchema);
