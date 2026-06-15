"use client";

import { useState } from "react";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";

const feedbackH1LG = [
    [
        "Decor Lab's warm minimalist layout",
        "elevated our Kolkata villa's luxury",
        "index — bespoke art curation, custom",
        "linen wall treatments, and signature",
        "ombre curtains that we absolutely love."
    ],
    [
        "Partnering with Kolkata's premium",
        "interior architecture studio was key",
        "for our corporate workspace. Seamless",
        "biophilic light wells and custom timber",
        "screens that perfectly align with our brand."
    ],
    [
        "Their experimental fluid architecture",
        "and organic curves transformed our",
        "penthouse. Outstanding tactile plaster",
        "finishes and beautiful spatial flow",
        "that redefine luxury Indian interiors."
    ]
];

const feedbackReviewLG = [
    [
        "Rohan Mehta",
        "Director, Prestige Group (Kolkata Villa)",
        "review1",
        "33%"
    ],
    [
        "Priya Sharma",
        "Lead Designer, Taj Hospitality (Corporate HQ)",
        "review2",
        "66%"
    ],
    [
        "Dr. Amit Verma",
        "Chief Curator, ICA Creative Minds",
        "review3",
        "100%"
    ]
];

const reviewImages = {
    review1: "/assets/urbanland/review1.webp",
    review2: "/assets/urbanland/review2.webp",
    review3: "/assets/urbanland/review3.webp"
};

const Feedback = () => {
    const [index, setIndex] = useState(0);
    const total = feedbackH1LG.length;

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % total);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + total) % total);
    };

    const progressWidth = feedbackReviewLG[index][3];

    return (
        <section id="feedback" className='w-full py-16 lg:py-0 lg:h-dvh p-6 sm:p-8 flex flex-col justify-center items-stretch bg-[#F7F4EF] overflow-hidden'>
            <div className='w-full text-left max-w-[1400px] mx-auto flex flex-col justify-center h-full'>
                <p className='text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#2C5F2E] text-left mb-2 sm:mb-4 select-none'>
                    — Client Testimonials
                </p>

                <div>
                    <h1 className='text-[#1A1A1A] text-lg sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-[2.6rem] mt-4 mb-6 font-bold leading-[1.2] tracking-tight uppercase'>
                        {feedbackH1LG[index].map((line, i) => (
                            <span key={i} className="block mb-1 sm:mb-2">
                                {line}
                            </span>
                        ))}
                    </h1>
                </div>

                <div className='flex items-center gap-4 mt-8 sm:mt-12 select-none'>
                    <img
                        src={reviewImages[feedbackReviewLG[index][2]]}
                        alt="review img"
                        className='w-12 h-12 sm:w-[4.5vw] sm:min-w-[50px] rounded-full object-cover shadow-sm'
                    />
                    <p className="text-[#1A1A1A]/70 text-[10px] sm:text-xs font-bold uppercase tracking-wider leading-relaxed">
                        {feedbackReviewLG[index][0]}<br />
                        <span className="text-[#2C5F2E] text-[9px] sm:text-[10px] font-semibold">({feedbackReviewLG[index][1]})</span>
                    </p>
                </div>

                <div className="flex justify-between items-center mt-10 sm:mt-14 select-none">
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrev}
                            className='border border-[#2D2D2D]/35 hover:bg-[#2C5F2E] hover:border-[#2C5F2E] p-2 sm:p-2.5 rounded-full transition-all group cursor-pointer'
                        >
                            <IoMdArrowBack className="text-[#1A1A1A] group-hover:text-[#F7F4EF] w-4.5 h-4.5 sm:w-5 h-5 transition-colors" />
                        </button>

                        <button
                            onClick={handleNext}
                            className='border border-[#2D2D2D]/35 hover:bg-[#2C5F2E] hover:border-[#2C5F2E] p-2 sm:p-2.5 rounded-full transition-all group cursor-pointer'
                        >
                            <IoMdArrowForward className="text-[#1A1A1A] group-hover:text-[#F7F4EF] w-4.5 h-4.5 sm:w-5 h-5 transition-colors" />
                        </button>
                    </div>

                    <div className="relative z-9 w-24 sm:w-48 md:w-72 h-[0.1rem] bg-[#2D2D2D]/15">
                        <div
                            className="progress-line absolute z-10 bg-[#2C5F2E] h-[0.1rem] top-1/2 -translate-y-1/2 left-0 transition-all duration-500 ease-out"
                            style={{ width: progressWidth }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feedback;
