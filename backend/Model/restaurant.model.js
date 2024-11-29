import mongoose from "mongoose";

// Import slug
import slug from "mongoose-slug-updater";

//  Plug in slug
mongoose.plugin(slug);

// Import Schema
const { Schema } = mongoose;

const RestaurantSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    name: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        borough: { type: String, required: true },
        zip: { type: String },
    },
    profit: { type: Number, default: 0 },
    quantitySolded: {
        type: Number,
        default: 0,
    },
    phone: { type: String, required: true },
    time_open: { type: String, required: true },
    time_close: { type: String, required: true },
    starMedium: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["pending", "active", "inactive"],
        default: "pending",
    },
    description: { type: String },
    imageUrl: [
        {
            url: { type: String }, //Cloudinary URL
            public_id: { type: String }, //Cloundinary id
        },
    ],
    slug: { type: String, slug: "name", unique: true },
    review: {
        type: Number,
        default: 0,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
