import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceList } from "../utilities/slice/priceListSlice";

function PriceChanger() {
    const [toggle, setToggle] = useState(false);
    const priceData = useSelector((state) => state.priceList);
    const dispatch = useDispatch();

    return (
        <div
            className={`absolute ${
                toggle ? "w-full h-full" : ""
            } bottom-0 right-0 p-4 bg-neutral-800 rounded-tl-lg`}
        >
            <button type="button" className="absolute bottom-16 right-16 px-4 py-2 text-neutral-900 rounded-full bg-green-500" onClick={() => setToggle(!toggle)}>
                {toggle ? (
                    <i className="bi bi-x-lg"></i>
                ) : (
                    <i className="bi bi-currency-rupee"></i>
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
                                onChange={() => {
                                    useDispatch(setPriceList({ key, value: Number(document.getElementById(`display-price-${i}`).value) }));
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
