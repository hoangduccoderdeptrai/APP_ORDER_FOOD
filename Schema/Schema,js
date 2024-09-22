import mongoose, { model, trusted } from "mongoose"
const Schema = mongoose.Schema
// Users Schema

const UserSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email :{
    type:String,
    required:true,
    unique:true
  },
  phone:{
    type:String,
    required:true
  },
  address:{
    street:{type:String},
    city:{type:String},
    zip:{type:String}
  },
  role:{
    type:String,
    enum:['customer','owner','admin'],
    default:'customer'
  },
  // a user can have multiple orders ,it should be an array
  orders:[{
    type:Schema.Types.ObjectId,
    ref:'Order'
  }],
  createdAt:{type:Date,default:Date.now},
  updatedAt:{type:Date,default:Date.now}
})

module.exports = mongoose.model('Users',UserSchema)
// Restaurants Schema
const RestaurantSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  address:{
    street:{type:String},
    city:{type:String},
    zip:{type:String}
  },
  menu:[{
    type:Schema.Types.ObjectId,
    ref:"MenuItem"
  }],
  createAt:{type:Date,default:Date.now},
  updatedAt:{type:Date,default:Date.now}

})

module.exports =mongoose.model('Restaurant',RestaurantSchema)

// Menu Items Schema
const MenuItemSchema = new Schema({
  restaurantId:{
    type:Schema.Types.ObjectId,
    ref:'Restaurant'
  },
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
module.exports = mongoose.model('MenuItem',MenuItemSchema)
// Orders Schema
const OrderSchema =new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  restaurantId:{
    type:Schema.Types.ObjectId,
    ref:'Restaurant',
    required:true
  },
  deliveryAddress:{
    street:{type:String,required:true},
    city:{type:String,required:true},
    zip:{type:String}
  },
  items:[{
    menuItemId:{
      type:Schema.Types.ObjectId,
      ref:'MenuItem',
      required:true
    },
    quatity:{type:Number,require:true},

    
  }],
  totalPrice:{type:Number,required:true},
  Status:{
    type:String,
    enum:['pending','in-progress','completed','canceled'],
    default:'pending'
  },
  orderDate:{type:Date,default:Date.now},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

})
module.exports = mongoose.model("Order",OrderSchema)
// Payment Schema
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
// Review Schema

const ReviewSchema = new Schema({
    userId:{
      type:Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    menuId :{
      type:Schema.Types.ObjectId,
      ref:'MenuItem',
      required:true
    },
    rating:{
      type:Number,
      min:0,
      max:5,
      required:true

    },
    reviewText:{
      type:String
    },
    createdAt:{
      type:Date,
      default:Date.now
    },
    updateAt:{
      type:Date,
      default:Date.now
    }
})
module.exports =mongoose.model('Review',ReviewSchema)