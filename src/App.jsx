import React, { useEffect, useState } from "react";
import { useRef } from "react";
import PumpReading from "./components/PumpReading";
import CardReading from "./components/CardReading";
import UPIReading from "./components/UPIReading";
import InlendReading from "./components/InlendReading";
import CashReading from "./components/CashReading";
import DisplayDataCard from "./components/DisplayDataCard";
import PriceChanger from "./components/PriceChanger";
import Header from "./components/Header";

function App() {
    const ref = useRef([]);
    const [stage, setStage] = useState(0);
    const [counts, setCounts] = useState({
        readings: '',
        cards: '',
        upi: '',
        cash: '',
        inlend: '',
    });
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        setIndex(0);
        stage !== 6 ? setStage(stage + 1) : alert("No more steps");
    };

    const inputs = [
        { key: "readings", placeholder: "Reading No:" },
        { key: "upi", placeholder: "PhonePe/UPI No:" },
        { key: "cards", placeholder: "Card No:" },
        { key: "inlend", placeholder: "In-Lend No:" },
        { key: "cash", placeholder: "Cash No:" },
    ];

    const handleBack = () => setStage(stage - 1);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Enter") {
                e.preventDefault(); // ✅ Prevent form submission
                if (ref.current[index]) {
                    ref.current[index].focus();
                    setIndex((prev) => prev + 1);
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [index]);

    const renderInputs = () =>
        inputs.map(({ key, placeholder }, index) => (
            <input
                key={key}
                id={key}
                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                type="number"
                placeholder={placeholder}
                value={counts[key] !== undefined ? String(counts[key]) : ""}
                ref={(el) => (ref.current[index] = el)}
                onChange={(e) =>
                    setCounts((prev) => ({
                        ...prev,
                        [key]:
                            e.target.value === "" ? "" : Number(e.target.value),
                    }))
                }
            />
        ));

    const renderStage = (Component, count) => {
        if (count === 0) {
            return (
                <p
                    className="text-red-500"
                    onLoad={() => setTimeout(() => handleNext(), 500)}
                >
                    No data entered. Skipping...
                </p>
            );
        }
        return (
            <>
                {Array.from({ length: count }, (_, i) => (
                    <Component key={i} i={i} ref={ref} />
                ))}
            </>
        );
    };

    const stageComponents = [
        <>{renderInputs()}</>,
        renderStage(PumpReading, counts.readings),
        renderStage(CardReading, counts.cards),
        renderStage(InlendReading, counts.inlend),
        renderStage(CashReading, counts.cash),
        <DisplayDataCard />,
    ];

    return (
        <div className="p-6 max-w-lg mx-auto bg-neutral-800 min-h-dvh relative">
            <Header />
            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <p className="text-neutral-50">Step {stage + 1}/7:</p>
                {stageComponents[stage]}

                <div className="flex justify-between items-center mt-4 gap-4">
                    {stage > 0 && (
                        <button
                            onClick={handleBack}
                            className="p-2 text-neutral-50 bg-neutral-700 rounded w-full"
                        >
                            {"<< Back"}
                        </button>
                    )}
                    {stage < 6 && (
                        <button
                            type="submit"
                            className="p-2 text-neutral-50 bg-neutral-700 rounded w-full"
                            onClick={handleNext}
                        >
                            {stage === 5 ? "Calculate" : "Next >>"}
                        </button>
                    )}
                </div>
            </form>
            {stage <= 1 && <PriceChanger />}
        </div>
    );
}

export default App;
