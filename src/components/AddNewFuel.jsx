import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceList } from "../utilities/slice/priceListSlice";

function AddNewFuel() {
    const [toggle, setToggle] = useState(false);
    const [fuelName, setFuelName] = useState("");
    const [fuelPrice, setFuelPrice] = useState("");
    const dispatch = useDispatch();
    const fuelList = useSelector((state) => state.priceList);

    
    const handleChange = () => {
        if (!fuelName.trim() || !fuelPrice) return; // Prevent empty inputs
    
        dispatch(setPriceList({ key: fuelName, value: Number(fuelPrice) })); // ✅ Correct key-value structure
    
        setFuelName(""); // Clear input after dispatch
        setFuelPrice("");
        setToggle(false); // Close modal after adding
    };

    return (
        <>
            <button
                className=" text-neutral-200 rounded-full px-4"
                onClick={() => setToggle(!toggle)}
            >
                <i className="bi bi-plus-lg"></i>
            </button>
            {toggle && (
                <div className="absolute mx-auto right-0 left-0 top-0 flex flex-col gap-4 p-4 py-6 h-full max-w-lg bg-neutral-800 rounded-lg shadow-lg">
                    <input
                        type="text"
                        placeholder="Fuel Name"
                        onChange={(e) => setFuelName(e.target.value)}
                        className="p-2 text-neutral-50 bg-neutral-700 rounded-lg"
                    />
                    <input
                        type="number"
                        step={"any"}
                        placeholder="Price"
                        onChange={(e) => setFuelPrice(e.target.value)}
                        className="p-2 text-neutral-50 bg-neutral-700 rounded-lg"
                    />
                    <div className="w-full grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            className="p-2 text-neutral-50 bg-neutral-700 rounded-lg w-full"
                            onClick={() => handleChange()}
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            className="p-2 text-neutral-50 bg-neutral-700 rounded-lg w-full"
                            onClick={() => setToggle(!toggle)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddNewFuel;
