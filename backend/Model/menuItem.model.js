import mongoose from "mongoose";

// Import mongoose-slug-generator
import slug from "mongoose-slug-generator";

// Mongoose plugin
mongoose.plugin(slug);

// Import Schema
const { Schema } = mongoose;

const MenuItemSchema = new Schema({
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
    },
    imageUrl: [
        {
            url: { type: String }, //Cloudinary URL
            public_id: { type: String }, //Cloundinary id
        },
    ],
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    caterogy: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    starMedium: {
        type: Number,
        default: 0,
    },
    slug: {
        type: String,
        unique: true,
        slug: "title",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
export const MenuItem = mongoose.model("MenuItem", MenuItemSchema);
