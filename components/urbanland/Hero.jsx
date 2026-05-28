"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressRef = useRef(null);
  const heroSectionRef = useRef(null);

  const slides = [
    {
      image: "/assets/urbanland/Wicker_Furniture.jpeg",
      title: "Wicker Furniture",
      subtext: "Crafted outdoor seating with refined design and lasting finish."
    },
    {
      image: "/assets/urbanland/Planters_Box.jpeg",
      title: "Planter Boxes",
      subtext: "Architectural forms designed for modern landscapes."
    },
    {
      image: "/assets/urbanland/Dustbins.jpeg",
      title: "Dustbins",
      subtext: "Outdoor waste management solutions in modern materials and finishes."
    },
    {
      image: "/assets/urbanland/Car_Shelter.jpeg",
      title: "Car Shelters",
      subtext: "Engineered parking structures for organized outdoor spaces."
    },
    {
      image: "/assets/urbanland/Canteen_Tables.jpeg",
      title: "Canteen Tables",
      subtext: "Heavy-duty dining solutions for institutional and commercial spaces."
    },
    {
      image: "/assets/urbanland/Bus_Shelters.jpeg",
      title: "Bus Shelters",
      subtext: "Public transport infrastructure built for urban environments."
    },
    {
      image: "/assets/urbanland/Bench.jpeg",
      title: "Benches",
      subtext: "Outdoor seating systems designed for public and private spaces."
    },
    {
      image: "/assets/urbanland/Bench_Planter.jpeg",
      title: "Bench Planters",
      subtext: "Integrated seating and landscape elements for modern spaces."
    }
  ];

  // Scroll parallax effect for slider background images
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      gsap.to(".hero-slide-bg", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    return () => mm.revert();
  }, { scope: heroSectionRef });

  // Handle active slide transitions
  useEffect(() => {
    // Kill ALL existing tweens before creating new ones to prevent stacking
    gsap.killTweensOf(".slide-title");
    gsap.killTweensOf(".slide-desc");
    slides.forEach((_, idx) => {
      gsap.killTweensOf(`.slide-bg-${idx}`);
    });

    // Background cross-fade and zoom (Ken Burns effect)
    slides.forEach((_, idx) => {
      const bg = document.querySelector(`.slide-bg-${idx}`);
      if (bg) {
        if (idx === activeIndex) {
          gsap.fromTo(bg,
            { scale: 1.15, opacity: 0 },
            { 
              scale: 1.1, 
              opacity: 1, 
              duration: 1.4, 
              ease: "power3.out",
              zIndex: 1 
            }
          );
        } else {
          gsap.to(bg, { 
            opacity: 0, 
            duration: 1.2, 
            ease: "power3.out",
            zIndex: 0 
          });
        }
      }
    });

    // Stagger slide title and description animations
    gsap.fromTo(".slide-title", 
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
    );
    gsap.fromTo(".slide-desc", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.12, ease: "power3.out" }
    );

    // Slide autoplay progress bar
    gsap.killTweensOf(progressRef.current);
    gsap.fromTo(progressRef.current,
      { width: "0%" },
      { 
        width: "100%", 
        duration: 5.5, 
        ease: "none",
        onComplete: () => {
          handleNext();
        }
      }
    );

    return () => {
      gsap.killTweensOf(progressRef.current);
      gsap.killTweensOf(".slide-title");
      gsap.killTweensOf(".slide-desc");
      slides.forEach((_, idx) => {
        gsap.killTweensOf(`.slide-bg-${idx}`);
      });
    };
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section ref={heroSectionRef} id="hero" className="hero-section w-full md:h-dvh h-[100vh] relative">
      <div className="relative w-full h-full overflow-hidden bg-[#1A1A1A]">
        
        {/* Background Images */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide-bg slide-bg-${index} absolute -top-[10%] -bottom-[10%] inset-x-0 bg-no-repeat bg-cover bg-center pointer-events-none`}
            style={{
              backgroundImage: `url(${slide.image})`,
              opacity: index === 0 ? 1 : 0,
            }}
          />
        ))}

        {/* Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/55 z-10 pointer-events-none" />

        {/* Dynamic Text and UI Controls Overlay */}
        <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 font-sans select-none">
          
          {/* Top Row Spacer */}
          <div className="w-full h-12 pt-2" />

          {/* Bottom Row: Product Info & Control Actions */}
          <div className="w-full flex flex-col gap-6 md:gap-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-5 w-full">
              
              {/* Product Text Details */}
              <div className="max-w-2xl flex flex-col gap-2 md:gap-4 overflow-hidden">
                <div className="h-auto overflow-hidden py-1">
                  <h1 
                    className="slide-title text-[#f4efe7] text-[clamp(32px,8.5vw,48px)] sm:text-5xl md:text-[4rem] font-bold tracking-wider leading-none"
                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.35)' }}
                  >
                    {slides[activeIndex].title}
                  </h1>
                </div>
                <div className="max-w-lg overflow-hidden">
                  <p 
                    className="slide-desc text-white/90 text-xs sm:text-sm font-medium tracking-wide leading-relaxed max-w-sm"
                    style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
                  >
                    {slides[activeIndex].subtext}
                  </p>
                </div>
              </div>

              {/* Slider Navigation & Counter */}
              <div className="flex items-center gap-6 z-30">
                <div className="text-white/50 text-xs sm:text-sm font-semibold tracking-widest font-mono select-none">
                  <span className="text-[#f4efe7] text-base md:text-lg font-bold">{String(activeIndex + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
                </div>
                <div className="flex items-center gap-2.5">
                  <button 
                    onClick={handlePrev}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/5 hover:bg-white/10 backdrop-blur-md cursor-pointer transition-colors duration-300 active:scale-95"
                  >
                    &larr;
                  </button>
                  <button 
                    onClick={handleNext}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/5 hover:bg-white/10 backdrop-blur-md cursor-pointer transition-colors duration-300 active:scale-95"
                  >
                    &rarr;
                  </button>
                </div>
              </div>

            </div>

            {/* Visual Slide Autoplay Progress Line */}
            <div className="w-full h-[2px] bg-white/15 rounded-full overflow-hidden">
              <div 
                ref={progressRef}
                className="h-full bg-[#2C5F2E] w-0"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
