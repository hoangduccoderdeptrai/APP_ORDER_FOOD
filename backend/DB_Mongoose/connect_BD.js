import mongoose from "mongoose";

const connect = async(uri)=>{
    try{
        await mongoose.connect(uri)
        console.log('Connection was succesfull')
    }catch(err){
        console.log('unconnected to DB')
    }
   
}
export default connect