import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        borough: { type: String },
        zip: { type: String },
    },
    role_id: { type: Schema.Types.ObjectId, ref: "Role" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Users = mongoose.model("User", UserSchema);
