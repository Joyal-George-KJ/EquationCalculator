import { configureStore } from "@reduxjs/toolkit";
import priceListReducer from "./slice/priceListSlice";

const store = configureStore({
    reducer: {
        priceList: priceListReducer,
    }
})

export default store