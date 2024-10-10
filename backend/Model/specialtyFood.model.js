import mongoose from "mongoose";

// Import mongoose-slug-updater
import slugUpdater from "mongoose-slug-updater";

mongoose.plugin(slugUpdater);

// Import Schema
const { Schema } = mongoose;

const specialtyFoodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        slug: "name",
        unique: true,
    },
    imageUrl: {
        url: String,
        public_id: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const SpecialtyFood = mongoose.model("SpecialtyFood", specialtyFoodSchema);
