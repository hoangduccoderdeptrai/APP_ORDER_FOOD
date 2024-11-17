import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchRestaurants =createAsyncThunk(
    "admin/fetchRestaurants",
    async ({status,skipPage =0})=>{
        const result = await axios.get(
            "http//localhost:3000/admin/restaurant",
            {
                params:{
                    status,
                    skipPage
                }
            }
        )
        return result?.data
    }
)
