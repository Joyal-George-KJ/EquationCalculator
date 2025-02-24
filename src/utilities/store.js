import { configureStore } from "@reduxjs/toolkit";
import readingSliceReducer from "./slice/readingSlice";
import priceListReducer from "./slice/priceListSlice";

const store = configureStore({
    reducer: {
        calculateReading: readingSliceReducer,
        priceList: priceListReducer,
    }
})

export default store