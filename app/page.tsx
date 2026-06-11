"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MagicText } from "@/components/ui/magic-text";
import { splitTextIntoWords } from "@/lib/domUtils";
import Gallery from "../components/capsule/Gallery/Gallery";
import Feedback from "../components/urbanland/Feedback";
import FooterBanner from "../components/urbanland/FooterBanner";

// Register GSAP plugins client-side only (Next.js SSR safe)
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase, ScrollTrigger);
}

// Custom type definitions
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

interface InstaPost {
  img: string;
  caption: string;
  likes: string;
  comments: string;
}

export default function Home() {
  // Preloader / Entrance state
  const [showPreloader, setShowPreloader] = useState(true);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  const scrollToProcessStep = (index: number) => {
    const el = document.getElementById(`process-step-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Bulletproof fallback: force hide preloader and reveal site after 3.8s in case any animation is interrupted, skipped, or cached
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloaded(true);
      setShowPreloader(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  // Physically remove preloader DOM nodes when loading transitions to finished
  useEffect(() => {
    if (!showPreloader) {
      const preloaderNode = document.querySelector(".preloader");
      const preloaderHeaderNode = document.getElementById("preloader-header-container");
      if (preloaderNode) {
        preloaderNode.remove();
      }
      if (preloaderHeaderNode) {
        preloaderHeaderNode.remove();
      }
    }
  }, [showPreloader]);

  // Hero state
  const [activeSlide, setActiveSlide] = useState(1); // Set to default Nube interior tunnel slide
  const [dofBlur, setDofBlur] = useState(false);

  // Navigation & Scroll states
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [currentTheme, setCurrentTheme] = useState("dark");

  // Modals state
  const [selectedNube, setSelectedNube] = useState<number | null>(null);
  const [selectedInsta, setSelectedInsta] = useState<number | null>(null);

  // Newsletter state
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Projects gallery states
  const [activeProjectTab, setActiveProjectTab] = useState("santhalia");
  const [lightboxProject, setLightboxProject] = useState<{
    siteName: string;
    images: string[];
    activeIndex: number;
  } | null>(null);

  const projectsData = [
    {
      id: "santhalia",
      title: "Santhalia Residence",
      location: "Kolkata, India",
      description: "An experimental 2,350 sq ft Kolkata residence showcasing a thoughtful application of unique materials, bespoke art installations, and signature ombre curtains. Highlighting clean, warm minimalism with organic plaster walls, textured linen panels, and soft, natural lighting to create a meditative atmosphere.",
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
      description: "An award-winning commercial headquarters that balances biophilic design principles with fluid spatial transitions. Incorporates custom-engineered partition systems, timber screening, and organic light wells to maximize natural daylighting and occupant productivity.",
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
      description: "A conceptual design project experimenting with double-curvature structures and organic spatial design. Seamlessly integrates interior architecture with warm lighting grids and natural texture layers to create a premium, immersive spatial flow.",
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


  // Ref hooks for GSAP animations
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderHeaderRef = useRef<HTMLDivElement>(null);
  const navIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const runningTextRef = useRef<HTMLDivElement>(null);

  // Hero slideshow content list
  const heroSlides = [
    {
      model: "Santhalia Residence",
      title: "Close to Nature — Close to Yourself",
      desc: "Warm minimalist residences crafted with bespoke art and unique materials.",
      bg: "/assets/projects/santhalia_site/image_1.jpg",
    },
    {
      model: "Corporate Workspace HQ",
      title: "Atmospheric Design Sanctuaries",
      desc: "Step into an organic workspace of fluid lines and custom lighting.",
      bg: "/assets/projects/site_01/image_1.jpg",
    },
    {
      model: "Fluid Architecture",
      title: "Fluidity is in the air",
      desc: "Unconventional structures and curved forms creating serene environments.",
      bg: "/assets/projects/site_02/image_1.jpg",
    },
    {
      model: "Aesthetic Lounges",
      title: "Tailored Interior Curation",
      desc: "Linen, raw concrete, and plaster studies creating signature spaces.",
      bg: "/assets/projects/photos_set1/image_1.jpg",
    },
  ];

  // Specifications specifications data
  const nubeSpecs: NubeSpec[] = [
    {
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
    {
      model: "Corporate HQ",
      name: "Commercial Office",
      structure: "Parametric Biophilic Design",
      exterior: "Kolkata, India",
      interior: "15,000 sq ft",
      height: "2024",
      capacity: "Collaborative Wellness",
      access: "Parametric Timber Screening",
      img: "/assets/projects/site_01/image_1.jpg",
    },
    {
      model: "Fluid Architecture",
      name: "Futuristic Pavilion",
      structure: "Fluid Parametric Forms",
      exterior: "Mumbai, India (Concept)",
      interior: "5,000 sq ft",
      height: "2025",
      capacity: "Freeform Curved Concrete",
      access: "Oculus Dome & Spatial Flow",
      img: "/assets/projects/site_02/image_1.jpg",
    },
    {
      model: "Residential Lounge",
      name: "Aesthetic Study",
      structure: "Mediterranean Plaster & Linen",
      exterior: "Bengaluru, India",
      interior: "1,200 sq ft",
      height: "2023",
      capacity: "Tactile Textures",
      access: "Linen Cushions & Concrete Studies",
      img: "/assets/projects/photos_set1/image_1.jpg",
    },
  ];

  // Instagram feed data
  const instaPosts: InstaPost[] = [
    {
      img: "/assets/projects/photos_set1/image_2.jpg",
      caption: "A sleek beige organic sofa matches standard-setting minimal plaster walls. Elevating curated interior installations with custom textiles and low-pressure inflatable elements. Madrid — Mumbai.",
      likes: "1,824",
      comments: "84",
    },
    {
      img: "/assets/projects/photos_set1/image_3.jpg",
      caption: "Tactile studies in linen. Blending organic soft pillows and pillow-shaped cushion installations into peaceful structural concepts. Habitats made to dream. #DecorLab",
      likes: "2,412",
      comments: "126",
    },
    {
      img: "/assets/projects/photos_set1/image_4.jpg",
      caption: "Sculptured circular lines and stark concrete detail studies. Curated pampas accents contrast beautifully with organic white dining modules. Clean living aesthetics.",
      likes: "1,538",
      comments: "42",
    },
    {
      img: "/assets/projects/photos_set2/image_2.jpg",
      caption: "Plaster ceilings, low oak platform beds, and pristine linen sheets catch the morning sunbeams. A cozy, high-end design study celebrating Mediterranean roots.",
      likes: "3,104",
      comments: "194",
    },
    {
      img: "/assets/projects/photos_set2/image_3.jpg",
      caption: "Modern art installation featuring white geometric spheres and abstract minimalist shapes under clean gallery spotlighting. Sensory scale transitions.",
      likes: "1,209",
      comments: "38",
    },
    {
      img: "/assets/projects/photos_set2/image_4.jpg",
      caption: "Concrete study and dry decorative accents in our design lab. Moods of shadow and light reflecting the future of premium interior architectures.",
      likes: "2,945",
      comments: "107",
    },
  ];

  // Scroll triggers and general side effects
  useEffect(() => {
    // Standard scroll listener for header styling and active themes
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setIsScrolled(scrollPos > window.innerHeight * 0.1);

      // Section tracking for nav links & dark/light theme switching
      const sections = [
        "section-hero",
        "section-about",
        "process",
        "collection",
        "collabs",
        "press",
        "showcase",
        "instagram",
        "contact-footer"
      ];
      let active = "section-hero";

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

      setActiveSection(active);

      // Map light background sections to light theme
      if (
        active === "process" ||
        active === "collection" ||
        active === "collabs" ||
        active === "press" ||
        active === "showcase" ||
        active === "instagram"
      ) {
        setCurrentTheme("light");
      } else {
        setCurrentTheme("dark");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modal key hook (ESC key exits modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedNube(null);
        setSelectedInsta(null);
        setLightboxProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Manage body scroll freezing when modals open
  useEffect(() => {
    if (selectedNube !== null || selectedInsta !== null || showPreloader || lightboxProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedNube, selectedInsta, showPreloader, lightboxProject]);


  // Entrance timelines with GSAP
  useGSAP(() => {
    try {
      // Custom ease curve mapping vanilla bezier
      CustomEase.create("hop", "0.9, 0, 0.1, 1");

      const preloader = preloaderRef.current;
      const headerContainer = preloaderHeaderRef.current;

      if (!preloader || !headerContainer) return;

      // Split text selector helpers
      const chars = gsap.utils.toArray<HTMLElement>("#preloader-title-link .char");
      const lines = gsap.utils.toArray<HTMLElement>(".preloader-copy p .line");
      const heroLines = gsap.utils.toArray<HTMLElement>(".hero-brand-title");
      const preloaderImages = gsap.utils.toArray<HTMLElement>(".preloader-images .img");
      const preloaderImagesInner = gsap.utils.toArray<HTMLElement>(".preloader-images .img img");

      // Initialize offsets
      if (chars.length > 0) {
        chars.forEach((char, i) => {
          gsap.set(char, { yPercent: i % 2 === 0 ? -100 : 100 });
        });
      }
      if (lines.length > 0) {
        gsap.set(lines, { yPercent: 100 });
      }
      if (heroLines.length > 0) {
        gsap.set(heroLines, { yPercent: 100 });
      }

      const tl = gsap.timeline({ delay: 0.25 });

      // Progress Bar loading phase
      if (document.querySelector(".progress-bar")) {
        const counterObj = { value: 0 };
        tl.to(".progress-bar", {
          scaleX: 1,
          duration: 3,
          ease: "power3.inOut",
        }, 0)
          .to(counterObj, {
            value: 100,
            duration: 3,
            ease: "power3.inOut",
            onUpdate: () => {
              const counterEl = document.querySelector(".preloader-counter");
              if (counterEl) {
                counterEl.textContent = Math.floor(counterObj.value).toString().padStart(3, "0");
              }
            }
          }, 0)
          .set(".progress-bar", { transformOrigin: "right" })
          .to(".progress-bar", {
            scaleX: 0,
            duration: 0.8,
            ease: "power3.in",
          })
          .to(".preloader-counter", {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.in",
          }, "-=0.8");
      }

      // Image polygon reveals
      if (preloaderImages.length > 0) {
        preloaderImages.forEach((img, i) => {
          tl.to(
            img,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: 0.8,
              ease: "hop",
              delay: i * 0.55,
            },
            "-=3.8"
          );
        });
      }

      if (preloaderImagesInner.length > 0) {
        preloaderImagesInner.forEach((img, i) => {
          tl.to(
            img,
            {
              scale: 1,
              duration: 1.2,
              ease: "hop",
              delay: i * 0.55,
            },
            "-=4.0"
          );
        });
      }

      // Preloader copy reveals
      if (lines.length > 0) {
        tl.to(
          lines,
          {
            yPercent: 0,
            duration: 1.5,
            ease: "hop",
            stagger: 0.08,
          },
          "-=4.2"
        );
      }

      if (chars.length > 0) {
        tl.to(
          chars,
          {
            yPercent: 0,
            duration: 0.8,
            ease: "hop",
            stagger: 0.02,
          },
          "-=3.8"
        );
      }

      if (document.querySelector(".preloader-images")) {
        tl.to(
          ".preloader-images",
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.8,
            ease: "hop",
          },
          "-=1.2"
        );
      }

      if (lines.length > 0) {
        tl.to(
          lines,
          {
            y: "-125%",
            duration: 1.5,
            ease: "hop",
            stagger: 0.08,
          },
          "-=1.5"
        );
      }

      // Characters meeting stagger logo merger
      if (chars.length > 0) {
        tl.to(
          chars,
          {
            yPercent: (index) => {
              if (index === 0 || index === chars.length - 1) return 0;
              return index % 2 === 0 ? 100 : -100;
            },
            duration: 0.8,
            ease: "hop",
            stagger: 0.02,
            delay: 0.3,
            onStart: () => {
              const initialChar = chars[0];
              const lastChar = chars[chars.length - 1];

              if (initialChar && lastChar) {
                const initialCharMask = initialChar.parentElement;
                const lastCharMask = lastChar.parentElement;

                if (initialCharMask) initialCharMask.style.overflow = "visible";
                if (lastCharMask) lastCharMask.style.overflow = "visible";

                const viewportWidth = window.innerWidth;
                const centerX = viewportWidth / 2;
                const initialCharRect = initialChar.getBoundingClientRect();
                const lastCharRect = lastChar.getBoundingClientRect();

                // Animate initial 'D' and last 'b' to merge in the center and fade to white
                gsap.to([initialChar, lastChar], {
                  duration: 0.8,
                  ease: "hop",
                  delay: 0.3,
                  color: "#ffffff",
                  x: (i) => {
                    if (i === 0) {
                      return centerX - initialCharRect.left - initialCharRect.width;
                    } else {
                      return centerX - lastCharRect.left;
                    }
                  },
                  onComplete: () => {
                    // Apply difference blend overlay
                    gsap.set(headerContainer, { mixBlendMode: "difference" });

                    // Travel and scale merged letters up to Nav Logo position
                    gsap.to(headerContainer, {
                      y: "2.5rem",
                      scale: 0.28,
                      duration: 1.2,
                      ease: "hop",
                      onComplete: () => {
                        // Preloader ends! Reveal main page structure
                        setIsPreloaded(true);
                        setShowPreloader(false);
                      },
                    });
                  },
                });
              }
            },
          },
          "-=2.0"
        );
      }

      tl.to(
        preloader,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.5,
          ease: "hop",
        },
        "-=0.4"
      );

      if (heroLines.length > 0) {
        tl.to(
          heroLines,
          {
            yPercent: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.08,
          },
          "-=0.6"
        );
      }
    } catch (error) {
      console.error("Error running preloader timeline:", error);
      setIsPreloaded(true);
      setShowPreloader(false);
    }
  }, []);

  // Fanning cards and about section animations
  useGSAP(() => {
    if (!isPreloaded) return;

    // 1. Fanning Cards Animation (Spread in Hero, Stack in About Us)
    const aboutCards = gsap.utils.toArray<HTMLElement>(".card-cross-section");
    if (aboutCards.length > 0) {
      const isMobile = window.innerWidth < 768;
      
      // Responsive sizing logic
      const startWidth = isMobile ? "20vw" : "13vw";
      const startHeight = isMobile ? "26vw" : "17vw";
      const spreadFactor = isMobile ? 0.095 : 0.065; // Tighter spread on desktop, wider on mobile
      const getSpread = () => window.innerWidth * spreadFactor;
      const stackedWidth = isMobile ? "90vw" : "35vw";
      const stackedHeight = isMobile ? "60vw" : "22vw";
      const stackedRadius = isMobile ? "4vw" : "1.5vw";
      const rotateFactor = isMobile ? 3.5 : 2.5;

      // Dynamic Y-offset calculation to center the cards in the hero section viewport on load
      const getHeroYOffset = () => {
        const cardContainer = document.querySelector(".absolute-card.in-about");
        if (cardContainer) {
          const containerRect = cardContainer.getBoundingClientRect();
          const containerCenterY = containerRect.top + window.scrollY + containerRect.height / 2;
          const viewportCenterY = window.innerHeight / 2;
          // Shift desktop down by 70px, mobile down by 40px to create space between cards and DECOR LAB title
          const verticalShift = isMobile ? 40 : 70;
          return (viewportCenterY - containerCenterY) + verticalShift;
        }
        // Fallback to CSS values if container is not ready
        return isMobile ? (-window.innerWidth * 1.05 + 40) : (-window.innerWidth * 0.797 + 70);
      };

      // Set initial layout properties that don't need dynamic ScrollTrigger updates
      aboutCards.forEach((card) => {
        gsap.set(card, {
          display: "block",
          opacity: 1,
        });
      });

      // SCROLL ANIMATION: Drop down into About Us, STACK into one image, and morph into a WIDE landscape!
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#section-about",
          start: "top 90%", // Trigger when about section enters the bottom of the viewport
          end: "top 20%",   // Animation finishes when about section reaches 20% from top
          scrub: 1,
          invalidateOnRefresh: true, // Recalculate dynamic values on resize & zoom change!
        }
      });

      aboutCards.forEach((card, index) => {
        const offset = index - 4; // -4, -3, -2, -1, 0, 1, 2, 3, 4
        aboutTl.fromTo(card,
          {
            x: () => offset * getSpread(),
            y: () => getHeroYOffset(),
            rotation: () => offset * rotateFactor,
            width: () => startWidth,
            height: () => startHeight,
            borderRadius: "1vw",
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            width: () => stackedWidth,
            height: () => stackedHeight,
            borderRadius: () => stackedRadius,
            ease: "power2.out",
          },
          0
        );
      });

      // PINNING: Pin the About section so the user can watch the stack happen cleanly
      ScrollTrigger.create({
        trigger: "#section-about",
        start: "top 20%",
        end: "+=150%",
        pin: true,
        anticipatePin: 1
      });
    }

    // 2. About Us Section (#info)
    if (document.querySelector(".about-left-image img")) {
      gsap.fromTo(".about-left-image img",
        { scale: 1.15, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: "#info",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }

    // 3. Hero Parallax ScrollTrigger
    if (document.querySelector("#section-hero")) {
      gsap.to(".hero-bg-video", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: "#section-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
      gsap.to(".hero-foreground-content", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: "#section-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }
  }, [isPreloaded]);

  // Horizontal scroll catalogues timeline pinning using ScrollTrigger
  useGSAP(() => {
    if (!isPreloaded) return;

    const scrollWrapper = scrollWrapperRef.current;
    const scrollTrack = scrollTrackRef.current;
    const runningText = runningTextRef.current;

    if (!scrollWrapper || !scrollTrack) return;

    // Use matchMedia to support desktop dynamic pinning and mobile native gestures
    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      const getScrollAmount = () => {
        return -(scrollTrack.scrollWidth - window.innerWidth);
      };

      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollWrapper,
          start: "top top",
          end: () => `+=${scrollTrack.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      pinTimeline.to(scrollTrack, {
        x: getScrollAmount,
        ease: "none",
      });

      if (runningText) {
        pinTimeline.to(
          runningText,
          {
            x: () => (scrollTrack.scrollWidth - window.innerWidth) * 0.15,
            ease: "none",
          },
          0
        );
      }

      if (document.querySelector(".about-right-image img")) {
        gsap.fromTo(".about-right-image img",
          { scale: 1.12, opacity: 0.8 },
          {
            scale: 1.0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".about-right-image",
              start: "top 90%",
              once: true,
            }
          }
        );
      }

      const aboutTexts = document.querySelectorAll(".about-title-wrapper, .about-right-body");
      if (aboutTexts.length > 0) {
        gsap.fromTo(aboutTexts,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#info",
              start: "top 80%",
              once: true,
            }
          }
        );
      }

      const clipLines = gsap.utils.toArray<HTMLElement>(".clip-text-about");
      if (clipLines.length > 0) {
        const tlAbout = gsap.timeline({
          scrollTrigger: {
            trigger: "#info",
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
          }
        });

        tlAbout.to(clipLines, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          stagger: 0.15,
          duration: 1,
        });
      }

      const aboutStats = document.querySelectorAll(".about-stat-item");
      if (aboutStats.length > 0) {
        gsap.fromTo(aboutStats,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#info",
              start: "top 80%",
              once: true,
            }
          }
        );
      }

      // Stat Numbers Count-Up Animation
      const stats = gsap.utils.toArray<HTMLElement>(".about-stat-num");
      if (stats.length > 0) {
        stats.forEach((stat) => {
          const targetVal = parseFloat(stat.getAttribute("data-target") || "0");
          const suffix = stat.getAttribute("data-suffix") || "";
          const decimals = parseInt(stat.getAttribute("data-decimals") || "0", 10);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: targetVal,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none none"
            },
            onUpdate: () => {
              stat.innerText = obj.val.toFixed(decimals) + suffix;
            }
          });
        });
      }

      // 3. Process Section (#process)
      if (document.querySelector("#process .process-sidebar")) {
        gsap.fromTo("#process .process-sidebar",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#process",
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      if (document.querySelector("#process .process-step-item")) {
        gsap.fromTo("#process .process-step-item",
          { y: 55, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#process .process-steps-list",
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      // 4. Curated Spaces Section (#collection)
      if (document.querySelector("#collection .gallery-text-col > *:not(.serif-headline):not(p)")) {
        gsap.fromTo("#collection .gallery-text-col > *:not(.serif-headline):not(p)",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#collection",
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      const collectionImgs = gsap.utils.toArray<HTMLElement>("#collection .reveal-gallery-img");
      if (collectionImgs.length > 0) {
        collectionImgs.forEach((img) => {
          gsap.fromTo(img,
            { y: 40, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: img,
                start: "top 90%",
                once: true,
              }
            }
          );
        });

        // Parallax scroll on images
        collectionImgs.forEach((img) => {
          const innerImg = img.querySelector("img");
          if (innerImg) {
            gsap.fromTo(innerImg,
              { yPercent: -8 },
              {
                yPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: img,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                }
              }
            );
          }
        });
      }

      // 5. Recent Collabs Section (.cashmere-bg)
      const collabLeftTexts = document.querySelectorAll(".cashmere-bg .collab-left > *:not(.serif-headline):not(p)");
      if (collabLeftTexts.length > 0) {
        gsap.fromTo(collabLeftTexts,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".cashmere-bg",
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      const collabRightImgs = document.querySelectorAll(".cashmere-bg .collab-right .gallery-image-wrapper, .cashmere-bg .collab-right .collab-images-row > *");
      if (collabRightImgs.length > 0) {
        gsap.fromTo(collabRightImgs,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".cashmere-bg .collab-right",
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      // 6. Press & Publication Section
      const pressLeftImg = document.querySelector(".press-grid .press-left");
      if (pressLeftImg) {
        gsap.fromTo(pressLeftImg,
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".press-grid",
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      const pressRightTexts = document.querySelectorAll(".press-grid .press-right > *:not(.serif-headline):not(p)");
      if (pressRightTexts.length > 0) {
        gsap.fromTo(pressRightTexts,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".press-grid",
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      // 7. Projects Showcase Section (#showcase)
      const showcaseHeaders = document.querySelectorAll("#showcase .showcase-header > *, #showcase .showcase-tabs");
      if (showcaseHeaders.length > 0) {
        gsap.fromTo(showcaseHeaders,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#showcase",
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      if (document.querySelector("#showcase .showcase-content-grid")) {
        gsap.fromTo("#showcase .showcase-content-grid",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#showcase .showcase-tabs",
              start: "bottom 90%",
              once: true,
            }
          }
        );
      }

      // 8. Capabilities Section (.section-capabilities)
      const capHeaders = document.querySelectorAll(".section-capabilities .capabilities-header > *");
      if (capHeaders.length > 0) {
        gsap.fromTo(capHeaders,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".section-capabilities",
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      const capCards = document.querySelectorAll(".section-capabilities .cap-card");
      if (capCards.length > 0) {
        gsap.fromTo(capCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".section-capabilities .capabilities-grid",
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      // 9. Instagram Section (#instagram)
      const instaHeaders = document.querySelectorAll("#instagram .instagram-header > *");
      if (instaHeaders.length > 0) {
        gsap.fromTo(instaHeaders,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#instagram",
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      const instaCards = document.querySelectorAll("#instagram .instagram-card");
      if (instaCards.length > 0) {
        gsap.fromTo(instaCards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#instagram .instagram-grid",
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      // Testimonials (#feedback)
      const feedbackElms = document.querySelectorAll("#feedback p, #feedback h1, #feedback img, #feedback button, #feedback .progress-line");
      if (feedbackElms.length > 0) {
        gsap.fromTo(feedbackElms,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#feedback",
              start: "top 85%",
              once: true,
            }
          }
        );
      }

      // Detailed Footer (#contact-footer)
      const footerElms = document.querySelectorAll("#contact-footer .footer-brand, #contact-footer h4, #contact-footer li, #contact-footer .footer-bottom > *");
      if (footerElms.length > 0) {
        gsap.fromTo(footerElms,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#contact-footer",
              start: "top 95%",
              once: true,
            }
          }
        );
      }
    });

    mm.add("(max-width: 900px)", () => {
      if (runningText) {
        gsap.to(runningText, {
          xPercent: -30,
          scrollTrigger: {
            trigger: scrollWrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      gsap.set(scrollTrack, { x: 0 });

      // Mobile-optimized animations (no reverse to prevent layout jumps/lag)
      const mobileTriggers = [
        { trigger: "#info", targets: ".about-title-wrapper, .about-right-headline, .about-right-body, .about-left-image img, .about-right-image img, .about-stat-item" },
        { trigger: "#process", targets: "#process .serif-headline, #process .step-card-new" },
        { trigger: "#collection", targets: "#collection .gallery-text-col > *:not(.serif-headline):not(p), #collection .reveal-gallery-img" },
        { trigger: ".cashmere-bg", targets: ".cashmere-bg .collab-left > *:not(.serif-headline):not(p), .cashmere-bg .collab-right .gallery-image-wrapper" },
        { trigger: ".press-grid", targets: ".press-grid .press-left, .press-grid .press-right > *:not(.serif-headline):not(p)" },
        { trigger: "#showcase", targets: "#showcase .showcase-header > *, #showcase .showcase-tabs, #showcase .showcase-content-grid" },
        { trigger: ".section-capabilities", targets: ".section-capabilities .capabilities-header > *, .section-capabilities .cap-card" },
        { trigger: "#instagram", targets: "#instagram .instagram-header > *, #instagram .instagram-card" },
        { trigger: "#feedback", targets: "#feedback p, #feedback h1, #feedback img, #feedback button, #feedback .progress-line" },
        { trigger: "#contact-footer", targets: "#contact-footer .footer-brand, #contact-footer h4, #contact-footer li, #contact-footer .footer-bottom > *" }
      ];

      mobileTriggers.forEach((item) => {
        const elms = document.querySelectorAll(item.targets);
        if (elms.length > 0) {
          gsap.fromTo(elms,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item.trigger,
                start: "top 90%",
                once: true
              }
            }
          );
        }
      });

      // Stats Count-Up for mobile
      const statsMob = gsap.utils.toArray<HTMLElement>(".about-stat-num");
      if (statsMob.length > 0) {
        statsMob.forEach((stat) => {
          const targetVal = parseFloat(stat.getAttribute("data-target") || "0");
          const suffix = stat.getAttribute("data-suffix") || "";
          const decimals = parseInt(stat.getAttribute("data-decimals") || "0", 10);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: targetVal,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 95%",
              once: true
            },
            onUpdate: () => {
              stat.innerText = obj.val.toFixed(decimals) + suffix;
            }
          });
        });
      }
    });

    return () => mm.revert();
  }, [isPreloaded]);

  // ============================================================
  // REINETTE-STYLE ANIMATION SUITE
  // ============================================================
  useGSAP(() => {
    if (!isPreloaded) return;

    CustomEase.create("hop", "0.9, 0, 0.1, 1");
    const premEase = "cubic-bezier(0.16, 1, 0.3, 1)";

    // ─── 1. HERO: Clip-path heading line reveals ───────────────
    const heroLineWraps = gsap.utils.toArray<HTMLElement>(".reveal-line-wrap");
    if (heroLineWraps.length > 0) {
      const heroInnerLines = gsap.utils.toArray<HTMLElement>(".reveal-line-wrap .reveal-line");
      gsap.fromTo(heroInnerLines,
        { y: "110%" },
        {
          y: "0%",
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.09,
          delay: 0.2,
        }
      );
    }

    // Hero button + social icons fade-up on load
    const heroExtras = gsap.utils.toArray<HTMLElement>(".wrapper-image-icon, .inner-button-universall");
    if (heroExtras.length > 0) {
      gsap.fromTo(heroExtras,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.6 }
      );
    }

    // ─── 2. ABOUT SECTION: Heading line clip-path reveal ──────
    const aboutHeadingLines = gsap.utils.toArray<HTMLElement>(".text-heading-about");
    if (aboutHeadingLines.length > 0) {
      gsap.fromTo(aboutHeadingLines,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: "#section-about",
            start: "top 80%",
            once: true,
          }
        }
      );
    }

    // About tagline fade from left
    const aboutTagline = document.querySelector(".wrapper-tag-section.about");
    if (aboutTagline) {
      gsap.fromTo(aboutTagline,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: "#section-about",
            start: "top 75%",
            once: true,
          }
        }
      );
    }

    // About paragraph word-stagger fade
    const aboutPara = document.querySelector(".paragraph-about");
    if (aboutPara) {
      gsap.fromTo(aboutPara,
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.0, ease: "power3.out",
          scrollTrigger: {
            trigger: "#section-about",
            start: "top 70%",
            once: true,
          }
        }
      );
    }

    // ─── 3. PROCESS STEPS: Split layout animations ──
    const processSidebar = document.querySelector("#process .process-sidebar");
    if (processSidebar) {
      gsap.fromTo(processSidebar,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#process",
            start: "top 80%",
            once: true,
          }
        }
      );
    }

    // Each step slides in from right/bottom
    const redesignedStepCards = gsap.utils.toArray<HTMLElement>("#process .process-step-item");
    if (redesignedStepCards.length > 0) {
      gsap.fromTo(redesignedStepCards,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: "#process .process-steps-list",
            start: "top 80%",
            once: true,
          }
        }
      );

      // Sync sidebar indicators with scroll position of steps
      redesignedStepCards.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveProcessStep(index);
            }
          },
        });
      });
    }

    // ─── 4. COLLECTION SECTION: Gallery text clip-path ────────
    const collectionHeadline = document.querySelector("#collection .serif-headline");
    if (collectionHeadline) {
      gsap.fromTo(collectionHeadline,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "#collection",
            start: "top 80%",
            once: true,
          }
        }
      );
    }

    // ─── 5. PROJECTS: 3D perspective card entrance ────────────
    const projectCards = gsap.utils.toArray<HTMLElement>(".showcase-card, .project-card");
    if (projectCards.length > 0) {
      gsap.fromTo(projectCards,
        { y: 60, rotateX: 12, transformOrigin: "top center", opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: "#showcase",
            start: "top 82%",
            once: true,
          }
        }
      );
    }

    // Showcase heading clip-path
    const showcaseHeadlines = gsap.utils.toArray<HTMLElement>("#showcase .showcase-header > *");
    if (showcaseHeadlines.length > 0) {
      gsap.fromTo(showcaseHeadlines,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: "#showcase",
            start: "top 85%",
            once: true,
          }
        }
      );
    }

    // ─── 6. INSTAGRAM: Alternating direction stagger ──────────
    const instaCards = gsap.utils.toArray<HTMLElement>("#instagram .instagram-card");
    if (instaCards.length > 0) {
      instaCards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: i % 2 === 0 ? 60 : -60, opacity: 0, rotateY: i % 2 === 0 ? 4 : -4 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#instagram .instagram-grid",
              start: "top 85%",
              once: true,
            },
            delay: i * 0.08,
          }
        );
      });

      // Parallax inner image scroll
      instaCards.forEach((card) => {
        const img = card.querySelector("img");
        if (img) {
          gsap.fromTo(img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        }
      });
    }

    // ─── 7. TESTIMONIALS: Perspective slide in ────────────────
    const testimonialCards = gsap.utils.toArray<HTMLElement>(".testimonial-card, #feedback .feedback-card");
    if (testimonialCards.length > 0) {
      testimonialCards.forEach((card, i) => {
        gsap.fromTo(card,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#feedback",
              start: "top 80%",
              once: true,
            },
            delay: i * 0.1,
          }
        );
      });
    }

    // ─── 8. FOOTER: Scale-from-center brand reveal ────────────
    const footerBrand = document.querySelector("#contact-footer .footer-brand, footer .footer-logo");
    if (footerBrand) {
      gsap.fromTo(footerBrand,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#contact-footer",
            start: "top 90%",
            once: true,
          }
        }
      );
    }

    // Footer links stagger
    const footerLinks = gsap.utils.toArray<HTMLElement>("#contact-footer h4, #contact-footer li, #contact-footer .footer-bottom > *");
    if (footerLinks.length > 0) {
      gsap.fromTo(footerLinks,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#contact-footer",
            start: "top 88%",
            once: true,
          }
        }
      );
    }

    // Capabilities section clip-path headings
    const capHeadlines = gsap.utils.toArray<HTMLElement>(".section-capabilities .capabilities-header > *");
    if (capHeadlines.length > 0) {
      gsap.fromTo(capHeadlines,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: ".section-capabilities",
            start: "top 82%",
            once: true,
          }
        }
      );
    }

    // Cap cards: 3D perspective entrance
    const capCards = gsap.utils.toArray<HTMLElement>(".section-capabilities .cap-card");
    if (capCards.length > 0) {
      gsap.fromTo(capCards,
        { y: 50, rotateX: 8, transformOrigin: "top center", opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-capabilities .capabilities-grid",
            start: "top 82%",
            once: true,
          }
        }
      );
    }

    // Press section clip-path
    const pressHeadline = document.querySelector(".press-grid .press-right h2, .press-grid .press-right h3");
    if (pressHeadline) {
      gsap.fromTo(pressHeadline,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.0,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".press-grid",
            start: "top 80%",
            once: true,
          }
        }
      );
    }

    // ─── BLUR TEXT ANIMATIONS ─────────────────────────────────
    // All section descriptions/paragraphs: blur → sharp on scroll
    const blurTargets = gsap.utils.toArray<HTMLElement>(
      ".step-card-desc, .step-desc, .footer-desc, .showcase-project-desc, " +
      ".about-right-body, .descriptions-service, .descriptions-team, " +
      ".insta-bio, .collab-left p, .press-right p"
    );
    blurTargets.forEach((el) => {
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
            once: true,
          }
        }
      );
    });

    // Serif headlines: blur-word stagger (word-by-word blur in)
    const serifHeadlines = gsap.utils.toArray<HTMLElement>(".serif-headline");
    serifHeadlines.forEach((headline) => {
      // Skip if already has clip-path animation
      if (headline.style.clipPath) return;
      splitTextIntoWords(headline);
      const wordEls = headline.querySelectorAll(".blur-word");
      ScrollTrigger.create({
        trigger: headline,
        start: "top 85%",
        once: true,
        onEnter: () => {
          wordEls.forEach((w, i) => {
            setTimeout(() => w.classList.add("revealed"), i * 80);
          });
        }
      });
    });

    // About section heading blur text overlay
    const aboutHeadings = gsap.utils.toArray<HTMLElement>(".text-heading-about");
    aboutHeadings.forEach((heading) => {
      gsap.fromTo(heading,
        { filter: "blur(8px)" },
        {
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
          }
        }
      );
    });

    // Hero tagline and copyright text blur-in
    const heroTextEls = gsap.utils.toArray<HTMLElement>(".text-tagline-hero-mini, .wrapper-copyright-symbol");
    heroTextEls.forEach((el) => {
      gsap.fromTo(el,
        { filter: "blur(8px)", opacity: 0 },
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.8,
        }
      );
    });

    // ─── ENHANCED IMAGE ANIMATIONS ───────────────────────────
    // Step card preview images: scale-up + blur reveal on scroll
    const stepPreviews = gsap.utils.toArray<HTMLElement>(".step-card-preview-frame");
    stepPreviews.forEach((frame) => {
      const img = frame.querySelector("img");
      if (img) {
        gsap.fromTo(img,
          { scale: 1.3, filter: "blur(6px)" },
          {
            scale: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: frame,
              start: "top 88%",
              once: true,
            }
          }
        );
      }
    });

    // Showcase gallery items: curtain reveal (clip-path)
    const galleryItems = gsap.utils.toArray<HTMLElement>(".showcase-gallery-item");
    galleryItems.forEach((item, i) => {
      gsap.fromTo(item,
        { clipPath: i % 2 === 0 ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            once: true,
          },
          delay: (i % 3) * 0.12,
        }
      );
    });

    // Gallery images (collection section): staggered scale + blur reveal
    const collectionImgsEnhanced = gsap.utils.toArray<HTMLElement>("#collection .reveal-gallery-img");
    collectionImgsEnhanced.forEach((wrapper, i) => {
      const img = wrapper.querySelector("img");
      if (img) {
        gsap.fromTo(img,
          { scale: 1.2, filter: "blur(5px)" },
          {
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 88%",
              once: true,
            },
            delay: i * 0.1,
          }
        );
      }
    });

    // About section images: 3D perspective tilt on scroll
    const aboutImages = gsap.utils.toArray<HTMLElement>(".about-left-image, .about-right-image");
    aboutImages.forEach((imgWrap) => {
      gsap.fromTo(imgWrap,
        { rotateY: 5, rotateX: 3, transformOrigin: "center center", scale: 0.95, opacity: 0 },
        {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imgWrap,
            start: "top 88%",
            once: true,
          }
        }
      );
    });

    // Collab section images: staggered curtain from bottom
    const collabImages = gsap.utils.toArray<HTMLElement>(".collab-right .gallery-image-wrapper");
    collabImages.forEach((item, i) => {
      gsap.fromTo(item,
        { clipPath: "inset(100% 0 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0 0 0)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            once: true,
          },
          delay: i * 0.15,
        }
      );
    });

    // Press left image: scale + blur uncover
    const pressImg = document.querySelector(".press-left img, .press-grid .press-left img");
    if (pressImg) {
      gsap.fromTo(pressImg,
        { scale: 1.15, filter: "blur(5px)" },
        {
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".press-grid",
            start: "top 85%",
            once: true,
          }
        }
      );
    }

    // Fanning cards images: scrub-linked subtle scale
    const fanningCards = gsap.utils.toArray<HTMLElement>(".card-cross-section img");
    fanningCards.forEach((img) => {
      gsap.fromTo(img,
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#section-about",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

  }, [isPreloaded]);


  // Pinned ScrollTrigger layout settlement refresh
  useEffect(() => {
    if (!isPreloaded) return;
    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isPreloaded]);


  // Handle logo top scroll reset
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveSlide(1); // Set to default Nube interior tunnel slide
  };

  // Submitting Newsletter handler
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubscribed(true);
  };

  // Category filter tag highlights jump bounce stagger
  const handleFilterPillClick = (categoryName: string) => {
    // Add dynamic feedback bounce stagger to the horizontal cards
    const cards = gsap.utils.toArray(".horizontal-nube-card");
    gsap.fromTo(
      cards,
      { y: 0 },
      { y: -10, duration: 0.2, ease: "power2.out", stagger: 0.04, yoyo: true, repeat: 1 }
    );
  };

  // Nav indicator dynamic tracing hooks
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



  // Preloader template markup
  return (
    <>
      {showPreloader && (
        <>
          <div ref={preloaderRef} className="preloader">
            <div className="progress-bar"></div>
            <div className="preloader-counter" style={{ position: "absolute", bottom: "3.5rem", right: "4rem", fontFamily: "var(--font-display)", fontSize: "5vw", fontWeight: "bold", color: "#f2f2f0", zIndex: 10, mixBlendMode: "difference" }}>000</div>

            <div className="preloader-images">
              <div className="img">
                <img src="/assets/projects/santhalia_site/image_1.jpg" alt="Opening structure 1" style={{ scale: 1.5 }} />
              </div>
              <div className="img">
                <img src="/assets/projects/site_01/image_1.jpg" alt="Opening structure 2" style={{ scale: 1.5 }} />
              </div>
              <div className="img">
                <img src="/assets/projects/site_02/image_1.jpg" alt="Opening structure 3" style={{ scale: 1.5 }} />
              </div>
              <div className="img">
                <img src="/assets/projects/photos_set1/image_1.jpg" alt="Opening structure 4" style={{ scale: 1.5 }} />
              </div>
            </div>

            <div className="preloader-copy">
              <p>
                {"A studio of fluid architecture and interior curation shaping spaces through heritage, materials, and refined design innovation."
                  .split(" ")
                  .map((word, index) => (
                    <span key={index} className="line-mask" style={{ marginRight: "0.3em" }}>
                      <span className="line">{word}</span>
                    </span>
                  ))}
              </p>
            </div>
          </div>

          <div ref={preloaderHeaderRef} className="preloader-header" id="preloader-header-container">
            <a href="#" id="preloader-title-link">
              {"DecorLab".split("").map((char, index) => (
                <span key={index} className="char-mask">
                  <span className="char">{char === " " ? "\u00A0" : char}</span>
                </span>
              ))}
            </a>
          </div>
        </>
      )}

      {/* Floating navigation header */}
      <header
        className={`nav-header ${isScrolled ? "scrolled" : ""} ${currentTheme === "light" ? "light-theme" : ""}`}
        id="main-header"
        style={{ opacity: isPreloaded ? 1 : 0, pointerEvents: isPreloaded ? "auto" : "none" }}
      >
        <div
          className="nav-logo glass glass-interactive"
          id="nav-logo"
          role="button"
          aria-label="Decor Lab Home"
          tabIndex={0}
          onClick={handleLogoClick}
          style={{ width: "auto", padding: "0 16px", borderRadius: "9999px" }}
        >
          <img src="/assets/Decorlab final-04.png" alt="Decor Lab Logo" className="nav-logo-img" />
        </div>

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
            className="nav-link"
            id="link-contact"
            onMouseEnter={handleNavMouseEnter}
            onFocus={handleNavMouseEnter}
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Core layouts display after preload merges */}
      <main style={{ opacity: isPreloaded ? 1 : 0, transition: "opacity 0.4s ease" }}>
        {/* ====================================================
         * SECTION 1: HERO VIEW (Slideshow, vignettes & title)
         * ==================================================== */}
        <section id="section-hero" className="section hero" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-bg-video"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "translate(-50%, -50%)",
              zIndex: 0,
              aspectRatio: "16/9"
            }}
          >
            <source src="/assets/hero-bg.mp4" type="video/mp4" />
          </video>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.75))",
              zIndex: 1
            }}
          />
          <div className="w-layout-blockcontainer container w-container hero-foreground-content" style={{ position: 'relative', zIndex: 2 }}>
            <div className="wrapper-hero">
              <div className="wrapper-heading-hero">
                <div className="reveal-line-wrap">
                  <div className="text-heading-hero reveal-line" style={{ fontFamily: '"Playfair Display", "Times New Roman", Times, serif', fontWeight: 400, letterSpacing: '4px', textTransform: 'uppercase', color: '#fff', textShadow: '0 4px 20px rgba(0,0,0,0.5)', position: 'relative', zIndex: 50 }}>
                    DECOR LAB
                  </div>
                </div>
                <a data-w-id="66aeaa42-d8c6-e18c-6215-71bab4d1eaa7" href="#contact" className="inner-button-universall w-inline-block">
                  <div className="text-button">
                    <div className="inner-text-button-home">Get started</div>
                    <div className="inner-text-button-home absolute">Get started</div>
                  </div>
                </a>
              </div>

              <div className="main-content-hero">
                <div className="wrapper-copyright-symbol">
                  <div className="inner-copyright-symbol">
                    <img src="https://cdn.prod.website-files.com/6933d4dce1575ce638974488/69378133522096b67d005ca0_icons8-copyright-48.png" loading="lazy" alt="Copyright" className="icon-image-symbol" />
                  </div>
                  <div className="text-tagline-hero-mini" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    Architecture<br />& Interior Design
                  </div>
                </div>
                <div className="wrapper-link-content">
                  <a href="https://www.linkedin.com/" target="_blank" className="wrapper-image-icon w-inline-block">
                    <img src="https://cdn.prod.website-files.com/6933d4dce1575ce638974488/69378079c6c6232f46c72889_icons8-linkedin-100%20(1).png" loading="lazy" alt="Linkedin logo" className="image-icon" />
                  </a>
                  <a href="https://www.tumblr.com/" target="_blank" className="wrapper-image-icon w-inline-block">
                    <img src="https://cdn.prod.website-files.com/6933d4dce1575ce638974488/6937807b8c346c6872524d5d_icons8-tumblr-100.png" loading="lazy" alt="Tumblr logo" className="image-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="section-about" className="section about" style={{ position: 'relative', top: 'auto', minHeight: '100vh' }}>
          <div className="w-layout-blockcontainer container about w-container">
            <div className="wrapper-about">
              <div className="inner-about-wrapp">
                <div className="wrapper-heading-about">
                  <div className="inner-heading-about _1"><div className="text-heading-about">Thoughtful spaces, we </div></div>
                  <div className="inner-heading-about _2"><div className="text-heading-about">build <em>homes</em> that bring </div></div>
                  <div className="inner-heading-about _3"><div className="text-heading-about">comfort to <em>your life</em> </div></div>
                </div>
                <div className="wrapper-tag-section about">
                  <div className="wrapper-tagline-about">
                    <div className="text-tagline-section about">About us</div>
                  </div>
                  <div data-w-id="21ec498a-da00-b0a0-20cb-51467f79dc0b" className="wrapper-circle">
                    <div className="circle-section"></div>
                  </div>
                </div>
              </div>
              <div className="outer-descriptions-about">
                <div className="wrapper-descriptions-about">
                  <p className="paragraph-about">Focused on crafting exceptional living through careful planning and trusted property options.</p>
                </div>
              </div>
              <div className="area-resize">
                <div className="area">
                  <div className="absolute-card in-about">
                    <div className="card-cross-section _0">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/site_01/image_1.jpg" loading="lazy" alt="Modern interior design" className="image-path" />
                      </div>
                    </div>
                    <div className="card-cross-section _1">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/site_02/image_2.jpg" loading="lazy" alt="Contemporary architecture" className="image-path" />
                      </div>
                    </div>
                    <div className="card-cross-section _2">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/santhalia_site/image_3.jpg" loading="lazy" alt="Abstract modern architectural artwork" className="image-path" />
                      </div>
                    </div>
                    <div className="card-cross-section _3">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/photos_set1/image_4.jpg" loading="lazy" alt="Modern curved architecture" className="image-path" />
                      </div>
                    </div>
                    <div className="card-cross-section _4">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/photos_set2/image_5.jpg" loading="lazy" alt="Luxury house interior" className="image-path" />
                      </div>
                    </div>
                    <div className="card-cross-section _5">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/site_01/image_6.jpg" loading="lazy" alt="Minimalist modern house" className="image-path" />
                      </div>
                    </div>
                    <div className="card-cross-section _6">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/site_02/image_1.jpg" loading="lazy" alt="Modern wooden house" className="image-path" />
                      </div>
                    </div>
                    <div className="card-cross-section _7">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/santhalia_site/image_4.jpg" loading="lazy" alt="Modern architecture" className="image-path" />
                      </div>
                    </div>
                    <div className="card-cross-section _8">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/photos_set1/image_1.jpg" loading="lazy" alt="Beautiful landscape" className="image-path" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 2: REDESIGNED ABOUT US SECTION (Reinette Style)
         * ==================================================== */}


        {/* ====================================================
         * SECTION 2B: PROCESS (Creating with us is easy)
         * ==================================================== */}
        <section id="process" className="editorial-section">
          <div className="editorial-container">
            <div className="process-grid-container">
              {/* Sticky Sidebar on Left */}
              <div className="process-sidebar">
                <div>
                  <h4 className="studio-subtitle" style={{ textAlign: "left" }}>02 / METHODOLOGY</h4>
                  <h2 className="serif-headline" style={{ textAlign: "left", marginTop: "1rem", lineHeight: "1.1" }}>
                    Creating with us<br />is easy.
                  </h2>
                </div>
                <div className="process-indicator-wrap">
                  <div className="process-indicator-track-bg" />
                  <div
                    className="process-indicator-track-fill"
                    style={{
                      height: `${(activeProcessStep / 3) * 100}%`
                    }}
                  />
                  {[
                    "Contact Us",
                    "Consultation",
                    "Design & Visualization",
                    "On-Site Execution"
                  ].map((step, idx) => (
                    <div
                      key={step}
                      className={`process-indicator-step ${activeProcessStep === idx ? "active" : ""}`}
                      onClick={() => scrollToProcessStep(idx)}
                    >
                      <span className="process-indicator-bullet">{idx + 1} . </span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stacking Steps List on Right */}
              <div className="process-steps-list">
                {[
                  {
                    num: "01",
                    title: "CONTACT US",
                    desc: "We work hand in hand with clients and collaborators. Commercial or residential, simply reach out to get a conversation going. No project is too complex or too simple.",
                    img: "/assets/projects/santhalia_site/image_5.jpg"
                  },
                  {
                    num: "02",
                    title: "CONSULTATION",
                    desc: "We evaluate your spatial needs, translating your vision into functional plans. We inspect the site to align layout, lighting, materials, and execution logistics from the very start.",
                    img: "/assets/projects/site_01/image_2.jpg"
                  },
                  {
                    num: "03",
                    title: "DESIGN & VISUALIZATION",
                    desc: "We finalize material specs, lighting designs, and custom joinery. Photorealistic 3D renders help visualize the space, ensuring complete confidence before execution starts.",
                    img: "/assets/projects/site_02/image_2.jpg"
                  },
                  {
                    num: "04",
                    title: "ON-SITE EXECUTION",
                    desc: "Our team of 275+ professionals manages complete end-to-end site execution. From structural modifications to custom curation, we deliver a seamless, hassle-free transition.",
                    img: "/assets/projects/site_01/image_1.jpg"
                  }
                ].map((step, idx) => (
                  <div
                    key={step.num}
                    id={`process-step-${idx}`}
                    className="process-step-item"
                  >
                    <div className="process-step-num">{step.num}</div>
                    <div className="process-step-body">
                      <div className="process-step-info">
                        <h4 className="process-step-title">{step.title}</h4>
                        <p className="process-step-desc">{step.desc}</p>
                      </div>
                      <div className="process-step-media">
                        <img src={step.img} alt={`${step.title} Preview`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 2C: CURATED PROJECTS (Editorial Gallery Grid)
         * ==================================================== */}
        <section id="collection" className="editorial-section" style={{ borderTop: "none" }}>
          <div className="editorial-container">
            <div className="editorial-gallery-grid">
              <div className="gallery-text-col">
                <h4 className="studio-subtitle" style={{ textAlign: "left" }}>COLLECTION</h4>
                <h2 className="serif-headline" style={{ marginBottom: "1rem" }}>Curated Spaces</h2>
                <p className="step-desc" style={{ fontSize: "1.05rem" }}>
                  Step inside our curated spaces where art, material honesty, and light merge to redefine modern luxury living and working environments.
                </p>
                <a href="#showcase" className="pill-btn-editorial">View Showcase</a>

                {/* Secondary offset image in text column */}
                <div className="gallery-image-wrapper gallery-image-small reveal-gallery-img" style={{ marginTop: "4rem" }}>
                  <img src="/assets/projects/photos_set1/image_3.jpg" alt="Tactile studies in linen pillows" />
                  <div className="gallery-caption">
                    <span>Linen & Cushion Textures</span>
                    <div className="arrow-circle" />
                  </div>
                </div>
              </div>

              <div className="gallery-image-wrapper gallery-image-large reveal-gallery-img">
                <img src="/assets/projects/photos_set1/image_2.jpg" alt="Curved lounge interior concepts" />
                <div className="gallery-caption">
                  <span>Signature Residential Lounge / Kolkata</span>
                  <div className="arrow-circle" />
                </div>
              </div>
            </div>

            {/* Bottom Offset Row */}
            <div className="gallery-offset-row">
              <div className="gallery-image-wrapper gallery-image-medium reveal-gallery-img">
                <img src="/assets/projects/photos_set1/image_4.jpg" alt="Stark concrete and curved lines" />
                <div className="gallery-caption">
                  <span>Abstract Dining Modules</span>
                  <div className="arrow-circle" />
                </div>
              </div>

              <div className="gallery-image-wrapper gallery-image-medium reveal-gallery-img" style={{ alignSelf: "flex-start" }}>
                <img src="/assets/projects/photos_set2/image_2.jpg" alt="Oak platform bed sunlit" />
                <div className="gallery-caption">
                  <span>Shadows & Light</span>
                  <div className="arrow-circle" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 2D: RECENT COLLABS (Human NYC showcase)
         * ==================================================== */}
        <section id="collabs" className="editorial-section cashmere-bg">
          <div className="editorial-container">
            <div className="collabs-grid">
              <div className="collab-left">
                <h4 className="studio-subtitle" style={{ textAlign: "left" }}>DESIGN PARTNERSHIPS</h4>
                <h2 className="serif-headline" style={{ lineHeight: "1" }}>
                  RECENT COLLABS<br />
                  <span className="serif-subtitle" style={{ fontSize: "3rem", display: "block", marginTop: "1rem" }}>Häfele Curation</span>
                </h2>
                <p className="step-desc drop-cap" style={{ fontSize: "1.05rem" }}>
                  Collaborating with international pioneers to bring smart hardware, premium fittings, and material innovations into our interior architectures. Seamlessly matching top-tier technology with handcrafted wooden elements.
                </p>
                <a href="#showcase" className="pill-btn-editorial">Explore Curation</a>
              </div>

              <div className="collab-right">
                <div className="gallery-image-wrapper gallery-image-large" style={{ height: "450px" }}>
                  <img src="/assets/projects/photos_set2/image_3.jpg" alt="White geometric spheres art gallery install" />
                  <div className="gallery-caption">
                    <span>Decor Lab x Häfele Star Awards Curation</span>
                    <div className="arrow-circle" />
                  </div>
                </div>

                <div className="collab-images-row">
                  <div className="gallery-image-wrapper gallery-image-medium" style={{ height: "280px" }}>
                    <img src="/assets/projects/photos_set2/image_4.jpg" alt="Concrete study and shadow" />
                    <div className="gallery-caption">
                      <span>Detail & Texture Studies</span>
                      <div className="arrow-circle" />
                    </div>
                  </div>
                  <div className="gallery-image-wrapper gallery-image-medium" style={{ height: "280px" }}>
                    <img src="/assets/projects/site_02/image_1.jpg" alt="Inflatable dome yellow view" />
                    <div className="gallery-caption">
                      <span>Fluid Forms / Ongoing Curation</span>
                      <div className="arrow-circle" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 2E: PRESS & PUBLICATION (Elle Decor highlight)
         * ==================================================== */}
        <section id="press" className="editorial-section">
          <div className="editorial-container">
            <div className="press-grid">
              <div className="gallery-image-wrapper press-left">
                <img src="/assets/projects/site_01/image_1.jpg" alt="Ribbed walking canopy interior" />
                <div className="gallery-caption">
                  <span>Decor Lab Featured Cover / Elle Decor</span>
                  <div className="arrow-circle" />
                </div>
              </div>

              <div className="press-right">
                <h4 className="studio-subtitle" style={{ textAlign: "left" }}>PUBLICATIONS</h4>
                <h2 className="serif-headline" style={{ lineHeight: "1" }}>
                  AS SEEN IN...<br />
                  <span className="serif-subtitle" style={{ fontSize: "3rem", display: "block", marginTop: "1rem" }}>Elle Decor</span>
                </h2>

                <blockquote className="press-quote">
                  "Decor Lab blends heritage, organic curves, and 'functionality first' planning to create habitable sculptures that redefine contemporary Indian spaces."
                </blockquote>

                <p className="step-desc drop-cap" style={{ fontSize: "1rem" }}>
                  A detailed feature highlighting our Kolkata-based design studio, celebrating three decades of design excellence, luxury residential portfolios, and our cutting-edge outlook on fluid architecture.
                </p>

                <a href="#info" className="pill-btn-editorial">Read Full Feature</a>
              </div>
            </div>
          </div>
        </section>

        <Gallery isPreloaded={isPreloaded} />

        {/* ====================================================
         * SECTION 2F: PROJECTS SHOWCASE (Tabs & Gallery)
         * ==================================================== */}
        <section id="showcase" className="section-showcase">
          <div className="showcase-container">
            <div className="showcase-header">
              <h4 className="studio-subtitle">PROJECTS</h4>
              <h2 className="serif-headline" style={{ fontSize: "3rem" }}>Site Portfolio</h2>
            </div>

            {/* Tab Selection */}
            <div className="showcase-tabs">
              {projectsData.map((project) => (
                <button
                  key={project.id}
                  className={`showcase-tab ${activeProjectTab === project.id ? "active" : ""}`}
                  onClick={() => setActiveProjectTab(project.id)}
                >
                  {project.title}
                </button>
              ))}
            </div>

            {/* Tab Content Display */}
            {projectsData.map((project) => {
              if (project.id !== activeProjectTab) return null;
              return (
                <div key={project.id} className="showcase-content-grid">
                  <div className="showcase-info-panel">
                    <span className="showcase-project-location">{project.location}</span>
                    <h3 className="showcase-project-title">{project.title}</h3>
                    <p className="showcase-project-desc">{project.description}</p>
                  </div>

                  <div className="showcase-gallery-grid">
                    {project.images.map((img, index) => (
                      <div
                        key={index}
                        className="showcase-gallery-item"
                        data-cursor="view"
                        onClick={() => setLightboxProject({
                          siteName: project.title,
                          images: project.images,
                          activeIndex: index
                        })}
                      >
                        <img src={img} alt={`${project.title} gallery shot ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ====================================================
         * SECTION 3: WORK PORTFOLIO (Horizontal Scroll Catalogue)
         * ==================================================== */}
        {/*
        <section ref={scrollWrapperRef} id="work" className="portfolio-horizontal-wrapper">
          <div ref={runningTextRef} className="portfolio-running-text">
            DESIGN . ARCHITECTURE . CURATION . DECORLAB
          </div>

          <div className="portfolio-intro-panel">
            <h4 className="studio-subtitle" style={{ textAlign: "left" }}>
              PORTFOLIO
            </h4>
            <h2 className="studio-headline" style={{ textAlign: "left", fontSize: "2.25rem" }}>
              Flagship Curation
            </h2>
            <p className="portfolio-intro-desc">
              Explore our landmark residential, commercial, and conceptual design projects delivered across Kolkata and other metropolitan hubs in India.
            </p>

            <div className="portfolio-filter-pills">
              {["All Projects", "Residential", "Corporate", "Conceptual"].map((cat) => (
                <span
                  key={cat}
                  className={`filter-pill ${cat === "All Projects" ? "active" : ""}`}
                  onClick={() => handleFilterPillClick(cat)}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div ref={scrollTrackRef} className="portfolio-scroll-track" id="portfolio-track">
            <div className="horizontal-nube-card">
              <div className="nube-capsule-image-frame">
                <img src="/assets/projects/santhalia_site/image_1.jpg" alt="Santhalia Residence Kolkata" />
              </div>
              <div className="nube-capsule-info">
                <div className="nube-capsule-meta">
                  <span>Residential</span>
                  <span>Kolkata</span>
                </div>
                <h3 className="nube-capsule-name">Santhalia Home</h3>
                <p className="nube-capsule-desc">
                  Award-winning warm minimalist villa integrating natural linen, plaster, and signature ombre curtains.
                </p>
                <button className="nube-btn" data-cursor="Specs" onClick={() => setSelectedNube(0)}>
                  Design Specs
                </button>
              </div>
            </div>

            <div className="horizontal-nube-card">
              <div className="nube-capsule-image-frame">
                <img src="/assets/projects/site_01/image_1.jpg" alt="Corporate Headquarters Workspace" />
              </div>
              <div className="nube-capsule-info">
                <div className="nube-capsule-meta">
                  <span>Corporate</span>
                  <span>Kolkata</span>
                </div>
                <h3 className="nube-capsule-name">Corporate HQ</h3>
                <p className="nube-capsule-desc">
                  Premium commercial space incorporating parametric timber paneling and biophilic lighting design.
                </p>
                <button className="nube-btn" data-cursor="Specs" onClick={() => setSelectedNube(1)}>
                  Design Specs
                </button>
              </div>
            </div>

            <div className="horizontal-nube-card">
              <div className="nube-capsule-image-frame">
                <img src="/assets/projects/site_02/image_1.jpg" alt="Fluid Architecture Concept" />
              </div>
              <div className="nube-capsule-info">
                <div className="nube-capsule-meta">
                  <span>Conceptual</span>
                  <span>Mumbai</span>
                </div>
                <h3 className="nube-capsule-name">Fluid Pavilion</h3>
                <p className="nube-capsule-desc">
                  Futuristic double-curvature structure showcasing Parametric Design and fluid architecture ideas.
                </p>
                <button className="nube-btn" data-cursor="Specs" onClick={() => setSelectedNube(2)}>
                  Design Specs
                </button>
              </div>
            </div>

            <div className="horizontal-nube-card">
              <div className="nube-capsule-image-frame">
                <img src="/assets/projects/photos_set1/image_1.jpg" alt="Aesthetic Lounge Design" />
              </div>
              <div className="nube-capsule-info">
                <div className="nube-capsule-meta">
                  <span>Residential</span>
                  <span>Bengaluru</span>
                </div>
                <h3 className="nube-capsule-name">Aesthetic Lounge</h3>
                <p className="nube-capsule-desc">
                  Mediterranean plaster study exploring scale, soft ambient light, and organic seating curation.
                </p>
                <button className="nube-btn" data-cursor="Specs" onClick={() => setSelectedNube(3)}>
                  Design Specs
                </button>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* ====================================================
         * SECTION 4: CAPABILITIES & ENGINEERING
         * ==================================================== */}
        <section className="section-capabilities">
          <div className="capabilities-container">
            <div className="capabilities-header">
              <h4 className="studio-subtitle" style={{ color: "var(--text-muted)" }}>
                PHILOSOPHY
              </h4>
              <h2 className="capabilities-title">Our Design Approach</h2>
            </div>

            <div className="capabilities-grid">
              {/* Functionality First */}
              <div className="cap-card cap-card-functionality">
                <span className="cap-num">01</span>
                <div className="cap-divider" />
                <div className="cap-icon cap-icon-compass">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <circle cx="12" cy="5" r="2" />
                    <path d="M12 7L6 21M12 7l6 14M9 14h6" />
                  </svg>
                </div>
                <h3 className="cap-name">Functionality First</h3>
                <p className="cap-desc">
                  We verify that every layout is highly usable and ergonomically optimized before introducing decorative styling.
                </p>
              </div>

              {/* Material Innovation */}
              <div className="cap-card cap-card-materials">
                <span className="cap-num">02</span>
                <div className="cap-divider" />
                <div className="cap-icon cap-icon-materials">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    {/* Layered Slabs */}
                    <path d="M3 16l9 4.5 9-4.5-9-4.5z" />
                    <g>
                      <path d="M3 11l9 4.5 9-4.5-9-4.5z" opacity="0.75" />
                    </g>
                    <path d="M3 6l9 4.5 9-4.5-9-4.5z" opacity="0.4" strokeDasharray="2 2" />
                  </svg>
                </div>
                <h3 className="cap-name">Material Innovation</h3>
                <p className="cap-desc">
                  Emphasizing raw textures, natural finishes, and innovative pairings that age gracefully and stand the test of time.
                </p>
              </div>

              {/* Fluid Architecture */}
              <div className="cap-card cap-card-fluid">
                <span className="cap-num">03</span>
                <div className="cap-divider" />
                <div className="cap-icon cap-icon-fluid">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    {/* Parametric Wave Curves */}
                    <path d="M2 17c5-5 10 5 15-5 5-5 5 5 5 5" />
                    <path d="M2 12c5-5 10 5 15-5 5-5 5 5 5 5" opacity="0.7" />
                    <path d="M2 7c5-5 10 5 15-5 5-5 5 5 5 5" opacity="0.4" />
                  </svg>
                </div>
                <h3 className="cap-name">Fluid Architecture</h3>
                <p className="cap-desc">
                  Challenging box-like conventions with organic curves, parametric surfaces, and continuous spatial geometries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 5: INSTAGRAM FEED SHOWCASE (@decorlab.in)
         * ==================================================== */}
        <section id="instagram" className="section-instagram">
          <div className="instagram-header">
            <div className="instagram-avatar-wrapper">
              <div className="instagram-avatar">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="14" r="4.5" />
                  <circle cx="16" cy="14" r="4.5" />
                  <circle cx="12" cy="8" r="4.5" />
                </svg>
              </div>
            </div>

            <div className="instagram-profile-info">
              <div className="insta-username-row">
                <h2 className="insta-username">decorlab.in</h2>
                <span className="insta-verified" title="Verified Account">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </span>
                <a
                  href="https://www.instagram.com/decorlab.in?igsh=MWluaGo2OXZtbzBsOQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="insta-follow-btn"
                >
                  Follow
                </a>
              </div>

              <div className="insta-stats-row">
                <div className="insta-stat">
                  <span>142</span> posts
                </div>
                <div className="insta-stat">
                  <span>42.8k</span> followers
                </div>
                <div className="insta-stat">
                  <span>249</span> following
                </div>
              </div>

              <div className="insta-bio">
                <span className="insta-bio-name">Decor Lab</span>
                <br />
                Curated Architecture & Minimalist Interior Curation. Delivering timeless spaces across India since 1993.
                <br />
                <a
                  href="https://www.instagram.com/decorlab.in?igsh=MWluaGo2OXZtbzBsOQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent-color)", fontWeight: 600, textDecoration: "underline" }}
                >
                  decorlab.in
                </a>
              </div>
            </div>
          </div>

          {/* Post Grid */}
          <div className="instagram-grid">
            {instaPosts.map((post, idx) => (
              <div
                key={idx}
                className="instagram-card"
                data-cursor="View"
                role="button"
                aria-label={`View Instagram post ${idx + 1}`}
                tabIndex={0}
                onClick={() => setSelectedInsta(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedInsta(idx);
                  }
                }}
              >
                <img src={post.img} alt={`Mock Decor Instagram Post ${idx + 1}`} />
                <div className="instagram-overlay">
                  <div className="insta-overlay-stat">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>{post.likes}</span>
                  </div>
                  <div className="insta-overlay-stat">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                    </svg>
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================
         * SECTION 6: NEWSLETTER SUBSCRIPTION
         * ==================================================== */}
        {/*
        <section className="section-newsletter">
          <div className="news-box">
            <h3 className="news-title">Stay Inspired</h3>
            <p className="news-desc">
              Subscribe to receive our latest design catalogs, project walk-throughs, and structural design updates.
            </p>
            {!newsletterSubscribed ? (
              <form className="news-form" id="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  className="news-input"
                  placeholder="Your Email Address"
                  aria-label="Email Input"
                  required
                />
                <button type="submit" className="news-submit">
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="news-success" style={{ display: "block" }}>
                Thank you! We will keep you updated with our latest design insights.
              </div>
            )}
          </div>
        </section>
        */}

        <Feedback />
        <FooterBanner isPreloaded={isPreloaded} />

        {/* ====================================================
         * MARQUEE STRIP — Reinette-style CTA Band
         * ==================================================== */}
        <div className="footer-marquee-section" style={{ background: '#0b0b0a' }}>
          <div className="marquee-strip">
            <div className="marquee-track">
              {[...Array(8)].map((_, i) => (
                <span key={i} className="marquee-item">Architecture &amp; Interior Design</span>
              ))}
            </div>
          </div>
        </div>

        {/* ====================================================
         * SECTION 7: STUDIO DETAILED FOOTER
         * ==================================================== */}
        <footer id="contact-footer" className="section-footer">

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

      {/* ====================================================
       * TECHNICAL SPECIFICATIONS MODAL / DRAWER
       * ==================================================== */}
      {selectedNube !== null && (
        <>
          <div
            className="specs-overlay active"
            id="specs-overlay"
            role="presentation"
            onClick={() => setSelectedNube(null)}
          ></div>
          <div
            className="specs-drawer active"
            id="specs-drawer"
            role="dialog"
            aria-labelledby="drawer-title"
            aria-modal="true"
          >
            <button
              className="drawer-close"
              id="drawer-close-btn"
              aria-label="Close specifications dialog"
              onClick={() => setSelectedNube(null)}
              autoFocus
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            <div className="drawer-header">
              <span className="drawer-subtitle" id="drawer-nube-model">
                {nubeSpecs[selectedNube].model}
              </span>
              <h2 className="drawer-title" id="drawer-nube-name">
                {nubeSpecs[selectedNube].name}
              </h2>
            </div>

            {/* Stats Table Grid */}
            <div className="drawer-specs-list">
              <div className="drawer-spec-item">
                <span className="drawer-spec-key">Design Concept</span>
                <span className="drawer-spec-val" id="spec-structure">
                  {nubeSpecs[selectedNube].structure}
                </span>
              </div>
              <div className="drawer-spec-item">
                <span className="drawer-spec-key">Project Location</span>
                <span className="drawer-spec-val" id="spec-exterior">
                  {nubeSpecs[selectedNube].exterior}
                </span>
              </div>
              <div className="drawer-spec-item">
                <span className="drawer-spec-key">Total Built Area</span>
                <span className="drawer-spec-val" id="spec-interior">
                  {nubeSpecs[selectedNube].interior}
                </span>
              </div>
              <div className="drawer-spec-item">
                <span className="drawer-spec-key">Completion Year</span>
                <span className="drawer-spec-val" id="spec-height">
                  {nubeSpecs[selectedNube].height}
                </span>
              </div>
              <div className="drawer-spec-item">
                <span className="drawer-spec-key">Key Design Focus</span>
                <span className="drawer-spec-val" id="spec-capacity">
                  {nubeSpecs[selectedNube].capacity}
                </span>
              </div>
              <div className="drawer-spec-item">
                <span className="drawer-spec-key">Bespoke Elements</span>
                <span className="drawer-spec-val" id="spec-access">
                  {nubeSpecs[selectedNube].access}
                </span>
              </div>
            </div>

            {/* Blueprint image panel */}
            <div className="drawer-blueprint">
              <div className="blueprint-img-wrapper">
                <img
                  id="drawer-blueprint-img"
                  src={nubeSpecs[selectedNube].img}
                  alt="Visual schematic blueprint"
                />
              </div>
              <p className="blueprint-desc">
                Pneumatic double-membrane projection-mapping optimized shell. Structure requires continuous
                low-pressure airflow.
              </p>
            </div>
          </div>
        </>
      )}

      {/* ====================================================
       * @decorlab.in INSTAGRAM LIGHTBOX MODAL
       * ==================================================== */}
      {selectedInsta !== null && (
        <>
          <div
            className="insta-lightbox-overlay active"
            id="insta-lightbox-overlay"
            role="presentation"
            onClick={() => setSelectedInsta(null)}
          ></div>
          <div
            className="insta-lightbox active"
            id="insta-lightbox"
            role="dialog"
            aria-labelledby="lightbox-username"
            aria-modal="true"
          >
            <button
              className="lightbox-close"
              id="lightbox-close-btn"
              aria-label="Close post lightbox"
              onClick={() => setSelectedInsta(null)}
              autoFocus
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            {/* Image container */}
            <div className="lightbox-image-panel">
              <img id="lightbox-img" src={instaPosts[selectedInsta].img} alt="Instagram Post Full Size" />
            </div>

            {/* Detailed Info Column */}
            <div className="lightbox-details-panel">
              {/* Profile Header */}
              <div className="lightbox-profile-header">
                <div className="lightbox-profile-left">
                  <div className="lightbox-avatar">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="14" r="4.5" />
                      <circle cx="16" cy="14" r="4.5" />
                      <circle cx="12" cy="8" r="4.5" />
                    </svg>
                  </div>
                  <div className="lightbox-profile-text">
                    <span className="lightbox-username">decorlab.in</span>
                    <span className="lightbox-location">Kolkata, India</span>
                  </div>
                  <span className="insta-verified" style={{ marginLeft: "6px" }}>
                    <svg viewBox="0 0 24 24" style={{ width: "14px", height: "14px" }}>
                      <path
                        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        fill="#0095f6"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Comments scroll box */}
              <div className="lightbox-comments-scroll" id="lightbox-comments-scroll">
                {/* Main post caption */}
                <div className="lightbox-comment-row">
                  <div className="comment-avatar">DL</div>
                  <div className="comment-text-box">
                    <p>
                      <span className="comment-user">decorlab.in</span>{" "}
                      <span className="comment-txt" id="lightbox-caption">
                        {instaPosts[selectedInsta].caption}
                      </span>
                    </p>
                    <span className="comment-time">2 hours ago</span>
                  </div>
                </div>

                {/* Simulated Comment 1 */}
                <div className="lightbox-comment-row">
                  <div className="comment-avatar">AM</div>
                  <div className="comment-text-box">
                    <p>
                      <span className="comment-user">architect_kolkata</span>{" "}
                      <span className="comment-txt">
                        This organic curves layout is absolutely breathtaking! Elegant design.
                      </span>
                    </p>
                    <span className="comment-time">1 hour ago</span>
                  </div>
                </div>

                {/* Simulated Comment 2 */}
                <div className="lightbox-comment-row">
                  <div className="comment-avatar">SD</div>
                  <div className="comment-text-box">
                    <p>
                      <span className="comment-user">studio_decor</span>{" "}
                      <span className="comment-txt">
                        The warm sunlight reflections are gorgeous. What a curation!
                      </span>
                    </p>
                    <span className="comment-time">45 mins ago</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="lightbox-action-footer">
                <div className="lightbox-actions-row">
                  <span className="lightbox-likes-count" id="lightbox-likes">
                    {instaPosts[selectedInsta].likes} likes
                  </span>
                  <span style={{ color: "rgba(255, 255, 255, 0.45)", fontSize: "0.8rem" }}>
                    {instaPosts[selectedInsta].comments} comments
                  </span>
                </div>

                <a
                  href="https://www.instagram.com/decorlab.in?igsh=MWluaGo2OXZtbzBsOQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lightbox-btn-insta"
                >
                  View on Instagram
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ====================================================
       * PORTFOLIO PROJECT GALLERY LIGHTBOX MODAL
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
    </>
  );
}
