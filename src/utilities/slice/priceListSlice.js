import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    xp: 112.64,
    ms: 105.49,
    ds: 94.48,
    lpg: 61.67,
};

const priceList = createSlice({
    name: "priceList",
    initialState: initialState,
    reducers: {
        setPriceList: (state, action) => {
            if (action.payload) {
                let { key, value } = action.payload;
                state[key] = value
            } else {
                state = initialState;
            }
            localStorage.setItem("pricelist", JSON.stringify(state));
        },
    },
});

export const { setPriceList } = priceList.actions;
export default priceList.reducer;
