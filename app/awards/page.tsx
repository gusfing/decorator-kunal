"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FooterBanner from "@/components/urbanland/FooterBanner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Awards() {
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero Title Character-stagger entrance
    const titleChars = gsap.utils.toArray<HTMLElement>(".awards-hero-title .char");
    if (titleChars.length > 0) {
      gsap.fromTo(
        titleChars,
        { yPercent: 100, rotateX: 30, opacity: 0, filter: "blur(8px)" },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.035,
          delay: 0.2,
        }
      );
    }

    if (document.querySelector(".awards-hero-line")) {
      gsap.fromTo(
        ".awards-hero-line",
        { width: "0%" },
        { width: "100%", duration: 1.5, ease: "power3.inOut", delay: 0.4 }
      );
    }

    // 2. Timeline vertical progress line drawing
    if (document.querySelector(".awards-vertical-progress-line")) {
      gsap.fromTo(
        ".awards-vertical-progress-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: { toggleActions: "play none none none",
            trigger: ".awards-timeline-container",
            start: "top 60%",
            end: "bottom 75%",
            scrub: true,
          }
        }
      );
    }

    // 3. Staggered Alternating Slide-In for Awards
    const awardItems = gsap.utils.toArray<HTMLElement>(".award-timeline-row");
    awardItems.forEach((item, index) => {
      const direction = index % 2 === 0 ? -60 : 60;
      const card = item.querySelector(".award-timeline-card");
      const dot = item.querySelector(".award-timeline-dot");

      if (card) {
        gsap.fromTo(
          card,
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

    // 4. Press cards entrance with parallax backgrounds
    const pressCards = gsap.utils.toArray<HTMLElement>(".press-grid-card");
    pressCards.forEach((card) => {
      const bg = card.querySelector(".press-card-bg");
      
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: { toggleActions: "play none none none",
            trigger: card,
            start: "top 85%",
            once: true,
          }
        }
      );

      if (bg) {
        gsap.fromTo(
          bg,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: { toggleActions: "play none none none",
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }
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

  const awardsList = [
    {
      year: "2024",
      title: "India Design Awards",
      desc: "Best Commercial Project (Winner) — Recognized for pioneering sustainable materials and fluid spatial architecture at Corporate HQ.",
      highlight: true,
      img: "/assets/projects/site_01/image_1.webp",
      url: "https://www.business-standard.com/content/press-releases-ani/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-2023-123042400875_1.html"
    },
    {
      year: "2024",
      title: "Commercial Design Awards",
      desc: "Best Unbuilt Project of the Year (Winner) — Awarded for the Fluid Design Pavilion blueprint exploring organic parametrism.",
      highlight: false,
      img: "/assets/projects/site_02/image_1.webp",
      url: "https://www.zee5.com/articles/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-2023"
    },
    {
      year: "2024",
      title: "ICA Creative Minds",
      desc: "Winner & Finalist (Best Conceptual Design) — Honoring spatial excellence and material layout innovations.",
      highlight: false,
      img: "/assets/projects/site_02/image_2.webp",
      url: "https://www.architectureplusdesign.in/ad-exclusives/youngicons2023-co-founder-of-decor-lab-rajdip-sinhas-design-philosophy-is-a-manifesto-against-the-constraints-of-rigid-geometric-structures/"
    },
    {
      year: "2024",
      title: "D/Code Mumbai",
      desc: "Design IKON India Awards: Emerging Interior Designer — Ar. Rajdip Sinha recognized for fluid architecture contributions.",
      highlight: false,
      img: "/assets/projects/photos_set2/image_1.webp",
      url: "https://www.goodhomes.co.in/home-and-design-trends/dcode/dcode-presents-design-ikon-rajdip-sinha-decor-lab-9205.html"
    },
    {
      year: "2024",
      title: "National Excellence Awards",
      desc: "Prominent & Trusted Firm of the Year & Promising & Futuristic Designer of the Year.",
      highlight: false,
      img: "/assets/projects/santhalia_site/image_2.webp",
      url: "https://images.forbesindia.com/media/supplement_pdf/Top%2020%20Architecturres%20&%20Interior.pdf"
    },
    {
      year: "2023",
      title: "Häfele Star Awards",
      desc: "Winner — Awarded for exceptional integration of modern fittings and structural utility in luxury residences.",
      highlight: false,
      img: "/assets/projects/photos_set1/image_2.webp",
      url: "https://brandzmagazine.com/rs-architects-the-journey-of-sampada-and-rahul-gethe/"
    },
    {
      year: "2023",
      title: "India Design Awards",
      desc: "Winner (by Blind Wink) — Celebrating excellence in residential interior curation and bespoke art integration.",
      highlight: false,
      img: "/assets/projects/santhalia_site/image_1.webp",
      url: "https://www.aninews.in/news/business/business/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-202320230424183435/"
    }
  ];

  const pressList = [
    {
      media: "Forbes India",
      tagline: "Top 20 Designers in India",
      excerpt: "Raja Sinha and Ar. Rajdip Sinha named among India's top design pioneers shaping the country's modern architectural footprint.",
      bgImage: "/assets/projects/santhalia_site/image_4.webp",
      url: "https://images.forbesindia.com/media/supplement_pdf/Top%2020%20Architecturres%20&%20Interior.pdf"
    },
    {
      media: "Architecture+Design",
      tagline: "YoungIcons 2023",
      excerpt: "Rajdip Sinha's design philosophy is a manifesto against the constraints of rigid geometric structures.",
      bgImage: "/assets/projects/site_01/image_4.webp",
      url: "https://www.architectureplusdesign.in/ad-exclusives/youngicons2023-co-founder-of-decor-lab-rajdip-sinhas-design-philosophy-is-a-manifesto-against-the-constraints-of-rigid-geometric-structures/"
    },
    {
      media: "Brandz Magazine",
      tagline: "Architecture Features",
      excerpt: "A deep dive into the journey and architectural excellence shaping the modern industry.",
      bgImage: "/assets/projects/photos_set1/image_5.webp",
      url: "https://brandzmagazine.com/rs-architects-the-journey-of-sampada-and-rahul-gethe/"
    },
    {
      media: "Decor Lab Story",
      tagline: "Video Feature",
      excerpt: "An inside look into the design process, computational models, and fluid architecture.",
      bgImage: "/assets/projects/site_02/image_4.webp",
      url: "https://youtu.be/eWxS0YkIWCE?si=HEH4AcBTEPb1XmAR"
    },
    {
      media: "Business Standard",
      tagline: "India Design Awards 2023",
      excerpt: "Blindwink unveils the awardees of the 5th edition of India Design Awards 2023, featuring Decor Lab.",
      bgImage: "/assets/projects/santhalia_site/image_3.webp",
      url: "https://www.business-standard.com/content/press-releases-ani/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-2023-123042400875_1.html"
    },
    {
      media: "Zee5",
      tagline: "Industry Recognition",
      excerpt: "Celebrating the pioneers of interior curation at the 5th edition of India Design Awards.",
      bgImage: "/assets/projects/santhalia_site/image_2.webp",
      url: "https://www.zee5.com/articles/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-2023"
    }
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
          <a href="/about" className="nav-link" id="link-about" onMouseEnter={handleNavMouseEnter} onFocus={handleNavMouseEnter}>
            About
          </a>
          <a href="/awards" className="nav-link active" id="link-awards" onMouseEnter={handleNavMouseEnter} onFocus={handleNavMouseEnter}>
            Awards
          </a>
          <a href="/contact" className="nav-link" id="link-contact" onMouseEnter={handleNavMouseEnter} onFocus={handleNavMouseEnter}>
            Contact
          </a>
        </nav>
      </header>

      {/* Main Container */}
      <main className="pt-24 md:pt-32">
        
        {/* ====================================================
         * SECTION 1: HERO VIEW (Magazine Typography)
         * ==================================================== */}
        <section className="px-6 pb-16 pt-16 md:px-10 md:pb-24 md:pt-16" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <span style={{ fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A84C" }}>ACCOLADES & RECOGNITION</span>
            
            <h1 className="awards-hero-title" style={{ fontSize: "7.5vw", fontFamily: "var(--font-display)", fontWeight: 800, lineHeight: 1.25, paddingBottom: "0.15em", textTransform: "uppercase", margin: 0, overflow: "visible", whiteSpace: "nowrap" }}>
              {"RECOGNITION".split("").map((char, index) => (
                <span key={index} className="char-reveal char" style={{ display: "inline-block" }}>
                  {char}
                </span>
              ))}
            </h1>

            <div className="awards-hero-line" style={{ width: "0%", height: "1px", backgroundColor: "rgba(255,255,255,0.15)", marginTop: "0.75rem" }}></div>

            <p style={{ fontSize: "1.35rem", color: "rgba(255, 255, 255, 0.7)", maxWidth: "800px", lineHeight: 1.6, margin: 0, marginTop: "1rem", fontFamily: "var(--font-body)" }}>
              Over the past three decades, Decor Lab has consistently pushed boundaries in spatial and interior design. Our dedication to functional beauty and material honesty has earned us recognition from major architecture bodies and national press.
            </p>
          </div>
        </section>

        {/* ====================================================
         * SECTION 2: TIMELINE VIEW (Ink progress drawing)
         * ==================================================== */}
        <section className="py-16 px-6 md:py-32 md:px-10" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "#060605" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "6rem" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A84C" }}>TIMELINE</span>
              <h2 style={{ fontSize: "3.5rem", fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "1rem", textTransform: "uppercase" }}>Selected Industry Awards</h2>
            </div>

            <div className="awards-timeline-container" style={{ position: "relative", padding: "2rem 0" }}>
              {/* Central vertical progress line */}
              <div className="awards-vertical-progress-line" style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px", backgroundColor: "rgba(255,255,255,0.08)", transform: "translateX(-50%)", transformOrigin: "top" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
                {awardsList.map((award, idx) => (
                  <div key={idx} className="award-timeline-row" style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", position: "relative" }}>
                    
                    {/* Alternate card column layout */}
                    <div className="award-timeline-card" style={{ gridColumn: idx % 2 === 0 ? "1" : "3", opacity: 0 }}>
                      {award.url ? (
                        <a 
                          href={award.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glow-hover"
                          data-cursor="view"
                          style={{
                            backgroundColor: "rgba(20,20,18,0.95)",
                            border: "1px solid rgba(255,255,255,0.05)",
                            borderRadius: "20px",
                            padding: "2.5rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            position: "relative",
                            overflow: "hidden",
                            transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                            textDecoration: "none"
                          }}
                        >
                          {/* Widescreen image thumbnail hidden by default, slides out on hover */}
                          <div className="award-hover-img-wrap" style={{ width: "100%", height: "0px", opacity: 0, borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)" }}>
                            <img loading="lazy" src={award.img} alt={award.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                          </div>

                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                            <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#C9A84C", fontWeight: 600 }}>{award.year}</span>
                            <span style={{ fontSize: "9px", fontFamily: "monospace", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>Industry Honour</span>
                          </div>
                          
                          <h3 style={{ fontSize: "1.8rem", fontFamily: "var(--font-serif)", fontWeight: 400, color: "#fff", margin: 0 }}>{award.title}</h3>
                          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>{award.desc}</p>
                          <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#C9A84C", textTransform: "uppercase", letterSpacing: "0.2em", marginTop: "1rem" }}>View Feature →</span>
                        </a>
                      ) : (
                        <div 
                          className="glow-hover"
                          data-cursor="view"
                        style={{
                          backgroundColor: "rgba(20,20,18,0.95)",
                          border: "1px solid rgba(255,255,255,0.05)",
                          borderRadius: "20px",
                          padding: "2.5rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
                        }}
                      >
                        {/* Widescreen image thumbnail hidden by default, slides out on hover */}
                        <div className="award-hover-img-wrap" style={{ width: "100%", height: "0px", opacity: 0, borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)" }}>
                          <img loading="lazy" src={award.img} alt={award.title} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                        </div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                          <span style={{ fontSize: "12px", fontFamily: "monospace", color: "#C9A84C", fontWeight: 600 }}>{award.year}</span>
                          <span style={{ fontSize: "9px", fontFamily: "monospace", color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>Industry Honour</span>
                        </div>
                        
                        <h3 style={{ fontSize: "1.8rem", fontFamily: "var(--font-serif)", fontWeight: 400, color: "#fff", margin: 0 }}>{award.title}</h3>
                        <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>{award.desc}</p>
                        </div>
                      )}
                    </div>

                    {/* Timeline Node */}
                    <div style={{ gridColumn: "2", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <div className="award-timeline-dot" style={{ width: "16px", height: "16px", borderRadius: "50%", border: "4px solid #000", zIndex: 2, scale: 0 }} />
                    </div>

                    {/* Empty cell */}
                    <div style={{ gridColumn: idx % 2 === 0 ? "3" : "1" }} />

                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 3: PRESS VIEW (Magazine Layout)
         * ==================================================== */}
        <section className="py-20 px-6 md:py-40 md:px-10" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "#000" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "6rem" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A84C" }}>EDITORIALS</span>
              <h2 style={{ fontSize: "3.5rem", fontFamily: "var(--font-serif)", fontWeight: 400, marginTop: "1rem", textTransform: "uppercase" }}>Press &amp; Publications</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2.5rem" }}>
              {pressList.map((press, idx) => (
                <a 
                  key={idx}
                  href={press.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-grid-card group"
                  data-cursor="view"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.01)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "24px",
                    padding: "3.5rem 2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: "400px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.4s ease",
                    textDecoration: "none"
                  }}
                >
                  {/* Parallax Background image overlay */}
                  <div 
                    className="press-card-bg"
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${press.bgImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: 0.03,
                      zIndex: 0,
                      transition: "opacity 0.4s ease, transform 0.6s ease"
                    }}
                  />

                  <div style={{ zIndex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: "1.5rem", fontFamily: "var(--font-serif)", color: "#C9A84C", fontWeight: 400 }}>{press.media}</span>
                      <span style={{ fontSize: "9px", fontFamily: "monospace", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", letterSpacing: "1px" }}>{press.tagline}</span>
                    </div>
                    
                    <p style={{ fontSize: "1.2rem", fontStyle: "italic", lineHeight: 1.6, color: "rgba(255,255,255,0.75)" }}>
                      "{press.excerpt}"
                    </p>
                  </div>

                  <div 
                    style={{ 
                      zIndex: 1, 
                      fontSize: "10px", 
                      fontFamily: "monospace", 
                      textTransform: "uppercase", 
                      color: "#fff", 
                      letterSpacing: "0.15em",
                      marginTop: "2rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}
                  >
                    <span>Read Publication</span>
                    <svg style={{ width: "12px", height: "12px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>

          </div>
        </section>

        {/* ====================================================
         * SECTION 4: INFINITE MARQUEE BRAND LOGOS
         * ==================================================== */}
        <div className="marquee-strip" style={{ background: '#0b0b0a', padding: "5rem 0", borderTop: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
          <div className="marquee-track" style={{ gap: "6rem" }}>
            {["Forbes India", "Elle Decor", "Good Homes", "Trends Magazine", "Architectural Digest", "Wired Curation", "ICA Design"].map((brand, idx) => (
              <span key={idx} style={{ fontSize: "2.4rem", fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.12)", letterSpacing: "0.08em" }}>
                {brand}
              </span>
            ))}
            {/* Duplicate for infinite loop */}
            {["Forbes India", "Elle Decor", "Good Homes", "Trends Magazine", "Architectural Digest", "Wired Curation", "ICA Design"].map((brand, idx) => (
              <span key={`dup-${idx}`} style={{ fontSize: "2.4rem", fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.12)", letterSpacing: "0.08em" }}>
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Premium consultation consult section */}
        <FooterBanner isPreloaded={true} />

      </main>

      <style jsx global>{`
        /* Stacking/Glow hover effects local overrides */
        .award-timeline-card:hover {
          border-color: rgba(201, 168, 76, 0.25) !important;
          background-color: rgba(255, 255, 255, 0.02) !important;
        }
        .award-timeline-card:hover .award-hover-img-wrap {
          height: 180px !important;
          opacity: 1 !important;
          margin-bottom: 1rem;
        }
        .press-grid-card:hover {
          border-color: rgba(255, 255, 255, 0.15) !important;
          background-color: rgba(255, 255, 255, 0.02) !important;
        }
        .press-grid-card:hover .press-card-bg {
          opacity: 0.12 !important;
          transform: scale(1.03);
        }
        @media (max-width: 900px) {
          .award-timeline-row {
            grid-template-columns: 1fr !important;
            gap: 2rem;
            text-align: left !important;
          }
          .award-timeline-card {
            grid-column: 1 !important;
          }
          .award-timeline-dot {
            display: none !important;
          }
          .awards-vertical-progress-line {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
