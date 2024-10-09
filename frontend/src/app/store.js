import {configureStore} from '@reduxjs/toolkit'
import RestaurantItemReduce from '../features/products-slice'
export const store =configureStore({
    reducer:{
        RestaurantItems:RestaurantItemReduce
    }
})