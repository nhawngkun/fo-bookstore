import React from "react";

const Banner = () => {
    return (
        <>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-7 flex justify-center items-center mt-8 pt-10 md:mt-14 md:pt-20" style={{ minHeight: "50vh" }}>
                <div className="w-full md:w-3/4 lg:w-2/3">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-6xl font-bold">Thư viện sách <span className="text-pink-500">trực tuyến</span></h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
