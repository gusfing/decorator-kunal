"use client";

import React, { useState, useEffect, useRef } from "react";
import FooterBanner from "@/components/urbanland/FooterBanner";

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

  // Close all pages when clicking outside the book
  const handleSceneClick = () => {
    setOpenItems([]);
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

        {/* 3D Book Gallery Scene */}
        <div className="scene" onClick={handleSceneClick}>
          <div className="bg-typography">
            <span>Selected</span>
            <span>Works</span>
          </div>

          <div className={"galeria-book-3d" + (openItems.length > 0 ? " book-open" : "")}>
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
        /* 3D Book Gallery Layout Styling */
        .scene {
          width: 100%;
          height: 80vh;
          min-height: 550px;
          perspective: 1200px;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
          background-image: url("/assets/projects/site_01/image_3.webp");
          background-size: cover;
          background-position: center;
          background-blend-mode: overlay;
          background-color: rgba(0, 0, 0, 0.88);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
          z-index: 0;
          mix-blend-mode: overlay;
          color: rgba(255, 255, 255, 0.15);
          font-family: var(--font-display, 'Syne', sans-serif);
          text-transform: uppercase;
        }

        .bg-typography span {
          display: block;
        }

        .galeria-book-3d {
          position: relative;
          width: clamp(250px, 18vw, 340px);
          height: clamp(375px, 27vw, 510px);
          perspective: 1200px;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          transform: translateX(0px);
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .galeria-book-3d.book-open {
          transform: translateX(25%);
        }

        .galeria-book-3d__item {
          position: absolute;
          width: 100%;
          height: 100%;
          perspective: 1200px;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-origin: left center;
          transform: rotateY(0deg);
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), z-index 0s;
          transition-delay: calc((4 - var(--i)) * 0.08s), calc((4 - var(--i)) * 0.08s + 0.3s);
          box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.5);
          cursor: pointer;
          z-index: calc(10 - var(--i));
          border-radius: 12px;
        }

        .galeria-book-3d__item.is-open {
          transform: rotateY(-180deg);
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
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .book-page-front {
          z-index: 2;
          transform: rotateY(0deg);
        }

        .book-page-back {
          transform: rotateY(180deg);
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
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 30%, rgba(0, 0, 0, 0.2) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem 1.5rem;
          color: #fff;
          z-index: 3;
        }

        .book-page-back-overlay {
          position: absolute;
          inset: 0;
          background: rgba(8, 8, 10, 0.9);
          backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem 1.5rem;
          color: #fff;
          z-index: 3;
          transform: rotateY(180deg); /* align text with back page */
        }

        .book-page-num {
          font-family: var(--font-body), monospace;
          font-size: 0.9rem;
          color: #C9A84C;
          margin-bottom: 0.5rem;
          letter-spacing: 2px;
          display: block;
        }

        .book-page-title {
          font-family: var(--font-serif), serif;
          font-size: clamp(1.4rem, 2vw, 1.8rem);
          line-height: 1.2;
          font-weight: 400;
          margin: 0 0 0.5rem 0;
        }

        .book-page-category {
          font-family: var(--font-body), sans-serif;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.6;
        }

        /* Back page specs details */
        .book-project-title {
          font-family: var(--font-serif), serif;
          font-size: clamp(1.3rem, 1.8vw, 1.6rem);
          font-weight: 400;
          margin: 0 0 0.25rem 0;
          color: #fff;
        }

        .book-project-loc {
          font-family: var(--font-body), sans-serif;
          font-size: 0.75rem;
          color: #C9A84C;
          margin-bottom: 1rem;
          display: block;
          letter-spacing: 0.5px;
        }

        .book-project-desc {
          font-family: var(--font-body), sans-serif;
          font-size: 0.8rem;
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
          gap: 0.6rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.8rem 0;
          margin-bottom: 1.2rem;
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-family: var(--font-body), sans-serif;
        }

        .spec-label {
          opacity: 0.5;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .spec-value {
          font-weight: 500;
          color: rgba(255, 255, 255, 0.95);
        }

        .book-project-btn {
          background: #C9A84C;
          color: #000;
          border: none;
          border-radius: 4px;
          padding: 0.7rem 1.2rem;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .book-project-btn:hover {
          background: #fff;
          color: #000;
          box-shadow: 0 5px 15px rgba(199, 168, 76, 0.4);
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
      `}</style>
    </div>
  );
}
