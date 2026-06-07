"use client";

import React, { useState, useEffect, useRef } from "react";
import { MagicText } from "@/components/ui/magic-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const navIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Text paragraph reveal (blur -> sharp)
    const textEls = gsap.utils.toArray<HTMLElement>("#contact-info p, .studio-container p");
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

    // 3. Staggered fade up for quick info/address cards
    const cards = gsap.utils.toArray<HTMLElement>(".founder-card");
    cards.forEach((card, idx) => {
      gsap.fromTo(card,
        { opacity: 0, y: 25, filter: "blur(3px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          delay: idx * 0.1,
        }
      );
    });

    // 4. Map scale-up entrance animation
    const mapContainer = document.querySelector("#contact-info div[style*='radial-gradient']");
    if (mapContainer) {
      gsap.fromTo(mapContainer,
        { scale: 0.94, opacity: 0, filter: "blur(5px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapContainer,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        }
      );
    }

    // 5. Contact form fade up + shadow lift
    const formPanel = document.querySelector(".contact-grid-container .glass");
    if (formPanel) {
      gsap.fromTo(formPanel,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: formPanel,
            start: "top 88%",
            toggleActions: "play none none none",
          }
        }
      );
    }

  });
  
  // Form submission state
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Residential Design",
    message: ""
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["contact-info", "contact-footer"];
      let active = "contact-info";

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

      if (active === "contact-info") {
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
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
            className="nav-link"
            id="link-awards"
            onMouseEnter={handleNavMouseEnter}
            onFocus={handleNavMouseEnter}
          >
            Awards
          </a>
          <a
            href="/contact"
            className="nav-link active"
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
         * CONTACT SECTION
         * ==================================================== */}
        <section id="contact-info" className="section-studio" style={{ padding: "4rem 2.5rem 6rem" }}>
          <div className="studio-container" style={{ display: "flex", flexDirection: "column", gap: "3rem", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
            
            {/* Header Block */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h4 className="studio-subtitle">CONTACT US</h4>
              <div className="studio-headline" style={{ padding: "0", maxWidth: "900px" }}>
                <MagicText text="Connect with Decor Lab." />
              </div>
            </div>

            {/* Content Split Grid */}
            <div className="contact-grid-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", textAlign: "left" }}>
              
              {/* Left Column: Studio Information & Mock Map */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <div>
                  <h2 className="serif-headline" style={{ fontSize: "2.5rem", marginBottom: "1.5rem", lineHeight: "1.2", fontWeight: 400 }}>
                    Let's bring your design vision to life.
                  </h2>
                  <p style={{ color: "rgba(42, 41, 40, 0.7)", fontSize: "1.05rem", lineHeight: "1.6", marginBottom: "2rem" }}>
                    Whether you are planning a premium residential sanctuary or an innovative corporate workspace, our Kolkata-based design powerhouse combines three decades of heritage with cutting-edge expertise to deliver exceptional spaces nationwide.
                  </p>
                </div>

                {/* Quick Info Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="founder-card" style={{ padding: "1.5rem", border: "1px solid rgba(42, 41, 40, 0.08)" }}>
                    <span className="founder-title" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>INQUIRIES</span>
                    <p style={{ marginTop: "0.75rem", fontWeight: 500, fontSize: "1rem" }}>
                      <a href="mailto:info@decorlab.co.in" style={{ color: "var(--text-dark)", textDecoration: "none" }}>info@decorlab.co.in</a>
                    </p>
                    <p style={{ marginTop: "0.25rem", color: "rgba(42, 41, 40, 0.7)", fontSize: "0.9rem" }}>
                      <a href="tel:+913324648000" style={{ color: "inherit", textDecoration: "none" }}>+91 33 2464 8000</a>
                    </p>
                  </div>

                  <div className="founder-card" style={{ padding: "1.5rem", border: "1px solid rgba(42, 41, 40, 0.08)" }}>
                    <span className="founder-title" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>STUDIO HOURS</span>
                    <p style={{ marginTop: "0.75rem", fontWeight: 500, fontSize: "1rem", color: "var(--text-dark)" }}>
                      Mon – Sat: 10 AM – 7 PM
                    </p>
                    <p style={{ marginTop: "0.25rem", color: "rgba(42, 41, 40, 0.7)", fontSize: "0.9rem" }}>
                      Closed on Sundays
                    </p>
                  </div>
                </div>

                {/* Address Card */}
                <div className="founder-card" style={{ padding: "1.5rem", border: "1px solid rgba(42, 41, 40, 0.08)" }}>
                  <span className="founder-title" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>ADDRESS</span>
                  <p style={{ marginTop: "0.75rem", color: "var(--text-dark)", fontSize: "1rem", lineHeight: "1.5" }}>
                    Decor Lab, Suite 402, Design Chambers,<br />
                    Kolkata, West Bengal, India
                  </p>
                </div>

                {/* Styled Mock Map Container */}
                <div style={{ 
                  height: "220px", 
                  borderRadius: "20px", 
                  overflow: "hidden", 
                  position: "relative",
                  border: "1px solid rgba(42, 41, 40, 0.08)",
                  background: "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, rgba(42, 41, 40, 0.02) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {/* Decorative background gridlines */}
                  <div style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: "linear-gradient(rgba(42, 41, 40, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(42, 41, 40, 0.03) 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }} />
                  
                  {/* Stylized vector map shape */}
                  <svg width="100%" height="100%" style={{ opacity: 0.15, position: "absolute" }}>
                    <path d="M 0,50 Q 80,120 150,70 T 300,150 T 500,40" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M 50,0 Q 120,80 70,150 T 150,300" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 200,0 C 220,120 180,180 250,220" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  </svg>
                  
                  {/* Interactive Pin Highlight */}
                  <div style={{ 
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    zIndex: 2
                  }}>
                    <div style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(42, 41, 40, 0.9)",
                      border: "3px solid #fff",
                      boxShadow: "0 0 15px rgba(42, 41, 40, 0.4)",
                      animation: "pulse 2s infinite"
                    }} />
                    <div className="glass" style={{ 
                      padding: "6px 12px", 
                      borderRadius: "8px", 
                      fontSize: "0.8rem", 
                      color: "var(--text-dark)",
                      border: "1px solid rgba(42, 41, 40, 0.1)",
                      fontWeight: 500
                    }}>
                      Decor Lab Headquarters
                    </div>
                  </div>
                  
                  {/* Geographic Coordinates Overlay */}
                  <div style={{ 
                    position: "absolute",
                    bottom: "10px",
                    right: "15px",
                    fontSize: "0.75rem",
                    color: "rgba(42, 41, 40, 0.45)",
                    fontFamily: "monospace"
                  }}>
                    22.5450° N, 88.3513° E
                  </div>
                </div>

              </div>

              {/* Right Column: Contact Inquiry Form */}
              <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                <div className="glass" style={{ 
                  padding: "2.5rem", 
                  borderRadius: "24px", 
                  border: "1px solid rgba(42, 41, 40, 0.08)",
                  background: "rgba(255, 255, 255, 0.35)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.02)",
                  boxSizing: "border-box",
                  width: "100%"
                }}>
                  
                  {!submitted ? (
                    <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                      <div>
                        <h3 className="serif-headline" style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Start a Project</h3>
                        <p style={{ color: "rgba(42, 41, 40, 0.65)", fontSize: "0.95rem" }}>
                          Tell us about your spatial needs and project timelines.
                        </p>
                      </div>

                      {/* Name Input */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label style={{ fontSize: "0.8rem", letterSpacing: "1px", fontWeight: 500, color: "var(--text-dark)" }}>FULL NAME</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          style={{
                            padding: "0.85rem 1rem",
                            borderRadius: "8px",
                            border: "1px solid rgba(42, 41, 40, 0.12)",
                            background: "rgba(255, 255, 255, 0.5)",
                            fontSize: "0.95rem",
                            outline: "none",
                            color: "var(--text-dark)",
                            fontFamily: "var(--font-outfit), sans-serif",
                            transition: "border-color 0.3s"
                          }}
                        />
                      </div>

                      {/* Split Grid for Email & Phone */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <label style={{ fontSize: "0.8rem", letterSpacing: "1px", fontWeight: 500, color: "var(--text-dark)" }}>EMAIL ADDRESS</label>
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            style={{
                              padding: "0.85rem 1rem",
                              borderRadius: "8px",
                              border: "1px solid rgba(42, 41, 40, 0.12)",
                              background: "rgba(255, 255, 255, 0.5)",
                              fontSize: "0.95rem",
                              outline: "none",
                              color: "var(--text-dark)",
                              fontFamily: "var(--font-outfit), sans-serif",
                              transition: "border-color 0.3s"
                            }}
                          />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <label style={{ fontSize: "0.8rem", letterSpacing: "1px", fontWeight: 500, color: "var(--text-dark)" }}>PHONE NUMBER</label>
                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            style={{
                              padding: "0.85rem 1rem",
                              borderRadius: "8px",
                              border: "1px solid rgba(42, 41, 40, 0.12)",
                              background: "rgba(255, 255, 255, 0.5)",
                              fontSize: "0.95rem",
                              outline: "none",
                              color: "var(--text-dark)",
                              fontFamily: "var(--font-outfit), sans-serif",
                              transition: "border-color 0.3s"
                            }}
                          />
                        </div>
                      </div>

                      {/* Dropdown for Project Category */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label style={{ fontSize: "0.8rem", letterSpacing: "1px", fontWeight: 500, color: "var(--text-dark)" }}>PROJECT CATEGORY</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          style={{
                            padding: "0.85rem 1rem",
                            borderRadius: "8px",
                            border: "1px solid rgba(42, 41, 40, 0.12)",
                            background: "rgba(255, 255, 255, 0.5)",
                            fontSize: "0.95rem",
                            outline: "none",
                            color: "var(--text-dark)",
                            fontFamily: "var(--font-outfit), sans-serif",
                            transition: "border-color 0.3s"
                          }}
                        >
                          <option value="Residential Design">Residential Interior or Villa</option>
                          <option value="Commercial Architecture">Commercial / Office Workspace</option>
                          <option value="Bespoke Curation">Bespoke furniture / Art curation</option>
                          <option value="Concept Design">Conceptual Architecture study</option>
                        </select>
                      </div>

                      {/* Message Input */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <label style={{ fontSize: "0.8rem", letterSpacing: "1px", fontWeight: 500, color: "var(--text-dark)" }}>YOUR MESSAGE</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell us about your project location, scope, and target timeframe..."
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          style={{
                            padding: "0.85rem 1rem",
                            borderRadius: "8px",
                            border: "1px solid rgba(42, 41, 40, 0.12)",
                            background: "rgba(255, 255, 255, 0.5)",
                            fontSize: "0.95rem",
                            outline: "none",
                            color: "var(--text-dark)",
                            fontFamily: "var(--font-outfit), sans-serif",
                            resize: "vertical",
                            transition: "border-color 0.3s"
                          }}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="news-submit"
                        style={{
                          width: "100%",
                          padding: "1rem",
                          border: "none",
                          borderRadius: "8px",
                          background: "var(--text-dark)",
                          color: "var(--text-light)",
                          fontWeight: 500,
                          fontSize: "0.95rem",
                          cursor: "pointer",
                          transition: "background 0.3s"
                        }}
                      >
                        Submit Project Inquiry
                      </button>
                    </form>
                  ) : (
                    /* Success State View */
                    <div style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      padding: "4rem 0",
                      textAlign: "center",
                      gap: "1.5rem"
                    }}>
                      <div style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(42, 41, 40, 0.05)",
                        color: "var(--text-dark)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="serif-headline" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Thank You</h3>
                        <p style={{ color: "rgba(42, 41, 40, 0.7)", fontSize: "1.05rem", maxWidth: "340px", lineHeight: "1.5" }}>
                          Your project inquiry has been received. Our lead architect will reach out to you within 24 hours.
                        </p>
                      </div>
                      <button
                        onClick={() => setSubmitted(false)}
                        style={{
                          marginTop: "1rem",
                          padding: "0.6rem 1.5rem",
                          border: "1px solid rgba(42, 41, 40, 0.15)",
                          borderRadius: "9999px",
                          background: "transparent",
                          color: "var(--text-dark)",
                          fontWeight: 500,
                          cursor: "pointer"
                        }}
                      >
                        Send another message
                      </button>
                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ====================================================
         * STUDIO FOOTER
         * ==================================================== */}
        <footer id="contact-footer" className="section-footer">
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

      {/* Embedded local CSS animation keyframes */}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        /* Ensure form elements don't overflow */
        .contact-grid-container input,
        .contact-grid-container select,
        .contact-grid-container textarea {
          width: 100%;
          box-sizing: border-box;
        }
        .contact-grid-container .founder-card {
          padding: 1.5rem;
          border-radius: 16px;
        }
        @media (max-width: 1024px) {
          .contact-grid-container {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 600px) {
          .contact-grid-container .glass {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </>
  );
}
