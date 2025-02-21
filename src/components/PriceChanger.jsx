import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceList } from "../utilities/slice/priceListSlice";
import AddNewFuel from "./AddNewFuel";

function PriceChanger() {
    const [toggle, setToggle] = useState(false);
    const priceData = useSelector((state) => state.priceList);
    const dispatch = useDispatch();

    const handleChange = (value, key) => {
        dispatch(setPriceList({ key, value }));
    };

    return (
        <div
            className={`${
                toggle ? "fixed bg-neutral-50 top-0 right-0 left-0 bottom-0 " : ""
            } `}
        >
            <button
                type="button"
                className="fixed bottom-8 right-8 px-2 py-1 text-neutral-50 rounded-full bg-neutral-700 shadow-lg"
                onClick={() => setToggle(!toggle)}
            >
                {toggle ? (
                    <i className="bi bi-x-lg font-mono font-bold"></i>
                ) : (
                    <i className="bi bi-currency-rupee font-mono font-bold"></i>
                )}
            </button>
            {toggle && (
                <div className="flex flex-col p-4 max-w-lg gap-4 mx-auto bg-neutral-800 min-h-dvh">
                    
                    {Object.keys(priceData).map((key, i) => (
                        <div className="flex" key={i}>
                            <select
                                id={`fuel-id-${i}`}
                                className="p-2 text-neutral-50 bg-neutral-700 rounded-l w-1/4 uppercase"
                            >
                                <option value={priceData[key]}>{key}</option>
                            </select>
                            <input
                                id={`display-price-${i}`}
                                type="number"
                                step={"any"}
                                value={priceData[key]}
                                onChange={(e) => {
                                    handleChange(Number(e.target.value), key);
                                }}
                                placeholder="Price"
                                className="p-2 text-neutral-50 bg-neutral-700 rounded-r w-3/4"
                            />
                        </div>
                    ))}
                    <div className="flex justify-center shadow bg-neutral-700 text-neutral-50 p-2 rounded">
                        <AddNewFuel />
                    </div>
                </div>
            )}
        </div>
    );
}

export default PriceChanger;
