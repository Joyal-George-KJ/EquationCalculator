import React from "react";
import useValue from "../hooks/useValue";

function CashReading({ i }) {
    const [handleInputChange, datas ] = useValue();

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
                onChange={(e) => handleInputChange("cash", Number(e.target.value), i)}
                placeholder={`Cash ${i + 1}:`}
                id={i}
            />
        </div>
    );
}

export default CashReading;
