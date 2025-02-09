import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../utilities/slice/readingSlice";

function CashReading({ i }) {
    const [readings, setReadings] = useState({});
    const dispatch = useDispatch(); // Correctly initialize dispatch
    const datas = useSelector((state) => state.calculateReading);

    const handleInputChange = (key, value) => {
        let index = i;
        dispatch(setValue({ key, index, value })); // Dispatch the value to Redux
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Title */}
            <p className="text-neutral-500 text-lg text-center pt-3">
                Cash Reading {i + 1}
            </p>
            <input
                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                required
                type="number"
                onChange={(e) => handleInputChange("cash", Number(e.target.value))}
                placeholder={`Cash ${i + 1}:`}
                id={i}
            />
        </div>
    );
}

export default CashReading;
