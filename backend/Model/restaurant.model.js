import mongoose from "mongoose";

const {Schema} = mongoose;

const RestaurantSchema = new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  name: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    zip: { type: String }
  },
  menu: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Restaurant = mongoose.model('Restaurant', RestaurantSchema);