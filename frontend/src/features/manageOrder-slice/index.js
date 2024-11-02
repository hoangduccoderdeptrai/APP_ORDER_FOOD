import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState ={
    isLoading:false,
    error:null,
    orderList:[]
    

}
export const getOrder =createAsyncThunk(
    "restaurant/order/get",
    async({restaurantId,status,skipPage=0})=>{
        console.log(restaurantId,status,skipPage)
        const result = await axios.get(
            `http://localhost:3000/api/restaurant/order/${restaurantId}`,
            {
                params:{
                    status,
                    skip:skipPage
                }
            }
        )

        return result?.data

    }
)
export const updateStatusOrder =createAsyncThunk(
    async({restaurantId,orderId,status})=>{
        const result = await axios.patch(
            `http://localhost:3000/api/restaurant/order/${restaurantId}`,
            
            {
                params:{
                    orderId,
                    status
                }
            }

        )
        return result?.data
    }
)

const RestaurantOrderSlice =createSlice({
    name:'RestaurantOrder',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(
            getOrder.pending,(state)=>{
                state.isLoading=true
    
            }
        ).addCase(
            getOrder.fulfilled,(state,action)=>{
                state.isLoading=false,
                state.orderList =action.payload?.data
            }
        ).addCase(
            getOrder.rejected,(state)=>{
                state.isLoading=false,
                state.orderList =[]
            }
        )
        //updateStatus
        .addCase(
            updateStatusOrder.pending,(state)=>{
                state.isLoading=true
            }
        ).addCase(
            updateStatusOrder.fulfilled,(state)=>{
                state.isLoading =false,
                state.error =null
                
            }
        ).addCase(
            updateStatusOrder.rejected,(state,action)=>{
                state.isLoading=false,
                state.error = action.error.message

            }
        )
    }
})

export default RestaurantOrderSlice.reducer