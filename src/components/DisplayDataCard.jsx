import { useSelector } from "react-redux";

// Helper function to format numbers with two decimal places
const twoDecimal = (num) => parseFloat(num).toFixed(2);

const DisplayDataCard = () => {
    const {
        pumpReadingStarts,
        pumpReadingEnds,
        prices,
        cards,
        inlends,
        upiStart,
        upiClose,
        cash,
    } = useSelector((state) => state.calculateReading);

    // Step 1: Reading Difference Calculation (Full Details)
    const readingDetails = pumpReadingStarts.map((start, i) => {
        const end = pumpReadingEnds[i];
        const price = prices[i];
        return `(( ${end} - ${start} ) × ${price})`;
    });

    const readingDifferences = pumpReadingStarts.map((start, i) => (pumpReadingEnds[i] - start) * prices[i]);
    const readingDifference = readingDifferences.reduce((a, b) => a + b, 0);

    // Step 2: UPI Difference Calculation
    const upiDifferences = upiStart.map((start, i) => upiClose[i] - start);
    const upiDifference = upiDifferences.reduce((a, b) => a + b, 0);

    // Step 3-5: Cards, In-Lend, Cash Totals
    const cardTotal = cards.reduce((a, b) => a + b, 0);
    const inlendTotal = inlends.reduce((a, b) => a + b, 0);
    const cashTotal = cash.reduce((a, b) => a + b, 0);

    // Step 6: Total Sum Calculation
    const totalSum = cardTotal + inlendTotal + cashTotal + upiDifference;

    // Step 7: Final Difference
    const finalDifference = totalSum - readingDifference;

    return (
        <div className="max-w-full mt-6 p-6 bg-neutral-800 text-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">📊 Transaction Summary</h2>

            {/* Step 1: Reading Difference */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Step 1: Reading Difference</h3>
                <p className="text-sm">{step1Equations.join(" + ")}</p>
                <p className="text-md font-bold">= ₹{twoDecimal(readingDifference)}</p>
            </div>

            {/* Step 2: UPI Difference */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Step 2: UPI Difference</h3>
                <p className="text-sm">{step2Equations.join(" + ")}</p>
                <p className="text-md font-bold">= ₹{twoDecimal(upiDifference)}</p>
            </div>

            {/* Step 3: Card Total */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Step 3: Card Total</h3>
                <p className="text-sm">{step3Equation}</p>
                <p className="text-md font-bold">= ₹{twoDecimal(cardTotal)}</p>
            </div>

            {/* Step 4: In-Lend Total */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Step 4: In-Lend Total</h3>
                <p className="text-sm">{step4Equation}</p>
                <p className="text-md font-bold">= ₹{twoDecimal(inlendTotal)}</p>
            </div>

            {/* Step 5: Cash Total */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Step 5: Cash Total</h3>
                <p className="text-sm">{step5Equation}</p>
                <p className="text-md font-bold">= ₹{twoDecimal(cashTotal)}</p>
            </div>

            {/* Step 6: Total of All Transactions */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Step 6: Total of Cards, Cash, Inlend, UPI</h3>
                <p className="text-sm">{step6Equation}</p>
                <p className="text-md font-bold">= ₹{twoDecimal(totalSum)}</p>
            </div>

            {/* Step 7: Final Difference */}
            <div className={`mt-4 p-3 rounded-xl text-center ${finalDifference >= -10 ? "bg-green-600" : "bg-red-600"}`}>
                <h3 className="text-lg font-semibold">Step 7: Final Difference</h3>
                <p className="text-sm">{step7Equation}</p>
                <strong>📉 Difference: ₹{`${finalDifference > 0 ? '+' : ''}${twoDecimal(finalDifference)}`}</strong>
            </div>
        </div>
    );
};

export default DisplayDataCard;