"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const StickyCols = () => {
    const containerRef = useRef(null);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    React.useEffect(() => {
        document.fonts.ready.then(() => setFontsLoaded(true));
    }, []);

    useGSAP(() => {
        if (!fontsLoaded) return;

        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();

        // 1️⃣ Desktop animation timeline (screens >= 1024px)
        mm.add("(min-width: 1024px)", () => {
            // Initial state
            gsap.set(".col-3 .col-content-wrapper .line span", { yPercent: 0 });
            gsap.set(".col-3 .col-content-wrapper-2 .line span", { yPercent: -125 });
            gsap.set(".col-3 .col-content-wrapper-2", { opacity: 0 });

            // Controlled phase logic using timeline
            const tl = gsap.timeline({
                scrollTrigger: { toggleActions: "play reverse play reverse",
                    trigger: ".sticky-cols",
                    start: "top top",
                    end: "+=130%",
                    pin: true,
                    scrub: 1,
                },
            });

            // PHASE 1: Reveal col-2, hide col-1
            tl.to(".col-1", { opacity: 0, scale: 0.8, duration: 0.8 })
                .to(".col-2", { x: "0%", duration: 0.8 }, "<")
                .to(".col-3", { y: "0%", duration: 0.8 }, "<")
                .to(".col-2 .col-img-1 img", { scale: 1, duration: 0.8 }, "<")
                .to(".col-2 .col-img-2", {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 0.8,
                }, "<")
                .to(".col-2 .col-img-2 img", { scale: 1.05, duration: 0.8 }, "<");

            // PHASE 2: Switch col-2 -> col-3 content
            tl.to(".col-2", { opacity: 0, scale: 0.8, duration: 0.8 })
                .to(".col-3 .col-content-wrapper .line span", {
                    yPercent: -125,
                    duration: 0.8,
                }, "<")
                .to(".col-3 .col-content-wrapper", { opacity: 0, duration: 0.4 }, "<")
                .to(".col-3 .col-content-wrapper-2", { opacity: 1, duration: 0.4 }, "<");
            tl.to(".col-3", { x: "0%", duration: 0.8 }, "-=0.8")
                .to(".col-4", { y: "0%", duration: 0.8 }, "<")
                .to(".col-3 .col-content-wrapper-2 .line span", {
                    yPercent: 0,
                    delay: 0.4,
                    duration: 0.8,
                }, "<");

            // PHASE 3: Switch col-3 -> col-4 content (reveal col-5)
            tl.to(".col-3", { opacity: 0, scale: 0.8, duration: 0.8 })
                .to(".col-4", { x: "0%", duration: 0.8 }, "<")
                .to(".col-5", { y: "0%", duration: 0.8 }, "<")
                .to(".col-4 .col-img-1 img", { scale: 1, duration: 0.8 }, "<")
                .to(".col-4 .col-img-2", {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 0.8,
                }, "<")
                .to(".col-4 .col-img-2 img", { scale: 1.05, duration: 0.8 }, "<");
        });

        // 2️⃣ Mobile scrolling animation (screens < 1024px)
        mm.add("(max-width: 1023px)", () => {
            gsap.from(".mobile-project-card", {
                opacity: 0,
                y: 40,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: { toggleActions: "play reverse play reverse",
                    trigger: ".mobile-projects-wrapper",
                    start: "top 85%",
                    once: true,
                }
            });
        });

        // Recalculate triggers after initialization
        ScrollTrigger.sort();
        ScrollTrigger.refresh();

        return () => {
            mm.revert();
        };
    }, { dependencies: [fontsLoaded] });

    return (
        <>
            {/* Desktop Layout - Pinned Horizontal Scroll Trigger */}
            <section className="sticky-cols w-full h-screen bg-[#F7F4EF] hidden lg:block overflow-hidden">
                <div ref={containerRef} className="relative w-full h-full">
                    
                    {/* Slide 1 Text: Lodha */}
                    <div className="col col-1">
                        <div className="col-content">
                            <div className="col-content-wrapper flex flex-col justify-between p-10 md:p-16 lg:p-20 bg-[#2D2D2D] overflow-hidden animate-container">
                                <div>
                                    <span className="text-[#C9A84C] text-[10px] md:text-xs font-semibold uppercase tracking-widest block mb-2">Lodha Group</span>
                                    <h2 className="text-3xl md:text-5xl font-black text-[#F7F4EF] leading-tight uppercase tracking-tight">Multiple Townships</h2>
                                </div>
                                <div className="my-auto flex flex-col gap-3">
                                    <div className="text-base md:text-xl font-extrabold text-[#C9A84C] border-l-2 border-[#C9A84C] pl-3">
                                        420+ Benches & Planters
                                    </div>
                                    <p className="text-xs md:text-sm text-[#F7F4EF]/85 leading-relaxed max-w-[90%] font-medium">
                                        420+ WPC & SS benches + GFRC planters supplied across Lodha's premium residential township developments.
                                    </p>
                                </div>
                                <div className="flex justify-between items-end w-full">
                                    <Link 
                                        href="/work" 
                                        className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#F7F4EF] border-b border-[#F7F4EF]/25 hover:text-[#C9A84C] hover:border-[#C9A84C]/45 pb-0.5 transition-all"
                                    >
                                        Explore Lodha Project Details →
                                    </Link>
                                    <span className="text-[#F7F4EF]/60 text-[10px] font-bold uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full border border-[#F7F4EF]/20">01 / 04</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Column 1 & 2 */}
                    <div className="col col-2">
                        <div className="col-img col-img-1">
                            <div className="col-img-wrapper">
                                <img loading="lazy" src="/assets/urbanland/Bench_Planter.webp" alt="Urbanland Products WPC benches and planters installed in Lodha township" />
                            </div>
                        </div>
                        <div className="col-img col-img-2">
                            <div className="col-img-wrapper">
                                <img loading="lazy" src="/assets/urbanland/Car_Shelter.webp" alt="Outdoor urban furniture installed at Adani Realty residential project by Urbanland Products" />
                            </div>
                        </div>
                    </div>

                    {/* Slide 2 & 3 Text: Adani & Oberoi */}
                    <div className="col col-3">
                        {/* Slide 2 Text */}
                        <div className="col-content-wrapper flex flex-col justify-between p-10 md:p-16 lg:p-20 bg-[#2C5F2E] overflow-hidden">
                            <div>
                                <span className="text-[#C9A84C] text-[10px] md:text-xs font-semibold uppercase tracking-widest block mb-2">Adani Realty</span>
                                <h1 className="text-3xl md:text-5xl font-black text-[#F7F4EF] leading-tight uppercase tracking-tight">
                                    <div className="line"><span>Premium</span></div>
                                    <div className="line"><span>Residential</span></div>
                                </h1>
                            </div>
                            <div className="my-auto flex flex-col gap-3">
                                <div className="text-base md:text-xl font-extrabold text-[#C9A84C] border-l-2 border-[#C9A84C] pl-3">
                                    Complete Site Supply
                                </div>
                                <p className="text-xs md:text-sm text-[#F7F4EF]/85 leading-relaxed max-w-[90%] font-medium">
                                    <span className="line"><span>Complete outdoor furniture solution including</span></span>
                                    <span className="line"><span>benches, dustbins, planters, and car parking sheds</span></span>
                                    <span className="line"><span>delivered on schedule.</span></span>
                                </p>
                            </div>
                            <div className="flex justify-between items-end w-full">
                                <Link 
                                    href="/work" 
                                    className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#F7F4EF] border-b border-[#F7F4EF]/25 hover:text-[#C9A84C] hover:border-[#C9A84C]/45 pb-0.5 transition-all"
                                >
                                    Explore Adani Project Details →
                                </Link>
                                <span className="text-[#F7F4EF]/60 text-[10px] font-bold uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full border border-[#F7F4EF]/20">02 / 04</span>
                            </div>
                        </div>
                        
                        {/* Slide 3 Text */}
                        <div className="col-content-wrapper-2 flex flex-col justify-between p-10 md:p-16 lg:p-20 bg-[#2D2D2D] overflow-hidden">
                            <div>
                                <span className="text-[#C9A84C] text-[10px] md:text-xs font-semibold uppercase tracking-widest block mb-2">Oberoi Realty</span>
                                <h1 className="text-3xl md:text-5xl font-black text-[#F7F4EF] leading-tight uppercase tracking-tight">
                                    <div className="line"><span>Luxury</span></div>
                                    <div className="line"><span>Project</span></div>
                                </h1>
                            </div>
                            <div className="my-auto flex flex-col gap-3">
                                <div className="text-base md:text-xl font-extrabold text-[#C9A84C] border-l-2 border-[#C9A84C] pl-3">
                                    Premium Wicker & Cabanas
                                </div>
                                <p className="text-xs md:text-sm text-[#F7F4EF]/85 leading-relaxed max-w-[90%] font-medium">
                                    <span className="line"><span>Premium wicker furniture, poolside loungers,</span></span>
                                    <span className="line"><span>and cabanas crafted for Oberoi's high-end</span></span>
                                    <span className="line"><span>residential and hospitality developments.</span></span>
                                </p>
                            </div>
                            <div className="flex justify-between items-end w-full">
                                <Link 
                                    href="/work" 
                                    className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#F7F4EF] border-b border-[#F7F4EF]/25 hover:text-[#C9A84C] hover:border-[#C9A84C]/45 pb-0.5 transition-all"
                                >
                                    Explore Oberoi Project Details →
                                </Link>
                                <span className="text-[#F7F4EF]/60 text-[10px] font-bold uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full border border-[#F7F4EF]/20">03 / 04</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Column 3 & 4 */}
                    <div className="col col-4">
                        <div className="col-img col-img-1">
                            <div className="col-img-wrapper">
                                <img loading="lazy" src="/assets/urbanland/Wicker_Furniture.webp" alt="Premium wicker furniture, poolside loungers, and cabanas crafted for Oberoi's luxury project" />
                            </div>
                        </div>
                        <div className="col-img col-img-2">
                            <div className="col-img-wrapper">
                                <img loading="lazy" src="/assets/urbanland/Bus_Shelters.webp" alt="MS/SS bus shelters, park benches, bollards, and outdoor dustbins delivered for urban infrastructure" />
                            </div>
                        </div>
                    </div>

                    {/* Slide 4 Text: Smart City */}
                    <div className="col col-5">
                        <div className="col-content">
                            <div className="col-content-wrapper flex flex-col justify-between p-10 md:p-16 lg:p-20 bg-[#2C5F2E] overflow-hidden">
                                <div>
                                    <span className="text-[#C9A84C] text-[10px] md:text-xs font-semibold uppercase tracking-widest block mb-2">Smart City / Municipal</span>
                                    <h2 className="text-3xl md:text-5xl font-black text-[#F7F4EF] leading-tight uppercase tracking-tight">Project</h2>
                                </div>
                                <div className="my-auto flex flex-col gap-3">
                                    <div className="text-base md:text-xl font-extrabold text-[#C9A84C] border-l-2 border-[#C9A84C] pl-3">
                                        Smart Transit Shelters
                                    </div>
                                    <p className="text-xs md:text-sm text-[#F7F4EF]/85 leading-relaxed max-w-[90%] font-medium">
                                        MS/SS bus shelters, park benches, bollards, and outdoor dustbins delivered for urban infrastructure development.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4 border-t border-[#F7F4EF]/15 pt-4 w-full">
                                    <div className="flex justify-between items-center w-full">
                                        <Link 
                                            href="/work" 
                                            className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#F7F4EF] border-b border-[#F7F4EF]/25 hover:text-[#C9A84C] hover:border-[#C9A84C]/45 pb-0.5 transition-all"
                                        >
                                            Explore Smart City Details →
                                        </Link>
                                        <span className="text-[#F7F4EF]/60 text-[10px] font-bold uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full border border-[#F7F4EF]/20">04 / 04</span>
                                    </div>
                                    {/* Overall Section CTAs */}
                                    <div className="flex items-center gap-5 mt-2">
                                        <Link 
                                            href="/work" 
                                            className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#C9A84C] hover:text-[#F7F4EF] transition-colors flex items-center"
                                        >
                                            ▸ View All Projects →
                                        </Link>
                                        <Link 
                                            href="/contact" 
                                            className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#F7F4EF] hover:text-[#C9A84C] transition-colors flex items-center"
                                        >
                                            ▸ Get a Similar Solution →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Mobile Layout - Premium Responsive Card Stack (Scrolls Naturally) */}
            <section className="sticky-cols-mobile w-full bg-[#F7F4EF] px-6 pt-2 pb-16 flex flex-col gap-8 lg:hidden block">
                <div className="flex flex-col gap-2 mb-4">
                    <p className="text-[.7rem] font-bold text-[#2C5F2E] uppercase tracking-widest">— Case Studies</p>
                    <h2 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight leading-tight">Specified by Industry Leaders</h2>
                </div>

                <div className="mobile-projects-wrapper flex flex-col gap-8 w-full">
                    {/* Card 1: Lodha */}
                    <div className="mobile-project-card bg-[#2D2D2D] rounded-[2.25rem] border border-white/[0.06] shadow-2xl flex flex-col overflow-hidden">
                        {/* Text Content Wrapper */}
                        <div className="p-[34px] flex flex-col gap-5">
                            {/* 1. Top Heading block */}
                            <div className="flex flex-col gap-1">
                                <h3 className="text-2xl font-black text-[#F7F4EF] leading-tight uppercase tracking-tight pt-[10px] pb-[90px]">
                                    Lodha Group —<br />
                                    <span className="text-[#C9A84C]">Multiple Townships</span>
                                </h3>
                            </div>

                            {/* 2. Middle Row: Circles + Description */}
                            <div className="flex items-start gap-4">
                                {/* Circle Indices */}
                                <div className="flex items-center gap-1.5 shrink-0 select-none mt-0.5 text-[16px]">
                                    <div className="border border-[#F7F4EF]/45 text-[#F7F4EF] rounded-[38px] w-9 h-9 flex items-center justify-center font-mono text-[12px] font-bold">
                                        01
                                    </div>
                                    <div className="border border-[#F7F4EF]/15 text-[#F7F4EF]/35 rounded-[38px] w-9 h-9 flex items-center justify-center font-mono text-[12px] font-semibold">
                                        04
                                    </div>
                                </div>
                                {/* Description Paragraph */}
                                <p className="text-[11px] text-[#F7F4EF]/85 leading-relaxed font-medium">
                                    420+ WPC & SS benches + GFRC planters supplied across Lodha's premium residential township developments.
                                </p>
                            </div>
                        </div>

                        {/* 3. Bottom Image Container - Full width & seamless */}
                        <div className="w-full aspect-[16/10] bg-black/20 rounded-[37.4px] overflow-hidden relative group mt-auto">
                            <img loading="lazy" 
                                src="/assets/urbanland/Bench_Planter.webp" 
                                alt="Urbanland Products WPC benches and planters installed in Lodha township" 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                style={{ borderRadius: "38px", boxShadow: "rgba(255, 255, 255, 0.3) 5px 5px 10px 10px inset" }}
                            />
                        </div>
                    </div>

                    {/* Card 2: Adani */}
                    <div className="mobile-project-card bg-[#2C5F2E] rounded-[2.25rem] border border-white/[0.06] shadow-2xl flex flex-col overflow-hidden">
                        {/* Text Content Wrapper */}
                        <div className="p-[34px] flex flex-col gap-5">
                            {/* 1. Top Heading block */}
                            <div className="flex flex-col gap-1">
                                <h3 className="text-2xl font-black text-[#F7F4EF] leading-tight uppercase tracking-tight pt-[10px] pb-[90px]">
                                    Adani Realty —<br />
                                    <span className="text-[#C9A84C]">Premium Residential</span>
                                </h3>
                            </div>

                            {/* 2. Middle Row: Circles + Description */}
                            <div className="flex items-start gap-4">
                                {/* Circle Indices */}
                                <div className="flex items-center gap-1.5 shrink-0 select-none mt-0.5 text-[16px]">
                                    <div className="border border-[#F7F4EF]/45 text-[#F7F4EF] rounded-[38px] w-9 h-9 flex items-center justify-center font-mono text-[12px] font-bold">
                                        02
                                    </div>
                                    <div className="border border-[#F7F4EF]/15 text-[#F7F4EF]/35 rounded-[38px] w-9 h-9 flex items-center justify-center font-mono text-[12px] font-semibold">
                                        04
                                    </div>
                                </div>
                                {/* Description Paragraph */}
                                <p className="text-[11px] text-[#F7F4EF]/85 leading-relaxed font-medium">
                                    Complete outdoor furniture solution including benches, dustbins, planters, and car parking sheds delivered on schedule.
                                </p>
                            </div>
                        </div>

                        {/* 3. Bottom Image Container - Full width & seamless */}
                        <div className="w-full aspect-[16/10] bg-black/20 rounded-[37.4px] overflow-hidden relative group mt-auto">
                            <img loading="lazy" 
                                src="/assets/urbanland/Car_Shelter.webp" 
                                alt="Outdoor urban furniture installed at Adani Realty residential project by Urbanland Products" 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                style={{ borderRadius: "38px", boxShadow: "rgba(255, 255, 255, 0.3) 5px 5px 10px 10px inset" }}
                            />
                        </div>
                    </div>

                    {/* Card 3: Oberoi */}
                    <div className="mobile-project-card bg-[#2D2D2D] rounded-[2.25rem] border border-white/[0.06] shadow-2xl flex flex-col overflow-hidden">
                        {/* Text Content Wrapper */}
                        <div className="p-[34px] flex flex-col gap-5">
                            {/* 1. Top Heading block */}
                            <div className="flex flex-col gap-1">
                                <h3 className="text-2xl font-black text-[#F7F4EF] leading-tight uppercase tracking-tight pt-[10px] pb-[90px]">
                                    Oberoi Realty —<br />
                                    <span className="text-[#C9A84C]">Luxury Project</span>
                                </h3>
                            </div>

                            {/* 2. Middle Row: Circles + Description */}
                            <div className="flex items-start gap-4">
                                {/* Circle Indices */}
                                <div className="flex items-center gap-1.5 shrink-0 select-none mt-0.5 text-[16px]">
                                    <div className="border border-[#F7F4EF]/45 text-[#F7F4EF] rounded-[38px] w-9 h-9 flex items-center justify-center font-mono text-[12px] font-bold">
                                        03
                                    </div>
                                    <div className="border border-[#F7F4EF]/15 text-[#F7F4EF]/35 rounded-[38px] w-9 h-9 flex items-center justify-center font-mono text-[12px] font-semibold">
                                        04
                                    </div>
                                </div>
                                {/* Description Paragraph */}
                                <p className="text-[11px] text-[#F7F4EF]/85 leading-relaxed font-medium">
                                    Premium wicker furniture, poolside loungers, and cabanas crafted for Oberoi's high-end residential and hospitality developments.
                                </p>
                            </div>
                        </div>

                        {/* 3. Bottom Image Container - Full width & seamless */}
                        <div className="w-full aspect-[16/10] bg-black/20 rounded-[37.4px] overflow-hidden relative group mt-auto">
                            <img loading="lazy" 
                                src="/assets/urbanland/Wicker_Furniture.webp" 
                                alt="Premium wicker furniture, poolside loungers, and cabanas crafted for Oberoi's luxury project" 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                style={{ borderRadius: "38px", boxShadow: "rgba(255, 255, 255, 0.3) 5px 5px 10px 10px inset" }}
                            />
                        </div>
                    </div>

                    {/* Card 4: Smart City */}
                    <div className="mobile-project-card bg-[#2C5F2E] rounded-[2.25rem] border border-white/[0.06] shadow-2xl flex flex-col overflow-hidden">
                        {/* Text Content Wrapper */}
                        <div className="p-[34px] flex flex-col gap-5">
                            {/* 1. Top Heading block */}
                            <div className="flex flex-col gap-1">
                                <h3 className="text-2xl font-black text-[#F7F4EF] leading-tight uppercase tracking-tight pt-[10px] pb-[90px]">
                                    Smart City —<br />
                                    <span className="text-[#C9A84C]">Transit Shelters</span>
                                </h3>
                            </div>

                            {/* 2. Middle Row: Circles + Description */}
                            <div className="flex items-start gap-4">
                                {/* Circle Indices */}
                                <div className="flex items-center gap-1.5 shrink-0 select-none mt-0.5 text-[16px]">
                                    <div className="border border-[#F7F4EF]/45 text-[#F7F4EF] rounded-[38px] w-9 h-9 flex items-center justify-center font-mono text-[12px] font-bold">
                                        04
                                    </div>
                                    <div className="border border-[#F7F4EF]/15 text-[#F7F4EF]/35 rounded-[38px] w-9 h-9 flex items-center justify-center font-mono text-[12px] font-semibold">
                                        04
                                    </div>
                                </div>
                                {/* Description Paragraph */}
                                <p className="text-[11px] text-[#F7F4EF]/85 leading-relaxed font-medium">
                                    MS/SS bus shelters, park benches, bollards, and outdoor dustbins delivered for urban infrastructure development.
                                </p>
                            </div>
                        </div>

                        {/* 3. Bottom Image Container - Full width & seamless */}
                        <div className="w-full aspect-[16/10] bg-black/20 rounded-[37.4px] overflow-hidden relative group mt-auto">
                            <img loading="lazy" 
                                src="/assets/urbanland/Bus_Shelters.webp" 
                                alt="MS/SS bus shelters, park benches, bollards, and outdoor dustbins delivered for urban infrastructure" 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                style={{ borderRadius: "38px", boxShadow: "rgba(255, 255, 255, 0.3) 5px 5px 10px 10px inset" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Section CTAs */}
                <div className="flex flex-row justify-center items-stretch gap-3 mt-8 pt-8 border-t border-[#1A1A1A]/10 w-full">
                    <Link 
                        href="/work" 
                        className="flex-1 flex items-center justify-center text-center px-4 py-3 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest bg-[#2D2D2D] border border-white/10 text-[#F7F4EF] hover:text-[#C9A84C] transition-all active:scale-95 cursor-pointer leading-tight"
                    >
                        ▸ View Projects →
                    </Link>
                    <Link 
                        href="/contact" 
                        className="flex-1 flex items-center justify-center text-center px-4 py-3 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest bg-[#2C5F2E] text-[#F7F4EF] hover:bg-[#2D2D2D] hover:text-[#C9A84C] transition-all active:scale-95 cursor-pointer leading-tight"
                    >
                        ▸ Get Similar →
                    </Link>
                </div>
            </section>
        </>
    );
};

export default StickyCols;
