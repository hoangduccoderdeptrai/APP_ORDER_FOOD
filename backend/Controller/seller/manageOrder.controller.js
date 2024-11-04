import { model } from "mongoose"
import { Order } from "../../Model/order.model.js"
const getOrderPending =async (req,res)=>{
    try{
       const status =req.query.status ||'pending'
       console.log(status,req.query.status)
       const skipPage =parseInt(req.query.skip)||0
       const restaurantId = req.params.id 
    //    console.log(skipPage,status)
       const orders = await Order.find({restaurantId:restaurantId,status:status}).sort({orderDate:-1}).limit(10).skip(skipPage*10).populate({path:'items.menuItemId',model:'MenuItem'}).populate({path:'accountId',select:'name phone',model:'Account'})
       return res.status(200).json({data:orders})

    }catch(err){
        console.log(err.message)
        res.status(500).json({msg:err.message})
    }
    
    
}
const updateStatusOrder =async(req,res)=>{
    try{
        // console.log('test update status',req.query)
        
        const restaurantId =req.params.id
        const {orderId,status} =req.body
        
        // console.log(restaurantId,orderId,status)
        if(!restaurantId || !orderId || !status){
            return res.status(400).json({msg: "Restaurant ID, order ID, and status are required"})
        }
        const order = await Order.findOne({restaurantId:restaurantId,_id:orderId})
        
        if(!order){
            return res.status(404).json({msg:"Not found Order"})
        }
        order.status =status.toLowerCase()
        await order.save()
        console.log(order)
        return res.status(200).json({msg:"Order was updated "})
    }catch(err){
        console.error(err.message)
        res.status(500).json({msg:err.message})
    }
}

export {getOrderPending,updateStatusOrder}