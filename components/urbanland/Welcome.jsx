"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const welcomeLinesLG = [
    "Welcome to the outdoors, elevated by Urbanland®.",
    "Experience the perfect blend of nature and modern design with our premium",
    "urban furniture, crafted for the most breathtaking landscapes in India."
];

const welcomeLinesSM = [
    "Welcome to the outdoors,",
    "elevated by Urbanland®.",
    "Experience the perfect blend",
    "of nature and modern design",
    "with our premium urban furniture,",
    "crafted for the most breathtaking",
    "landscapes in India."
];

const Welcome = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            const lines = gsap.utils.toArray(".clip-text-welcome-lg");
            const tl = gsap.timeline({
                scrollTrigger: { toggleActions: "play reverse play reverse",
                    trigger: ".welcome-line",
                    start: "top 85%",
                    end: "top 45%",
                    scrub: true,
                },
            });

            tl.to(lines, {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                stagger: 0.15,
                duration: 1,
            });
        });

        mm.add("(max-width: 768px)", () => {
            const lines = gsap.utils.toArray(".clip-text-welcome-sm");
            const tl = gsap.timeline({
                scrollTrigger: { toggleActions: "play reverse play reverse",
                    trigger: ".welcome-line",
                    start: "top 85%",
                    end: "top 45%",
                    scrub: true,
                },
            });

            tl.to(lines, {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                stagger: 0.15,
                duration: 1,
            });
        });

        return () => mm.revert();
    }, { scope: sectionRef });

    return (
        <div ref={sectionRef} id="welcome" className='welcome-section w-full min-h-screen h-auto py-12 md:py-16 md:h-[110vh] flex flex-col justify-between text-[#2A2725] md:px-7 px-6'>
            <div className='flex flex-col gap-2 tracking-[-4] leading-2'>
                <div className="w-full md:w-[86%] md:text-[clamp(2.2rem,3.6vw,4rem)] text-[34px] welcome-line md:pt-10">
                    {/* Desktop Lines */}
                    <div className="hidden md:flex w-full welcome-text flex-col justify-center items-start">
                        {welcomeLinesLG.map((text, index) => (
                            <span key={index} className="relative block text-darkBrown md:tracking-[-0.010em] tracking-[0.015em] overflow-visible">
                                {text}
                                <span className="clip-text-welcome-lg md:tracking-[-0.010em] tracking-[0.015em]">{text}</span>
                            </span>
                        ))}
                    </div>
                    {/* Mobile Lines */}
                    <div className="flex md:hidden w-full welcome-text flex-col justify-center items-start">
                        {welcomeLinesSM.map((text, index) => (
                            <span key={index} className="relative block text-darkBrown md:tracking-[-0.010em] tracking-[0.015em] overflow-visible">
                                {text}
                                <span className="clip-text-welcome-sm md:tracking-[-0.010em] tracking-[0.015em]">{text}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex md:flex-row flex-col justify-between items-center md:p-4 md:mt-20 mt-10 gap-10 md:gap-16 w-full">
                
                {/* Premium Layered Overlapping Collage */}
                <div className="relative w-[260px] h-[220px] sm:w-[320px] sm:h-[270px] md:w-[370px] md:h-[310px] lg:w-[420px] lg:h-[350px] xl:w-[460px] xl:h-[380px] flex-shrink-0 select-none">
                    {/* Background Layer Card */}
                    <div className="absolute top-0 left-0 w-[65%] h-[82%] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-[1.03] hover:-rotate-2 transition-all duration-700 cursor-pointer border border-black/5 z-0">
                        <img loading="lazy" src="/assets/urbanland/welcome-1.webp" alt="Welcome layout urban furniture WPC bench supply" className="w-full h-full object-cover" />
                    </div>
                    {/* Foreground Overlapping Layer Card */}
                    <div className="absolute bottom-0 right-0 w-[60%] h-[72%] rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.2)] hover:scale-[1.05] hover:rotate-2 transition-all duration-700 cursor-pointer border-[8px] border-[#F7F4EF] z-10">
                        <img loading="lazy" src="/assets/urbanland/welcome-2.webp" alt="Welcome layout luxury hotel synthetic wicker poolside lounger furniture" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="md:w-1/2 w-full">
                    <p className="md:text-[2rem] text-[1.4rem] text-[#6e6a66] md:leading-[1.1] md:pr-24 font-normal leading-[26px] tracking-[-0.2px]">
                        <span>Each of our premium collections is manufactured to international standards in state-of-the-art facilities, specifying only the finest sustainable materials.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
