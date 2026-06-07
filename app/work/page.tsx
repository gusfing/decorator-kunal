"use client";

import React, { useState, useEffect, useRef } from "react";
import { MagicText } from "@/components/ui/magic-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
  const [currentTheme, setCurrentTheme] = useState("light");
  const navIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Text paragraph reveal (blur -> sharp)
    const textParagraphs = gsap.utils.toArray<HTMLElement>(".project-text-column p, .studio-container p");
    textParagraphs.forEach((el) => {
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

    // 3. Technical specification glass panels fade up
    const specPanels = gsap.utils.toArray<HTMLElement>(".project-text-column .founder-card");
    specPanels.forEach((panel) => {
      gsap.fromTo(panel,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 88%",
            toggleActions: "play none none none",
          }
        }
      );
    });

    // 4. Staggered scale + blur reveal for all project thumbnail images
    const thumbnailWrappers = gsap.utils.toArray<HTMLElement>(".showcase-gallery-item");
    thumbnailWrappers.forEach((wrapper, idx) => {
      const img = wrapper.querySelector("img");
      if (img) {
        gsap.fromTo(img,
          { scale: 1.25, filter: "blur(6px)" },
          {
            scale: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: (idx % 3) * 0.12,
          }
        );
      }
    });

  });
  
  // Category filter state
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Lightbox modal state
  const [lightboxProject, setLightboxProject] = useState<{
    siteName: string;
    images: string[];
    activeIndex: number;
  } | null>(null);

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
        img: "/assets/projects/santhalia_site/image_1.jpg",
      },
      images: [
        "/assets/projects/santhalia_site/image_1.jpg",
        "/assets/projects/santhalia_site/image_2.jpg",
        "/assets/projects/santhalia_site/image_3.jpg",
        "/assets/projects/santhalia_site/image_4.jpg",
        "/assets/projects/santhalia_site/image_5.jpg",
        "/assets/projects/santhalia_site/image_6.jpg",
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
        img: "/assets/projects/site_01/image_1.jpg",
      },
      images: [
        "/assets/projects/site_01/image_1.jpg",
        "/assets/projects/site_01/image_2.jpg",
        "/assets/projects/site_01/image_3.jpg",
        "/assets/projects/site_01/image_4.jpg",
        "/assets/projects/site_01/image_5.jpg",
        "/assets/projects/site_01/image_6.jpg",
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
        img: "/assets/projects/site_02/image_1.jpg",
      },
      images: [
        "/assets/projects/site_02/image_1.jpg",
        "/assets/projects/site_02/image_2.jpg",
        "/assets/projects/site_02/image_3.jpg",
        "/assets/projects/site_02/image_4.jpg",
        "/assets/projects/site_02/image_5.jpg",
        "/assets/projects/site_02/image_6.jpg",
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["work-catalog", "work-footer"];
      let active = "work-catalog";

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

      if (active === "work-catalog") {
        setCurrentTheme("light");
      } else {
        setCurrentTheme("dark");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Filter projects by category
  const filteredProjects = activeCategory === "all" 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory);

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
            className="nav-link active"
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
         * WORK PORTFOLIO
         * ==================================================== */}
        <section id="work-catalog" className="section-studio" style={{ padding: "4rem 2.5rem 6rem" }}>
          <div className="studio-container" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            
            {/* Header Block */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h4 className="studio-subtitle">PORTFOLIO</h4>
              <div className="studio-headline" style={{ padding: "0" }}>
                <MagicText text="Our Architectural & Design Works." />
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="showcase-tabs" style={{ alignSelf: "flex-start", marginTop: "1rem", marginBottom: "2rem" }}>
              <button 
                className={`showcase-tab ${activeCategory === "all" ? "active" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                All Works
              </button>
              <button 
                className={`showcase-tab ${activeCategory === "residential" ? "active" : ""}`}
                onClick={() => setActiveCategory("residential")}
              >
                Residential
              </button>
              <button 
                className={`showcase-tab ${activeCategory === "corporate" ? "active" : ""}`}
                onClick={() => setActiveCategory("corporate")}
              >
                Corporate HQ
              </button>
              <button 
                className={`showcase-tab ${activeCategory === "conceptual" ? "active" : ""}`}
                onClick={() => setActiveCategory("conceptual")}
              >
                Conceptual Studs
              </button>
            </div>

            {/* Portfolio Grid Layout */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8rem" }}>
              {filteredProjects.map((project, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div 
                    key={project.id} 
                    style={{ 
                      display: "grid", 
                      gridTemplateColumns: "1fr 1.2fr", 
                      gap: "4rem",
                      alignItems: "start",
                      textAlign: "left"
                    }}
                    className="work-project-row"
                  >
                    
                    {/* Project Left Side: Details & Specifications */}
                    <div style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      gap: "2rem",
                      order: isEven ? 1 : 2
                    }}
                    className="project-text-column"
                    >
                      <div>
                        <span className="founder-title" style={{ fontSize: "0.8rem", letterSpacing: "2px" }}>
                          {project.category.toUpperCase()} / {project.location}
                        </span>
                        <h2 className="serif-headline" style={{ fontSize: "2.75rem", marginTop: "0.5rem", marginBottom: "1.25rem", fontWeight: 400 }}>
                          {project.title}
                        </h2>
                        <p style={{ color: "rgba(42, 41, 40, 0.75)", fontSize: "1.05rem", lineHeight: "1.6" }}>
                          {project.description}
                        </p>
                      </div>

                      {/* Glassmorphic Specifications Panel */}
                      <div className="founder-card" style={{ 
                        padding: "1.5rem 2rem", 
                        border: "1px solid rgba(42, 41, 40, 0.08)",
                        background: "rgba(255, 255, 255, 0.25)"
                      }}>
                        <h4 className="founder-title" style={{ fontSize: "0.75rem", letterSpacing: "2.5px", marginBottom: "1.25rem" }}>
                          TECHNICAL SPECIFICATIONS
                        </h4>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", borderBottom: "1px solid rgba(42, 41, 40, 0.05)", paddingBottom: "8px" }}>
                            <span style={{ color: "rgba(42, 41, 40, 0.55)" }}>Design Concept</span>
                            <span style={{ fontWeight: 500, color: "var(--text-dark)" }}>{project.specs.structure}</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", borderBottom: "1px solid rgba(42, 41, 40, 0.05)", paddingBottom: "8px" }}>
                            <span style={{ color: "rgba(42, 41, 40, 0.55)" }}>Location / Client</span>
                            <span style={{ fontWeight: 500, color: "var(--text-dark)" }}>{project.specs.exterior}</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", borderBottom: "1px solid rgba(42, 41, 40, 0.05)", paddingBottom: "8px" }}>
                            <span style={{ color: "rgba(42, 41, 40, 0.55)" }}>Built Area</span>
                            <span style={{ fontWeight: 500, color: "var(--text-dark)" }}>{project.specs.interior}</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", borderBottom: "1px solid rgba(42, 41, 40, 0.05)", paddingBottom: "8px" }}>
                            <span style={{ color: "rgba(42, 41, 40, 0.55)" }}>Completion Year</span>
                            <span style={{ fontWeight: 500, color: "var(--text-dark)" }}>{project.specs.height}</span>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", paddingBottom: "4px" }}>
                            <span style={{ color: "rgba(42, 41, 40, 0.55)" }}>Bespoke Features</span>
                            <span style={{ fontWeight: 500, color: "var(--text-dark)", textAlign: "right", maxWidth: "200px" }}>{project.specs.access}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Right Side: 6-Image Thumbnail Grid */}
                    <div 
                      className="showcase-gallery-grid project-image-column" 
                      style={{ 
                        order: isEven ? 2 : 1,
                        gap: "16px",
                        margin: 0
                      }}
                    >
                      {project.images.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          className="showcase-gallery-item"
                          style={{ margin: 0 }}
                          onClick={() => setLightboxProject({
                            siteName: project.title,
                            images: project.images,
                            activeIndex: imgIdx
                          })}
                        >
                          <img src={img} alt={`${project.title} gallery view ${imgIdx + 1}`} />
                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ====================================================
         * STUDIO FOOTER
         * ==================================================== */}
        <footer id="work-footer" className="section-footer">
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

      {/* ====================================================
       * LIGHTBOX MODAL DIALOG
       * ==================================================== */}
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
        @media (max-width: 900px) {
          .work-project-row {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .project-text-column {
            order: 1 !important;
          }
          .project-image-column {
            order: 2 !important;
          }
        }
      `}</style>
    </>
  );
}
