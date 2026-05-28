"use client";

import React from 'react';
import { useMediaQuery } from "react-responsive";

const activitiesLinesLG = [
    "Trusted Across India — From Premium",
    "Townships to Smart Cities"
];

const activitiesLinesSM = [
    "Trusted Across India —",
    "From Premium",
    "Townships to",
    "Smart Cities"
];

const brandNames = [
    "Lodha", "Adani Realty", "Oberoi", "Kalpataru", "Rustomjee",
    "Godrej Properties", "Tata Housing", "Sobha", "DLF", "L&T Realty",
    "Prestige Group", "Brigade Group", "K Raheja Corp", "Shapoorji Pallonji"
];

const brandLogos = [
    "/assets/brands/1.png",
    "/assets/brands/11-3.webp",
    "/assets/brands/12-1.png",
    "/assets/brands/13-3.webp",
    "/assets/brands/2.png",
    "/assets/brands/3-1.png",
    "/assets/brands/3.png",
    "/assets/brands/4-1.png",
    "/assets/brands/5-1.png",
    "/assets/brands/6-1.png",
    "/assets/brands/7-1.png",
    "/assets/brands/8-1.png",
    "/assets/brands/9-1.png",
    "/assets/brands/New-Project-7-Photoroom.png"
];

const Activities = () => {
    const isMobD = useMediaQuery({
        query: "(max-width:768px)",
    });
    const activitiesLines = isMobD ? activitiesLinesSM : activitiesLinesLG;

    return (
        <section id="activities" className="activities-section w-full py-16 lg:py-0 lg:h-auto p-6 sm:p-8 flex flex-col justify-between gap-12">
            <div>
                <p className='text-[.7rem] font-bold text-[#2C5F2E] activities-subtitle uppercase tracking-widest'>— Trusted Across India</p>
                <div className="lg:mt-10 mt-7 activities-part origin-bottom">
                    {activitiesLines.map((line, index) => (
                        <h2 key={index} className="text-[#1A1A1A] lg:text-[4.2rem] md:text-[3rem] text-[2rem] leading-[1.05] font-bold tracking-tight uppercase">
                            {line}
                        </h2>
                    ))}
                </div>
            </div>
            
            <div className="activities-sec w-full flex lg:flex-row flex-col justify-between items-start gap-10 lg:mt-0 mt-8">
                <div className='lg:w-[50%] w-full'>
                    <div className="mb-6">
                        <p className="text-[.8rem] font-bold text-[#1A1A1A]/70 uppercase tracking-wider">— Partner Developers & Public Bodies</p>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
                        {brandLogos.map((logo, index) => (
                            <div key={index} className="brand-logo-card flex justify-center items-center h-14 md:h-16 p-3 bg-[#2D2D2D]/5 hover:bg-[#2C5F2E]/10 rounded-xl transition-all duration-300 shadow-sm hover:scale-105 transform">
                                <img 
                                    src={logo} 
                                    alt={`${brandNames[index] || "Leading real estate developer"} outdoor furniture supplier — Urbanland Products`} 
                                    className="max-h-full max-w-full object-contain hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className='lg:w-[45%] w-full flex flex-col justify-end gap-6'>
                    <div className="activities-featured-img w-full h-[200px] md:h-[250px] overflow-hidden rounded-3xl border border-[#2D2D2D]/10 shadow-2xl">
                        <img 
                            src="/assets/urbanland/Bench_Planter.png" 
                            alt="Lodha township WPC benches and GFRC planters installed by Urbanland Products" 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                        />
                    </div>
                    
                    <div className='text-[#2D2D2D]/90 lg:text-[1.5rem] text-[1.1rem] md:leading-[1.25] font-light'>
                        <p>Over 50 major outdoor furniture projects delivered across 15+ cities. Our products have been specified by India's most respected real estate developers, hospitality groups, and municipal bodies — backed by India's only 2-year outdoor furniture guarantee.</p>
                    </div>

                    {/* 3 Stat Counters */}
                    <div className="grid grid-cols-3 gap-4 border-t border-[#2D2D2D]/10 pt-6">
                        <div>
                            <p className="text-xl md:text-3xl font-black text-[#2C5F2E]">50+</p>
                            <p className="text-[10px] text-[#2D2D2D]/70 font-bold uppercase tracking-wider mt-1">Major Projects</p>
                        </div>
                        <div>
                            <p className="text-xl md:text-3xl font-black text-[#2C5F2E]">15+</p>
                            <p className="text-[10px] text-[#2D2D2D]/70 font-bold uppercase tracking-wider mt-1">Cities Nationwide</p>
                        </div>
                        <div>
                            <p className="text-xl md:text-3xl font-black text-[#2C5F2E]">2-Year</p>
                            <p className="text-[10px] text-[#2D2D2D]/70 font-bold uppercase tracking-wider mt-1">Full Guarantee</p>
                        </div>
                    </div>

                    {/* ISO & Trust Badges */}
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-[#1A1A1A]/80 bg-[#2D2D2D]/5 px-4 py-3 rounded-2xl border border-black/5 mt-2">
                        <span className="flex items-center gap-1">★ ISO 9001:2015 Certified</span>
                        <span className="opacity-30">•</span>
                        <span className="flex items-center gap-1">✓ 2-Year Guarantee Badge</span>
                        <span className="opacity-30">•</span>
                        <span className="flex items-center gap-1">Made in India</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Activities;
