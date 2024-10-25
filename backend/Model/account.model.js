import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const AccountSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    name_account: {
        type: String,
        required: true,
    },
    password_account: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    
    role_id: { type: Schema.Types.ObjectId, ref: "Role" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Account = mongoose.model("Account", AccountSchema);
