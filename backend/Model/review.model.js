import mongoose from "mongoose";
const {Schema} = mongoose

const ReviewSchema =new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true

    },
    menuId:{
        type:Schema.Types.ObjectId,
        ref:'MenuItem',
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        
        
    },
    reviewText:{
        type:String,

    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Review',ReviewSchema)