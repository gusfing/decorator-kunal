"use client";

import React, { useRef, useState, useEffect } from "react";
import Scroll3DEffect from "@/components/Scroll3DEffect";

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
    <div className="noise-overlay" style={{ backgroundColor: "#000", minHeight: "1000vh" }}>
      {/* Floating navigation header */}
      <header className="nav-header scrolled" id="main-header" style={{ opacity: 1, pointerEvents: "auto", position: "fixed", zIndex: 100 }}>
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
          <a href="/work" className="nav-link active" id="link-work" onMouseEnter={handleNavMouseEnter} onFocus={handleNavMouseEnter}>Work</a>
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

      <Scroll3DEffect 
        projects={projectsData} 
        onProjectClick={(idx) => {
          const p = projectsData[idx];
          if (p) {
            setLightboxProject({
              siteName: p.title,
              images: p.images,
              activeIndex: 0
            });
          }
        }}
      />

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
            style={{ zIndex: 1000 }} // Ensure it stays above the ThreeJS canvas
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

      {/* Lightbox styles */}
      <style jsx global>{`
        .project-lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          z-index: 999;
          cursor: pointer;
        }

        .project-lightbox {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90vw;
          height: 90vh;
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
        }

        .project-lightbox img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          pointer-events: auto;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          border-radius: 4px;
        }

        .project-lightbox-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: auto;
          color: white;
          transition: all 0.3s ease;
        }

        .project-lightbox-close:hover {
          background: white;
          color: black;
          transform: scale(1.1);
        }

        .project-lightbox-close svg {
          width: 24px;
          height: 24px;
          fill: currentColor;
        }

        .project-lightbox-prev,
        .project-lightbox-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: auto;
          color: white;
          transition: all 0.3s ease;
        }

        .project-lightbox-prev:hover,
        .project-lightbox-next:hover {
          background: white;
          color: black;
          transform: translateY(-50%) scale(1.1);
        }

        .project-lightbox-prev svg,
        .project-lightbox-next svg {
          width: 32px;
          height: 32px;
          fill: currentColor;
        }

        .project-lightbox-prev {
          left: 2rem;
        }

        .project-lightbox-next {
          right: 2rem;
        }

        .project-lightbox-caption {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          font-family: var(--font-body), sans-serif;
          font-size: 0.85rem;
          color: white;
          letter-spacing: 1px;
          text-transform: uppercase;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}
