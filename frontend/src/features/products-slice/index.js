import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'
const initialState = {
  isLoading: false,
  error: null,
  itemList: [],
}

export const addItem = createAsyncThunk('/restaurant/addItem', async (rawData) => {
  const result = await api.post('http://localhost:3000/api/restaurant/upload-items', rawData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return result?.data
})

export const updateItem = createAsyncThunk(
  '/restaurant/updateItem',
  async ({ currentEditedId, formData }) => {
    const result = await api.patch(
      `http://localhost:3000/api/restaurant/update-items/${currentEditedId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return result?.data
  },
)

export const deleteItem = createAsyncThunk('/restaurant/deleteItem', async (id) => {
  const result = await api.delete(`http://localhost:3000/api/restaurant/delete-items/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return result?.data
})

export const fetchAllItem = createAsyncThunk('/restaurant/fetchAllItem', async (restaurantId) => {
  const result = await api.get(`http://localhost:3000/api/restaurant/all-items`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log(result)
  return result?.data
})

const RestaurantItemSlice = createSlice({
  name: 'restaurantItem',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAllItem.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.itemList = action.payload.data
      })
      .addCase(fetchAllItem.rejected, (state) => {
        ;(state.isLoading = false), (state.itemList = [])
      })
      // addItem
      .addCase(addItem.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addItem.fulfilled, (state) => {
        ;(state.isLoading = false), (state.error = null)
      })
      .addCase(addItem.rejected, (state, action) => {
        ;(state.isLoading = false), (state.error = action.error.message)
      })
      // deleteItem
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteItem.fulfilled, (state) => {
        ;(state.isLoading = false), (state.error = null)
      })
      .addCase(deleteItem.rejected, (state, action) => {
        ;(state.isLoading = false), (state.error = action.error.message)
      })
      // updateItem
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateItem.fulfilled, (state) => {
        ;(state.isLoading = false), (state.error = null)
      })
      .addCase(updateItem.rejected, (state, action) => {
        ;(state.isLoading = false), (state.error = action.error.message)
      })
  },
})

export default RestaurantItemSlice.reducer
