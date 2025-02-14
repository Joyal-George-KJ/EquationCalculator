import { configureStore } from "@reduxjs/toolkit";
import readingReducer from './slice/readingSlice'
import priceListReducer from "./slice/priceListSlice";

const store = configureStore({
    reducer: {
        calculateReading: readingReducer,
        priceList: priceListReducer,
    }
})

export default store