import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Navigate } from 'react-router-dom'
import api from '../api'
const initialState = {
  isLoading: false,
  checkAuth: '',
  error: null,
  restaurantList: [],
  number_row: 0,
}
export const fetchRestaurants = createAsyncThunk(
  'admin/fetchRestaurants',
  async ({ status, skipPage = 0, rowsPerPage = 5 }, { rejectWithValue }) => {
    console.log(status)
    try {
      const result = await api.get(
        '/admin/restaurant',

        {
          params: {
            status,
            skip: skipPage,
            limit: rowsPerPage,
          },
        },
      )
      console.log(result?.data)
      return result?.data
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // console.error(err)

        return rejectWithValue('Unauthorized')
      }
    }
  },
)
export const liveSearchRestaurant = createAsyncThunk(
  'admin/liveSearchRestaurant',
  async ({ keyword, status, skipPage = 0, rowsPerPage = 5 }) => {
    const result = await api.get('admin/restaurant/search', {
      params: {
        keyword,
        status,
        skip: skipPage,
        limit: rowsPerPage,
      },
    })
    return result?.data
  },
)
export const updateRestaurant = createAsyncThunk(
  'admin/updateRestaurant',
  async ({ idRest, status_rest }) => {
    const result = await api.patch(`/admin/restaurant/change-status-restaurant/${idRest}`, {
      status: status_rest,
    })
    return result?.data
  },
)

const ManageRestaurantSlice = createSlice({
  name: 'manageRestaurantSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        console.log(action.payload?.data)
        state.isLoading = false
        state.error = null
        state.restaurantList = action.payload?.data?.restaurants
        state.number_row = action.payload?.data?.number_row
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        console.log(action)
        state.error = action.error.message
        state.isLoading = false
        state.checkAuth = action.payload
      })
      // search restaurant
      .addCase(liveSearchRestaurant.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(liveSearchRestaurant.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.restaurantList = action.payload?.data?.restaurants
        state.number_row = action.payload?.data?.number_row
      })
      .addCase(liveSearchRestaurant.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
        state.checkAuth = action.payload
      })
      // updateItem
      .addCase(updateRestaurant.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateRestaurant.fulfilled, (state) => {
        state.isLoading = false
        state.error = null
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
        state.checkAuth = action.payload
      })
  },
})

export default ManageRestaurantSlice.reducer
