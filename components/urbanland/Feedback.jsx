"use client";

import { useState } from "react";
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

const feedbackH1LG = [
    [
        "Professional, creative, and timely.",
        "Loved the design ideas and the",
        "execution. Great work 👍🏻"
    ],
    [
        "Excellent design, great attention",
        "to detail, highly recommend 👍"
    ],
    [
        "One of the finest interior designing",
        "companies in kolkata. The designs are",
        "really very satisfying. The service is",
        "also very impressive."
    ],
    [
        "I was looking for some finest interior",
        "for my home. Then I came to know about",
        "decorlab and I found that it is one of the best",
        "interior designing companies in Kolkata."
    ],
    [
        "Best interior designing",
        "company in kolkata 🙏"
    ]
];

const feedbackReviewLG = [
    [
        "Vaishnavi Shetye",
        "Google Review",
        "review1",
        "20%"
    ],
    [
        "Ajinkya Patil",
        "Google Review",
        "review2",
        "40%"
    ],
    [
        "Ayushi Burnwal",
        "Local Guide • Google Review",
        "review3",
        "60%"
    ],
    [
        "Sudeshna Meikap",
        "Local Guide • Google Review",
        "review1",
        "80%"
    ],
    [
        "Mriganko Santra",
        "Local Guide • Google Review",
        "review2",
        "100%"
    ]
];

const reviewImages = {
    review1: "/assets/urbanland/review1.png",
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
        <section id="feedback" className='w-full py-16 lg:py-0 lg:h-dvh p-6 sm:p-8 flex flex-col justify-center items-stretch bg-white overflow-hidden'>
            <div className='w-full text-left max-w-[1400px] mx-auto flex flex-col justify-center h-full'>
                <p className='text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#2C5F2E] text-left mb-2 sm:mb-4 select-none'>
                    — Client Testimonials
                </p>

                <div>
                    <h1
                        className='text-[#1A1A1A] mt-4 mb-6 font-bold leading-[1.2] tracking-tight uppercase'
                        style={{ fontSize: 'clamp(1rem, 3.8vw, 2.6rem)', lineHeight: 1.2 }}
                    >
                        {feedbackH1LG[index].map((line, i) => (
                            <span key={i} className="block mb-1 sm:mb-2">
                                {line}
                            </span>
                        ))}
                    </h1>
                </div>

                <div className='flex items-center gap-4 mt-8 sm:mt-12 select-none'>
                    <FaUserCircle className='w-10 h-10 sm:w-[4vw] sm:min-w-[45px] text-[#1A1A1A]/40' />
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
