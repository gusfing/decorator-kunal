"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const containerRef = useRef(null);

  const images = [
    "/assets/urbanland/Bench.jpeg",
    "/assets/urbanland/Planters_Box.jpeg",
    "/assets/urbanland/Car_Shelter.jpeg",
    "/assets/urbanland/Wicker_Furniture.jpeg",
    "/assets/urbanland/Dustbins.jpeg",
    "/assets/urbanland/Bus_Shelters.jpeg",
    "/assets/urbanland/Bench_Planter.jpeg"
  ];

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
        }
      });

      // Animate text splitting
      tl.to(".hero-text-left", { xPercent: -120, opacity: 0, ease: "power2.inOut" }, 0);
      tl.to(".hero-text-right", { xPercent: 120, opacity: 0, ease: "power2.inOut" }, 0);

      // Cards fanning out
      const cards = gsap.utils.toArray(".hero-card");
      const centerIndex = 3;

      cards.forEach((card, index) => {
        const offset = index - centerIndex;
        tl.to(card, {
          xPercent: offset * 110,
          yPercent: Math.abs(offset) * 12,
          rotation: offset * 3,
          scale: 1,
          ease: "power2.inOut",
        }, 0);
      });

      // Side text reveal
      tl.fromTo(".side-text-left", 
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, ease: "power2.out" }, 
        0.2
      );
      
      tl.fromTo(".side-text-right", 
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, ease: "power2.out" }, 
        0.2
      );
    });

    mm.add("(max-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        }
      });

      tl.to(".hero-text-left", { xPercent: -80, opacity: 0, ease: "power2.inOut" }, 0);
      tl.to(".hero-text-right", { xPercent: 80, opacity: 0, ease: "power2.inOut" }, 0);

      const cards = gsap.utils.toArray(".hero-card");
      const centerIndex = 3;

      cards.forEach((card, index) => {
        const offset = index - centerIndex;
        tl.to(card, {
          xPercent: offset * 45,
          yPercent: Math.abs(offset) * 8,
          rotation: offset * 4,
          scale: 1,
          ease: "power2.inOut",
        }, 0);
      });

      tl.fromTo(".side-text-left", { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0.2);
      tl.fromTo(".side-text-right", { y: -20, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out" }, 0.2);
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center text-white">
      
      {/* Big Center Text */}
      <div className="absolute z-20 flex w-full justify-center text-[12vw] font-bold tracking-tighter mix-blend-difference pointer-events-none whitespace-nowrap uppercase">
        <span className="hero-text-left inline-block">URBAN/</span>
        <span className="hero-text-right inline-block">LAND</span>
      </div>

      {/* Cards Stack */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
        {images.map((src, index) => (
          <div 
            key={index}
            className="hero-card absolute w-[160px] h-[220px] sm:w-[220px] sm:h-[300px] md:w-[280px] md:h-[380px] lg:w-[320px] lg:h-[450px] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10 origin-bottom"
            style={{ 
              zIndex: 10 - Math.abs(index - 3),
              scale: 0.85
            }}
          >
            <img src={src} alt="Urbanland Furniture" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Side Text - Left */}
      <div className="side-text-left absolute left-[5%] bottom-[12%] md:bottom-[15%] z-30 max-w-[200px] md:max-w-[250px] opacity-0 pointer-events-none">
        <h2 className="text-lg md:text-3xl font-semibold mb-2">Premium Quality</h2>
        <p className="text-xs md:text-sm text-white/70">Crafted outdoor seating with refined design and lasting finish.</p>
      </div>

      {/* Side Text - Right */}
      <div className="side-text-right absolute right-[5%] top-[12%] md:top-[15%] text-right z-30 max-w-[200px] md:max-w-[250px] opacity-0 pointer-events-none">
        <h2 className="text-lg md:text-3xl font-semibold mb-2">Modern Spaces</h2>
        <p className="text-xs md:text-sm text-white/70">Architectural forms designed for modern landscapes across India.</p>
      </div>

    </section>
  );
};

export default Hero;
