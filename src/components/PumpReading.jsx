import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../utilities/slice/readingSlice";

function PumpReading({ nth }) {
    const [readings, setReadings] = useState({});
    const dispatch = useDispatch(); // Correctly initialize dispatch
    const datas = useSelector((state) => state.calculateReading);

    const handleInputChange = (key, value) => {
        let index = nth;
        setReadings((prev) => ({ ...prev, [key]: value }));
        dispatch(setValue({ key, index, value })); // Dispatch the value to Redux
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Title */}
            <p className="text-neutral-500 text-lg text-center pt-3">
                Reading {nth + 1}
            </p>

            {/* Reading Start */}
            <div className="flex flex-col gap-2">
                <label
                    className="text-neutral-200"
                    htmlFor={`reading-start-${nth}`}
                >
                    Reading Start:
                </label>
                <input
                    id={`reading-start-${nth}`}
                    type="number"
                    placeholder="0.00"
                    required
                    onChange={(e) =>
                        handleInputChange("pumpReadingStarts", Number(e.target.value))
                    }
                    className="p-2 text-neutral-50 bg-neutral-700 rounded"
                />
            </div>

            {/* Reading End */}
            <div className="flex flex-col gap-2">
                <label
                    className="text-neutral-200"
                    htmlFor={`reading-end-${nth}`}
                >
                    Reading End:
                </label>
                <input
                    id={`reading-end-${nth}`}
                    type="number"
                    placeholder="0.00"
                    required
                    onChange={(e) =>
                        handleInputChange("pumpReadingEnds", Number(e.target.value))
                    }
                    className="p-2 text-neutral-50 bg-neutral-700 rounded"
                />
            </div>

            {/* Fuel Selection */}
            <div className="flex flex-col gap-2">
                <label className="text-neutral-200" htmlFor={`fuel-${nth}`}>
                    Choose Fuel:
                </label>
                <div className="flex">
                    <select
                        id={`fuel-${nth}`}
                        className="p-2 text-neutral-50 bg-neutral-700 rounded-l w-1/4"
                        onChange={(e) =>
                            handleInputChange("prices", Number(e.target.value))
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
                        id={`display-price-${nth}`}
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
