"use client";

import React from 'react';

const MarqueeText = () => {
    // Render 12 items (two sets of 6 for seamless looping at -50% scroll translation)
    const marqueeItems = Array(12).fill(null).map((_, index) => (
        <div key={index} className="marquee-text-marquee">
            <h1>Best Outdoor Furniture Manufacturer In India<span className='star-rotate text-[#C9A84C]'>*</span></h1>
        </div>
    ));

    return (
        <div className="marquee-text-container">
            <div className="marquee-text-move">
                {marqueeItems}
            </div>
        </div>
    );
};

export default MarqueeText;
