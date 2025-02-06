import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../utilities/slice/readingSlice";

function ReadingInfo({ nth }) {
    const [readings, setReadings] = useState({});
    const dispatch = useDispatch(); // Correctly initialize dispatch
    const datas = useSelector((state) => state.calculateReading);

    useEffect(() => {
        console.log(datas);
    }, [readings]);

    const handleInputChange = (key, value) => {
        let index = nth -1
        setReadings((prev) => ({ ...prev, [key]: value }));
        dispatch(setValue({ key, index, value })); // Dispatch the value to Redux
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Title */}
            <p className="text-neutral-500 text-lg text-center pt-3">
                Reading {nth}
            </p>

            {/* Reading Start */}
            <div className="flex flex-col gap-2">
                <label htmlFor={`reading-start-${nth}`}>Reading Start:</label>
                <input
                    id={`reading-start-${nth}`}
                    type="number"
                    placeholder="0.00"
                    required
                    onChange={(e) => handleInputChange("starts", Number(e.target.value))}
                    className="bg-neutral-800 text-neutral-100 px-3 py-2 border-2 rounded w-full"
                />
            </div>

            {/* Reading End */}
            <div className="flex flex-col gap-2">
                <label htmlFor={`reading-end-${nth}`}>Reading End:</label>
                <input
                    id={`reading-end-${nth}`}
                    type="number"
                    placeholder="0.00"
                    required
                    onChange={(e) => handleInputChange("ends", Number(e.target.value))}
                    className="bg-neutral-800 text-neutral-100 px-3 py-2 border-2 rounded w-full"
                />
            </div>

            {/* Fuel Selection */}
            <div className="flex flex-col gap-2">
                <label htmlFor={`fuel-${nth}`}>Choose Fuel:</label>
                <div className="flex">
                    <select
                        id={`fuel-${nth}`}
                        className="text-neutral-100 px-3 py-2 border-2 bg-neutral-800 uppercase w-1/3"
                        onChange={(e) => handleInputChange("prices", Number(e.target.value))}
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
                        value={readings.price || ""}
                        placeholder="Price"
                        disabled
                        className="bg-neutral-800 text-neutral-100 px-3 py-2 border-2 border-l-0 rounded-r w-2/3"
                    />
                </div>
            </div>
        </div>
    );
}

export default ReadingInfo;