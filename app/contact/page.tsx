"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FooterBanner from "@/components/urbanland/FooterBanner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useGSAP(() => {
    // 1. Hero Stagger Entrance Animations
    const heroChars = gsap.utils.toArray<HTMLElement>(".contact-hero-title .char");
    if (heroChars.length > 0) {
      gsap.fromTo(
        heroChars,
        { yPercent: 100, rotateX: 30, opacity: 0, filter: "blur(8px)" },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.0,
          ease: "power4.out",
          stagger: 0.035,
          delay: 0.15,
        }
      );
    }

    if (document.querySelector(".contact-hero-line")) {
      gsap.fromTo(
        ".contact-hero-line",
        { width: "0%" },
        { width: "100%", duration: 1.2, ease: "power3.inOut", delay: 0.3 }
      );
    }

    // Curtain reveal for hero image
    if (document.querySelector(".contact-hero-img-wrap")) {
      gsap.fromTo(
        ".contact-hero-img-wrap",
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power4.inOut",
          delay: 0.45,
        }
      );

      gsap.fromTo(
        ".contact-hero-img-wrap img",
        { scale: 1.2, yPercent: -8 },
        {
          scale: 1.0,
          yPercent: 8,
          ease: "none",
          scrollTrigger: { toggleActions: "play none none none",
            trigger: ".contact-hero-img-wrap",
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }

    // 2. Info Cards Reveal
    const infoCards = gsap.utils.toArray<HTMLElement>(".info-grid-card");
    if (infoCards.length > 0) {
      gsap.fromTo(
        infoCards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { toggleActions: "play none none none",
            trigger: ".info-grid-section",
            start: "top 85%",
            once: true,
          }
        }
      );
    }

    // 3. Form fields slide-in
    const formFields = gsap.utils.toArray<HTMLElement>(".contact-form-field");
    if (formFields.length > 0) {
      gsap.fromTo(
        formFields,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { toggleActions: "play none none none",
            trigger: ".contact-form-panel",
            start: "top 80%",
            once: true,
          }
        }
      );
    }

    // 4. Blueprint Map container reveal
    if (document.querySelector(".blueprint-map-section")) {
      gsap.fromTo(
        ".blueprint-map-section",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { toggleActions: "play none none none",
            trigger: ".blueprint-map-section",
            start: "top 85%",
            once: true,
          }
        }
      );
    }
  }, { scope: containerRef });

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Residential Design",
    message: ""
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

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
          <a href="/awards" className="nav-link" id="link-awards" onMouseEnter={handleNavMouseEnter} onFocus={handleNavMouseEnter}>
            Awards
          </a>
          <a href="/contact" className="nav-link active" id="link-contact" onMouseEnter={handleNavMouseEnter} onFocus={handleNavMouseEnter}>
            Contact
          </a>
        </nav>
      </header>

      {/* Main Container */}
      <main style={{ paddingTop: "8rem" }}>
        
        {/* ====================================================
         * SECTION 1: HERO VIEW (Cinematic Split Screen)
         * ==================================================== */}
        <section className="contact-hero-section" style={{ minHeight: "75vh", display: "flex", alignItems: "center" }}>
          <div className="contact-hero-grid" style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
            
            {/* Left side column: Large split title */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.35rem" }}>
              <span style={{ fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A84C" }}>GET IN TOUCH</span>
              
              <h1 className="contact-hero-title" style={{ fontSize: "clamp(2rem, 4.5vw, 6rem)", fontFamily: "var(--font-display)", fontWeight: 800, lineHeight: 1.15, paddingBottom: "0.15em", textTransform: "uppercase", margin: 0, overflow: "visible", whiteSpace: "nowrap" }}>
                {"LET'S CREATE".split("").map((char, index) => (
                  <span key={index} className="char-reveal char" style={{ display: "inline-block" }}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
                <br />
                {"TOGETHER".split("").map((char, index) => (
                  <span key={`t-${index}`} className="char-reveal char" style={{ display: "inline-block", color: "rgba(255, 255, 255, 0.45)" }}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>

              <div className="contact-hero-line" style={{ width: "0%", height: "1px", backgroundColor: "rgba(255,255,255,0.15)", marginTop: "0.75rem" }}></div>

              <p style={{ fontSize: "1.25rem", color: "rgba(255, 255, 255, 0.7)", maxWidth: "580px", lineHeight: 1.6, margin: 0, marginTop: "1rem", fontFamily: "var(--font-body)" }}>
                Whether you want to build a modern dream residence or consult on commercial spatial curation, our designers are ready to translate your ideas into habitable art.
              </p>
            </div>

            {/* Right side column: Cinematic Image curtain wipe */}
            <div className="contact-hero-img-wrap" style={{ width: "100%", height: "65vh", overflow: "hidden", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
              <img loading="lazy" 
                src="/assets/projects/site_01/image_2.webp" 
                alt="Workspace architecture studio design study" 
                style={{ width: "100%", height: "120%", objectFit: "cover" }} 
              />
            </div>

          </div>
        </section>

        {/* ====================================================
         * SECTION 2: GRID OF INFO CARDS + STACK FORM
         * ==================================================== */}
        <section className="contact-details-section" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "#060605" }}>
          <div className="contact-details-grid" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            {/* Left side: Studio Info cards grid */}
            <div className="info-grid-section" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <h2 style={{ fontSize: "2.5rem", fontFamily: "var(--font-serif)", fontWeight: 400, textTransform: "uppercase", marginBottom: "1rem" }}>Studio Details</h2>
              
              {/* Location Details Card */}
              <div className="info-grid-card glow-hover" style={{ backgroundColor: "rgba(20,20,18,0.95)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#C9A84C", letterSpacing: "1.5px" }}>STUDIO ADDRESS</span>
                <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-serif)", fontWeight: 400, color: "#fff", margin: 0 }}>Kolkata Headquarters</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
                  Decor Lab,<br />
                  GROUND FLOOR, Vinayak Garden, 102, Raja Dinendra St,<br />
                  Manicktala, Gouri Bari, Ward Number 15,<br />
                  Kolkata, West Bengal 700004
                </p>
                
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="magnetic-hover"
                  data-cursor="open"
                  style={{ 
                    fontSize: "10px", 
                    fontFamily: "monospace", 
                    textTransform: "uppercase", 
                    color: "#fff", 
                    textDecoration: "underline", 
                    letterSpacing: "0.15em",
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                >
                  <span>Open in Google Maps</span>
                  <svg style={{ width: "12px", height: "12px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

              {/* Inquiry Details Card */}
              <div className="info-grid-card glow-hover" style={{ backgroundColor: "rgba(20,20,18,0.95)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#C9A84C", letterSpacing: "1.5px" }}>CONTACT INFO</span>
                <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-serif)", fontWeight: 400, color: "#fff", margin: 0 }}>Direct Inquiries</h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <p style={{ margin: 0, fontSize: "1.05rem" }}>
                    <a href="mailto:info@decorlab.co.in" style={{ color: "#fff", textDecoration: "none" }}>info@decorlab.co.in</a>
                  </p>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: "1.05rem" }}>
                    <a href="tel:+913324648000" style={{ color: "inherit", textDecoration: "none" }}>+91 33 2464 8000</a>
                  </p>
                </div>
                
                <a 
                  href="https://wa.me/913324648000?text=Hi%20Decor%20Lab%2C%20I%20would%20like%20to%20discuss%20a%20project." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="magnetic-hover"
                  data-cursor="open"
                  style={{ 
                    fontSize: "10px", 
                    fontFamily: "monospace", 
                    textTransform: "uppercase", 
                    color: "#25D366", 
                    textDecoration: "underline", 
                    letterSpacing: "0.15em",
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                  }}
                >
                  <span>Chat on WhatsApp</span>
                  <svg style={{ width: "14px", height: "14px" }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>

              {/* Business Hours Card */}
              <div className="info-grid-card glow-hover" style={{ backgroundColor: "rgba(20,20,18,0.95)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#C9A84C", letterSpacing: "1.5px" }}>TIMING DETAILS</span>
                <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-serif)", fontWeight: 400, color: "#fff", margin: 0 }}>Studio Timings</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
                  Monday to Saturday: 10:00 AM – 7:00 PM<br />
                  Sundays &amp; National Holidays: Closed
                </p>
              </div>

              {/* Careers Card */}
              <div className="info-grid-card glow-hover" style={{ backgroundColor: "rgba(20,20,18,0.95)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#C9A84C", letterSpacing: "1.5px" }}>JOIN THE TEAM</span>
                <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-serif)", fontWeight: 400, color: "#fff", margin: 0 }}>Careers</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05rem", lineHeight: 1.6, margin: 0 }}>
                  We are always looking for passionate designers, architects, and detailers. Send your portfolio and resume to:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <p style={{ margin: 0, fontSize: "1.05rem" }}>
                    <a href="mailto:careers@decorlab.co.in" style={{ color: "#fff", textDecoration: "none" }}>careers@decorlab.co.in</a>
                  </p>
                </div>
              </div>

            </div>

            {/* Right side: Contact Inquiry Form (Underline inputs + floating labels) */}
            <div className="contact-form-panel" style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "24px", padding: "3.5rem", boxSizing: "border-box" }}>
              {!submitted ? (
                <form ref={formRef} onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                  <div className="contact-form-field">
                    <h3 style={{ fontSize: "2rem", fontFamily: "var(--font-serif)", fontWeight: 400, margin: "0 0 0.5rem 0" }}>Start a Project</h3>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", margin: 0 }}>Tell us about your spatial needs and project timeline.</p>
                  </div>

                  {/* Underline Name Input */}
                  <div className="contact-form-field" style={{ position: "relative" }}>
                    <input 
                      type="text" 
                      className="input-underline" 
                      placeholder=" " 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <span className="input-underline-bar"></span>
                    <label className="floating-label">Full Name</label>
                  </div>

                  {/* Underline Email Input */}
                  <div className="contact-form-field" style={{ position: "relative" }}>
                    <input 
                      type="email" 
                      className="input-underline" 
                      placeholder=" " 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <span className="input-underline-bar"></span>
                    <label className="floating-label">Email Address</label>
                  </div>

                  {/* Underline Phone Input */}
                  <div className="contact-form-field" style={{ position: "relative" }}>
                    <input 
                      type="tel" 
                      className="input-underline" 
                      placeholder=" " 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <span className="input-underline-bar"></span>
                    <label className="floating-label">Phone Number</label>
                  </div>

                  {/* Dropdown Input */}
                  <div className="contact-form-field" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontSize: "10px", fontFamily: "monospace", color: "rgba(255,255,255,0.45)", letterSpacing: "1px", textTransform: "uppercase" }}>PROJECT CATEGORY</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      style={{
                        padding: "0.9rem 0",
                        border: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.15)",
                        background: "transparent",
                        fontSize: "1rem",
                        outline: "none",
                        color: "#fff",
                        fontFamily: "inherit",
                        cursor: "pointer"
                      }}
                    >
                      <option value="Residential Design" style={{ background: "#000" }}>Residential Curation or Villa</option>
                      <option value="Commercial Architecture" style={{ background: "#000" }}>Commercial / Corporate Office</option>
                      <option value="Bespoke Curation" style={{ background: "#000" }}>Bespoke Material &amp; Art Curation</option>
                      <option value="Concept Design" style={{ background: "#000" }}>Conceptual Spatial Architecture Study</option>
                    </select>
                  </div>

                  {/* Underline Message Textarea */}
                  <div className="contact-form-field" style={{ position: "relative" }}>
                    <textarea 
                      className="input-underline" 
                      placeholder=" " 
                      rows={3}
                      required 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      style={{ resize: "none" }}
                    />
                    <span className="input-underline-bar"></span>
                    <label className="floating-label">Describe your Project Details</label>
                  </div>

                  {/* Magnetic Submit Button */}
                  <div className="contact-form-field">
                    <button
                      type="submit"
                      className="magnetic-hover submit-btn-animated"
                      data-cursor="send"
                      style={{
                        width: "100%",
                        padding: "1.2rem",
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: "9999px",
                        background: "#fff",
                        color: "#000",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        cursor: "pointer",
                        transition: "all 0.35s ease",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        outline: "none"
                      }}
                    >
                      Submit Project Inquiry
                    </button>
                    
                    <a
                      href="https://wa.me/913324648000?text=Hi%20Decor%20Lab%2C%20I%20would%20like%20to%20discuss%20a%20project." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="magnetic-hover whatsapp-btn-animated"
                      data-cursor="open"
                      style={{
                        width: "100%",
                        padding: "1.2rem",
                        border: "1px solid rgba(37, 211, 102, 0.4)",
                        borderRadius: "9999px",
                        background: "rgba(37, 211, 102, 0.08)",
                        color: "#25D366",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        cursor: "pointer",
                        transition: "all 0.35s ease",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        marginTop: "1rem"
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget;
                        el.style.background = "#25D366";
                        el.style.color = "#000";
                        el.style.borderColor = "#25D366";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget;
                        el.style.background = "rgba(37, 211, 102, 0.08)";
                        el.style.color = "#25D366";
                        el.style.borderColor = "rgba(37, 211, 102, 0.4)";
                      }}
                    >
                      <svg style={{ width: "18px", height: "18px" }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Or connect via WhatsApp
                    </a>
                  </div>

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
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(201, 168, 76, 0.1)",
                    color: "#C9A84C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(201, 168, 76, 0.2)"
                  }}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "2rem", fontFamily: "var(--font-serif)", fontWeight: 400, marginBottom: "0.5rem" }}>Thank You</h3>
                    <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "1.05rem", maxWidth: "340px", lineHeight: "1.5", margin: 0 }}>
                      Your project inquiry has been received. Our lead architect will reach out to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      marginTop: "1.5rem",
                      padding: "0.75rem 2rem",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "9999px",
                      background: "transparent",
                      color: "#fff",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                    className="back-btn"
                  >
                    Send another message
                  </button>
                </div>
              )}

            </div>

          </div>
        </section>

        {/* ====================================================
         * SECTION 3: STYLIZED MAP (Coordinate Display)
         * ==================================================== */}
        <section className="blueprint-map-section" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="blueprint-map-container" style={{ 
            borderRadius: "24px", 
            overflow: "hidden", 
            position: "relative",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "radial-gradient(circle at 50% 50%, rgba(201, 168, 76, 0.08) 0%, rgba(0, 0, 0, 0.95) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            {/* Blueprint Grid Lines */}
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
              backgroundSize: "30px 30px"
            }} />
            
            {/* Architectural Vector Outlines */}
            <svg width="100%" height="100%" style={{ opacity: 0.2, position: "absolute" }}>
              <path d="M 0,100 Q 150,220 280,120 T 500,280 T 800,90 T 1100,310" fill="none" stroke="#fff" strokeWidth="1.5" />
              <path d="M 120,0 Q 220,150 140,280 T 280,500" fill="none" stroke="#fff" strokeWidth="1" />
              <path d="M 400,0 C 450,200 380,320 500,450" fill="none" stroke="#C9A84C" strokeWidth="2.5" />
            </svg>
            
            {/* Glowing Coordinate Circle Marker */}
            <div style={{ 
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              zIndex: 2
            }}>
              <div style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "#C9A84C",
                border: "3.5px solid #000",
                boxShadow: "0 0 25px #C9A84C",
                animation: "pulse 2s infinite"
              }} />
              <div style={{ 
                padding: "8px 16px", 
                borderRadius: "8px", 
                fontSize: "0.85rem", 
                color: "#fff",
                background: "rgba(0, 0, 0, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontWeight: 500
              }}>
                Decor Lab Headquarters
              </div>
            </div>
            
            {/* Coordinates display bottom right */}
            <div style={{ 
              position: "absolute",
              bottom: "20px",
              right: "30px",
              fontSize: "0.85rem",
              color: "rgba(255, 255, 255, 0.45)",
              fontFamily: "monospace",
              letterSpacing: "1px"
            }}>
              22.5450° N, 88.3513° E
            </div>

            {/* Get Directions Hover Button */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=GROUND+FLOOR+Vinayak+Garden+102+Raja+Dinendra+St+Manicktala+Gouri+Bari+Kolkata+West+Bengal+700004"
              target="_blank"
              rel="noopener noreferrer"
              className="map-get-directions-btn"
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 28px",
                background: "rgba(201, 168, 76, 0.12)",
                border: "1px solid rgba(201, 168, 76, 0.5)",
                borderRadius: "9999px",
                color: "#C9A84C",
                fontFamily: "monospace",
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                textDecoration: "none",
                backdropFilter: "blur(12px)",
                transition: "all 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
                zIndex: 5,
                whiteSpace: "nowrap"
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#C9A84C";
                el.style.color = "#000";
                el.style.borderColor = "#C9A84C";
                el.style.boxShadow = "0 8px 32px rgba(201, 168, 76, 0.4)";
                el.style.transform = "translateX(-50%) translateY(-3px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(201, 168, 76, 0.12)";
                el.style.color = "#C9A84C";
                el.style.borderColor = "rgba(201, 168, 76, 0.5)";
                el.style.boxShadow = "none";
                el.style.transform = "translateX(-50%) translateY(0)";
              }}
            >
              <svg style={{ width: "14px", height: "14px", flexShrink: 0 }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Get Directions to Our Headquarters
            </a>
          </div>
        </section>

      </main>

      {/* Embedded local CSS */}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .reveal-line-wrap {
          overflow: hidden;
        }

        .submit-btn-animated:hover {
          background-color: #C9A84C !important;
          color: #000 !important;
          box-shadow: 0 10px 25px rgba(201, 168, 76, 0.3);
        }

        .back-btn:hover {
          border-color: #fff !important;
          background-color: rgba(255, 255, 255, 0.05) !important;
        }

        /* ===== LAYOUT & RESPONSIVE GRID HELPERS ===== */
        .contact-hero-section {
          padding: 6rem 2.5rem 4rem;
        }
        .contact-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }
        
        .contact-details-section {
          padding: 8rem 2.5rem;
        }
        .contact-details-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }

        .blueprint-map-section {
          padding: 0 2.5rem 8rem;
        }
        .blueprint-map-container {
          height: 450px;
        }

        /* Desktop Layout (min-width: 1024px) */
        @media (min-width: 1024px) {
          .contact-hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
          }
          .contact-details-grid {
            grid-template-columns: 1fr 1.1fr;
            gap: 6rem;
          }
        }

        /* Tablet/Mobile Layouts (max-width: 1024px) */
        @media (max-width: 1024px) {
          .contact-hero-section {
            padding: 4rem 2rem 3rem;
          }
          .contact-details-section {
            padding: 6rem 2rem;
          }
          .blueprint-map-section {
            padding: 0 2rem 6rem;
          }
        }

        @media (max-width: 768px) {
          .contact-hero-section {
            padding: 3rem 1.5rem 2rem;
          }
          .contact-hero-grid {
            gap: 2.5rem;
          }
          .contact-hero-img-wrap {
            height: 45vh !important;
          }
          .contact-hero-title {
            font-size: clamp(2.2rem, 8vw, 3.8rem) !important;
            white-space: normal !important;
            line-height: 1.2 !important;
          }
          .contact-details-section {
            padding: 4rem 1.5rem;
          }
          .contact-details-grid {
            gap: 3rem;
          }
          .contact-form-panel {
            padding: 2rem !important;
          }
          .blueprint-map-section {
            padding: 0 1.5rem 4rem;
          }
          .blueprint-map-container {
            height: 320px;
          }

          /* Footer responsive stacking */
          .section-footer .footer-top {
            flex-direction: column !important;
            gap: 2.5rem !important;
          }
          .section-footer .footer-bottom {
            flex-direction: column !important;
            text-align: center !important;
            gap: 1rem !important;
          }
          .section-footer .footer-bottom-links {
            justify-content: center !important;
          }
        }

        @media (max-width: 480px) {
          .contact-hero-section {
            padding: 2rem 1rem 2rem;
          }
          .contact-details-section {
            padding: 3rem 1rem;
          }
          .contact-form-panel {
            padding: 1.5rem !important;
          }
          .blueprint-map-section {
            padding: 0 1rem 3rem;
          }
          .blueprint-map-container {
            height: 280px;
          }
        }
      `}</style>
    </div>
  );
}
