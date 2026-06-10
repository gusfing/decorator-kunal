"use client";

import React, { useState, useEffect, useRef } from "react";
import { MagicText } from "@/components/ui/magic-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { splitTextIntoWords } from "@/lib/domUtils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const navIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Text description reveals (blur -> sharp)
    const textEls = gsap.utils.toArray<HTMLElement>(".studio-body, .founder-bio, .founder-quote");
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
      splitTextIntoWords(headline);
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

    // 3. Founder cards & Accolades cards stagger fade up
    const cards = gsap.utils.toArray<HTMLElement>(".founder-card, #accolades .cap-card");
    cards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          }
        }
      );
    });
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["legacy", "leadership", "accolades", "contact"];
      let active = "legacy";

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

      if (active === "legacy" || active === "leadership") {
        setCurrentTheme("light");
      } else {
        setCurrentTheme("dark");
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initialize immediately
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Nav indicator hover highlights
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
          <img src="/assets/Decorlab final-04.png" alt="Decor Lab Logo" className="nav-logo-img" />
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
            className="nav-link active"
            id="link-about"
            onMouseEnter={handleNavMouseEnter}
            onFocus={handleNavMouseEnter}
          >
            About
          </a>
          <a
            href="/awards"
            className="nav-link"
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
         * SECTION 1: STUDIO STORY & LEGACY
         * ==================================================== */}
        <section id="legacy" className="section-studio" style={{ padding: "6rem 2.5rem 4rem" }}>
          <div className="studio-container" style={{ gap: "1.5rem" }}>
            <h4 className="studio-subtitle">OUR LEGACY</h4>
            <div className="studio-headline" style={{ padding: "0" }}>
              <MagicText text="Artfully blending legacy with cutting-edge design innovation." />
            </div>
            <p className="studio-body" style={{ fontSize: "1.15rem", maxWidth: "800px", marginTop: "1rem" }}>
              Decor Lab is a premier architecture and interior design powerhouse established in 1993 by Mr. Raja Sinha. Evolving from an interior design studio into a full-spectrum design and architecture practice, the firm continues to set new benchmarks in the Indian design landscape. 
            </p>
            <p className="studio-body" style={{ fontSize: "1.15rem", maxWidth: "800px" }}>
              With over 32 years of design expertise, our team of 275+ dedicated professionals has completed 1,300+ sites and delivered 600+ successful projects across India. Guided by the visionary leadership of Raja Sinha and architect Ar. Rajdip Sinha, Decor Lab combines creative excellence with seamless execution, ensuring each project is as practical as it is beautiful.
            </p>
          </div>
        </section>

        {/* ====================================================
         * SECTION 2: LEADERSHIP & FOUNDERS
         * ==================================================== */}
        <section id="leadership" className="section-leadership" style={{ borderTop: "1px solid rgba(42, 41, 40, 0.08)" }}>
          <div className="leadership-container">
            <div className="showcase-header">
              <h4 className="studio-subtitle">LEADERSHIP</h4>
              <h2 className="serif-headline" style={{ fontSize: "3rem", marginBottom: "1rem" }}>Our Founders</h2>
            </div>
            
            <div className="leadership-grid">
              {/* Raja Sinha */}
              <div className="founder-card">
                <div className="founder-header">
                  <span className="founder-title">FOUNDER (Est. 1993)</span>
                  <h3 className="founder-name">Raja Sinha</h3>
                </div>
                <p className="founder-bio">
                  Raja Sinha founded Decor Lab in 1993, establishing the firm as a dedicated interior design practice. Under his leadership, the firm built a foundation of trust, client-centricity, and execution excellence that allowed it to grow into the nationwide design powerhouse it is today.
                </p>
              </div>

              {/* Ar. Rajdip Sinha */}
              <div className="founder-card">
                <div className="founder-header">
                  <span className="founder-title">CO-FOUNDER & CHIEF ARCHITECT</span>
                  <h3 className="founder-name">Ar. Rajdip Sinha</h3>
                </div>
                <p className="founder-quote">
                  "There are 360 degrees, so why stick to one?" — Zaha Hadid
                </p>
                <p className="founder-bio">
                  An architect with a passion for innovation, Rajdip completed his Master's degree at The Bartlett School of Architecture, University College London (UCL), where he is currently pursuing his PhD. His design philosophy centers on "functionality first," bringing parametric design, fluid structures, and material innovation to create timeless, distinctive environments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 3: AWARDS & PRESS HIGHLIGHTS
         * ==================================================== */}
        <section id="accolades" className="section-capabilities" style={{ backgroundColor: "#1a1a19", color: "var(--text-light)" }}>
          <div className="capabilities-container">
            <div className="capabilities-header" style={{ marginBottom: "4rem" }}>
              <h4 className="studio-subtitle" style={{ color: "rgba(255, 255, 255, 0.45)" }}>ACCOLADES</h4>
              <h2 className="capabilities-title">Awards & Media</h2>
            </div>

            <div className="capabilities-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "50px" }}>
              {/* Awards List */}
              <div className="cap-card" style={{ background: "rgba(255, 255, 255, 0.02)", padding: "2.5rem" }}>
                <h3 className="cap-name" style={{ marginBottom: "1.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "0.5rem" }}>Industry Recognition</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px", fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.7)" }}>
                  <li><strong>India Design Awards 2024</strong> — Best Commercial Project (Winner)</li>
                  <li><strong>Commercial Design Awards 2024</strong> — Best Unbuilt Project of the Year (Winner)</li>
                  <li><strong>ICA Creative Minds 2024</strong> — Winner (Ongoing Project - Interior Design) & Finalist (Best Conceptual Design)</li>
                  <li><strong>D/Code Mumbai</strong> — Design IKON India Awards: Emerging Interior Designer (Winner)</li>
                  <li><strong>National Architecture & Interior Design Excellence Awards 2024</strong> — Prominent & Trusted Firm of the Year & Promising & Futuristic Designer of the Year</li>
                  <li><strong>Häfele Star Awards 2023</strong> — Winner</li>
                  <li><strong>Indian Design Awards 2023</strong> — Winner (by Blind Wink)</li>
                </ul>
              </div>

              {/* Press List */}
              <div className="cap-card" style={{ background: "rgba(255, 255, 255, 0.02)", padding: "2.5rem" }}>
                <h3 className="cap-name" style={{ marginBottom: "1.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "0.5rem" }}>Featured In</h3>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "16px", fontSize: "0.95rem", color: "rgba(255, 255, 255, 0.7)" }}>
                  <li><strong>Forbes India</strong> — Top 20 Designers in India</li>
                  <li><strong>Good Homes Magazine</strong> — India's Top 15 Designers</li>
                  <li><strong>Elle Decor Magazine</strong> — Featured in 2024 and 2025 editions</li>
                  <li><strong>Trends Magazine 2025</strong> — Brand Curation Feature</li>
                  <li><strong>Grohe India</strong> — Strategic Design Brand Feature</li>
                  <li><strong>Architecture + Design Magazine</strong> — Young Icons profile</li>
                  <li><strong>Good Homes Digital</strong> — Two-time editorial feature</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 4: STUDIO FOOTER
         * ==================================================== */}
        <footer id="contact" className="section-footer">
          <div className="footer-container">
            <div className="footer-top">
              <div className="footer-brand">
                <div className="footer-logo">
                  <img src="/assets/Decorlab final-04.png" alt="Decor Lab Logo" className="footer-logo-img" style={{ maxHeight: "36px", marginRight: "12px" }} />
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
    </>
  );
}
