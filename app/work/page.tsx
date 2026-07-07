"use client";

import React, { useState, useEffect, useRef } from "react";

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
  const [openItems, setOpenItems] = useState<number[]>([]);
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = bookContainerRef.current;
    if (!container) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Max 8 degrees tilt on X and 12 degrees on Y for premium subtle parallax
    const rotateX = -(y / (rect.height / 2)) * 8;
    const rotateY = (x / (rect.width / 2)) * 12;
    
    container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) var(--open-translate, translateX(0px))`;
  };

  const handleMouseLeave = () => {
    const container = bookContainerRef.current;
    if (!container) return;
    container.style.transform = `rotateX(0deg) rotateY(0deg) var(--open-translate, translateX(0px))`;
  };

  useEffect(() => {
    const container = bookContainerRef.current;
    if (!container) return;
    container.style.transform = `rotateX(0deg) rotateY(0deg) var(--open-translate, translateX(0px))`;
  }, [openItems]);

  // Core Projects database
  const projectsData: Project[] = [
    {
      id: "santhalia",
      title: "Santhalia Residence",
      location: "Kolkata, India",
      category: "residential",
      description: "An experimental 2,350 sq ft Kolkata residence showcasing unique materials, bespoke art, and signature ombre curtains. Highlighting warm minimalism with organic plaster walls, textured linen panels, and soft natural lighting to create a meditative atmosphere.",
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
        "/assets/projects/santhalia_site/image_1.jpg",
        "/assets/projects/santhalia_site/image_2.jpg",
        "/assets/projects/santhalia_site/image_3.jpg",
        "/assets/projects/santhalia_site/image_4.jpg",
        "/assets/projects/santhalia_site/image_5.jpg",
        "/assets/projects/santhalia_site/image_6.jpg",
        "/assets/projects/santhalia_site/image_7.jpg",
        "/assets/projects/santhalia_site/image_8.jpg",
        "/assets/projects/santhalia_site/image_9.jpg",
        "/assets/projects/santhalia_site/image_10.jpg",
        "/assets/projects/santhalia_site/image_11.jpg",
        "/assets/projects/santhalia_site/image_12.jpg",
        "/assets/projects/santhalia_site/image_13.jpg",
        "/assets/projects/santhalia_site/image_14.jpg",
        "/assets/projects/santhalia_site/image_15.jpg",
        "/assets/projects/santhalia_site/image_16.jpg",
        "/assets/projects/santhalia_site/image_17.jpg",
        "/assets/projects/santhalia_site/image_18.jpg",
        "/assets/projects/santhalia_site/image_19.jpg",
        "/assets/projects/santhalia_site/image_20.jpg",
        "/assets/projects/santhalia_site/image_21.jpg",
        "/assets/projects/santhalia_site/image_22.jpg",
        "/assets/projects/santhalia_site/image_23.jpg",
        "/assets/projects/santhalia_site/image_24.jpg",
        "/assets/projects/santhalia_site/image_25.jpg",
        "/assets/projects/santhalia_site/image_26.jpg",
        "/assets/projects/santhalia_site/image_27.jpg",
        "/assets/projects/santhalia_site/image_28.jpg",
        "/assets/projects/santhalia_site/image_29.jpg",
        "/assets/projects/santhalia_site/image_30.jpg",
        "/assets/projects/santhalia_site/image_31.jpg",
        "/assets/projects/santhalia_site/image_32.jpg",
        "/assets/projects/santhalia_site/image_33.jpg"
      ]
    },
    {
      id: "site01",
      title: "Corporate Workspace HQ",
      location: "Kolkata, India",
      category: "corporate",
      description: "An award-winning commercial headquarters balancing biophilic design principles with fluid spatial transitions. Incorporates custom-engineered partition systems, timber screening, and organic light wells to maximize natural daylighting.",
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
      description: "A conceptual design project experimenting with double-curvature structures and organic spatial design. Seamlessly integrates interior architecture with warm lighting grids and natural texture layers to sculpt a premium, immersive spatial flow.",
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
    },
    {
      id: "rathi",
      title: "Rathi Residence",
      location: "India",
      category: "residential",
      description: "A beautifully curated residential space featuring customized decor and a harmonious material palette. Focuses on premium finishing and an elegant spatial arrangement.",
      specs: {
        model: "Rathi Residence",
        name: "Residential Decor",
        structure: "Modern Living",
        exterior: "India",
        interior: "Premium",
        height: "2025",
        capacity: "Elegant Flow",
        access: "Custom Furniture",
        img: "/assets/projects/rathi/image_1.jpg",
      },
      images: [
        "/assets/projects/rathi/image_1.jpg",
        "/assets/projects/rathi/image_2.jpg",
        "/assets/projects/rathi/image_3.jpg",
        "/assets/projects/rathi/image_4.jpg",
        "/assets/projects/rathi/image_5.jpg",
        "/assets/projects/rathi/image_6.jpg",
        "/assets/projects/rathi/image_7.jpg",
        "/assets/projects/rathi/image_8.jpg",
        "/assets/projects/rathi/image_9.jpg",
        "/assets/projects/rathi/image_10.jpg",
        "/assets/projects/rathi/image_11.jpg",
        "/assets/projects/rathi/image_12.jpg",
        "/assets/projects/rathi/image_13.jpg",
        "/assets/projects/rathi/image_14.jpg",
        "/assets/projects/rathi/image_15.jpg",
        "/assets/projects/rathi/image_16.jpg",
        "/assets/projects/rathi/image_17.jpg",
        "/assets/projects/rathi/image_18.jpg",
        "/assets/projects/rathi/image_19.jpg",
        "/assets/projects/rathi/image_20.jpg",
        "/assets/projects/rathi/image_21.jpg",
        "/assets/projects/rathi/image_22.jpg",
        "/assets/projects/rathi/image_23.jpg",
        "/assets/projects/rathi/image_24.jpg",
        "/assets/projects/rathi/image_25.jpg",
        "/assets/projects/rathi/image_26.jpg",
        "/assets/projects/rathi/image_27.jpg",
        "/assets/projects/rathi/image_28.jpg",
        "/assets/projects/rathi/image_29.jpg",
        "/assets/projects/rathi/image_30.jpg",
        "/assets/projects/rathi/image_31.jpg",
        "/assets/projects/rathi/image_32.jpg",
        "/assets/projects/rathi/image_33.jpg",
        "/assets/projects/rathi/image_34.jpg",
        "/assets/projects/rathi/image_35.jpg",
        "/assets/projects/rathi/image_36.jpg",
        "/assets/projects/rathi/image_37.jpg",
        "/assets/projects/rathi/image_38.jpg"
      ]
    },
    {
      id: "residential_3ds",
      title: "Residential 3D Concepts",
      location: "India",
      category: "conceptual",
      description: "High-quality 3D visualizations showcasing modern residential design concepts. Features detailed interior planning, lighting simulation, and material exploration.",
      specs: {
        model: "3D Concepts",
        name: "Interior Visualization",
        structure: "Digital Curation",
        exterior: "Conceptual",
        interior: "Digital",
        height: "2025",
        capacity: "Visual Planning",
        access: "High-Fidelity Rendering",
        img: "/assets/projects/residential_3ds/image_1.jpg",
      },
      images: [
        "/assets/projects/residential_3ds/image_1.jpg",
        "/assets/projects/residential_3ds/image_2.png",
        "/assets/projects/residential_3ds/image_3.jpg",
        "/assets/projects/residential_3ds/image_4.jpg",
        "/assets/projects/residential_3ds/image_5.jpg",
        "/assets/projects/residential_3ds/image_6.jpg",
        "/assets/projects/residential_3ds/image_7.png",
        "/assets/projects/residential_3ds/image_8.jpg",
        "/assets/projects/residential_3ds/image_9.jpg",
        "/assets/projects/residential_3ds/image_10.png",
        "/assets/projects/residential_3ds/image_11.jpg",
        "/assets/projects/residential_3ds/image_12.jpeg",
        "/assets/projects/residential_3ds/image_13.jpg"
      ]
    }
  ];

  const filteredProjects = activeCategory === "all"
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  // Close all pages when category changes
  useEffect(() => {
    setOpenItems([]);
  }, [activeCategory]);

  const handleItemClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    if (openItems.includes(idx)) {
      // Close this page and all pages after it (higher indices)
      setOpenItems(prev => prev.filter(i => i < idx));
    } else {
      // Open this page and all pages before it (lower indices)
      const newOpen: number[] = [];
      for (let i = 0; i <= idx; i++) {
        newOpen.push(i);
      }
      setOpenItems(newOpen);
    }
  };

  // Navigate next/prev when clicking the scene background
  const handleSceneClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    
    setOpenItems(prev => {
      // Right side of screen -> Next page
      if (clickX > rect.width / 2) {
        const nextIdx = prev.length;
        if (nextIdx < filteredProjects.length) {
          return [...prev, nextIdx];
        }
        return prev; // At the end
      } 
      // Left side of screen -> Previous page
      else {
        if (prev.length > 0) {
          return prev.slice(0, -1);
        }
        return prev; // Already fully closed
      }
    });
  };

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
    <div className="noise-overlay" style={{ backgroundColor: "#000", minHeight: "100vh" }}>
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

      {/* Main Container */}
      <main style={{ backgroundColor: "#000", minHeight: "100vh", paddingTop: "0" }}>
        
        {/* Sleek Filter Tabs Overlay */}
        <div className="work-filter-bar glass" style={{ position: "fixed", bottom: "40px", left: "50%", transform: "translateX(-50%)", zIndex: 45, display: "flex", gap: "0.25rem", padding: "4px", borderRadius: "9999px" }}>
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

        {/* 3D Book Gallery Scene */}
        <div 
          className="scene" 
          onClick={handleSceneClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ position: "relative" }}
        >
          {/* Ambient Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="scene-video-bg"
          >
            <source src="/assets/living-room-hero.mp4" type="video/mp4" />
          </video>
          {/* Dark Glassmorphic & Vignette Overlay */}
          <div className="scene-overlay"></div>

          <div className="bg-typography">
            <span>Selected</span>
            <span>Works</span>
          </div>

          <div 
            ref={bookContainerRef}
            className={"galeria-book-3d" + (openItems.length > 0 ? " book-open" : "")}
          >
            {filteredProjects.map((project, idx) => {
              const isOpen = openItems.includes(idx);
              return (
                <div
                  key={project.id}
                  className={"galeria-book-3d__item" + (isOpen ? " is-open" : "")}
                  style={{ "--i": idx } as React.CSSProperties}
                  onClick={(e) => handleItemClick(e, idx)}
                >
                  {/* Front Page (Cover) */}
                  <div className="book-page-front">
                    <img loading="lazy" src={project.images[0]} alt={`${project.title} Cover`} />
                    <div className="book-page-front-overlay">
                      <span className="book-page-num">0{idx + 1}</span>
                      <h3 className="book-page-title">{project.title}</h3>
                      <span className="book-page-category">{project.category}</span>
                    </div>
                  </div>

                  {/* Back Page (Details) */}
                  <div className="book-page-back">
                    <img loading="lazy" src={project.images[1] || project.images[0]} alt={`${project.title} details background`} />
                    <div className="book-page-back-overlay">
                      <h3 className="book-project-title">{project.title}</h3>
                      <span className="book-project-loc">{project.location}</span>
                      <p className="book-project-desc">{project.description}</p>
                      
                      <div className="book-project-specs">
                        <div className="spec-item">
                          <span className="spec-label">Concept</span>
                          <span className="spec-value">{project.specs.structure}</span>
                        </div>
                        <div className="spec-item">
                          <span className="spec-label">Area</span>
                          <span className="spec-value">{project.specs.interior}</span>
                        </div>
                      </div>

                      <button
                        className="book-project-btn"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent closing page
                          setLightboxProject({
                            siteName: project.title,
                            images: project.images,
                            activeIndex: 0
                          });
                        }}
                      >
                        View Gallery
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>



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
                    Vinayak Garden, Kolkata,
                    <br />
                    West Bengal 700004
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
              <p>&copy; 2026 Decorlab. All rights reserved.</p>
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
        /* 3D Book Gallery Layout Styling */
        .scene {
          width: 100%;
          height: 100vh;
          min-height: 580px;
          perspective: 1500px;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
          background-color: #050505;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .scene-video-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
          opacity: 1;
        }

        .scene-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: transparent;
        }

        .bg-typography {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          text-align: center;
          font-size: clamp(3rem, 12vw, 10rem);
          font-weight: 800;
          line-height: 0.85;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 5vw;
          pointer-events: none;
          z-index: 2;
          mix-blend-mode: overlay;
          color: rgba(255, 255, 255, 0.15);
          font-family: var(--font-display, 'Syne', sans-serif);
          text-transform: uppercase;
        }

        .bg-typography span {
          display: block;
        }

        .galeria-book-3d {
          --open-translate: translateX(0px);
          position: relative;
          width: clamp(160px, 22vw, 340px);
          height: clamp(240px, 33vw, 510px);
          perspective: 1500px;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          transform: rotateX(0deg) rotateY(0deg) var(--open-translate);
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        .galeria-book-3d.book-open {
          --open-translate: translateX(50%);
        }

        .galeria-book-3d__item {
          position: absolute;
          width: 100%;
          height: 100%;
          perspective: 1500px;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-origin: left center;
          transform: translate3d(calc(var(--i) * -1px), 0, calc(var(--i) * -2px)) rotateY(0deg);
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), z-index 0s;
          transition-delay: calc((4 - var(--i)) * 0.08s), calc((4 - var(--i)) * 0.08s + 0.4s);
          box-shadow: 10px 15px 35px rgba(0, 0, 0, 0.6);
          cursor: pointer;
          z-index: calc(10 - var(--i));
          border-radius: 12px;
        }

        .galeria-book-3d__item.is-open {
          transform: translate3d(calc((var(--i) - 4) * 1px), 0, calc(var(--i) * 2px + 2px)) rotateY(-180deg);
          transition-delay: 0s, 0s;
          z-index: calc(20 + var(--i));
        }

        .book-page-front,
        .book-page-back {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          backface-visibility: hidden;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.6);
        }

        .book-page-front {
          z-index: 2;
          transform: rotateY(0deg);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-left: 4px solid #C9A84C;
        }

        .book-page-back {
          transform: rotateY(180deg);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-right: 4px solid #C9A84C;
        }

        .book-page-front img,
        .book-page-back img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          background: #111;
        }

        /* Gradient overlays */
        .book-page-front-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 60%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
          color: #fff;
          z-index: 3;
        }

        .book-page-back-overlay {
          position: absolute;
          inset: 0;
          background: rgba(8, 8, 10, 0.85);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 1.5rem;
          color: #fff;
          z-index: 3;
          overflow-y: auto;
        }

        .book-page-back-overlay::-webkit-scrollbar {
          width: 4px;
        }
        .book-page-back-overlay::-webkit-scrollbar-track {
          background: transparent;
        }
        .book-page-back-overlay::-webkit-scrollbar-thumb {
          background: rgba(201, 168, 76, 0.5);
          border-radius: 4px;
        }

        .book-page-num {
          font-family: var(--font-body), monospace;
          font-size: 0.85rem;
          color: #C9A84C;
          margin-bottom: 0.75rem;
          letter-spacing: 3px;
          display: block;
          font-weight: 500;
        }

        .book-page-title {
          font-family: var(--font-serif), serif;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          line-height: 1.1;
          font-weight: 300;
          margin: 0 0 0.75rem 0;
          letter-spacing: -0.5px;
        }

        .book-page-category {
          font-family: var(--font-body), sans-serif;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          opacity: 0.7;
          color: #fff;
        }

        /* Back page specs details */
        .book-project-title {
          font-family: var(--font-serif), serif;
          font-size: clamp(1.1rem, 1.5vw, 1.4rem);
          font-weight: 400;
          margin: 0 0 0.25rem 0;
          color: #fff;
        }

        .book-project-loc {
          font-family: var(--font-body), sans-serif;
          font-size: 0.7rem;
          color: #C9A84C;
          margin-bottom: 0.8rem;
          display: block;
          letter-spacing: 0.5px;
        }

        .book-project-desc {
          font-family: var(--font-body), sans-serif;
          font-size: clamp(0.7rem, 1.2vw, 0.8rem);
          line-height: 1.5;
          opacity: 0.75;
          margin-bottom: 1.2rem;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .book-project-specs {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.8rem 0;
          margin-bottom: 1rem;
        }

        .spec-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-family: var(--font-body), sans-serif;
        }

        .spec-label {
          opacity: 0.5;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 0.65rem;
        }

        .spec-value {
          font-weight: 500;
          color: rgba(255, 255, 255, 0.95);
        }

        .book-project-btn {
          margin-top: auto;
          background: linear-gradient(135deg, #C9A84C 0%, #E6C675 50%, #C9A84C 100%);
          color: #000;
          border: none;
          border-radius: 6px;
          padding: 0.7rem 1.2rem;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          width: 100%;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .book-project-btn:hover {
          background: #fff;
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(230, 198, 117, 0.5);
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

        /* Mobile specific styling for Notepad top-bottom flip */
        @media (max-width: 768px) {
          .galeria-book-3d {
            width: clamp(260px, 85vw, 350px);
            height: clamp(300px, 42vh, 400px); /* Increased height to show full content */
          }
          
          .galeria-book-3d.book-open {
            --open-translate: translateY(50%);
          }
          
          .galeria-book-3d__item {
            transform-origin: center top;
            transform: translate3d(0, calc(var(--i) * -1px), calc(var(--i) * -2px)) rotateX(0deg);
          }
          
          .galeria-book-3d__item.is-open {
            transform: translate3d(0, calc((var(--i) - 4) * 1px), calc(var(--i) * 2px + 2px)) rotateX(180deg);
          }
          
          .book-page-front {
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-top: 4px solid #C9A84C;
          }
          
          .book-page-back {
            transform: rotateX(180deg);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-bottom: 4px solid #C9A84C;
          }

          /* Mobile Redesign for Cards to fit content */
          .book-page-front-overlay, 
          .book-page-back-overlay {
            padding: 1.2rem;
          }

          .book-project-title {
            font-size: 1.25rem;
            margin-bottom: 0.2rem;
          }

          .book-project-loc {
            font-size: 0.65rem;
            margin-bottom: 0.6rem;
          }

          .book-project-desc {
            font-size: 0.7rem;
            -webkit-line-clamp: 3;
            margin-bottom: 0.8rem;
          }

          .book-project-specs {
            padding: 0.6rem 0;
            margin-bottom: 0.8rem;
            gap: 0.4rem;
          }

          .spec-item {
            flex-direction: row; /* Stack horizontally to save vertical space */
            justify-content: space-between;
            align-items: center;
          }

          .spec-label {
            font-size: 0.6rem;
          }

          .spec-value {
            font-size: 0.7rem;
            text-align: right;
            max-width: 65%;
          }

          .book-project-btn {
            padding: 0.6rem 1rem;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}
