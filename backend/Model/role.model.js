import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const RoleSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    permissions: {
        type: Object,
        default: {},
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Role = mongoose.model("Role", RoleSchema);
