import { Order } from "../../Model/order.model.js"
const getOrderPending =async (req,res)=>{
    try{
       const status =req.query.status ||'pending'
       console.log(status,req.query.status)
       const skipPage =parseInt(req.query.skip)||0
       const restaurantId = req.params.id 
    //    console.log(skipPage,status)
       const orders = await Order.find({restaurantId:restaurantId,status:status}).sort({orderDate:-1}).limit(10).skip(skipPage*10).populate({path:'items.menuItemId',model:'MenuItem'})
       return res.status(200).json({data:orders})

    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:err.message})
    }
    
    
}

export {getOrderPending}