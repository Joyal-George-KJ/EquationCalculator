import { useSelector } from "react-redux";
import GeneratePDF from "./GeneratePDF";

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
    const upiDetails = upiStart.map((start, i) => `(${upiClose[i]} - ${start})`);
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
        <div className="text-white rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">📊 Transaction Summary</h2>

            {/* Step 1: Reading Difference (Full Equation) */}
            <div className="mb-4 p-4 bg-neutral-700 rounded-xl shadow">
                <h3 className="text-lg font-semibold">Step 1: Reading Difference</h3>
                <p className="text-sm text-gray-400">{readingDetails.join(" + ")}</p>
                <p className="text-md font-bold">= ₹{twoDecimal(readingDifference)}</p>
            </div>

            {/* Step 2: UPI Difference */}
            <div className="mb-4 p-4 bg-neutral-700 rounded-xl shadow">
                <h3 className="text-lg font-semibold">Step 2: UPI Difference</h3>
                <p className="text-sm text-gray-400">{upiDetails.join(" + ")}</p>
                <p className="text-md font-bold">= ₹{twoDecimal(upiDifference)}</p>
            </div>

            {/* Step 3-5: Card, Inlend, Cash */}
            {[
                { title: "Card Total", values: cards, result: cardTotal },
                { title: "In-Lend Total", values: inlends, result: inlendTotal },
                { title: "Cash Total", values: cash, result: cashTotal },
            ].map(({ title, values, result }, i) => (
                <div key={i} className="mb-4 p-4 bg-neutral-700 rounded-xl shadow">
                    <h3 className="text-lg font-semibold">{`Step ${i+3}: ${title}`}</h3>
                    <p className="text-sm text-gray-400">{values.join(" + ")}</p>
                    <p className="text-md font-bold">= ₹{twoDecimal(result)}</p>
                </div>
            ))}

            {/* Step 6: Total Calculation */}
            <div className="mb-4 p-4 bg-neutral-700 rounded-xl shadow">
                <h3 className="text-lg font-semibold">Step 6: Total of Cards, Cash, Inlend, UPI</h3>
                <p className="text-sm text-gray-400">{`${twoDecimal(cardTotal)} + ${twoDecimal(inlendTotal)} + ${twoDecimal(cashTotal)} + ${twoDecimal(upiDifference)}`}</p>
                <p className="text-md font-bold">= ₹{twoDecimal(totalSum)}</p>
            </div>

            {/* Step 7: Final Difference */}
            <div className={`p-4 rounded-xl text-center font-bold ${finalDifference >= -10 ? "bg-green-600" : "bg-red-600"}`}>
                <h3 className="text-lg">Final Difference</h3>
                <p className="text-sm text-gray-400">{`${twoDecimal(totalSum)} - ${twoDecimal(readingDifference)}`}</p>
                <p className="text-md">₹{`${finalDifference > 0 ? "+" : ''}${twoDecimal(finalDifference)}`}</p>
            </div>
            <GeneratePDF key={0} />
        </div>
    );
};

export default DisplayDataCard;
