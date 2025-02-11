import React from "react";
import useValue from "../hooks/useValue";

function CardReading({ i }) {
    const [handleInputChange, datas] = useValue();

    return (
        <div className="flex flex-col gap-4">
            {/* Title */}
            <p className="text-neutral-500 text-lg text-center pt-3">
                Card Reading {i + 1}
            </p>
            <input
                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                required
                step={"any"}
                type="number"
                onChange={(e) =>
                    handleInputChange("cards", Number(e.target.value), i)
                }
                placeholder={`Card ${i + 1}:`}
                id={i}
            />
        </div>
    );
}

export default CardReading;
