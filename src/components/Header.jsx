import React from "react";

const Header = () => {
    return (
        <header className="w-full bg-neutral-800 py-4 shadow-md mb-4">
            <div className="container mx-auto px-4 flex flex-col items-center">
                <h1 className="text-lg font-bold text-white">- Gas Station Sales Calculator -</h1>
                <p className="text-white text-sm mt-1 text-center">
                    Quickly calculate your total sales, fuel sold, and losses!
                </p>
            </div>
        </header>
    );
};

export default Header;
