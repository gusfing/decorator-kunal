"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FooterBanner from "@/components/urbanland/FooterBanner";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NubeSpec {
  model: string;
  name: string;
  structure: string;
  exterior: string;
  interior: string;
  height: string;
  capacity: string;
  access: string;
  img: string;
}

interface Project {
  id: string;
  title: string;
  location: string;
  category: string; // "residential" | "corporate" | "conceptual"
  description: string;
  specs: NubeSpec;
  images: string[];
}

export default function Work() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Core Projects database
  const projectsData: Project[] = [
    {
      id: "santhalia",
      title: "Santhalia Residence",
      location: "Kolkata, India",
      category: "residential",
      description: "An experimental 2,350 sq ft Kolkata residence showcasing a thoughtful application of unique materials, bespoke art installations, and signature ombre curtains. Highlighting clean, warm minimalism with organic plaster walls, textured linen panels, and soft, natural lighting to create a meditative atmosphere.",
      specs: {
        model: "Santhalia Residence",
        name: "Residential Masterpiece",
        structure: "Luxury Warm Minimalism",
        exterior: "Kolkata, India",
        interior: "2,350 sq ft",
        height: "2024",
        capacity: "Functionality & Aesthetics",
        access: "Ombre Curtains & Custom Art",
        img: "/assets/projects/santhalia_site/image_1.webp",
      },
      images: [
        "/assets/projects/santhalia_site/image_1.webp",
        "/assets/projects/santhalia_site/image_2.webp",
        "/assets/projects/santhalia_site/image_3.webp",
        "/assets/projects/santhalia_site/image_4.webp",
        "/assets/projects/santhalia_site/image_5.webp",
        "/assets/projects/santhalia_site/image_6.webp",
      ]
    },
    {
      id: "site01",
      title: "Corporate Workspace HQ",
      location: "Kolkata, India",
      category: "corporate",
      description: "An award-winning commercial headquarters that balances biophilic design principles with fluid spatial transitions. Incorporates custom-engineered partition systems, timber screening, and organic light wells to maximize natural daylighting and occupant productivity.",
      specs: {
        model: "Corporate HQ",
        name: "Commercial Office",
        structure: "Parametric Biophilic Design",
        exterior: "Kolkata, India",
        interior: "15,000 sq ft",
        height: "2024",
        capacity: "Collaboration & Wellness",
        access: "Timber Screening & Light Wells",
        img: "/assets/projects/site_01/image_1.webp",
      },
      images: [
        "/assets/projects/site_01/image_1.webp",
        "/assets/projects/site_01/image_2.webp",
        "/assets/projects/site_01/image_3.webp",
        "/assets/projects/site_01/image_4.webp",
        "/assets/projects/site_01/image_5.webp",
        "/assets/projects/site_01/image_6.webp",
      ]
    },
    {
      id: "site02",
      title: "Fluid Design Pavilion",
      location: "ICA Creative Minds Finalist",
      category: "conceptual",
      description: "A conceptual design project experimenting with double-curvature structures and organic spatial design. Seamlessly integrates interior architecture with warm lighting grids and natural texture layers to create a premium, immersive spatial flow.",
      specs: {
        model: "Fluid Architecture",
        name: "Conceptual Study",
        structure: "Double-Curvature Forms",
        exterior: "ICA Design Finalist",
        interior: "Conceptual Pavilion",
        height: "2025",
        capacity: "Parametric Exploration",
        access: "Aesthetic Lounges & Curved Shells",
        img: "/assets/projects/site_02/image_1.webp",
      },
      images: [
        "/assets/projects/site_02/image_1.webp",
        "/assets/projects/site_02/image_2.webp",
        "/assets/projects/site_02/image_3.webp",
        "/assets/projects/site_02/image_4.webp",
        "/assets/projects/site_02/image_5.webp",
        "/assets/projects/site_02/image_6.webp",
      ]
    },
    {
      id: "photosset1",
      title: "Aesthetic Lounge Curation",
      location: "Bengaluru, India",
      category: "residential",
      description: "A luxury residential lounge celebrating Mediterranean roots, clean plaster ceilings, and tactile materials. Formed as a design study presenting raw concrete furniture and soft decorative linen cushions beneath quiet spotlighting.",
      specs: {
        model: "Aesthetic Lounge",
        name: "Residential Lounge",
        structure: "Mediterranean Plaster & Linen",
        exterior: "Bengaluru, India",
        interior: "1,200 sq ft",
        height: "2023",
        capacity: "Tactile Curation",
        access: "Concrete Furniture & Linen",
        img: "/assets/projects/photos_set1/image_1.webp",
      },
      images: [
        "/assets/projects/photos_set1/image_1.webp",
        "/assets/projects/photos_set1/image_2.webp",
        "/assets/projects/photos_set1/image_3.webp",
        "/assets/projects/photos_set1/image_4.webp",
        "/assets/projects/photos_set1/image_5.webp",
        "/assets/projects/photos_set1/image_6.webp",
      ]
    },
    {
      id: "photosset2",
      title: "Collabs Curation HQ",
      location: "Madrid — Mumbai",
      category: "corporate",
      description: "A contemporary collaborative project showcase exhibiting smart fittings, geometric plaster work, and sensory scale transitions. Integrates structural curation with white art gallery spheres and platform beds.",
      specs: {
        model: "Collabs Curation",
        name: "Hardware Curation",
        structure: "Minimalist & Geometric Art",
        exterior: "Madrid — Mumbai",
        interior: "3,000 sq ft",
        height: "2024",
        capacity: "Scale Transitions",
        access: "Platform Curation & Spheres",
        img: "/assets/projects/photos_set2/image_1.webp",
      },
      images: [
        "/assets/projects/photos_set2/image_1.webp",
        "/assets/projects/photos_set2/image_2.webp",
        "/assets/projects/photos_set2/image_3.webp",
        "/assets/projects/photos_set2/image_4.webp",
        "/assets/projects/photos_set2/image_5.webp",
        "/assets/projects/photos_set2/image_6.webp",
      ]
    }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory);

  useGSAP(() => {
    // Clear old ScrollTriggers to prevent layout math overlap
    ScrollTrigger.getAll().forEach(t => t.kill());

    // Reset active index when category changes
    setActiveProjectIndex(0);

    // 1. Hero Stagger Entrance Animations
    const workChars = gsap.utils.toArray<HTMLElement>(".work-hero-title .work-char");
    if (workChars.length > 0) {
      gsap.fromTo(
        workChars,
        { yPercent: 100, rotateX: 30, opacity: 0, filter: "blur(8px)" },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.0,
          ease: "power4.out",
          stagger: 0.03,
        }
      );
    }

    if (document.querySelector(".work-hero-line")) {
      gsap.fromTo(
        ".work-hero-line",
        { width: "0%" },
        { width: "100%", duration: 1.2, ease: "power3.inOut", delay: 0.3 }
      );
    }

    // 2. Scale image scrubs inside fixed media preview frame (exact scale: 3)
    filteredProjects.forEach((project, index) => {
      const section = document.querySelector(`#section-${index + 1}`);
      const image = document.querySelector(`#preview-img-${index + 1}`);
      if (!section || !image) return;

      const startCondition = index === 0 ? "top top" : "bottom bottom";

      gsap.to(image, {
        scrollTrigger: {
          trigger: section,
          start: startCondition,
          end: () => {
            const viewportHeight = window.innerHeight;
            const sectionBottom = (section as HTMLElement).offsetTop + (section as HTMLElement).offsetHeight;
            const additionalDistance = viewportHeight * 0.5;
            const endValue = sectionBottom - viewportHeight + additionalDistance;
            return `+=${endValue}`;
          },
          scrub: 1,
        },
        scale: 3,
        ease: "none",
      });
    });

    // 3. Clip-path transitions
    const totalPreviews = filteredProjects.length;
    for (let i = 1; i <= totalPreviews; i++) {
      const preview = document.querySelector(`#preview-${i}`);
      const currentSection = `#section-${i}`;
      const nextSection = `#section-${i + 1}`;

      if (!preview || !document.querySelector(currentSection)) continue;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: currentSection,
          start: i === 1 ? "top center" : "center center",
          endTrigger: nextSection,
          end: "center center",
          scrub: 0.125,
        }
      });

      tl.fromTo(preview,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none", duration: 0.4 }
      )
      .to(preview,
        { duration: 0.2 } // Hold fully open
      )
      .to(preview,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", ease: "none", duration: 0.4 }
      );
    }

    // 4. Active project index trigger boundaries
    filteredProjects.forEach((_, idx) => {
      if (idx === 0) return;
      ScrollTrigger.create({
        trigger: `#section-${idx + 1}`,
        start: "top center",
        onEnter: () => setActiveProjectIndex(idx),
        onLeaveBack: () => setActiveProjectIndex(idx - 1)
      });
    });

    // 5. Scroll-linked overall progress bar
    if (document.querySelector(".scroll-progress-fill")) {
      gsap.fromTo(".scroll-progress-fill", 
        { width: "0%" },
        {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".gabriel-container",
            start: "top 20%",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );
    }

    // 6. Header hover-preview setup
    const headers = gsap.utils.toArray<HTMLElement>(".headers section h1");
    const hoverPreview = document.querySelector(".hover-preview-container");
    const hoverImg = document.querySelector(".hover-preview-img") as HTMLImageElement;

    if (hoverPreview && hoverImg) {
      headers.forEach((header, idx) => {
        if (idx >= filteredProjects.length) return; // skip last outline-text header
        
        header.addEventListener("mouseenter", () => {
          hoverImg.src = filteredProjects[idx].images[0];
          gsap.to(hoverPreview, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power3.out"
          });
        });

        header.addEventListener("mousemove", (e: any) => {
          gsap.to(hoverPreview, {
            x: e.clientX + 20,
            y: e.clientY + 20,
            duration: 0.1,
            ease: "power2.out"
          });
        });

        header.addEventListener("mouseleave", () => {
          gsap.to(hoverPreview, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power3.out"
          });
        });
      });
    }

    ScrollTrigger.refresh();
  }, [activeCategory]);

  // Lightbox modal state
  const [lightboxProject, setLightboxProject] = useState<{
    siteName: string;
    images: string[];
    activeIndex: number;
  } | null>(null);

  // Escape key exits lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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

  return (
    <div ref={containerRef} className="noise-overlay" style={{ backgroundColor: "#000", minHeight: "100vh" }}>
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
          <a href="/work" className="nav-link active" id="link-work" onMouseEnter={handleNavMouseEnter} onFocus={handleNavMouseEnter}>
            Work
          </a>
          <a href="/about" className="nav-link" id="link-about" onMouseEnter={handleNavMouseEnter} onFocus={handleNavMouseEnter}>
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

      {/* Floating Hover Preview Image Container */}
      <div className="hover-preview-container" style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 100, width: "260px", height: "170px", overflow: "hidden", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 15px 45px rgba(0,0,0,0.6)", opacity: 0, transform: "scale(0.8)", transition: "opacity 0.3s, transform 0.3s" }}>
        <img loading="lazy" className="hover-preview-img" src="" alt="Work thumbnail hover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Main Container */}
      <main style={{ backgroundColor: "#000", minHeight: "100vh", paddingTop: "8rem" }}>
        
        {/* Sleek Filter Tabs Overlay */}
        <div className="work-filter-bar glass" style={{ position: "fixed", top: "110px", left: "50%", transform: "translateX(-50%)", zIndex: 45, display: "flex", gap: "0.25rem", padding: "4px", borderRadius: "9999px" }}>
          {["all", "residential", "corporate", "conceptual"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              style={{
                background: activeCategory === cat ? "#C9A84C" : "transparent",
                color: activeCategory === cat ? "#000" : "rgba(255,255,255,0.6)",
                border: "none",
                borderRadius: "9999px",
                padding: "8px 18px",
                fontSize: "10px",
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="gabriel-container">
          
          {/* Minimal Project Details Fixed Overlay */}
          {filteredProjects.length > 0 && (
            <div className="specs-overlay" key={activeProjectIndex}>
              <span className="project-title-label">
                {filteredProjects[activeProjectIndex].title}
              </span>
              <div className="specs-grid">
                <span>Concept: {filteredProjects[activeProjectIndex].specs.structure}</span>
                <span>Area: {filteredProjects[activeProjectIndex].specs.interior}</span>
                <span>Year: {filteredProjects[activeProjectIndex].specs.height}</span>
                <span>Location: {filteredProjects[activeProjectIndex].specs.exterior}</span>
              </div>
            </div>
          )}

          {/* Dynamic Scroll Scrub Progress Bar Overlay */}
          <div className="scroll-indicator-overlay" style={{ position: "fixed", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "2rem", zIndex: 40, fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
            <span>{`0${activeProjectIndex + 1}`}</span>
            <div style={{ width: "120px", height: "2px", backgroundColor: "rgba(255,255,255,0.15)", position: "relative", borderRadius: "9999px", overflow: "hidden" }}>
              <div className="scroll-progress-fill" style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "0%", backgroundColor: "#C9A84C" }}></div>
            </div>
            <span>{`0${filteredProjects.length}`}</span>
          </div>

          {/* View Gallery Button Fixed Overlay */}
          {filteredProjects.length > 0 && (
            <button 
              onClick={() => setLightboxProject({
                siteName: filteredProjects[activeProjectIndex].title,
                images: filteredProjects[activeProjectIndex].images,
                activeIndex: 0
              })}
              className="gallery-btn"
              data-cursor="view"
            >
              <span>View Gallery</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          )}

          {/* Intro Copy shown in center background (revealed when previews exit) */}
          <div className="intro-copy">
            <span style={{ fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.25em", color: "#C9A84C", display: "block", marginBottom: "0.6rem" }}>PORTFOLIO</span>
            <h1 className="work-hero-title" style={{ fontSize: "4.2vw", fontFamily: "var(--font-display)", fontWeight: 800, textTransform: "uppercase", margin: 0, overflow: "visible", lineHeight: 1.25, paddingBottom: "0.15em", whiteSpace: "nowrap" }}>
              {"SELECTED WORKS".split("").map((char, index) => (
                <span key={index} className="work-char char-reveal" style={{ display: "inline-block" }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            <div className="work-hero-line" style={{ width: "0%", height: "1px", backgroundColor: "rgba(255,255,255,0.15)", margin: "0.75rem auto 0.5rem auto" }}></div>
            <p style={{ textTransform: "none", color: "rgba(255, 255, 255, 0.45)", fontSize: "12px", letterSpacing: "0.05em" }}>
              Scroll down to explore our curation
            </p>
          </div>

          {/* Scrolling Headers (Normal Scroll Flow) */}
          <div className="headers">
            {filteredProjects.map((project, index) => (
              <section id={`section-${index + 1}`} key={project.id}>
                <h1>{project.title.split(" ")[0]}</h1>
              </section>
            ))}
            <section id={`section-${filteredProjects.length + 1}`}>
              <h1 className="outline-text">Decor Lab</h1>
            </section>
            <div className="spacer"></div>
          </div>

          {/* Fixed Previews Layer */}
          <div className="section-previews">
            {filteredProjects.length > 0 && (
              <div 
                onClick={() => setLightboxProject({
                  siteName: filteredProjects[activeProjectIndex].title,
                  images: filteredProjects[activeProjectIndex].images,
                  activeIndex: 0
                })}
                className="relative w-full h-full cursor-pointer group pointer-events-auto"
                data-cursor="view"
              >
                {filteredProjects.map((project, index) => (
                  <div className="img" id={`preview-${index + 1}`} key={project.id}>
                    <img loading="lazy" id={`preview-img-${index + 1}`} src={project.images[0]} alt={project.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-20"></div>
                  </div>
                ))}

                {/* Interactive Glass Hover Badge */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
                  <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4.5 py-2.5 text-[9px] font-mono uppercase tracking-[0.2em] text-white flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View Gallery</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Premium Call to Action (CTA) consult block */}
        <FooterBanner isPreloaded={true} />

        {/* Decorative Marquee Band */}
        <div className="footer-marquee-section" style={{ background: '#0b0b0a', padding: "3rem 0" }}>
          <div className="marquee-strip">
            <div className="marquee-track">
              {[...Array(8)].map((_, i) => (
                <span key={i} className="marquee-item">Architecture &amp; Interior Design</span>
              ))}
            </div>
          </div>
        </div>

        {/* Studio Footer */}
        <footer id="work-footer" className="section-footer dark-footer">
          <div className="footer-container">
            <div className="footer-top">
              <div className="footer-brand">
                <div className="footer-logo">
                  <img src="/assets/Decorlab final-04.webp" alt="Decor Lab Logo" className="footer-logo-img" style={{ maxHeight: "36px", marginRight: "12px" }} />
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
                  <li style={{ fontSize: "0.95rem", lineHeight: 1.5, color: "rgba(255, 255, 255, 0.6)" }}>
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

      {/* Lightbox dialog modal */}
      {lightboxProject !== null && (
        <>
          <div
            className="project-lightbox-overlay"
            role="presentation"
            onClick={() => setLightboxProject(null)}
          ></div>
          <div
            className="project-lightbox"
            role="dialog"
            aria-label="Project image viewer"
            aria-modal="true"
          >
            <button
              className="project-lightbox-close"
              aria-label="Close image viewer"
              onClick={() => setLightboxProject(null)}
              autoFocus
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            <button
              className="project-lightbox-prev"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxProject(prev => {
                  if (!prev) return null;
                  const newIndex = (prev.activeIndex - 1 + prev.images.length) % prev.images.length;
                  return { ...prev, activeIndex: newIndex };
                });
              }}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            <img
              src={lightboxProject.images[lightboxProject.activeIndex]}
              alt={`${lightboxProject.siteName} photo`}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="project-lightbox-next"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxProject(prev => {
                  if (!prev) return null;
                  const newIndex = (prev.activeIndex + 1) % prev.images.length;
                  return { ...prev, activeIndex: newIndex };
                });
              }}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>

            <div className="project-lightbox-caption">
              <span>{lightboxProject.siteName} — Image {lightboxProject.activeIndex + 1} of {lightboxProject.images.length}</span>
            </div>
          </div>
        </>
      )}

      {/* Local responsive styling */}
      <style jsx global>{`
        .outline-text {
          color: transparent !important;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }
        .outline-text:hover {
          -webkit-text-stroke: 1px #C9A84C !important;
        }

        /* Gabriel Contassot 1:1 Scroll Animation Layout Styling */
        .gabriel-container {
          width: 100%;
          min-height: 100vh;
          background-color: #000;
          color: #fff;
          position: relative;
          overflow-x: hidden;
        }

        .gabriel-container h1 {
          color: #fff;
          font-size: 16vw;
          font-weight: 400;
          letter-spacing: -0.025em;
          text-transform: uppercase;
          text-align: center;
          font-family: var(--font-serif);
          position: relative;
          z-index: 2;
        }

        @media (min-width: 1024px) {
          .gabriel-container h1 {
            font-size: 14vw;
          }
        }

        .gabriel-container section {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 150vh 0;
        }

        .gabriel-container section:first-of-type {
          margin-top: 30vh;
        }

        .gabriel-container .section-previews {
          position: fixed;
          width: 75vw;
          height: 50vh;
          max-height: 400px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          pointer-events: none; /* Let pointer pass to overlay view button */
        }

        @media (min-width: 768px) {
          .gabriel-container .section-previews {
            width: 380px;
            height: 532px;
            max-height: none;
          }
        }

        @media (min-width: 1280px) {
          .gabriel-container .section-previews {
            width: 500px;
            height: 700px;
            max-height: none;
          }
        }

        .gabriel-container .img {
          width: 100%;
          height: 100%;
          position: absolute;
          clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.9);
        }

        .gabriel-container .img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gabriel-container .intro-copy {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          text-align: center;
          width: max-content;
          max-width: 95vw;
        }

        .gabriel-container .intro-copy p {
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          text-align: center;
        }

        .gabriel-container .spacer {
          width: 100%;
          height: 400px;
        }

        /* Lightbox Overlay and dialog modal layout styling */
        .project-lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 998;
        }
        .project-lightbox {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90vw;
          max-width: 1200px;
          height: 80vh;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .project-lightbox img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
        }
        .project-lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: transparent;
          border: none;
          color: #fff;
          cursor: pointer;
          width: 32px;
          height: 32px;
        }
        .project-lightbox-close svg {
          fill: currentColor;
          width: 100%;
          height: 100%;
        }
        .project-lightbox-prev, .project-lightbox-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .project-lightbox-prev:hover, .project-lightbox-next:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: #fff;
        }
        .project-lightbox-prev svg, .project-lightbox-next svg {
          fill: currentColor;
          width: 24px;
          height: 24px;
        }
        .project-lightbox-prev {
          left: 20px;
        }
        .project-lightbox-next {
          right: 20px;
        }
        .project-lightbox-caption {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.7);
          font-family: monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          white-space: nowrap;
        }

        .specs-overlay {
          position: fixed;
          z-index: 30;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: center;
          font-family: monospace;
          text-transform: uppercase;
          font-size: 10px;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.5);
          bottom: 64px;
          left: 24px;
          right: 24px;
          align-items: center;
        }
        .specs-overlay .project-title-label {
          color: #fff;
          font-weight: 600;
          font-size: 12px;
          font-family: sans-serif;
          text-transform: none;
          letter-spacing: normal;
          margin-bottom: 4px;
        }
        .specs-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px 16px;
        }
        @media (min-width: 1024px) {
          .specs-overlay {
            bottom: 40px;
            left: 40px;
            right: auto;
            text-align: left;
            align-items: flex-start;
          }
          .specs-grid {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
        }

        .gallery-btn {
          position: fixed;
          z-index: 30;
          pointer-events: auto;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          font-size: 9px;
          font-family: monospace;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.8);
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          transition: all 0.3s ease;
          cursor: pointer;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
        }
        .gallery-btn:hover {
          border-color: #fff;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.8);
        }
        @media (min-width: 1024px) {
          .gallery-btn {
            bottom: 40px;
            right: 40px;
            left: auto;
            transform: none;
          }
        }

        .section-footer.dark-footer {
          background-color: #080808 !important;
          color: #fff !important;
          transition: background-color 0.5s ease, color 0.5s ease;
        }
        .section-footer.dark-footer::before {
          background-color: rgba(255, 255, 255, 0.08) !important;
        }
        .section-footer.dark-footer .footer-logo-img {
          filter: brightness(0.95) !important;
        }
        .section-footer.dark-footer a {
          color: rgba(255, 255, 255, 0.6) !important;
        }
        .section-footer.dark-footer a:hover {
          color: #C9A84C !important;
        }
        .section-footer.dark-footer .footer-desc {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        .section-footer.dark-footer .footer-col-title {
          color: #fff !important;
        }
        .section-footer.dark-footer .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
        }
        .section-footer.dark-footer .footer-bottom-links a {
          color: rgba(255, 255, 255, 0.4) !important;
        }
        .section-footer.dark-footer .footer-bottom-links a:hover {
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}
