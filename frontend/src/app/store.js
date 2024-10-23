import {configureStore} from '@reduxjs/toolkit'
import RestaurantItemReduce from '../features/products-slice'
import RestaurantOderReduce from '../features/manageOrder-slice'
export const store =configureStore({
    reducer:{
        RestaurantItems:RestaurantItemReduce,
        RestaurantOders:RestaurantOderReduce
    }
})