import { configureStore } from '@reduxjs/toolkit'
import RestaurantItemReduce from '../features/products-slice'
import RestaurantOderReduce from '../features/manageOrder-slice'
import ManageRestaurantReduce from '../features/manageRestaurant-slice'
export const store = configureStore({
  reducer: {
    RestaurantItems: RestaurantItemReduce,
    RestaurantOders: RestaurantOderReduce,
    ManageRestaurant: ManageRestaurantReduce,
  },
})
