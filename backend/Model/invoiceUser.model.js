import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const InvoiceUserSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    orderMenuId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const InvoiceUser = mongoose.model("InvoiceUser", InvoiceUserSchema);
