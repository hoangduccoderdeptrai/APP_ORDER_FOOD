import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'
const initialState = {
  isLoading: false,
  error: null,
  orderList: [],
}
export const getOrder = createAsyncThunk(
  'restaurant/order/get',
  async ({ restaurantId, status, skipPage = 0 }) => {
    const result = await api.get(`http://localhost:3000/api/restaurant/order/${restaurantId}`, {
      params: {
        status,
        skip: skipPage,
      },
    })
    console.log(result?.data)
    return result?.data
  },
)
export const updateStatusOrder = createAsyncThunk(
  'restaurant/order/updateStatus',
  async ({ restaurantId, orderId, status }) => {
    console.log(restaurantId, orderId, status)
    const result = await api.patch(`http://localhost:3000/api/restaurant/order/${restaurantId}`, {
      orderId,
      status,
    })
    return result?.data
  },
)

const RestaurantOrderSlice = createSlice({
  name: 'RestaurantOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        ;(state.isLoading = false), (state.orderList = action.payload?.data)
      })
      .addCase(getOrder.rejected, (state) => {
        ;(state.isLoading = false), (state.orderList = [])
      })
      //updateStatus
      .addCase(updateStatusOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateStatusOrder.fulfilled, (state) => {
        ;(state.isLoading = false), (state.error = null)
      })
      .addCase(updateStatusOrder.rejected, (state, action) => {
        ;(state.isLoading = false), (state.error = action.error.message)
      })
  },
})

export default RestaurantOrderSlice.reducer
