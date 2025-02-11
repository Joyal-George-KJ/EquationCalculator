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
        calculateReads: (state) => {
            const {
                pumpReadingStarts,
                pumpReadingEnds,
                prices,
                cards,
                inlends,
                upiStart,
                upiClose,
                cash,
            } = state;

            // Step 1: Calculate total reading amount
            const totalReadingAmount = pumpReadingStarts.reduce(
                (total, start, index) => {
                    const readingDiff = pumpReadingEnds[index] - start;
                    return total + readingDiff * prices[index];
                },
                0
            );

            // Step 2: Calculate total UPI transactions
            const totalUPI = upiStart.reduce((total, start, index) => {
                return total + (upiClose[index] - start);
            }, 0);

            // Step 3: Calculate total other transactions (Card, Cash, In-Lend)
            const totalCards = cards.reduce((total, card) => total + card, 0);
            const totalCash = cash.reduce((total, c) => total + c, 0);
            const totalInLend = inlends.reduce(
                (total, inlend) => total + inlend,
                0
            );

            // Step 4: Total cashflow (Step 2 + Step 3)
            const totalCashFlow =
                totalUPI + totalCards + totalCash + totalInLend;

            // Step 5: Find the difference
            const difference = totalCashFlow - totalReadingAmount;

            return {
                pumpReadingStarts,
                pumpReadingEnds,
                prices,
                cards,
                inlends,
                upiStart,
                upiClose,
                cash,
                totalCards,
                totalCash,
                totalInLend,
                totalReadingAmount,
                totalUPI,
                difference,
            };
        },
    },
});

export const { setValue, calculateReads } = readingSlice.actions;
export default readingSlice.reducer;
