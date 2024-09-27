import mongoose from "mongoose"
const {Schema} =mongoose
const MenuItemSchema = new Schema({
    restaurantId:{
      type:Schema.Types.ObjectId,
      ref:'Restaurant'
    },
    imageUrl:[{
      url:{type:String}, //Cloudinary URL
      public_id:{type:String} //Cloundinary id
    }],
    title:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
    caterogy:{
      type:String
    },
    isAvailable:{
      type:Boolean,
      default:true
  
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
export const MenuItem = mongoose.model('MenuItem',MenuItemSchema)