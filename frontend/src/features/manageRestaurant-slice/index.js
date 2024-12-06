import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {Navigate} from 'react-router-dom'
import api from "../api";
const initialState ={
    isLoading:false,
    checkAuth:"",
    error:null,
    restaurantList:[]
}
export const fetchRestaurants =createAsyncThunk(
    "admin/fetchRestaurants",
    async ({status,skipPage =0,rowsPerPage=5},{rejectWithValue})=>{
        try{
            const result = await api.get(
                "/admin/restaurant",
                
                {
                    params:{
                        status,
                        skip:skipPage,
                        limit:rowsPerPage
                    }
                }
            )
            console.log(result?.data)
            return result?.data
        }catch(err){
            if(err.response &&err.response.status===401){
                // console.error(err)
                
                return rejectWithValue("Unauthorized")
            }
        }
    }
)

const ManageRestaurantSlice =createSlice({
    name:"manageRestaurantSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(
            fetchRestaurants.pending,(state)=>{
                state.isLoading=true
            }
        ).addCase(
            fetchRestaurants.fulfilled,(state,action)=>{
                state.isLoading=false
                state.error =null
                state.restaurantList =action.payload?.data
            }
        ).addCase(
            fetchRestaurants.rejected,(state,action)=>{
                console.log(action)
                state.error =action.error.message
                state.isLoading =false
                state.checkAuth =action.payload
            }
        )
    }

})

export default ManageRestaurantSlice.reducer
