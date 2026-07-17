"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FooterBanner from "@/components/urbanland/FooterBanner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const statsTrackRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero Entrance Animations
    // Character-by-character stagger reveal for "OUR STORY"
    const heroChars = gsap.utils.toArray<HTMLElement>(".hero-story-title .char");
    if (heroChars.length > 0) {
      gsap.fromTo(
        heroChars,
        { yPercent: 100, rotateX: 30, opacity: 0, filter: "blur(8px)" },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.04,
          delay: 0.2,
        }
      );
    }

    // Curtain reveal for widescreen hero image
    if (document.querySelector(".hero-curtain-image")) {
      gsap.fromTo(
        ".hero-curtain-image",
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.6,
          ease: "power4.inOut",
          delay: 0.4,
        }
      );
      
      // Hero image parallax
      gsap.fromTo(
        ".hero-curtain-image img",
        { scale: 1.25, yPercent: -10 },
        {
          scale: 1.0,
          yPercent: 10,
          ease: "none",
          scrollTrigger: { toggleActions: "play none none none",
            trigger: ".hero-curtain-image",
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }

    // 2. Philosophy Word-by-Word Reveal on Scroll
    const philosophyWords = gsap.utils.toArray<HTMLElement>(".philosophy-statement .word");
    if (philosophyWords.length > 0) {
      gsap.fromTo(
        philosophyWords,
        { opacity: 0.1, filter: "blur(2px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { toggleActions: "play none none none",
            trigger: philosophyRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }

    // 3. Founders Section Parallax & Scroll-Reveal
    const founders = gsap.utils.toArray<HTMLElement>(".founder-section-row");
    founders.forEach((row) => {
      const img = row.querySelector(".founder-img-wrap img");
      const text = row.querySelector(".founder-text-panel");
      
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -15, scale: 1.15 },
          {
            yPercent: 15,
            scale: 1.0,
            ease: "none",
            scrollTrigger: { toggleActions: "play none none none",
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }

      if (text) {
        gsap.fromTo(
          text,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: { toggleActions: "play none none none",
              trigger: row,
              start: "top 75%",
              once: true,
            }
          }
        );
      }
    });

    // 4. Stats Section Animation (Pinned Horizontal on Desktop, Vertical on Mobile)
    const statsTrack = statsTrackRef.current;
    const statsSection = statsSectionRef.current;
    if (statsTrack && statsSection) {
      const mm = gsap.matchMedia();

      // Desktop layout (> 900px)
      mm.add("(min-width: 901px)", () => {
        const getScrollAmount = () => {
          return -(statsTrack.scrollWidth - window.innerWidth);
        };

        const horizTween = gsap.to(statsTrack, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            toggleActions: "play none none none",
            trigger: statsSection,
            start: "top top",
            end: () => `+=${statsTrack.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        // Animate stat counters for desktop (using containerAnimation)
        const statsNum = gsap.utils.toArray<HTMLElement>(".stat-huge-number");
        statsNum.forEach((stat) => {
          const target = parseFloat(stat.getAttribute("data-target") || "0");
          const suffix = stat.getAttribute("data-suffix") || "";
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2.0,
            ease: "power3.out",
            scrollTrigger: {
              toggleActions: "play none none none",
              trigger: stat,
              start: "left 85%",
              containerAnimation: horizTween,
              once: true,
            },
            onUpdate: () => {
              stat.innerText = Math.floor(obj.val).toLocaleString() + suffix;
            }
          });
        });
      });

      // Mobile layout (<= 900px)
      mm.add("(max-width: 900px)", () => {
        // Animate stat counters for mobile
        const statsNum = gsap.utils.toArray<HTMLElement>(".stat-huge-number");
        statsNum.forEach((stat) => {
          const target = parseFloat(stat.getAttribute("data-target") || "0");
          const suffix = stat.getAttribute("data-suffix") || "";
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2.0,
            ease: "power3.out",
            scrollTrigger: {
              toggleActions: "play none none none",
              trigger: stat,
              start: "top 85%",
              once: true,
            },
            onUpdate: () => {
              stat.innerText = Math.floor(obj.val).toLocaleString() + suffix;
            }
          });
        });
      });
    }

    // 5. Timeline Vertical Progress & Alternating Reveal
    if (document.querySelector(".timeline-progress-line")) {
      gsap.fromTo(
        ".timeline-progress-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: { toggleActions: "play none none none",
            trigger: ".timeline-container",
            start: "top 65%",
            end: "bottom 80%",
            scrub: true,
          }
        }
      );
    }

    const timelineItems = gsap.utils.toArray<HTMLElement>(".timeline-item");
    timelineItems.forEach((item, index) => {
      const direction = index % 2 === 0 ? -60 : 60;
      const content = item.querySelector(".timeline-content");
      const dot = item.querySelector(".timeline-dot");

      if (content) {
        gsap.fromTo(
          content,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: { toggleActions: "play none none none",
              trigger: item,
              start: "top 80%",
              once: true,
            }
          }
        );
      }

      if (dot) {
        gsap.fromTo(
          dot,
          { scale: 0, backgroundColor: "rgba(255,255,255,0.1)" },
          {
            scale: 1,
            backgroundColor: "#C9A84C",
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: { toggleActions: "play none none none",
              trigger: item,
              start: "top 80%",
              once: true,
            }
          }
        );
      }
    });

    // 6. Accolades Pinned/Stacking Card scale effect
    const accoladeCards = gsap.utils.toArray<HTMLElement>(".accolade-stack-card");
    accoladeCards.forEach((card, i) => {
      if (i === accoladeCards.length - 1) return;
      gsap.to(card, {
        scale: 0.92,
        opacity: 0.6,
        scrollTrigger: { toggleActions: "play none none none",
          trigger: accoladeCards[i + 1],
          start: "top 85%",
          end: "top 15%",
          scrub: true,
        }
      });
    });
  }, { scope: containerRef });

  const handleNavMouseEnter = (e: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    const indicator = navIndicatorRef.current;
    if (!link || !indicator) return;

    const linkRect = link.getBoundingClientRect();
    const menuRect = link.parentElement?.getBoundingClientRect();

    if (menuRect) {
      const offsetLeft = linkRect.left - menuRect.left;
      const width = linkRect.width;

      indicator.style.width = `${width}px`;
      indicator.style.transform = `translateX(${offsetLeft}px)`;
      indicator.style.opacity = "1";
    }
  };

  const handleNavMouseLeave = () => {
    const indicator = navIndicatorRef.current;
    if (indicator) {
      indicator.style.opacity = "0";
    }
  };

  const milestones = [
    { year: "1993", title: "The Beginning", desc: "Decorlab began in 1993 with no capital, no office, and no team — just Raja Sinha, fresh off an interior designing course and seven years of on-ground experience, taking on small bedroom makeovers and home renovations from his own bedroom." },
    { year: "1996", title: "First Office", desc: "Two and a half years on, that one-man pursuit found its first home: a small rented office in Ultadanga, still standing today, where the first designer and supervisor were brought on board. A second office followed on Raja Dinendra St." },
    { year: "New Era", title: "Architecture Vertical", desc: "The next turning point arrived with Rajdip Sinha, who joined the firm and opened an entirely new vertical — architecture, built around parametric and fluid design. It gave Decorlab a language of its own." },
    { year: "Today", title: "Growing Forward", desc: "Today, a team of 15 to 17 carries that vision forward, growing every day — with sights now set firmly on international expansion." },
    { year: "Vision", title: "Reshaping Architecture", desc: "From a single bedroom to a movement reshaping Indian architecture — Decorlab has always grown by building, not by waiting." },
  ];

  const accolades = [
    { award: "India Design Awards 2024", winner: "Winner: Best Commercial Project (Corporate HQ)" },
    { award: "Commercial Design Awards 2024", winner: "Winner: Best Unbuilt Project of the Year" },
    { award: "ICA Creative Minds 2024", winner: "Winner: Interior Design (Ongoing Category) & Finalist (Best Conceptual Design)" },
    { award: "D/Code Mumbai IKON Awards", winner: "Winner: Emerging Interior Designer (Ar. Rajdip Sinha)" },
  ];

  const pressFeatures = [
    { source: "Forbes India", detail: "Top 20 Architects and Designers shaping India's spatial landscape." },
    { source: "Elle Decor Magazine", detail: "Double editorial feature for warm minimalist residence design studies." },
    { source: "Good Homes Magazine", detail: "Ranked among India's Top 15 Premium Designers for scale and volume curations." },
    { source: "Trends Magazine 2025", detail: "Exclusive brand curation segment detailing biomimetic design concepts." },
  ];

  return (
    <div ref={containerRef} className="noise-overlay" style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      {/* Floating navigation header */}
      <header className="nav-header scrolled" id="main-header" style={{ opacity: 1, pointerEvents: "auto" }}>
        <a
          className="nav-logo glass glass-interactive"
          id="nav-logo"
          href="/"
          style={{ width: "auto", padding: "0 16px", borderRadius: "9999px", textDecoration: "none" }}
        >
          <img src="/assets/Decorlab final-04.webp" alt="Decor Lab Logo" className="nav-logo-img" />
        </a>

        <nav className="nav-menu glass" role="navigation" aria-label="Main Navigation" onMouseLeave={handleNavMouseLeave}>
          <div ref={navIndicatorRef} className="nav-indicator" id="nav-indicator"></div>
          <a href="/work" className="nav-link" id="link-work" onMouseEnter={handleNavMouseEnter} onFocus={handleNavMouseEnter}>
            Work
          </a>
          <a href="/work-v2" className="nav-link" id="link-work-v2" onMouseEnter={handleNavMouseEnter} onFocus={handleNavMouseEnter}>
            Work v2
          </a>
          <a href="/about" className="nav-link active" id="link-about" onMouseEnter={handleNavMouseEnter} onFocus={handleNavMouseEnter}>
            About
          </a>
          <a href="/awards" className="nav-link" id="link-awards" onMouseEnter={handleNavMouseEnter} onFocus={handleNavMouseEnter}>
            Awards
          </a>
          <a href="/contact" className="nav-link" id="link-contact" onMouseEnter={handleNavMouseEnter} onFocus={handleNavMouseEnter}>
            Contact
          </a>
        </nav>
      </header>

      {/* Main Container */}
      <main style={{ paddingTop: "8rem" }}>
        
        {/* ====================================================
         * SECTION 1: HERO VIEW (Cinematic Split Title & Curtain)
         * ==================================================== */}
        <section style={{ minHeight: "80vh", padding: "4rem 2.5rem 6rem", display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }} className="lg:grid-cols-2">
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.35rem" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A84C" }}>ABOUT THE STUDIO</span>
              
              <h1 className="hero-story-title" style={{ fontSize: "6.5vw", fontFamily: "var(--font-display)", fontWeight: 800, lineHeight: 1.25, paddingBottom: "0.15em", textTransform: "uppercase", margin: 0, overflow: "visible", whiteSpace: "nowrap" }}>
                {"OUR STORY".split("").map((char, index) => (
                  <span key={index} className="char-reveal char" style={{ display: "inline-block" }}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>

              <p style={{ fontSize: "1.35rem", color: "rgba(255, 255, 255, 0.75)", maxWidth: "580px", lineHeight: 1.6, margin: 0, marginTop: "1.25rem", fontFamily: "var(--font-body)" }}>
                Decor Lab is a premier architecture and interior design powerhouse established in 1993. Blending heritage with cutting-edge digital fabrication across India.
              </p>
            </div>
            
            <div className="hero-curtain-image" style={{ width: "100%", height: "65vh", overflow: "hidden", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
              <img loading="lazy" 
                src="/assets/about/team-meeting.jpg" 
                alt="Our Team at Decor Lab"
                style={{ width: "100%", height: "120%", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 2: EDITORIAL PHILOSOPHY (Word-by-word Reveal)
         * ==================================================== */}
        <section ref={philosophyRef} style={{ padding: "12rem 2.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", background: "#060605" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <span style={{ fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A84C", display: "block", marginBottom: "3rem" }}>PHILOSOPHY</span>
            
            <p className="philosophy-statement" style={{ fontSize: "3.6vw", fontFamily: "var(--font-serif)", fontWeight: 400, lineHeight: 1.35, color: "#fff", margin: 0 }}>
              {"We believe that a space is not just a layout of concrete and timber, but a living sanctuary that shapes your mind and soul. At Decor Lab, we merge three decades of design heritage with computational modeling to craft fluid, functional architecture you can fully experience.".split(" ").map((word, index) => (
                <span key={index} className="word" style={{ display: "inline-block", marginRight: "0.28em" }}>
                  {word}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* ====================================================
         * SECTION 3: VISIONARY LEADERSHIP & FOUNDERS (Redesigned)
         * ==================================================== */}
        <section id="leadership" className="leadership-section" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "0", overflow: "hidden" }}>
          
          {/* Section Header */}
          <div style={{ padding: "8rem 2.5rem 4rem", maxWidth: "1400px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
              <div>
                <span style={{ fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.3em", color: "#C9A84C", display: "block", marginBottom: "1.5rem" }}>LEADERSHIP</span>
                <h2 style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", margin: 0, lineHeight: 1 }}>The Visionaries</h2>
              </div>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)", maxWidth: "320px", lineHeight: 1.6, fontFamily: "var(--font-body)", margin: 0 }}>
                Three decades of design excellence, shaped by two generations of creative leadership.
              </p>
            </div>
            <div style={{ width: "100%", height: "1px", background: "linear-gradient(to right, #C9A84C, transparent)", marginTop: "3rem" }} />
          </div>

          {/* Founder 1: Raja Sinha — Split Layout */}
          <div className="founder-card-1 founder-section-row" style={{ display: "flex", flexWrap: "wrap", gap: "4rem", alignItems: "center", padding: "0 2.5rem", maxWidth: "1400px", margin: "0 auto 8rem auto" }}>
            {/* Portrait Image */}
            <div className="founder-img-wrap" style={{ flex: "1 1 400px", maxWidth: "500px", position: "relative", aspectRatio: "1/1", borderRadius: "12px", overflow: "hidden" }}>
              <img loading="lazy"
                src="/assets/founders/raja-sinha.jpeg"
                alt="Raja Sinha — Founder"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </div>

            {/* Text content */}
            <div className="founder-text-panel" style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "40px", height: "2px", background: "#C9A84C" }} />
                <span style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.25em", color: "#C9A84C", textTransform: "uppercase" }}>FOUNDER · EST. 1993</span>
              </div>
              
              <h3 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontFamily: "var(--font-serif)", fontWeight: 300, margin: 0, lineHeight: 1.1, letterSpacing: "-1px" }}>
                Raja Sinha
              </h3>
              
              <p style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", margin: 0, maxWidth: "520px" }}>
                Decorlab began in 1993 with no capital, no office, and no team — just Raja Sinha, fresh off an interior designing course and seven years of on-ground experience, taking on small bedroom makeovers and home renovations from his own bedroom. Two and a half years on, that one-man pursuit found its first home: a small rented office in Ultadanga, still standing today.
              </p>

              {/* Stats row */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", marginTop: "1rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <div>
                  <div style={{ fontSize: "2rem", fontFamily: "var(--font-serif)", color: "#C9A84C", lineHeight: 1 }}>32+</div>
                  <div style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.4rem" }}>Years of Legacy</div>
                </div>
                <div>
                  <div style={{ fontSize: "2rem", fontFamily: "var(--font-serif)", color: "#C9A84C", lineHeight: 1 }}>500+</div>
                  <div style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.4rem" }}>Projects Delivered</div>
                </div>
                <div>
                  <div style={{ fontSize: "2rem", fontFamily: "var(--font-serif)", color: "#C9A84C", lineHeight: 1 }}>15</div>
                  <div style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.4rem" }}>Cities Across India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Founder 2: Ar. Rajdip Sinha — Split Layout (Reversed) */}
          <div className="founder-card-2 founder-section-row" style={{ display: "flex", flexWrap: "wrap", flexDirection: "row-reverse", gap: "4rem", alignItems: "center", padding: "0 2.5rem", maxWidth: "1400px", margin: "0 auto 8rem auto" }}>
            {/* Portrait Image */}
            <div className="founder-img-wrap" style={{ flex: "1 1 400px", maxWidth: "500px", position: "relative", aspectRatio: "1/1", borderRadius: "12px", overflow: "hidden" }}>
              <img loading="lazy"
                src="/assets/founders/rajdip-sinha.jpg"
                alt="Ar. Rajdip Sinha — Chief Architect"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </div>

            {/* Text content */}
            <div className="founder-text-panel" style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "40px", height: "2px", background: "#C9A84C" }} />
                <span style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.25em", color: "#C9A84C", textTransform: "uppercase" }}>CO-FOUNDER · CHIEF ARCHITECT</span>
              </div>
              
              <h3 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontFamily: "var(--font-serif)", fontWeight: 300, margin: 0, lineHeight: 1.1, letterSpacing: "-1px" }}>
                Ar. Rajdip Sinha
              </h3>

              <blockquote style={{ borderLeft: "3px solid #C9A84C", paddingLeft: "1.5rem", fontStyle: "italic", color: "rgba(201, 168, 76, 0.85)", fontSize: "clamp(1rem, 1.3vw, 1.2rem)", fontFamily: "var(--font-serif)", margin: "0.5rem 0", lineHeight: 1.6 }}>
                {"\u201C"}There are 360 degrees, so why stick to one?{"\u201D"}
                <span style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginTop: "0.5rem", fontStyle: "normal", fontFamily: "monospace" }}>— Zaha Hadid</span>
              </blockquote>

              <p style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", margin: 0, maxWidth: "520px" }}>
                The next turning point arrived with Rajdip Sinha, who joined the firm and opened an entirely new vertical — architecture, built around parametric and fluid design. It gave Decorlab a language of its own, distinct from the conventional.
              </p>

              {/* Credentials */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginTop: "1rem" }}>
                {["UCL Bartlett", "MArch", "PhD Candidate", "Parametric Design"].map((tag) => (
                  <span key={tag} style={{ fontSize: "0.7rem", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.15em", padding: "0.5rem 1rem", border: "1px solid rgba(201, 168, 76, 0.3)", borderRadius: "999px", color: "rgba(201, 168, 76, 0.8)", background: "rgba(201, 168, 76, 0.06)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* ====================================================
         * SECTION 4: PINNED HORIZONTAL STATS
         * ==================================================== */}
        <section ref={statsSectionRef} style={{ backgroundColor: "#0b0b0a", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div ref={statsTrackRef} className="stats-horizontal-track" style={{ display: "flex", width: "max-content", height: "100vh", alignItems: "center", paddingLeft: "10vw", paddingRight: "20vw" }}>
            
            {/* Intro Stats Slide */}
            <div style={{ width: "45vw", flexShrink: 0, paddingRight: "8vw", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase", color: "#C9A84C", letterSpacing: "0.2em" }}>METRICS OF EXCELLENCE</span>
              <h2 style={{ fontSize: "4rem", fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", margin: 0, lineHeight: 1.1 }}>Decor Lab In Numbers</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.2rem", lineHeight: 1.6 }}>Scroll horizontally to view our trajectory of nationwide impact.</p>
            </div>

            {/* Stat Slide 1 */}
            <div style={{ width: "35vw", flexShrink: 0, borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "4vw", paddingRight: "4vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>EXPERIENCE</span>
              <div className="stat-huge-number" data-target="32" data-suffix="+" style={{ fontSize: "11vw", fontFamily: "var(--font-serif)", color: "#C9A84C", lineHeight: 1, margin: "1rem 0" }}>0+</div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", lineHeight: 1.5 }}>Years of continuous architecture, engineering, and spatial design innovation.</p>
            </div>

            {/* Stat Slide 2 */}
            <div style={{ width: "35vw", flexShrink: 0, borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "4vw", paddingRight: "4vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>PORTFOLIO</span>
              <div className="stat-huge-number" data-target="1300" data-suffix="+" style={{ fontSize: "11vw", fontFamily: "var(--font-serif)", color: "#C9A84C", lineHeight: 1, margin: "1rem 0" }}>0+</div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", lineHeight: 1.5 }}>Sites designed and executed across industrial, corporate, and luxury residential sectors.</p>
            </div>

            {/* Stat Slide 3 */}
            <div style={{ width: "35vw", flexShrink: 0, borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "4vw", paddingRight: "4vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>CREATIVE ENERGY</span>
              <div className="stat-huge-number" data-target="275" data-suffix="+" style={{ fontSize: "11vw", fontFamily: "var(--font-serif)", color: "#C9A84C", lineHeight: 1, margin: "1rem 0" }}>0+</div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", lineHeight: 1.5 }}>In-house architects, civil engineers, interior planners, and craft specialists.</p>
            </div>

          </div>
        </section>

        {/* ====================================================
         * SECTION 5: MILESTONE TIMELINE
         * ==================================================== */}
        <section style={{ padding: "10rem 2.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", background: "#000" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "8rem" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A84C" }}>TIMELINE</span>
              <h2 style={{ fontSize: "4.5rem", fontFamily: "var(--font-display)", fontWeight: 700, marginTop: "1rem", textTransform: "uppercase" }}>Studio Milestones</h2>
            </div>

            <div className="timeline-container" style={{ position: "relative", padding: "2rem 0" }}>
              {/* Vertical line drawing effect */}
              <div className="timeline-progress-line" style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px", backgroundColor: "rgba(255,255,255,0.08)", transform: "translateX(-50%)", transformOrigin: "top" }} />
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8rem" }}>
                {milestones.map((m, idx) => (
                  <div key={idx} className="timeline-item" style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", position: "relative" }}>
                    
                    {/* Left Block */}
                    <div className="timeline-content" style={{ textAlign: idx % 2 === 0 ? "right" : "left", gridColumn: idx % 2 === 0 ? "1" : "3", opacity: 0 }}>
                      <span style={{ fontSize: "2.8rem", fontFamily: "var(--font-serif)", color: "#C9A84C", fontWeight: 400, display: "block", marginBottom: "0.5rem" }}>{m.year}</span>
                      <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#fff", marginBottom: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.title}</h3>
                      <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: "480px", marginLeft: idx % 2 === 0 ? "auto" : "0", marginRight: idx % 2 === 0 ? "0" : "auto" }}>
                        {m.desc}
                      </p>
                    </div>

                    {/* Central Node */}
                    <div style={{ gridColumn: "2", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <div className="timeline-dot" style={{ width: "16px", height: "16px", borderRadius: "50%", border: "4px solid #000", zIndex: 2, scale: 0 }} />
                    </div>

                    {/* Empty block for layout alignment */}
                    <div style={{ gridColumn: idx % 2 === 0 ? "3" : "1" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 6: ACCOLADES STACKING CARDS
         * ==================================================== */}
        <section id="accolades" style={{ padding: "10rem 2.5rem 12rem", borderTop: "1px solid rgba(255,255,255,0.08)", background: "#060605" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "6rem" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A84C" }}>ACCOLADES</span>
              <h2 style={{ fontSize: "4.5rem", fontFamily: "var(--font-display)", fontWeight: 700, marginTop: "1rem", textTransform: "uppercase" }}>Industry Accolades</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "6rem" }} className="lg:grid-cols-2">
              
              {/* Left Column: Awards Stacking Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
                {accolades.map((acc, i) => (
                  <div 
                    key={i} 
                    className="accolade-stack-card stacking-card glow-hover" 
                    style={{ 
                      backgroundColor: "rgba(20,20,18,0.95)", 
                      border: "1px solid rgba(255,255,255,0.06)", 
                      borderRadius: "20px", 
                      padding: "3.5rem 2.5rem",
                      zIndex: i + 1,
                      backdropFilter: "blur(20px)"
                    }}
                  >
                    <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#C9A84C", textTransform: "uppercase" }}>HONOUR</span>
                    <h3 style={{ fontSize: "2rem", fontFamily: "var(--font-serif)", margin: "1rem 0 0.5rem 0", color: "#fff" }}>{acc.award}</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", marginTop: "0.5rem" }}>{acc.winner}</p>
                  </div>
                ))}
              </div>

              {/* Right Column: Press Curation */}
              <div style={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
                {pressFeatures.map((press, i) => (
                  <div 
                    key={i} 
                    className="accolade-stack-card stacking-card glow-hover" 
                    style={{ 
                      backgroundColor: "rgba(12,12,14,0.95)", 
                      border: "1px solid rgba(255,255,255,0.06)", 
                      borderRadius: "20px", 
                      padding: "3.5rem 2.5rem",
                      zIndex: i + 1,
                      backdropFilter: "blur(20px)"
                    }}
                  >
                    <span style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>FEATURED PRESS</span>
                    <h3 style={{ fontSize: "2rem", fontFamily: "var(--font-serif)", margin: "1rem 0 0.5rem 0", color: "#fff" }}>{press.source}</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", marginTop: "0.5rem" }}>{press.detail}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Premium consultation banner */}
        <FooterBanner isPreloaded={true} />

      </main>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .lg\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .lg\\:direction-rtl {
            direction: rtl !important;
          }
          .lg\\:direction-rtl > * {
            direction: ltr !important;
          }
        }
        @media (max-width: 900px) {
          .stats-horizontal-track {
            flex-direction: column !important;
            height: auto !important;
            width: 100% !important;
            padding: 4rem 1.5rem !important;
            gap: 3rem;
          }
          .stats-horizontal-track > div {
            width: 100% !important;
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.1) !important;
            padding: 2rem 0 0 0 !important;
          }
          .timeline-item {
            grid-template-columns: 1fr !important;
            gap: 1.5rem;
            text-align: left !important;
          }
          .timeline-content {
            grid-column: 1 !important;
            text-align: left !important;
          }
          .timeline-dot {
            display: none !important;
          }
          .timeline-progress-line {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .founder-card-1,
          .founder-card-2 {
            min-height: 70vh !important;
          }
          .founder-card-2 .founder-text-panel {
            margin-left: 0 !important;
          }
        }
        @media (max-width: 600px) {
          .stats-horizontal-track {
            padding: 3rem 1rem !important;
            gap: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
