import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReadingInfo from "./components/ReadingInfo";
// import { setValue } from "./readingSlice";

function App() {
    const [stage, setStage] = useState(0);
    const [counts, setCounts] = useState({
        readings: 0,
        cards: 0,
        upi: 0,
        cash: 0,
        inlend: 0,
    });
    // const dispatch = useDispatch();
    // const state = useSelector((state) => state.calculateReading);

    const handleNext = () => setStage(stage + 1);
    const handleBack = () => setStage(stage - 1);

    return (
        <div className="p-6 max-w-lg mx-auto">
            {stage === 0 && (
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(counts);
                        handleNext();
                    }}
                >
                    {/* <lable htmlFor="reading">Reading No:</lable> */}
                    <input
                        className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        required
                        type="number"
                        placeholder="Reading No:"
                        id="reading"
                        onChange={(e) =>
                            setCounts((prev) => ({
                                ...prev,
                                readings: Number(e.target.value),
                            }))
                        }
                    />
                    {/* <lable htmlFor="upi">PhonePe/UPI:</lable> */}
                    <input
                        className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        required
                        type="number"
                        placeholder="PhonePe/UPI:"
                        id="upi"
                        onChange={(e) =>
                            setCounts((prev) => ({
                                ...prev,
                                upi: Number(e.target.value),
                            }))
                        }
                    />
                    {/* <lable htmlFor="card">Card:</lable> */}
                    <input
                        className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        required
                        type="number"
                        placeholder="Card:"
                        id="card"
                        onChange={(e) =>
                            setCounts((prev) => ({
                                ...prev,
                                cards: Number(e.target.value),
                            }))
                        }
                    />
                    {/* <lable htmlFor="inlend">In-Lend:</lable> */}
                    <input
                        className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        required
                        type="number"
                        placeholder="In-Lend"
                        id="inlend"
                        onChange={(e) =>
                            setCounts((prev) => ({
                                ...prev,
                                inlend: Number(e.target.value),
                            }))
                        }
                    />
                    {/* <lable htmlFor="cash">Cash:</lable> */}
                    <input
                        className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        required
                        type="number"
                        placeholder="Cash:"
                        id="cash"
                        onChange={(e) =>
                            setCounts((prev) => ({
                                ...prev,
                                cash: Number(e.target.value),
                            }))
                        }
                    />
                    <button
                        className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        onSubmit={handleNext}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            )}
            {stage === 1 && (
                <div>
                    <h2 className="text-neutral-300 text-xl bg-neutral-700 px-2 rounded-full w-fit">
                        {stage}
                    </h2>
                    {Array.from({ length: counts.readings }).map((_, i) => (
                        <ReadingInfo key={i} nth={i} />
                    ))}
                    <div className="flex justify-between items-center mt-4">
                        <button onClick={handleBack} className="p-2 text-neutral-50 bg-neutral-700 rounded">{"<< Back"}</button>
                        <button onClick={handleNext} className="p-2 text-neutral-50 bg-neutral-700 rounded">{"Next >>"}</button>
                    </div>
                </div>
            )}

            {stage === 2 && (
                <div>
                    <h2 className="text-neutral-300 text-xl bg-neutral-700 px-2 rounded-full w-fit">
                        {stage}
                    </h2>
                    {Array.from({ length: counts.cards }).map((_, i) => (
                        <input type="number" key={i} />
                    ))}
                    <div className="flex justify-between items-center mt-4">
                        <button onClick={handleBack} className="p-2 text-neutral-50 bg-neutral-700 rounded">{"<< Back"}</button>
                        <button onClick={handleNext} className="p-2 text-neutral-50 bg-neutral-700 rounded">{"Next >>"}</button>
                    </div>
                </div>
            )}

            {stage === 3 && (
                <div>
                    <h2 className="text-neutral-300 text-xl bg-neutral-700 px-2 rounded-full w-fit">
                        {stage}
                    </h2>
                    <input
                        type="number"
                        placeholder="Number of UPI Transactions"
                        onChange={(e) =>
                            setCounts({
                                ...counts,
                                upi: Number(e.target.value),
                            })
                        }
                    />
                    <div className="flex justify-between items-center mt-4">
                        <button onClick={handleBack} className="p-2 text-neutral-50 bg-neutral-700 rounded">{"<< Back"}</button>
                        <button onClick={handleNext} className="p-2 text-neutral-50 bg-neutral-700 rounded">{"Next >>"}</button>
                    </div>
                </div>
            )}

            {stage === 4 && (
                <div>
                    <h2 className="text-neutral-300 text-xl bg-neutral-700 px-2 rounded-full w-fit">
                        {stage}
                    </h2>
                    <input
                        type="number"
                        placeholder="Cash Amount"
                        onChange={(e) =>
                            setCounts({
                                ...counts,
                                cash: Number(e.target.value),
                            })
                        }
                    />
                    <div className="flex justify-between items-center mt-4">
                        <button onClick={handleBack} className="p-2 text-neutral-50 bg-neutral-700 rounded">{"<< Back"}</button>
                        <button onClick={handleNext} className="p-2 text-neutral-50 bg-neutral-700 rounded">{"Next >>"}</button>
                    </div>
                </div>
            )}

            {stage === 5 && (
                <div>
                    <h2 className="text-neutral-300 text-xl bg-neutral-700 px-2 rounded-full w-fit">
                        {stage}
                    </h2>
                    <input
                        type="number"
                        placeholder="Number of In-Lend Transactions"
                        onChange={(e) =>
                            setCounts({
                                ...counts,
                                inlend: Number(e.target.value),
                            })
                        }
                    />
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleNext}>Finish</button>
                </div>
            )}
        </div>
    );
}

export default App;
