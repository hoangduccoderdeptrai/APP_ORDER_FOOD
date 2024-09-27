import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    zip: { type: String }
  },
  role: { type: String, enum: ['customer', 'owner', 'admin'], default: 'customer' },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
