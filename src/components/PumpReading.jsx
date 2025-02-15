import React, { forwardRef, useEffect } from "react";
import useValue from "../hooks/useValue";
import { useSelector } from "react-redux";

const PumpReading = forwardRef(({ i }, ref) => {
    const [handleInputChange, datas] = useValue();
    const prices = useSelector((state) => state.priceList);

    useEffect(() => {
        handleInputChange("prices", prices["ms"], i);
    }, []);

    return (
        <div className="flex flex-col gap-4">
            {/* Title */}
            <p className="text-neutral-500 text-lg text-center pt-3">
                Reading {i + 1}
            </p>

            {/* Reading Start */}
            <div className="flex flex-col gap-2">
                <label
                    className="text-neutral-200"
                    htmlFor={`reading-start-${i}`}
                >
                    Reading Start:
                </label>
                <input
                    step={"any"}
                    id={`reading-start-${i}`}
                    type="number"
                    value={datas.pumpReadingStarts[i] || ""} // ✅ Use the value from Redux
                    placeholder="0.00"
                    required
                    ref={(e) => (ref.current[i * 3 || 0] = e)}
                    onChange={(e) =>
                        handleInputChange(
                            "pumpReadingStarts",
                            Number(e.target.value),
                            i
                        )
                    }
                    className="p-2 text-neutral-50 bg-neutral-700 rounded"
                />
            </div>

            {/* Reading End */}
            <div className="flex flex-col gap-2">
                <label
                    className="text-neutral-200"
                    htmlFor={`reading-end-${i}`}
                >
                    Reading End:
                </label>
                <input
                    id={`reading-end-${i}`}
                    type="number"
                    step={"any"}
                    value={datas.pumpReadingEnds[i] || ""} // ✅ Use the value from Redux
                    placeholder="0.00"
                    required
                    ref={(e) => (ref.current[i * 3 + 1 || 1] = e)}
                    onChange={(e) =>
                        handleInputChange(
                            "pumpReadingEnds",
                            Number(e.target.value),
                            i
                        )
                    }
                    className="p-2 text-neutral-50 bg-neutral-700 rounded"
                />
            </div>

            {/* Fuel Selection */}
            <div className="flex flex-col gap-2">
                <label className="text-neutral-200" htmlFor={`fuel-${i}`}>
                    Choose Fuel:
                </label>
                <div className="flex">
                    <select
                        id={`fuel-${i}`}
                        className="p-2 text-neutral-50 bg-neutral-600 rounded-l w-1/4 uppercase"
                        defaultValue={datas.prices[i] || "105.49"}
                        ref={(e) => (ref.current[i * 3 + 2 || 2] = e)}
                        onChange={(e) =>
                            handleInputChange(
                                "prices",
                                Number(e.target.value),
                                i
                            )
                        }
                    >
                        {Object.keys(prices).map((val, ind) => (
                            <option key={ind} value={prices[val]}>
                                {val}
                            </option>
                        ))}
                    </select>
                    <input
                        id={`display-price-${i}`}
                        type="number"
                        step={"any"}
                        value={datas.prices[i] || "105.49"}
                        placeholder="Price"
                        disabled
                        className="p-2 text-neutral-50 bg-neutral-700 rounded-r w-3/4"
                    />
                </div>
            </div>
        </div>
    );
});

export default PumpReading;
