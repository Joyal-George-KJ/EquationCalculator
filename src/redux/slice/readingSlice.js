import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const readingSlice = createSlice({
    name: "Reading Slice",
    initialState,
    reducers: {
        pumpReadings: () => {},
        cardReadings: () => {},
        creditReadings: () => {},
        upiReadings: () => {},
        
    },

});
