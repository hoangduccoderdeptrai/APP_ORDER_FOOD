import mongoose from "mongoose"
const Schema =mongoose.Schema
const PaymentSchema =new Schema({
    userId:{
      type:Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    orderId:{
      type:Schema.Types.ObjectId,
      ref:'Order',
      required:true
    },
    totalPayment:{type:Number,required:true},
    Status:{
      type:String,
      enum:['pending','completed','failed'],
      default:'pending'
    },
    paymentDate:{
      type:Date,
      default:Date.now
    },
    paymentMethod:{
      type:String,
      enum:['credit cart','paypal','Cash'],
      required:true
    }
  
  
})
module.exports = mongoose.model('Payment',PaymentSchema)