import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReadingInfo from "./components/ReadingInfo";
import { useRef } from "react";
// import { setValue } from "./readingSlice";

function App() {
    const ref = useRef([]);
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
    const handleEnter = (elm, ind) => {
        if (elm.key === 'Enter') {
            ref.current[ind].focus();
            console.log(ref.current);
            
        }
    }

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
                        ref={(e) => ref.current[0] = e}
                        onChange={(e) =>
                            setCounts((prev) => ({
                                ...prev,
                                readings: Number(e.target.value),
                            }))
                        }
                        onKeyDown={(e) => handleEnter(e, 0)}
                        />
                    {/* <lable htmlFor="upi">PhonePe/UPI:</lable> */}
                    <input
                        className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        required
                        type="number"
                        placeholder="PhonePe/UPI:"
                        id="upi"
                        ref={(e) => ref.current[1] = e}
                        onKeyDown={(e) => handleEnter(e, 1)}
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
                        ref={(e) => ref.current[2] = e}
                        onKeyDown={(e) => handleEnter(e, 2)}
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
                        ref={(e) => ref.current[3] = e}
                        onKeyDown={(e) => handleEnter(e, 3)}
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
                        ref={(e) => ref.current[4] = e}
                        onKeyDown={(e) => handleEnter(e, 4)}
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
                        <button
                            onClick={handleBack}
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        >
                            {"<< Back"}
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        >
                            {"Next >>"}
                        </button>
                    </div>
                </div>
            )}

            {stage === 2 && (
                <div className="p-6 max-w-lg mx-auto flex flex-col gap-4">
                    <h2 className="text-neutral-300 text-xl bg-neutral-700 px-2 rounded-full w-fit">
                        {stage}
                    </h2>
                    {Array.from({ length: counts.cards }).map((_, i) => (
                        <input
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            required
                            type="number"
                            placeholder={`Card ${++i}:`}
                            id={i}
                        />
                    ))}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handleBack}
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        >
                            {"<< Back"}
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        >
                            {"Next >>"}
                        </button>
                    </div>
                </div>
            )}

            {stage === 3 && (
                <div className="p-6 max-w-lg mx-auto flex flex-col gap-4">
                    <h2 className="text-neutral-300 text-xl bg-neutral-700 px-2 rounded-full w-fit">
                        {stage}
                    </h2>
                    {Array.from({ length: counts.upi }).map((_, i) => (
                        <input
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            required
                            type="number"
                            placeholder={`PhonePe/Paytm/UPI ${++i}:`}
                            id={i}
                        />
                    ))}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handleBack}
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        >
                            {"<< Back"}
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        >
                            {"Next >>"}
                        </button>
                    </div>
                </div>
            )}

            {stage === 4 && (
                <div className="p-6 max-w-lg mx-auto flex flex-col gap-4">
                    <h2 className="text-neutral-300 text-xl bg-neutral-700 px-2 rounded-full w-fit">
                        {stage}
                    </h2>
                    {Array.from({ length: counts.inlend }).map((_, i) => (
                        <input
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            required
                            type="number"
                            placeholder={`In-Lend ${++i}:`}
                            id={i}
                        />
                    ))}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handleBack}
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        >
                            {"<< Back"}
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        >
                            {"Next >>"}
                        </button>
                    </div>
                </div>
            )}

            {stage === 5 && (
                <div className="p-6 max-w-lg mx-auto flex flex-col gap-4">
                    <h2 className="text-neutral-300 text-xl bg-neutral-700 px-2 rounded-full w-fit">
                        {stage}
                    </h2>
                    {Array.from({ length: counts.cash }).map((_, i) => (
                        <input
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            required
                            type="number"
                            placeholder={`Cash ${++i}:`}
                            id={i}
                        />
                    ))}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handleBack}
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        >
                            {"<< Back"}
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                        >
                            {"Next >>"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
