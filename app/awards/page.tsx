"use client";

import React, { useState, useEffect, useRef } from "react";
import { MagicText } from "@/components/ui/magic-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Awards() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const navIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Text paragraph reveal (blur -> sharp)
    const textEls = gsap.utils.toArray<HTMLElement>("#awards-content p, .studio-container p");
    textEls.forEach((el) => {
      gsap.fromTo(el,
        { filter: "blur(10px)", opacity: 0, y: 15 },
        {
          filter: "blur(0px)",
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        }
      );
    });

    // 2. Serif headlines (word-by-word blur revelation)
    const serifHeadlines = gsap.utils.toArray<HTMLElement>(".serif-headline");
    serifHeadlines.forEach((headline) => {
      const text = headline.textContent || "";
      const words = text.split(" ");
      headline.innerHTML = words.map((w) =>
        `<span class="blur-word">${w}</span>`
      ).join(" ");
      const wordEls = headline.querySelectorAll(".blur-word");
      ScrollTrigger.create({
        trigger: headline,
        start: "top 85%",
        onEnter: () => {
          wordEls.forEach((w, i) => {
            setTimeout(() => w.classList.add("revealed"), i * 80);
          });
        },
      });
    });

    // 3. Staggered fade up for award and press cards
    const cards = gsap.utils.toArray<HTMLElement>(".founder-card");
    cards.forEach((card, idx) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30, filter: "blur(3px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          delay: (idx % 2) * 0.1,
        }
      );
    });

  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["awards-content", "awards-footer"];
      let active = "awards-content";

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const offset = 150;
          if (rect.top <= offset && rect.bottom > offset) {
            active = id;
          }
        }
      });

      if (active === "awards-content") {
        setCurrentTheme("light");
      } else {
        setCurrentTheme("dark");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      highlight: true
    },
    {
      year: "2024",
      title: "Commercial Design Awards",
      desc: "Best Unbuilt Project of the Year (Winner) — Awarded for the Fluid Design Pavilion blueprint exploring organic parametrism."
    },
    {
      year: "2024",
      title: "ICA Creative Minds",
      desc: "Winner (Ongoing Project - Interior Design) & Finalist (Best Conceptual Design) — Honoring spatial excellence and material layout innovations."
    },
    {
      year: "2024",
      title: "D/Code Mumbai",
      desc: "Design IKON India Awards: Emerging Interior Designer (Winner) — Ar. Rajdip Sinha recognized for fluid architecture contributions."
    },
    {
      year: "2024",
      title: "National Architecture & Interior Design Excellence Awards",
      desc: "Prominent & Trusted Firm of the Year & Promising & Futuristic Designer of the Year."
    },
    {
      year: "2023",
      title: "Häfele Star Awards",
      desc: "Winner — Awarded for exceptional integration of modern fittings and structural utility in luxury residences."
    },
    {
      year: "2023",
      title: "Indian Design Awards",
      desc: "Winner (by Blind Wink) — Celebrating excellence in residential interior curation and bespoke art integration."
    }
  ];

  const pressList = [
    {
      media: "Forbes India",
      tagline: "Top 20 Designers in India",
      excerpt: "Raja Sinha and Ar. Rajdip Sinha named among India's top design pioneers shaping the country's modern architectural footprint."
    },
    {
      media: "Good Homes Magazine",
      tagline: "India's Top 15 Designers",
      excerpt: "Decor Lab recognized for artfully blending historical heritage with cutting-edge parametric styling."
    },
    {
      media: "Elle Decor Magazine",
      tagline: "Editorial Feature (2024 & 2025)",
      excerpt: "Featured two times for spatial curation, custom ombre curtains, and residential masterwork in Santhalia Residence."
    },
    {
      media: "Trends Magazine",
      tagline: "Brand Curation Showcase",
      excerpt: "Covering Decor Lab's unique material palettes, organic plaster finishes, and timber screenings."
    },
    {
      media: "Grohe India",
      tagline: "Strategic Design Partner Feature",
      excerpt: "Discussing our design philosophy: 'Functionality first, fluidity always.'"
    },
    {
      media: "Architecture + Design",
      tagline: "Young Icons Profile",
      excerpt: "Highlighting Ar. Rajdip Sinha's parametric research at UCL and his vision for double-curvature forms in India."
    }
  ];

  return (
    <>
      {/* Floating navigation header */}
      <header
        className={`nav-header scrolled ${currentTheme === "light" ? "light-theme" : ""}`}
        id="main-header"
        style={{ opacity: 1, pointerEvents: "auto" }}
      >
        <a
          className="nav-logo glass glass-interactive"
          id="nav-logo"
          href="/"
          style={{ width: "auto", padding: "0 16px", borderRadius: "9999px", textDecoration: "none" }}
        >
          <img src="/assets/Decorlab final-01-trans.png" alt="Decor Lab Logo" className="nav-logo-img" />
        </a>

        <nav
          className="nav-menu glass"
          role="navigation"
          aria-label="Main Navigation"
          onMouseLeave={handleNavMouseLeave}
        >
          <div ref={navIndicatorRef} className="nav-indicator" id="nav-indicator"></div>
          <a
            href="/work"
            className="nav-link"
            id="link-work"
            onMouseEnter={handleNavMouseEnter}
            onFocus={handleNavMouseEnter}
          >
            Work
          </a>
          <a
            href="/about"
            className="nav-link"
            id="link-about"
            onMouseEnter={handleNavMouseEnter}
            onFocus={handleNavMouseEnter}
          >
            About
          </a>
          <a
            href="/awards"
            className="nav-link active"
            id="link-awards"
            onMouseEnter={handleNavMouseEnter}
            onFocus={handleNavMouseEnter}
          >
            Awards
          </a>
          <a
            href="/contact"
            className="nav-link"
            id="link-contact"
            onMouseEnter={handleNavMouseEnter}
            onFocus={handleNavMouseEnter}
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Main Container */}
      <main style={{ backgroundColor: "var(--bg-light)", minHeight: "100vh", paddingTop: "8rem" }}>
        
        {/* ====================================================
         * AWARDS CONTENT
         * ==================================================== */}
        <section id="awards-content" className="section-studio" style={{ padding: "4rem 2.5rem 6rem" }}>
          <div className="studio-container" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            
            {/* Header Block */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h4 className="studio-subtitle">ACCOLADES</h4>
              <div className="studio-headline" style={{ padding: "0" }}>
                <MagicText text="Celebrating Design Excellence." />
              </div>
              <p style={{ color: "rgba(42, 41, 40, 0.7)", fontSize: "1.1rem", maxWidth: "800px", lineHeight: "1.6", marginTop: "0.5rem" }}>
                Over the past three decades, Decor Lab has consistently pushed boundaries in spatial and interior design. Our dedication to functional beauty and material honesty has earned us recognition from major architecture bodies and national press.
              </p>
            </div>

            {/* Split Awards Grid */}
            <div className="awards-grid-container" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "4rem", marginTop: "1.5rem", textAlign: "left" }}>
              
              {/* Left Column: Awards & Recognitions */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <h3 className="serif-headline" style={{ fontSize: "1.75rem", marginBottom: "1rem", fontWeight: 400 }}>
                  Industry Recognition
                </h3>

                {awardsList.map((award, idx) => (
                  <div 
                    key={idx} 
                    className="founder-card" 
                    style={{ 
                      padding: "1.75rem 2rem", 
                      border: award.highlight ? "1px solid rgba(212, 175, 55, 0.3)" : "1px solid rgba(42, 41, 40, 0.08)",
                      background: award.highlight ? "rgba(212, 175, 55, 0.02)" : "rgba(255, 255, 255, 0.2)",
                      display: "flex",
                      gap: "1.5rem",
                      alignItems: "start"
                    }}
                  >
                    {/* Gold Year Badge */}
                    <div style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: award.highlight ? "var(--text-dark)" : "rgba(42, 41, 40, 0.05)",
                      color: award.highlight ? "var(--text-light)" : "var(--text-dark)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      letterSpacing: "1px"
                    }}>
                      {award.year}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <h4 style={{ fontSize: "1.15rem", fontWeight: 500, color: "var(--text-dark)" }}>
                        {award.title}
                      </h4>
                      <p style={{ color: "rgba(42, 41, 40, 0.65)", fontSize: "0.95rem", lineHeight: "1.5" }}>
                        {award.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Press Coverage */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <h3 className="serif-headline" style={{ fontSize: "1.75rem", marginBottom: "1rem", fontWeight: 400 }}>
                  Featured In
                </h3>

                {pressList.map((press, idx) => (
                  <div 
                    key={idx} 
                    className="founder-card" 
                    style={{ 
                      padding: "1.75rem 2rem", 
                      border: "1px solid rgba(42, 41, 40, 0.08)",
                      background: "rgba(255, 255, 255, 0.25)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <h4 style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--text-dark)" }}>
                        {press.media}
                      </h4>
                      <span className="founder-title" style={{ fontSize: "0.7rem", letterSpacing: "1.5px" }}>
                        {press.tagline}
                      </span>
                    </div>
                    <p style={{ color: "rgba(42, 41, 40, 0.7)", fontSize: "0.95rem", lineHeight: "1.5", fontStyle: "italic" }}>
                      "{press.excerpt}"
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* ====================================================
         * STUDIO FOOTER
         * ==================================================== */}
        <footer id="awards-footer" className="section-footer">
          <div className="footer-container">
            <div className="footer-top">
              <div className="footer-brand">
                <div className="footer-logo">
                  <img src="/assets/Decorlab final-01-trans.png" alt="Decor Lab Logo" className="footer-logo-img" style={{ maxHeight: "36px", marginRight: "12px" }} />
                  <span className="footer-logo-text" style={{ display: "none" }}>Decor Lab</span>
                </div>
                <p className="footer-desc">
                  Kolkata-based architecture and interior design powerhouse artfully blending legacy with design innovation since 1993.
                </p>
              </div>

              <div>
                <h4 className="footer-col-title">Inquiries</h4>
                <ul className="footer-links-list">
                  <li>
                    <a href="mailto:info@decorlab.co.in">info@decorlab.co.in</a>
                  </li>
                  <li>
                    <a href="tel:+913324648000">+91 33 2464 8000</a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="footer-col-title">Studio</h4>
                <ul className="footer-links-list">
                  <li style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "var(--text-dark)" }}>
                    Kolkata, West Bengal,
                    <br />
                    India
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="footer-col-title">Socials</h4>
                <ul className="footer-links-list">
                  <li>
                    <a href="https://instagram.com/decorlab.in?igsh=MWluaGo2OXZtbzBsOQ==" target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>&copy; 2026 Decor Lab. All rights reserved.</p>
              <div className="footer-bottom-links">
                <a href="#privacy">Privacy Policy</a>
                <a href="#legal">Legal Notice</a>
                <a href="#cookies">Cookies Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        @media (max-width: 900px) {
          .awards-grid-container {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </>
  );
}
