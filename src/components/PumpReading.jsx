import React from "react";
import useValue from "../hooks/useValue";

function PumpReading({ i }) {
    const [handleInputChange, datas ] = useValue();

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
                    id={`reading-start-${i}`}
                    type="number"
                    placeholder="0.00"
                    required
                    onChange={(e) =>
                        handleInputChange("pumpReadingStarts", Number(e.target.value), i)
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
                    placeholder="0.00"
                    required
                    onChange={(e) =>
                        handleInputChange("pumpReadingEnds", Number(e.target.value), i)
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
                        className="p-2 text-neutral-50 bg-neutral-700 rounded-l w-1/4"
                        onChange={(e) =>
                            handleInputChange("prices", Number(e.target.value), i)
                        }
                        defaultValue={105.49}
                    >
                        <option value={105.49}>MS</option>
                        <option value={94.48}>DS</option>
                        <option value={112.64}>XP</option>
                        <option value={61.78}>LPG</option>
                        <option value={0}>Others</option>
                    </select>
                    <input
                        id={`display-price-${i}`}
                        type="number"
                        value={datas.prices || "105.49"}
                        placeholder="Price"
                        disabled
                        className="p-2 text-neutral-50 bg-neutral-700 rounded-r w-3/4"
                    />
                </div>
            </div>
        </div>
    );
}

export default PumpReading;
