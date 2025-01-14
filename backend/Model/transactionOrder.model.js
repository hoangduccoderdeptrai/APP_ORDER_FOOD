import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const TransactionOrderSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    orderIdPayment: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: false,
    },
});

export const TransactionOrder = mongoose.model("TransactionOrder", TransactionOrderSchema);
