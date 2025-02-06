import { configureStore } from "@reduxjs/toolkit";
import readingReducer from './slice/readingSlice'

const store = configureStore({
    reducer: {
        calculateReading: readingReducer
    }
})

export default store