import mongoose from "mongoose";

// Import Schema
const { Schema } = mongoose;

const RoleSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    permissions: {
        type: Object,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Role", RoleSchema);
