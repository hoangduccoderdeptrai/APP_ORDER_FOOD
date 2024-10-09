import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const initialState ={
    isLoading:false,
    error:null,
    itemList :[]
}

export const addItem =createAsyncThunk(
    "/restaurant/addItem",
    async(rawData)=>{
        const result = await axios.post(
            'http://localhost:3000/api/restaurant/upload-items',
            rawData,
            {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }
        )
        return result?.data
    }
)

export const updateItem =createAsyncThunk(
    "/restaurant/updateItem",
    async(id,formData)=>{
        const result = await axios.patch(
            `http://localhost:3000/api/restaurant/update-items/${id}`,
            formData,
            {
                headers:{
                    "Content-Type":"application/json"
                }
            }
        )
        return result?.data
    }
)

export const deleteItem =createAsyncThunk(
    "/restaurant/deleteItem",
    async(id,formData)=>{
        const result = await axios.delete(
            `http://localhost:3000/api/restaurant/delete-items`,
            formData,
            {
                headers:{
                    "Content-Type":"application/json"
                }
            }
        )
        return result?.data
    }
)

export const fetchAllItem =createAsyncThunk(
    "/restaurant/fetchAllItem",
    async()=>{
        const result =await axios.get(
            "http://localhost:3000/restaurant/all-items",
            {
                headers:{
                    "Content-Type":"application/json"
                }
            }
        )
        return result?.data
    }
)

const RestaurantItemSlice =createSlice({
    name:"restaurantItem",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(
            fetchAllItem.pending,(state)=>{
                state.isLoading=true
            }
        ).addCase(
            fetchAllItem.fulfilled,(state,action)=>{
                state.isLoading=false
                state.itemList =action.payload.data
            }
        ).addCase(
            fetchAllItem.rejected,(state)=>{
                state.isLoading=false,
                state.itemList =[]
            }
        )
        // addItem
        .addCase(addItem.pending,(state)=>{
            state.isLoading=true
            state.error =null
        }).addCase(addItem.fulfilled,(state)=>{
            state.isLoading=false,
            state.error =null
        }).addCase(addItem.rejected,(state,action)=>{
            state.isLoading=false,
            state.error =action.error.message
        })
    }
})

export default RestaurantItemSlice.reducer