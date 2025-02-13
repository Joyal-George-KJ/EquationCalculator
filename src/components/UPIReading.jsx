import React, { forwardRef } from "react";
import useValue from "../hooks/useValue";

const UPIReading = forwardRef(({ i }, ref) => {
    const [handleInputChange, datas] = useValue();

    return (
        <div className="flex flex-col gap-4">
            {/* Title */}
            <p className="text-neutral-500 text-lg text-center pt-3">
                UPI Reading {i + 1}
            </p>
            <input
                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                required
                type="number"
                value={datas.upiStart[i] || ""} // ✅ Use the value from Redux
                step={"any"}
                ref={(e) => (ref.current[i * 2 || 1] = e)}
                onChange={(e) =>
                    handleInputChange("upiStart", Number(e.target.value), i)
                }
                placeholder={`PhonePe/Paytm/UPI Start ${i + 1}:`}
                id={`start ${i}`}
            />
            <input
                className="p-2 text-neutral-50 bg-neutral-700 rounded"
                required
                step={"any"}
                type="number"
                value={datas.upiClose[i] || ""} // ✅ Use the value from Redux
                ref={(e) => (ref.current[i * 2 + 1 || 1] = e)}
                onChange={(e) =>
                    handleInputChange("upiClose", Number(e.target.value), i)
                }
                placeholder={`PhonePe/Paytm/UPI End ${i + 1}:`}
                id={`end ${i}`}
            />
        </div>
    );
})

export default UPIReading;
