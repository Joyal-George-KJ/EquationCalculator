import React, { useEffect, useState } from "react";
import { useRef } from "react";
import PumpReading from "./components/PumpReading";
import CardReading from "./components/CardReading";
import UPIReading from "./components/UPIReading";
import InlendReading from "./components/InlendReading";
import CashReading from "./components/CashReading";
import { useDispatch } from "react-redux";
import { calculateReads } from "./utilities/slice/readingSlice";

function App() {
    const ref = useRef([]);
    const dispatch = useDispatch();
    const [stage, setStage] = useState(0);
    const [counts, setCounts] = useState({
        readings: 0,
        cards: 0,
        upi: 0,
        cash: 0,
        inlend: 0,
    });

    const handleNext = () => setStage(stage + 1);
    const handleBack = () => setStage(stage - 1);
    const handleCalc = () => console.log(dispatch(calculateReads()));

    useEffect(() => {}, [stage]);

    return (
        <div className="p-6 max-w-lg mx-auto">
            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleNext();
                }}
            >
                {stage === 0 && (
                    <>
                        {/* <lable htmlFor="reading">Reading No:</lable> */}
                        <input
                            className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            required
                            type="number"
                            placeholder="Reading No:"
                            id="reading"
                            ref={(e) => (ref.current[0] = e)}
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
                            ref={(e) => (ref.current[1] = e)}
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
                            ref={(e) => (ref.current[2] = e)}
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
                            ref={(e) => (ref.current[3] = e)}
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
                            ref={(e) => (ref.current[4] = e)}
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
                    </>
                )}
                {stage === 1 && (
                    <>
                        <h2 className="text-neutral-300 text-xl bg-neutral-700 px-2 rounded-full w-fit">
                            {stage}
                        </h2>
                        {Array.from({ length: counts.readings }).map((_, i) => (
                            <PumpReading key={i} i={i} />
                        ))}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handleBack}
                                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            >
                                {"<< Back"}
                            </button>
                            <button
                                // onClick={handleNext}
                                type="submit"
                                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            >
                                {"Next >>"}
                            </button>
                        </div>
                    </>
                )}

                {stage === 2 && (
                    <>
                        <h2 className="text-neutral-300 text-xl bg-neutral-700 px-2 rounded-full w-fit">
                            {stage}
                        </h2>
                        {Array.from({ length: counts.cards }).map((_, i) => (
                            <CardReading key={i} i={i} />
                        ))}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handleBack}
                                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            >
                                {"<< Back"}
                            </button>
                            <button
                                // onClick={handleNext}
                                type="submit"
                                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            >
                                {"Next >>"}
                            </button>
                        </div>
                    </>
                )}

                {stage === 3 && (
                    <>
                        <h2 className="text-neutral-300 text-xl bg-neutral-700 px-2 rounded-full w-fit">
                            {stage}
                        </h2>
                        {Array.from({ length: counts.upi }).map((_, i) => (
                            <UPIReading key={i} i={i} />
                        ))}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handleBack}
                                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            >
                                {"<< Back"}
                            </button>
                            <button
                                // onClick={handleNext}
                                type="submit"
                                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            >
                                {"Next >>"}
                            </button>
                        </div>
                    </>
                )}

                {stage === 4 && (
                    <>
                        <h2 className="text-neutral-300 text-xl bg-neutral-700 px-2 rounded-full w-fit">
                            {stage}
                        </h2>
                        {Array.from({ length: counts.inlend }).map((_, i) => (
                            <InlendReading i={i} key={i} />
                        ))}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handleBack}
                                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            >
                                {"<< Back"}
                            </button>
                            <button
                                // onClick={handleNext}
                                type="submit"
                                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            >
                                {"Next >>"}
                            </button>
                        </div>
                    </>
                )}

                {stage === 5 && (
                    <>
                        <h2 className="text-neutral-300 text-xl bg-neutral-700 px-2 rounded-full w-fit">
                            {stage}
                        </h2>
                        {Array.from({ length: counts.cash }).map((_, i) => (
                            <CashReading i={i} key={i} />
                        ))}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handleBack}
                                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            >
                                {"<< Back"}
                            </button>
                            <button
                                onClick={handleCalc}
                                type="submit"
                                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                            >
                                {"Next >>"}
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}

export default App;
