import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    pumpReadingStarts: [],
    pumpReadingEnds: [],
    prices: [],
    cards: [],
    inlends: [],
    upiStart: [],
    upiClose: [],
    cash: [],
};

const readingSlice = createSlice({
    name: "calculateReading",
    initialState,
    reducers: {
        setValue: (state, action) => {
            const { key, index, value } = action.payload;
            if (key in state) {
                if (Array.isArray(state[key])) {
                    // ✅ Safe way to update array without mutation
                    state[key][index] = value;
                } else {
                    // ✅ If it's a string (like `name`), just set it
                    state[key] = value;
                }
            } else {
                console.warn(`Invalid key: "${key}"`);
            }
        },
    },
});

export const { setValue } = readingSlice.actions;
export default readingSlice.reducer;
