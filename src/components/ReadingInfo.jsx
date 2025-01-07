import React, { useState } from "react";

function ReadingInfo({nth}) {
    const [price, setPrice] = useState(105.49);

    return (
        <>
            <div className="flex gap-2 flex-col">
                <p className="text-neutral-500 pt-3 text-lg w-full text-center">Reading {nth}</p>
                <label htmlFor="reading-start">Reading Start: </label>
                <input
                    className="bg-neutral-800 text-neutral-100 px-1 py-2 capitalize border-2 rounded w-full"
                    id="reading-start"
                    type="number"
                    placeholder="0.00"
                    required
                />
            </div>
            <div className="flex gap-2 flex-col">
                <label htmlFor="reading-end">Reading End: </label>
                <input
                    className="bg-neutral-800 text-neutral-100 px-1 py-2 capitalize border-2 rounded w-full"
                    id="reading-end"
                    type="number"
                    placeholder="0.00"
                    required
                />
            </div>
            <div className="flex gap-2 flex-col">
                <label htmlFor="fuel">Choose Fuel: </label>
                <div className="w-full flex flex-row">
                    <select
                        className="text-neutral-100 px-1 py-2 border-2 bg-neutral-800 uppercase w-1/3"
                        name="fuel"
                        id="fuel"
                        onChange={(e) => setPrice(Number(e.target.value))}
                    >
                        <option value={105.49}>ms</option>
                        <option value={94.48}>ds</option>
                        <option value={112.64}>xp</option>
                        <option value={NaN}>others</option>
                    </select>
                    <input
                        className="bg-neutral-800 text-neutral-100 px-1 py-2 capitalize border-2 border-l-0 rounded-r w-2/3"
                        type="number"
                        value={price}
                        placeholder="price"
                        disabled
                    />
                </div>
            </div>
        </>
    );
}

export default ReadingInfo;