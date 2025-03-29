import mongoose from "mongoose";
import slugUpdater from "mongoose-slug-updater"
// Import Schema
const { Schema } = mongoose;
const blogSchema =new Schema({
    title: String,
    author: String,
    slug: {type:String,slug:"title",unique:true},
    content: String,
    description:String,
    imageUrls:[
        {
            url: { type: String }, //Cloudinary URL
            public_id: { type: String }, //Cloundinary id
        },
    ], // Lưu nhiều ảnhảnh
},{ timestamps: true })

export const Blog = mongoose.model("Blog", blogSchema)