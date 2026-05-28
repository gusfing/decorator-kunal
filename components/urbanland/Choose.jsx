"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ProductsCatalog from "./ProductsCatalog";
import { FaShieldAlt, FaBuilding, FaBolt, FaTruck } from "react-icons/fa";

const chooseLinesLG = [
    "Why India's Leading Developers Choose",
    "Urbanland Products for Their Projects"
];

const chooseLinesSM = [
    "Why India's",
    "Leading Developers",
    "Choose Urbanland",
    "Products for Their Projects"
];

const Choose = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Shared animation setup
        const createAnimation = (isMobile) => {
            const linesSelector = isMobile ? ".choose-title-clip-sm" : ".choose-title-clip-lg";
            const lines = gsap.utils.toArray(linesSelector);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    end: "top 10%",
                    scrub: true,
                },
            });

            tl.from(".choose-subtitle", {
                yPercent: 100,
                opacity: 0,
                ease: "power1.inOut"
            });

            tl.to(
                lines,
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    ease: "none",
                    stagger: 0.2,
                    duration: 1,
                },
                "<"
            );

            if (!isMobile) {
                tl.from(".choose-sec", {
                    yPercent: 100,
                    duration: 1,
                }, "<");
            }
        };

        mm.add("(min-width: 769px)", () => createAnimation(false));
        mm.add("(max-width: 768px)", () => createAnimation(true));

        return () => mm.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="choose" className="choose-section w-full min-h-screen p-8 pt-10 pb-20 flex flex-col justify-start items-start gap-12">
            <div className="w-full">
                <p className='text-[.7rem] text-[#2D2D2D] choose-subtitle uppercase tracking-wider font-bold'>— India's Premier B2B Outdoor & Urban Furniture Manufacturer</p>
                <div className="lg:mt-10 mt-7 title-part origin-bottom">
                    {/* Desktop Choose Lines */}
                    <div className="hidden md:block">
                        {chooseLinesLG.map((line, index) => (
                            <h2 key={index} className="choose-heading text-[#1A1A1A] lg:text-[4.2rem] md:text-[3rem] text-[2.2rem] leading-[1.05] font-bold tracking-tight choose-title">
                                <span className={`choose-title-break ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>
                                    {line}
                                    <span className={`choose-title-clip-lg ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>{line}</span>
                                </span>
                            </h2>
                        ))}
                    </div>
                    {/* Mobile Choose Lines */}
                    <div className="block md:hidden">
                        {chooseLinesSM.map((line, index) => (
                            <h2 key={index} className="choose-heading text-[#1A1A1A] lg:text-[4.2rem] md:text-[3rem] text-[2.2rem] leading-[1.05] font-bold tracking-tight choose-title">
                                <span className={`choose-title-break ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>
                                    {line}
                                    <span className={`choose-title-clip-sm ${index == 1 ? "lg:pb-3 pb-2" : ""}`}>{line}</span>
                                </span>
                            </h2>
                        ))}
                    </div>
                </div>
            </div>
                
            <div className="choose-sec w-full flex flex-col justify-start items-start gap-10 lg:mt-0 pb-6">
                <div className='w-full lg:max-w-4xl text-[#2D2D2D]/90 lg:text-[2.2rem] text-[1.2rem] md:leading-[1.2] lg:mt-0 mt-8 font-light'>
                    <p>When a real estate developer, hotel chain, or municipal body specifies outdoor and urban furniture for a large-scale project, they need a manufacturer they can trust — on quality, delivery timelines, and long-term durability. Urbanland Products is India's only outdoor furniture manufacturer offering a comprehensive 2-year guarantee, with a proven track record supplying premium WPC benches, bus shelters, GFRC planters, and more to landmark developments across the country.</p>
                </div>
            </div>

            {/* Ultra-Premium 3-Column Bento Grid Layout */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                
                {/* Bento Card 1: India's Only 2-Year Guarantee (Wide Highlight Card) */}
                <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-[#2C5F2E] text-[#F7F4EF] rounded-[2rem] border border-[#2C5F2E]/20 hover:shadow-xl hover:shadow-[#2C5F2E]/10 transition-all duration-500 group relative overflow-hidden">
                    {/* Decorative abstract background accent */}
                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/[0.03] rounded-full translate-x-10 translate-y-10 group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
                    
                    <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-2xl text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#2C5F2E] transition-all duration-500 flex-shrink-0 shadow-inner">
                        <FaShieldAlt className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#C9A84C]/90 bg-white/5 px-3 py-1 rounded-full w-fit border border-white/10 select-none">— TRUST EXCELLENCE</span>
                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#C9A84C] transition-colors">India's Only 2-Year Guarantee</h3>
                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">Full coverage on every product — no other outdoor furniture manufacturer in India matches this commitment.</p>
                    </div>
                </div>

                {/* Bento Card 2: Proven on Landmark Projects (Normal Card) */}
                <div className="md:col-span-1 flex flex-col justify-between gap-6 p-8 bg-[#EAE5DB]/45 border border-black/[0.05] hover:border-[#C9A84C]/50 hover:bg-[#EAE5DB]/70 rounded-[2rem] hover:shadow-lg transition-all duration-500 group">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#2C5F2E]/10 rounded-xl text-[#2C5F2E] group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C] transition-colors flex-shrink-0">
                        <FaBuilding className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#2C5F2E] transition-colors">Proven on Landmark Projects</h3>
                        <p className="text-xs text-[#2D2D2D]/80 leading-relaxed">420+ benches supplied to Lodha townships. Complete outdoor furniture solutions for Adani Realty and Oberoi projects.</p>
                    </div>
                </div>

                {/* Bento Card 3: Multi-Material Expertise (Normal Card) */}
                <div className="md:col-span-1 flex flex-col justify-between gap-6 p-8 bg-[#EAE5DB]/45 border border-black/[0.05] hover:border-[#C9A84C]/50 hover:bg-[#EAE5DB]/70 rounded-[2rem] hover:shadow-lg transition-all duration-500 group">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#2C5F2E]/10 rounded-xl text-[#2C5F2E] group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C] transition-colors flex-shrink-0">
                        <FaBolt className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-[#2C5F2E] transition-colors">Multi-Material Expertise</h3>
                        <p className="text-xs text-[#2D2D2D]/80 leading-relaxed">WPC • Stainless Steel • GFRC • Aluminium • Wicker. One supplier for your entire outdoor furniture specification.</p>
                    </div>
                </div>

                {/* Bento Card 4: 100% Indian Manufacturing (Wide Highlight Card) */}
                <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-[#2D2D2D] text-[#F7F4EF] rounded-[2rem] border border-white/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-500 group relative overflow-hidden">
                    {/* Decorative abstract background accent */}
                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/[0.02] rounded-full translate-x-10 translate-y-10 group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                    <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-2xl text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#2D2D2D] transition-all duration-500 flex-shrink-0 shadow-inner">
                        <FaTruck className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#C9A84C]/90 bg-white/5 px-3 py-1 rounded-full w-fit border border-white/10 select-none">— LOCAL SPEED & CONTROL</span>
                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#C9A84C] transition-colors">100% Indian Manufacturing</h3>
                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">Made in India = faster lead times, tighter quality control, and on-time delivery for your project schedule.</p>
                    </div>
                </div>
            </div>

            {/* Section 5 Heading */}
            <div className="w-full border-t border-[#2D2D2D]/10 pt-16 mt-12">
                <p className='text-[.7rem] text-[#2C5F2E] uppercase tracking-wider font-bold'>— Most Requested Products</p>
                <h2 className="text-3xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight leading-tight mt-3">
                    Outdoor & Urban Furniture Products for Large-Scale Projects
                </h2>
            </div>

            {/* Nested Products Catalog */}
            <ProductsCatalog showTitle={false} />
        </section>
    );
};

export default Choose;
