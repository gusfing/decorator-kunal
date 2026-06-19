"use client";

import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FaShieldAlt, FaBuilding, FaBolt, FaTruck } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: "all", name: "All products", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )},
  { id: "Benches", name: "Outdoor Benches", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 9h16M4 15h16M4 9v6M20 9v6M8 15v4M16 15v4" />
    </svg>
  )},
  { id: "Wicker", name: "Wicker Furniture", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9V6a2 2 0 00-2-2H7a2 2 0 00-2 2v3M3 11v5a2 2 0 002 2h14a2 2 0 002-2v-5a2 2 0 00-4 0v2H7v-2a2 2 0 00-4 0z" />
    </svg>
  )},
  { id: "Shelters", name: "Shelters", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 21h18M4 21V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13M8 10h8M8 14h8" />
    </svg>
  )},
  { id: "Planter", name: "Planters", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3a9 9 0 000 18v-9a3 3 0 000-6V3z" />
    </svg>
  )},
  { id: "Dustbin", name: "Dustbins", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  )},
  { id: "Cabanas", name: "Cabanas", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v13M3 12h18M12 3L3 12h18zM6 21h12" />
    </svg>
  )},
  { id: "Sheds", name: "Sheds & Pavilions", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l9-9 9 9M5 12v8a2 2 0 002 2h10a2 2 0 002-2v-8" />
    </svg>
  )},
  { id: "Car sheds", name: "Car sheds", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 10V6a2 2 0 012-2h10a2 2 0 012 2v4M2 17h20M7 17a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  )},
  { id: "Pool", name: "Poolside Loungers", icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 12c4-4 8 4 12 0s8-4 8 0M2 16c4-4 8 4 12 0s8-4 8 0" />
    </svg>
  )}
];

const staticProducts = [
  {
    id: "bus-shelters",
    title: "Bus Shelters",
    line: "Robust MS/SS bus shelters for townships, campuses & smart cities — custom sizes available.",
    category: "Shelters",
    url: "/work",
    image: "/assets/urbanland/Bus_Shelters.webp",
    gallery: ["/assets/urbanland/Bus_Shelters.webp", "/assets/urbanland/gallery_smart_city.webp", "/assets/urbanland/Bus_Shelters.webp"],
    badges: ["Popular"],
    tagline: "Robust MS/SS bus shelters for townships, campuses & smart cities.",
    description: "Our MS and SS bus shelters are engineered with hot-dip galvanized steel framing, tempered glass or polycarbonate wind barriers, and self-contained solar-powered lighting systems. Specified extensively for India's Smart City Mission projects, educational campuses, and large private townships.",
    features: [
      "Modular length expansion to fit high-traffic stops",
      "Toughened safety glass panels with decorative frit patterns",
      "Optional solar roof and integrated LED smart lighting",
      "Concealed chemical anchoring for high wind-loads"
    ]
  },
  {
    id: "wpc-benches",
    title: "WPC & Aluminium Benches",
    line: "Weather-resistant WPC and aluminium outdoor benches — India's most-specified park bench material.",
    category: "Benches",
    url: "/work",
    image: "/assets/urbanland/Bench_Planter.webp",
    gallery: ["/assets/urbanland/Bench_Planter.webp", "/assets/urbanland/gallery_real_estate.webp", "/assets/urbanland/Bench.webp"],
    badges: ["Best Seller"],
    tagline: "Weather-resistant and durable outdoor benches.",
    description: "Premium outdoor benches designed to redefine comfort in public parks, corporate offices, and private residential townships. Fabricated with corrosion-resistant metal side legs and sustainably sourced tropical hardwood or high-durability WPC composite slats."
  },
  {
    id: "outdoor-dustbins",
    title: "Outdoor Dustbins",
    line: "Stainless steel and composite dustbins for parks, roadsides, campuses, and smart city zones.",
    category: "Dustbin",
    url: "/work",
    image: "/assets/urbanland/Dustbins.webp",
    gallery: ["/assets/urbanland/Dustbins.webp", "/assets/urbanland/gallery_hospitals.webp", "/assets/urbanland/Dustbins.webp"],
    badges: ["Popular"],
    tagline: "Stainless steel and composite dustbins for smart city zones."
  },
  {
    id: "planters",
    title: "GFRC & Concrete Planters",
    line: "Lightweight GFRC and concrete planters — custom shapes, sizes & finishes for townships and hotels.",
    category: "Planter",
    url: "/work",
    image: "/assets/urbanland/Planters_Box.webp",
    gallery: ["/assets/urbanland/Planters_Box.webp", "/assets/urbanland/gallery_real_estate.webp", "/assets/urbanland/Planters_Box.webp"],
    badges: ["Popular"],
    tagline: "Lightweight GFRC and concrete planters."
  },
  {
    id: "canteen-furniture",
    title: "Canteen Tables & Benches",
    line: "Heavy-duty canteen sets built for schools, hospitals, factories & corporate campuses.",
    category: "Benches",
    url: "/work",
    image: "/assets/urbanland/Canteen_Tables.webp",
    gallery: ["/assets/urbanland/Canteen_Tables.webp", "/assets/urbanland/gallery_education.webp", "/assets/urbanland/Canteen_Tables.webp"],
    badges: ["Popular"],
    tagline: "Heavy-duty canteen sets built for schools, hospitals, factories & corporate campuses."
  },
  {
    id: "car-parking-sheds",
    title: "Car Parking Sheds",
    line: "Powder-coated steel car parking sheds — modular, durable, fast to install for residential projects.",
    category: "Car sheds",
    url: "/work",
    image: "/assets/urbanland/Car_Shelter.webp",
    gallery: ["/assets/urbanland/Car_Shelter.webp", "/assets/urbanland/gallery_smart_city.webp", "/assets/urbanland/Car_Shelter.webp"],
    badges: ["Featured"],
    tagline: "Powder-coated steel car parking sheds."
  },
  {
    id: "poolside-furniture",
    title: "Poolside Loungers & Cabanas",
    line: "Premium aluminium and wicker loungers for hotel pools, resort decks & residential amenities.",
    category: "Pool",
    url: "/work",
    image: "/assets/urbanland/Wicker_Furniture.webp",
    gallery: ["/assets/urbanland/Wicker_Furniture.webp", "/assets/urbanland/gallery_hotels.webp", "/assets/urbanland/welcome-2.webp"],
    badges: ["Popular"],
    tagline: "Premium poolside loungers and cabanas."
  },
  {
    id: "wicker-furniture",
    title: "Wicker Furniture",
    line: "Hand-woven synthetic wicker sets for luxury hospitality, outdoor dining & resort spaces.",
    category: "Wicker",
    url: "/work",
    image: "/assets/urbanland/Wicker_Furniture.webp",
    gallery: ["/assets/urbanland/Wicker_Furniture.webp", "/assets/urbanland/gallery_hotels.webp", "/assets/urbanland/Wicker_Furniture.webp"],
    badges: ["Popular"],
    tagline: "Luxury hand-woven wicker dining sets and lounge chairs."
  },
  {
    id: "pre-fab-homes",
    title: "Pre Fab Homes",
    line: "Modular residential structures",
    category: "Sheds",
    url: "/work",
    image: "/assets/urbanland/welcome-1.webp",
    gallery: ["/assets/urbanland/welcome-1.webp", "/assets/urbanland/gallery_education.webp", "/assets/urbanland/welcome-1.webp"],
    badges: ["New"],
    tagline: "Premium modular homes for quick deployment."
  },
  {
    id: "parabola",
    title: "Parabola",
    line: "Modern shading structures",
    category: "Sheds",
    url: "/work",
    image: "/assets/urbanland/Bench_Planter.webp",
    gallery: ["/assets/urbanland/Bench_Planter.webp", "/assets/urbanland/gallery_real_estate.webp", "/assets/urbanland/Bench_Planter.webp"],
    badges: ["New"],
    tagline: "Architectural parabolic shading for outdoor spaces."
  },
  {
    id: "gazebo",
    title: "Gazebo",
    line: "Elegant garden structures",
    category: "Sheds",
    url: "/work",
    image: "/assets/urbanland/Wicker_Furniture.webp",
    gallery: ["/assets/urbanland/Wicker_Furniture.webp", "/assets/urbanland/gallery_real_estate.webp", "/assets/urbanland/Wicker_Furniture.webp"],
    badges: ["New"],
    tagline: "Premium gazebos tailored for luxury outdoor relaxation."
  },
  {
    id: "cabanas",
    title: "Cabanas",
    line: "Poolside comfort",
    category: "Cabanas",
    url: "/work",
    image: "/assets/urbanland/Wicker_Furniture.webp",
    gallery: ["/assets/urbanland/Wicker_Furniture.webp", "/assets/urbanland/gallery_hotels.webp", "/assets/urbanland/welcome-1.webp"],
    badges: ["New"],
    tagline: "Resort-style cabanas for luxury private seating."
  }
];

const ProductsCatalog = ({ showTitle = true }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  // Filter products based on selected category or active design principle
  const filteredProducts = activeCategory === "all"
    ? staticProducts
    : staticProducts.filter(p => p.category === activeCategory);

  // Scroll functions
  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  };

  useGSAP(() => {
    if (showTitle) {
      // Reveal section title
      gsap.fromTo(
        ".catalog-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { toggleActions: "play reverse play reverse",
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Reveal category list
    gsap.fromTo(
      ".catalog-pills-row",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: showTitle ? 0.2 : 0,
        scrollTrigger: { toggleActions: "play reverse play reverse",
          trigger: containerRef.current,
          start: showTitle ? "top 80%" : "top 90%",
        }
      }
    );

    // Stagger reveal of cards
    gsap.fromTo(
      ".catalog-card",
      { scale: 0.95, opacity: 0, y: 50 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: showTitle ? 0.4 : 0.2,
        scrollTrigger: { toggleActions: "play reverse play reverse",
          trigger: containerRef.current,
          start: showTitle ? "top 70%" : "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  const Wrapper = showTitle ? "section" : "div";

  return (
    <Wrapper 
      ref={containerRef}
      className={`w-full overflow-hidden flex flex-col justify-start items-start gap-10 ${
        showTitle 
          ? "bg-transparent py-20 px-8 lg:px-16" 
          : "mt-4"
      }`}
    >
      {/* Title block */}
      {showTitle && (
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#2D2D2D]/10 pb-8 catalog-title">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] font-semibold text-[#2C5F2E] mb-2">Our Collection</p>
            <h2 className="text-4xl lg:text-6xl font-medium tracking-tight text-[#1A1A1A]">
              Urban furniture that connects.
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#2D2D2D]/80 max-w-sm">
            Discover modular designs built to blend natural aesthetics with sustainable, smart urban living.
          </p>
        </div>
      )}

      {/* FULL WIDTH CATEGORY EXPLORER LAYOUT */}
      <div className="w-full flex flex-col gap-8 catalog-pills-row">
        
        {/* Horizontal Navigation Grid */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#2D2D2D]/10">
          
          {/* Categories Pill list */}
          <div className="flex-1 overflow-x-auto scrollbar-none flex items-center gap-2.5 py-1 pr-4">
            
            {/* All Products Pill Button */}
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 ${
                activeCategory === "all"
                  ? "bg-[#2C5F2E] text-[#F7F4EF] shadow-sm border border-[#2C5F2E] scale-95"
                  : "bg-[#2D2D2D]/5 text-[#2D2D2D] border border-[#2D2D2D]/10 hover:bg-[#2D2D2D]/10"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>All products</span>
            </button>

            {/* Category pills */}
            {categories.filter(cat => cat.id !== "all").map((cat) => {
              const isActive = activeCategory === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isActive ? "all" : cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-[#2D2D2D] text-[#F7F4EF] border-[#2D2D2D] shadow-sm scale-95"
                      : "border-[#2D2D2D]/20 text-[#2D2D2D]/85 hover:bg-[#2D2D2D]/5"
                  }`}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
          
          {/* Slider Navigation Arrows on the right */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0 ml-auto md:ml-0">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full bg-[#EAE5DB] text-[#2D2D2D] hover:bg-[#EAE5DB]/80 flex justify-center items-center transition-all cursor-pointer shrink-0"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full bg-[#2C5F2E] text-[#F7F4EF] hover:bg-[#2C5F2E]/90 flex justify-center items-center shadow-md transition-all cursor-pointer shrink-0"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom row: Slider container */}
        <div className="w-full relative">
          
          {/* Left Arrow (Visible on Mobile) */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-[38%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#EAE5DB]/90 backdrop-blur-md text-[#2D2D2D] hover:bg-[#EAE5DB] flex justify-center items-center transition-all cursor-pointer shadow-md active:scale-95 md:hidden"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div 
            ref={sliderRef}
            className="w-full overflow-x-auto scrollbar-none flex gap-6 pb-6 snap-x snap-mandatory scroll-smooth"
          >
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={product.url || `/work`}
                className={`catalog-card bg-white rounded-[37.5px] p-4 md:p-8 flex flex-col justify-between items-stretch snap-start shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-black/[0.03] transition-all duration-500 group cursor-pointer no-underline block aspect-auto md:aspect-[4/5] ${
                  filteredProducts.length === 1 
                    ? 'w-[310px] sm:w-[350px] md:w-[450px] shrink-0' 
                    : 'min-w-[310px] sm:min-w-[380px] md:min-w-[450px]'
                }`}
              >
                {/* DESKTOP CARD LAYOUT */}
                <div className="hidden md:flex flex-col justify-between h-full w-full">
                  {/* Header info */}
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl md:text-2xl font-light text-[#1a1a1a] tracking-tight leading-tight group-hover:text-black transition-colors duration-300">
                      {product.title}
                    </h3>
                    
                    {/* Badges */}
                    <div className="flex gap-1.5 shrink-0 pt-1">
                      {product.badges?.map((badge, idx) => (
                        <span
                          key={idx}
                          className={`text-[0.65rem] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 ${
                            badge === "new" || badge === "New"
                              ? "bg-[#2C5F2E] text-white"
                              : "bg-[#C9A84C]/10 text-[#C9A84C]"
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
 
                  {/* Middle: Product rendering */}
                  <div className="flex-1 my-6 flex justify-center items-center overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={`${product.title} manufacturer India — Urbanland Products`}
                      className="max-h-[92%] max-w-[92%] object-contain select-none transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
 
                  {/* Bottom info */}
                  <div className="flex justify-between items-end gap-4">
                    <span className="hidden md:block text-sm font-medium text-[#1a1a1a] leading-relaxed max-w-[62%]">
                      {product.line}
                    </span>
                    <span className="text-[0.7rem] uppercase tracking-wider text-[#2C5F2E] font-semibold bg-[#2C5F2E]/5 px-4 py-2.5 rounded-full opacity-100 group-hover:bg-[#2C5F2E] group-hover:text-[#F7F4EF] transition-all duration-300 ml-auto md:ml-0 shrink-0 whitespace-nowrap">
                      View & Get Quote
                    </span>
                  </div>
                </div>

                {/* MOBILE CARD LAYOUT (Mockup-inspired Premium Aesthetics) */}
                <div className="flex md:hidden flex-col justify-start items-stretch w-full select-none">
                  {/* Top Section: Portrait 4:5 Image Frame Block with increased height and 37.5px border radius */}
                  <div 
                    className="relative w-full aspect-[4/5] bg-[#F7F5F2] rounded-[37.5px] overflow-hidden border border-black/[0.02] flex items-center justify-center p-4"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 2px 1px inset, rgba(0, 0, 0, 0.01) 0px 2px 8px 0px inset" }}
                  >
                    
                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={`${product.title} manufacturer India`}
                      className="max-h-[92%] max-w-[92%] object-contain select-none transform group-hover:scale-105 transition-transform duration-700 ease-out z-1"
                    />

                    {/* Left Side: Overlapping circular gallery previews - styled larger with overlapping margin */}
                    <div className="absolute bottom-4 left-4 flex -space-x-3.5 items-center z-10">
                      {product.gallery?.slice(0, 3).map((imgUrl, idx) => (
                        <div key={idx} className="relative w-10 h-10 rounded-[37px] border-2 border-white overflow-hidden bg-white shadow-md">
                          <img loading="lazy" src={imgUrl} className="w-full h-full object-cover" alt="gallery preview" style={{ borderRadius: '37px' }} />
                          <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#C9A84C] rounded-full flex items-center justify-center text-[0.5rem] text-white shadow-sm border border-white/50">
                            ★
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pagination Dots indicator */}
                  <div className="w-full flex justify-center items-center gap-1.5 mt-3 mb-1">
                    <div className="w-3.5 h-1 rounded-full bg-[#2C5F2E]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EAE5DB]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EAE5DB]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EAE5DB]" />
                  </div>

                  {/* Text Details Block */}
                  <div className="w-full flex flex-col items-center text-center mt-1">
                    <h3 className="text-base font-semibold text-[#1a1a1a] tracking-tight leading-tight group-hover:text-black transition-colors duration-300">
                      {product.title}
                    </h3>
                    <p className="text-[0.65rem] font-bold text-[#C9A84C] uppercase tracking-widest mt-1">
                      {product.category.replace("-", " ")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow (Visible on Mobile) */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-[38%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#2C5F2E]/90 backdrop-blur-md text-[#F7F4EF] hover:bg-[#2C5F2E] flex justify-center items-center shadow-lg transition-all cursor-pointer active:scale-95 md:hidden"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductsCatalog;
