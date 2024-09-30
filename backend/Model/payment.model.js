import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // orderId:{
    //   type:Schema.Types.ObjectId,
    //   ref:'Order',
    //   required:true
    // },
    // totalPayment:{type:Number,required:true},
    Status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
    paymentMethod: {
        type: String,
        enum: ["credit cart", "paypal", "Cash"],
        required: true,
    },
});

module.exports = mongoose.model("Payment", PaymentSchema);

export const Payment = mongoose.model("Payment", PaymentSchema);
