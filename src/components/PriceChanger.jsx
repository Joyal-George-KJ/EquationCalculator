import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceList } from "../utilities/slice/priceListSlice";

function PriceChanger() {
    const [toggle, setToggle] = useState(false);
    const priceData = useSelector((state) => state.priceList);
    const dispatch = useDispatch();

    const handleChange = (value, key) => {
        dispatch(setPriceList({ key, value }));
    };

    return (
        <div
            className={`absolute ${
                toggle ? "w-full h-full" : ""
            } bottom-0 right-0 p-4 bg-neutral-800 rounded-tl-lg`}
        >
            <button type="button" className="absolute bottom-8 right-8 px-2 py-1 text-neutral-50 rounded-full bg-neutral-700 shadow-lg" onClick={() => setToggle(!toggle)}>
                {toggle ? (
                    <i className="bi bi-x-lg font-mono font-bold"></i>
                ) : (
                    <i className="bi bi-currency-rupee font-mono font-bold"></i>
                )}
            </button>
            {toggle && (
                <div className="flex flex-col p-4 max-w-lg gap-4 mx-auto">
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
                                    handleChange(e.target.value, key)
                                }}
                                placeholder="Price"
                                className="p-2 text-neutral-50 bg-neutral-700 rounded-r w-3/4"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PriceChanger;
