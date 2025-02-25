import { useSelector } from "react-redux";

const DisplayDataCard = () => {
    // Helper function to convert number to 2 decimal places
    const twoDecimal = (num) => Number(num).toFixed(2);
    
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

    // Step 1: Reading Difference Calculation
    const step1Equations = pumpReadingStarts.map((start, index) => 
        `(${pumpReadingEnds[index]} - ${start}) * ${prices[index]}`
    );
    const readingDifference = pumpReadingStarts.reduce((total, start, index) => {
        return (total + (pumpReadingEnds[index] - start) * prices[index]).toFixed(2);
    }, 0);

    // Step 2: UPI Difference Calculation
    const step2Equations = upiStart.map((start, index) => 
        `(${upiClose[index]} - ${start})`
    );
    const upiDifference = upiStart.reduce((total, start, index) => {
        return (total + (upiClose[index] - start)).toFixed(2);
    }, 0);

    // Step 3: Card Total Calculation
    const cardTotal = cards.reduce((total, card) => total + card, 0);
    const step3Equation = cards.length ? `${cards.join(" + ")} = ${twoDecimal(cardTotal)}` : "0";

    // Step 4: In-Lend Total Calculation
    const inlendTotal = inlends.reduce((total, inlend) => total + inlend, 0);
    const step4Equation = inlends.length ? `${inlends.join(" + ")} = ${twoDecimal(inlendTotal)}` : "0";

    // Step 5: Cash Total Calculation
    const cashTotal = cash.reduce((total, c) => total + c, 0);
    const step5Equation = cash.length ? `${cash.join(" + ")} = ${twoDecimal(cashTotal)}` : "0";

    // Step 6: Total of Cards, Cash, In-Lend, and UPI
    const totalSum = cardTotal + inlendTotal + cashTotal + upiDifference;
    const step6Equation = `${cardTotal} + ${inlendTotal} + ${cashTotal} + ${upiDifference} = ${twoDecimal(totalSum)}`;

    // Step 7: Final Difference (Reading - Total)
    const finalDifference = totalSum - readingDifference;
    const step7Equation = `${totalSum} - ${readingDifference} = ${finalDifference > 0 ? '+' : ''}${twoDecimal(finalDifference)}`;

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