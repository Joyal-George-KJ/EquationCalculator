import { useSelector } from "react-redux";

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

    // Step 1: Calculate total reading amount
    const step1Equations = pumpReadingStarts.map((start, index) => 
        `(${pumpReadingEnds[index]} - ${start}) * ${prices[index]}`
    );
    const totalReadingAmount = pumpReadingStarts.reduce((total, start, index) => {
        return total + (pumpReadingEnds[index] - start) * prices[index];
    }, 0);

    // Step 2: Calculate total UPI transactions
    const step2Equations = upiStart.map((start, index) => 
        `(${upiClose[index]} - ${start})`
    );
    const totalUPI = upiStart.reduce((total, start, index) => {
        return total + (upiClose[index] - start);
    }, 0);

    // Step 3: Calculate total other transactions (Card, Cash, In-Lend)
    const totalCards = cards.reduce((total, card) => total + card, 0);
    const totalCash = cash.reduce((total, c) => total + c, 0);
    const totalInLend = inlends.reduce((total, inlend) => total + inlend, 0);

    const step3Equation = `(${cards.join(" + ")}) + (${cash.join(" + ")}) + (${inlends.join(" + ")})`;
    const totalCashFlow = totalUPI + totalCards + totalCash + totalInLend;

    // Step 4: Calculate final difference
    const difference = totalReadingAmount - totalCashFlow;

    return (
        <div className="max-w-lg mx-auto mt-6 p-6 bg-neutral-800 text-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">📊 Transaction Summary</h2>

            {/* Step 1 */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Step 1: Fuel Sales Calculation</h3>
                <p className="text-sm">{step1Equations.join(" + ")}</p>
                <p className="text-md font-bold">= ₹{totalReadingAmount}</p>
            </div>

            {/* Step 2 */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Step 2: UPI Transactions</h3>
                <p className="text-sm">{step2Equations.join(" + ")}</p>
                <p className="text-md font-bold">= ₹{totalUPI}</p>
            </div>

            {/* Step 3 */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Step 3: Other Transactions</h3>
                <p className="text-sm">{step3Equation}</p>
                <p className="text-md font-bold">= ₹{totalCards + totalCash + totalInLend}</p>
            </div>

            {/* Step 4 */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Step 4: Total Cashflow</h3>
                <p className="text-md font-bold">= ₹{totalCashFlow}</p>
            </div>

            {/* Step 5: Final Difference */}
            <div className={`mt-4 p-3 rounded-xl text-center ${difference === 0 ? "bg-green-600" : "bg-red-600"}`}>
                <strong>📉 Difference: ₹{difference}</strong>
            </div>
        </div>
    );
};

export default DisplayDataCard;
