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
import RedesignAnimations from "./RedesignAnimations";

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
  permalink?: string;
  mediaType?: string;
  videoUrl?: string;
  children?: any[];
}

// Instagram feed data
const instaPosts: InstaPost[] = [
  {
    img: "/assets/projects/photos_set1/image_2.webp",
    caption: "A sleek beige organic sofa matches standard-setting minimal plaster walls. Elevating curated interior installations with custom textiles and low-pressure inflatable elements. Madrid — Mumbai.",
    likes: "1,824",
    comments: "84",
  },
  {
    img: "/assets/projects/photos_set1/image_3.webp",
    caption: "Tactile studies in linen. Blending organic soft pillows and pillow-shaped cushion installations into peaceful structural concepts. Habitats made to dream. #DecorLab",
    likes: "2,412",
    comments: "126",
  },
  {
    img: "/assets/projects/photos_set1/image_4.webp",
    caption: "Sculptured circular lines and stark concrete detail studies. Curated pampas accents contrast beautifully with organic white dining modules. Clean living aesthetics.",
    likes: "1,538",
    comments: "42",
  },
  {
    img: "/assets/projects/photos_set2/image_2.webp",
    caption: "Plaster ceilings, low oak platform beds, and pristine linen sheets catch the morning sunbeams. A cozy, high-end design study celebrating Mediterranean roots.",
    likes: "3,104",
    comments: "194",
  },
  {
    img: "/assets/projects/photos_set2/image_3.webp",
    caption: "Modern art installation featuring white geometric spheres and abstract minimalist shapes under clean gallery spotlighting. Sensory scale transitions.",
    likes: "1,209",
    comments: "38",
  },
  {
    img: "/assets/projects/photos_set2/image_4.webp",
    caption: "Concrete study and dry decorative accents in our design lab. Moods of shadow and light reflecting the future of premium interior architectures.",
    likes: "2,945",
    comments: "107",
  },
  {
    img: "/assets/projects/photos_set1/image_1.webp",
    caption: "Curating space, light, and shadow. A clean study in minimalist lines, organic textures, and functional elegance. Every detail designed with purpose.",
    likes: "2,120",
    comments: "76",
  },
  {
    img: "/assets/projects/photos_set1/image_5.webp",
    caption: "Serene corners. Warm neutral tones, textured plaster, and hand-selected natural accessories creating a quiet space for mindfulness and rest.",
    likes: "1,980",
    comments: "62",
  },
  {
    img: "/assets/projects/photos_set1/image_6.webp",
    caption: "Bespoke furniture studies. Seamless solid oak transitions matching low-profile linen seating. Tailored geometry for contemporary living.",
    likes: "2,750",
    comments: "112",
  },
  {
    img: "/assets/projects/photos_set2/image_1.webp",
    caption: "Exploring materiality. Raw limestone blocks meeting delicate linen weaves. A tactile harmony that speaks of silent luxury and permanence.",
    likes: "2,430",
    comments: "95",
  },
  {
    img: "/assets/projects/photos_set2/image_5.webp",
    caption: "Ambient illumination studies. Soft, indirect light reflecting off curvilinear walls to sculpt space and create a welcoming, soft-spoken atmosphere.",
    likes: "1,690",
    comments: "48",
  },
  {
    img: "/assets/projects/photos_set2/image_6.webp",
    caption: "Architectural silhouettes. Bold geometric forms finding balance in textured cream plaster. Crafting modern design narratives in everyday spaces.",
    likes: "2,820",
    comments: "134",
  },
];

// Curated Spaces categories data
const curatedCategories = [
  {
    id: "living",
    label: "Living Curation",
    title: "Living Spaces",
    desc: "A combination of soft, fluid shapes, plaster wall backdrops, and signature low-profile seating that invite a meditative living experience.",
    cards: [
      {
        num: "01",
        title: "Signature Residential Lounge / Kolkata",
        desc: "Warm minimalist seating integrating custom linen upholstery, raw oak tables, and soft lighting.",
        img: "/assets/projects/photos_set1/image_2.webp",
        area: "54 m²",
        specs: "Linen • Oak • Plaster"
      },
      {
        num: "02",
        title: "Santhalia Home / Kolkata",
        desc: "Award-winning minimalist villa integrating natural linen, plaster, and signature ombre curtains.",
        img: "/assets/projects/santhalia_site/image_1.webp",
        area: "65 m²",
        specs: "Travertine • Bouclé • Walnut"
      },
      {
        num: "03",
        title: "Ribbed Canopy Walkway / Corporate HQ",
        desc: "Clean geometric forms finding balance in custom-engineered structural wood and plaster structures.",
        img: "/assets/projects/site_01/image_1.webp",
        area: "120 m²",
        specs: "Oak • Cotton • Stone"
      }
    ]
  },
  {
    id: "dining",
    label: "Dining & Kitchen",
    title: "Dining Modules",
    desc: "Sculptured circular elements and material honesty in raw concrete, oak, and marble create spaces that celebrate connection.",
    cards: [
      {
        num: "01",
        title: "Abstract Dining Module / Bengal Studio",
        desc: "Textured plaster, organic white dining curves, and bold concrete accent columns.",
        img: "/assets/projects/photos_set1/image_4.webp",
        area: "38 m²",
        specs: "Concrete • Oak • Marble"
      },
      {
        num: "02",
        title: "Contemporary Dining Room / Kolkata",
        desc: "Fluid layouts matching custom-engineered timber screens and raw limestone block details.",
        img: "/assets/projects/site_01/image_2.webp",
        area: "45 m²",
        specs: "Timber • Limestone • Steel"
      },
      {
        num: "03",
        title: "Ambient Culinary Curation / Corporate HQ",
        desc: "Indirect lighting studies reflecting off curvilinear walls to sculpt a quiet, social atmosphere.",
        img: "/assets/projects/photos_set2/image_5.webp",
        area: "52 m²",
        specs: "Plaster • Walnut • Brass"
      }
    ]
  },
  {
    id: "bedroom",
    label: "Bedrooms & Lounges",
    title: "Bedrooms & Retreats",
    desc: "Plaster ceilings, low platform oak frames, and pristine natural linen fabrics catching soft morning light to foster tranquil rest.",
    cards: [
      {
        num: "01",
        title: "Oak Platform Retreat / Mumbai",
        desc: "Low oak platform bed structures with textured neutral plaster backdrops catching morning sun.",
        img: "/assets/projects/photos_set2/image_2.webp",
        area: "32 m²",
        specs: "Linen • Platform Oak • Plaster"
      },
      {
        num: "02",
        title: "Aesthetic Lounge / Bengaluru",
        desc: "Mediterranean plaster study exploring scale, soft ambient light, and organic seating curation.",
        img: "/assets/projects/photos_set1/image_1.webp",
        area: "40 m²",
        specs: "Bouclé • Velvet • Travertine"
      },
      {
        num: "03",
        title: "Santhalia Master Suite / Kolkata",
        desc: "Cozy, high-end residential retreat celebrating limestone details and soft-spoken comfort.",
        img: "/assets/projects/santhalia_site/image_2.webp",
        area: "48 m²",
        specs: "Limestone • Soft Cotton • Oak"
      }
    ]
  },
  {
    id: "details",
    label: "Details & Textures",
    title: "Details & Materiality",
    desc: "Quiet studies of shadow, light, and tactile honesty. Celebrating the raw beauty of linen, stone, wood grain, and fluid architecture.",
    cards: [
      {
        num: "01",
        title: "Linen & Cushion Textures / Design Lab",
        desc: "Tactile study in organic linen weaves and cushion installations matching minimal plaster.",
        img: "/assets/projects/photos_set1/image_3.webp",
        area: "Close-up",
        specs: "Linen Weave • Cushion Install"
      },
      {
        num: "02",
        title: "Concrete Study & Dry Accents / Kolkata",
        desc: "A sensory display of light and shadow reflecting from raw concrete studies and dried flora.",
        img: "/assets/projects/photos_set2/image_4.webp",
        area: "Detail",
        specs: "Concrete • Shadow Study"
      },
      {
        num: "03",
        title: "Fluid Forms & Canopy Geometry",
        desc: "Futuristic double-curvature structure showing parametric design and fluid architectural scale.",
        img: "/assets/projects/site_02/image_1.webp",
        area: "HQ Study",
        specs: "Double Curvature • Parametric"
      }
    ]
  }
];

// Methodology steps data (repurposed for Services)
const methodologySteps = [
  {
    num: "01",
    title: "Architecture",
    desc: "High-end architectural planning for luxury residential villas, institutional landmarks, and commercial projects, blending computational modeling with spatial mastery.",
    img: "/assets/services/architecture.png",
    deliverables: [
      "Residential Villas",
      "Commercial Blueprints",
      "Parametric Planning"
    ]
  },
  {
    num: "02",
    title: "Interior Design",
    desc: "Complete spatial curation for luxury residences, corporate workspaces, and retail showrooms. We detail custom millwork, furniture systems, and tailored material styling.",
    img: "/assets/services/interior_design.png",
    deliverables: [
      "Bespoke Furnishing",
      "Custom Millwork",
      "Space Organization"
    ]
  },
  {
    num: "03",
    title: "Landscape Design",
    desc: "Integrating biophilic design and outdoor elements to create tranquil courtyard landscapes, rooftop gardens, and structural outdoor pathways.",
    img: "/assets/services/landscape_design.png",
    deliverables: [
      "Biophilic Layouts",
      "Hardscape Design",
      "Water Features"
    ]
  }
];

export default function Home() {
  // Preloader / Entrance state
  const [showPreloader, setShowPreloader] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [activeCuratedTab, setActiveCuratedTab] = useState("living");

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
  const [activeInstaSlide, setActiveInstaSlide] = useState(0);
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [loadingInsta, setLoadingInsta] = useState(true);

  const [instaProfile, setInstaProfile] = useState({
    posts: '142',
    followers: '42.8k',
    following: '249',
    bio: 'Curated Architecture & Minimalist Interior Curation. Delivering timeless spaces across India since 1993.',
    username: 'decorlab.in',
    profilePicUrl: ''
  });

  useEffect(() => {
    const fetchInstaData = async () => {
      try {
        const res = await fetch('/api/instagram');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        if (data.profile) {
          setInstaProfile(data.profile);
        }
        if (data.feed && data.feed.length > 0) {
          setPosts(data.feed);
        } else {
          setPosts(instaPosts);
        }
      } catch (err) {
        console.error('Error fetching Instagram data:', err);
        setPosts(instaPosts);
      } finally {
        setLoadingInsta(false);
      }
    };

    fetchInstaData();
  }, []);

  const handlePrevInsta = () => {
    const total = posts.length > 0 ? posts.length : instaPosts.length;
    setActiveInstaSlide((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNextInsta = () => {
    const total = posts.length > 0 ? posts.length : instaPosts.length;
    setActiveInstaSlide((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Swipe Gestures for the Mobile Mockup Slider
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const onTouchStart = (e: React.TouchEvent) => {
    setIsSwiping(false);
    setTouchEnd(null);
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const currentX = e.touches[0].clientX;
    setTouchEnd(currentX);
    if (Math.abs(touchStart - currentX) > 10) {
      setIsSwiping(true);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNextInsta();
    } else if (isRightSwipe) {
      handlePrevInsta();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const displayPosts = posts.length > 0 ? posts : instaPosts;

  // Newsletter state
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Projects gallery states
  const [activeProjectTab, setActiveProjectTab] = useState("santhalia");
  const [lightboxProject, setLightboxProject] = useState<{
    siteName: string;
    images: string[];
    activeIndex: number;
  } | null>(null);

  const handleCuratedTabChange = (tabId: string) => {
    if (tabId === activeCuratedTab) return;
    const cards = gsap.utils.toArray(".curated-gallery-masonry .curated-card-wrap");
    if (cards.length > 0) {
      gsap.to(cards, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.in",
        onComplete: () => {
          setActiveCuratedTab(tabId);
        }
      });
    } else {
      setActiveCuratedTab(tabId);
    }
  };

  const handleProjectTabChange = (projectId: string) => {
    if (projectId === activeProjectTab) return;
    const heroWrap = document.querySelector(".showcase-hero-img-wrap");
    const badge = document.querySelector(".showcase-hero-badge");
    const thumbs = gsap.utils.toArray(".showcase-thumb");
    const viewAll = document.querySelector(".showcase-view-all");
    const descText = document.querySelector(".showcase-project-desc-text");

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveProjectTab(projectId);
      }
    });

    if (heroWrap) {
      tl.to(heroWrap, { clipPath: "inset(0% 8% 0% 8%)", opacity: 0, duration: 0.35, ease: "power2.in" }, 0);
    }
    if (badge) {
      tl.to(badge, { opacity: 0, x: -20, duration: 0.25, ease: "power2.in" }, 0);
    }
    if (thumbs.length > 0) {
      tl.to(thumbs, { opacity: 0, y: 15, duration: 0.25, stagger: 0.05, ease: "power2.in" }, 0);
    }
    if (viewAll) {
      tl.to(viewAll, { opacity: 0, y: 15, duration: 0.25, ease: "power2.in" }, 0);
    }
    if (descText) {
      tl.to(descText, { opacity: 0, y: 10, duration: 0.25, ease: "power2.in" }, 0);
    }
    
    if (!heroWrap && !badge && thumbs.length === 0 && !viewAll && !descText) {
      setActiveProjectTab(projectId);
    }
  };

  const projectsData = [
    {
      id: "santhalia",
      title: "Santhalia Residence",
      type: "Residential Curation",
      location: "Kolkata, India",
      description: "An experimental 2,350 sq ft Kolkata residence showcasing a thoughtful application of unique materials, bespoke art installations, and signature ombre curtains. Highlighting clean, warm minimalism with organic plaster walls, textured linen panels, and soft, natural lighting to create a meditative atmosphere.",
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
      type: "Commercial Office",
      location: "Kolkata, India",
      description: "An award-winning commercial headquarters that balances biophilic design principles with fluid spatial transitions. Incorporates custom-engineered partition systems, timber screening, and organic light wells to maximize natural daylighting and occupant productivity.",
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
      type: "Conceptual Architecture",
      location: "ICA Creative Minds Finalist",
      description: "A conceptual design project experimenting with double-curvature structures and organic spatial design. Seamlessly integrates interior architecture with warm lighting grids and natural texture layers to create a premium, immersive spatial flow.",
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
      id: "rathi",
      title: "Rathi Residence",
      type: "Residential Project",
      location: "India",
      description: "A beautifully curated residential space featuring customized decor and a harmonious material palette. Focuses on premium finishing and an elegant spatial arrangement.",
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
      type: "Conceptual Architecture",
      location: "India",
      description: "High-quality 3D visualizations showcasing modern residential design concepts. Features detailed interior planning, lighting simulation, and material exploration.",
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
      bg: "/assets/projects/santhalia_site/image_1.webp",
    },
    {
      model: "Corporate Workspace HQ",
      title: "Atmospheric Design Sanctuaries",
      desc: "Step into an organic workspace of fluid lines and custom lighting.",
      bg: "/assets/projects/site_01/image_1.webp",
    },
    {
      model: "Fluid Architecture",
      title: "Fluidity is in the air",
      desc: "Unconventional structures and curved forms creating serene environments.",
      bg: "/assets/projects/site_02/image_1.webp",
    },
    {
      model: "Aesthetic Lounges",
      title: "Tailored Interior Curation",
      desc: "Linen, raw concrete, and plaster studies creating signature spaces.",
      bg: "/assets/projects/photos_set1/image_1.webp",
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
      img: "/assets/projects/santhalia_site/image_1.webp",
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
      img: "/assets/projects/site_01/image_1.webp",
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
      img: "/assets/projects/site_02/image_1.webp",
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
      img: "/assets/projects/photos_set1/image_1.webp",
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
        active === "section-about" ||
        active === "process" ||
        active === "collection" ||
        active === "collabs" ||
        active === "press" ||
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

  // Curated Spaces tab switch animation
  useEffect(() => {
    if (!isPreloaded) return;

    // Localized Quick Stagger for Curation Cards & Texts
    const cards = gsap.utils.toArray<HTMLElement>("#collection .curated-card");
    const texts = gsap.utils.toArray<HTMLElement>("#collection .curated-text-animate");

    if (cards.length > 0) {
      gsap.fromTo(cards,
        { y: 35, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: "auto"
        }
      );
    }

    if (texts.length > 0) {
      gsap.fromTo(texts,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          overwrite: "auto"
        }
      );
    }
  }, [activeCuratedTab, isPreloaded]);


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
          .set(".progress-bar", { transformOrigin: "right" })
          .to(".progress-bar", {
            scaleX: 0,
            duration: 0.8,
            ease: "power3.in",
          });
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
              // 0 is 'D', 5 is 'L'
              if (index === 0 || index === 5) return 0;
              return index % 2 === 0 ? 100 : -100;
            },
            duration: 0.8,
            ease: "hop",
            stagger: 0.02,
            delay: 0.3,
            onStart: () => {
              const initialChar = chars[0];
              const lChar = chars[5]; // Select 'L' from "DecorLab"

              if (initialChar && lChar) {
                const initialCharMask = initialChar.parentElement;
                const lCharMask = lChar.parentElement;

                if (initialCharMask) initialCharMask.style.overflow = "visible";
                if (lCharMask) lCharMask.style.overflow = "visible";

                const viewportWidth = window.innerWidth;
                const centerX = viewportWidth / 2;
                const initialCharRect = initialChar.getBoundingClientRect();
                const lCharRect = lChar.getBoundingClientRect();

                // Animate initial 'D' and 'L' to merge in the center and fade to white
                gsap.to([initialChar, lChar], {
                  duration: 0.8,
                  ease: "hop",
                  delay: 0.3,
                  color: "#ffffff",
                  x: (i) => {
                    if (i === 0) {
                      return centerX - initialCharRect.left - initialCharRect.width;
                    } else {
                      return centerX - lCharRect.left;
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
        scrollTrigger: { toggleActions: "play none none none",
          trigger: "#section-about",
          start: "top 90%", // Trigger when about section enters the bottom of the viewport
          end: "top 20%",   // Animation finishes when about section reaches 20% from top
          scrub: 1,
          invalidateOnRefresh: true, // Recalculate dynamic values on resize & zoom change!
        }
      });

      aboutCards.forEach((card, index) => {
        const centerIndex = Math.floor(aboutCards.length / 2);
        const offset = index - centerIndex;
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
        end: "+=30%",
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
          scrollTrigger: { toggleActions: "play none none none",
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
        scrollTrigger: { toggleActions: "play none none none",
          trigger: "#section-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
      gsap.to(".hero-foreground-content", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: { toggleActions: "play none none none",
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

    // 0. Dark Mode background toggle ScrollTrigger for #collection (global across viewports)
    ScrollTrigger.create({
      trigger: "#collection",
      start: "top 60%",
      end: "bottom 30%",
      toggleClass: "curated-dark-active",
    });

    // Use matchMedia to support desktop dynamic pinning and mobile native gestures
    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      const getScrollAmount = () => {
        return -(scrollTrack.scrollWidth - window.innerWidth);
      };

      const pinTimeline = gsap.timeline({
        scrollTrigger: { toggleActions: "play none none none",
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
              toggleActions: "play none none none",
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
              toggleActions: "play none none none",
            }
          }
        );
      }

      const clipLines = gsap.utils.toArray<HTMLElement>(".clip-text-about");
      if (clipLines.length > 0) {
        const tlAbout = gsap.timeline({
          scrollTrigger: { toggleActions: "play none none none",
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
              toggleActions: "play none none none",
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
      if (document.querySelector("#process .process-accordion-header")) {
        gsap.fromTo("#process .process-accordion-header > *",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#process",
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      }

      const accordionPanels = gsap.utils.toArray<HTMLElement>("#process .process-accordion-panel");
      if (accordionPanels.length > 0) {
        gsap.fromTo(accordionPanels,
          { y: 50, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#process .process-accordion-container",
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      }

      // 4. Curated Spaces Section (#collection)
      if (document.querySelector("#collection .curated-sidebar-col")) {
        gsap.fromTo("#collection .curated-sidebar-col",
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#collection",
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      }

      const collectionCardWraps = gsap.utils.toArray<HTMLElement>("#collection .curated-card-wrap");
      if (collectionCardWraps.length > 0) {
        gsap.fromTo(collectionCardWraps,
          { y: 60, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#collection .curated-gallery-masonry",
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );

        // Asymmetric vertical card parallax translation + inner image parallax
        collectionCardWraps.forEach((wrap, idx) => {
          const card = wrap.querySelector(".curated-card");
          const img = wrap.querySelector(".curated-card-img");
          
          // Outer card parallax: idx 0 slow-up, idx 1 fast-down, idx 2 medium-up
          const yStart = idx === 1 ? -35 : (idx === 0 ? 25 : -15);
          const yEnd = idx === 1 ? 35 : (idx === 0 ? -25 : 15);
          
          if (card) {
            gsap.fromTo(card,
              { y: yStart },
              {
                y: yEnd,
                ease: "none",
                scrollTrigger: { toggleActions: "play none none none",
                  trigger: wrap,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                }
              }
            );
          }

          if (img) {
            gsap.fromTo(img,
              { yPercent: -8 },
              {
                yPercent: 8,
                ease: "none",
                scrollTrigger: { toggleActions: "play none none none",
                  trigger: wrap,
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
              toggleActions: "play none none none",
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
              toggleActions: "play none none none",
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
              toggleActions: "play none none none",
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
              toggleActions: "play none none none",
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
              toggleActions: "play none none none",
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
              toggleActions: "play none none none",
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
              toggleActions: "play none none none",
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
              toggleActions: "play none none none",
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
              toggleActions: "play none none none",
            }
          }
        );
      }

      const phoneWrapper = document.querySelector("#instagram .phone-slider-wrapper");
      if (phoneWrapper) {
        gsap.fromTo(phoneWrapper,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#instagram",
              start: "top 80%",
              toggleActions: "play none none none",
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
              toggleActions: "play none none none",
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
              toggleActions: "play none none none",
            }
          }
        );
      }
    });

    mm.add("(max-width: 900px)", () => {
      if (runningText) {
        gsap.to(runningText, {
          xPercent: -30,
          scrollTrigger: { toggleActions: "play none none none",
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
        { trigger: "#collection", targets: "#collection .curated-sidebar-col > *, #collection .curated-card-wrap" },
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
                toggleActions: "play none none none"
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
              toggleActions: "play none none none"
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
            toggleActions: "play none none none",
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
            toggleActions: "play none none none",
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
            toggleActions: "play none none none",
          }
        }
      );
    }

    // ─── 3. PROCESS STEPS: Cinematic Accordion Panels ──
    const processHeader = document.querySelector("#process .process-accordion-header");
    if (processHeader) {
      gsap.fromTo(processHeader.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#process",
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );
    }

    const processPanels = gsap.utils.toArray<HTMLElement>("#process .process-accordion-panel");
    if (processPanels.length > 0) {
      gsap.fromTo(processPanels,
        { y: 55, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#process .process-accordion-container",
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );
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
            toggleActions: "play none none none",
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
            toggleActions: "play none none none",
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
            toggleActions: "play none none none",
          }
        }
      );
    }

    // ─── 6. INSTAGRAM: Phone Mockup Parallax ──────────
    const phoneMock = document.querySelector("#instagram .phone-mockup");
    if (phoneMock) {
      gsap.fromTo(phoneMock,
        { yPercent: 4, rotateZ: -1.5 },
        {
          yPercent: -4,
          rotateZ: 1.5,
          ease: "none",
          scrollTrigger: { toggleActions: "play none none none",
            trigger: "#instagram",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
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
              toggleActions: "play none none none",
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
            toggleActions: "play none none none",
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
            toggleActions: "play none none none",
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
            toggleActions: "play none none none",
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
            toggleActions: "play none none none",
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
            toggleActions: "play none none none",
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
            toggleActions: "play none none none",
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
        onEnter: () => {
          wordEls.forEach((w, i) => {
            setTimeout(() => w.classList.add("revealed"), i * 80);
          });
        },
        onLeave: () => {
          wordEls.forEach((w) => w.classList.remove("revealed"));
        },
        onEnterBack: () => {
          wordEls.forEach((w, i) => {
            setTimeout(() => w.classList.add("revealed"), i * 80);
          });
        },
        onLeaveBack: () => {
          wordEls.forEach((w) => w.classList.remove("revealed"));
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
            toggleActions: "play none none none",
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
              toggleActions: "play none none none",
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
            toggleActions: "play none none none",
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
              toggleActions: "play none none none",
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
            toggleActions: "play none none none",
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
            toggleActions: "play none none none",
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
            toggleActions: "play none none none",
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
          scrollTrigger: { toggleActions: "play none none none",
            trigger: "#section-about",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

    // ─── SHOWCASE PORTFOLIO: Scroll-triggered reveals ──────────
    const showcaseSection = document.querySelector("#showcase");
    if (showcaseSection) {
      // Header bar fade-in
      if (document.querySelector(".showcase-eyebrow")) {
        gsap.from(".showcase-eyebrow", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { toggleActions: "play none none none", trigger: "#showcase", start: "top 80%" }
        });
      }
      if (document.querySelector(".showcase-main-title")) {
        gsap.from(".showcase-main-title", {
          opacity: 0,
          y: 40,
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1,
          ease: "power4.out",
          delay: 0.15,
          scrollTrigger: { toggleActions: "play none none none", trigger: "#showcase", start: "top 80%" }
        });
      }
      if (document.querySelector(".showcase-header-desc")) {
        gsap.from(".showcase-header-desc", {
          opacity: 0,
          x: 30,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: { toggleActions: "play none none none", trigger: "#showcase", start: "top 80%" }
        });
      }

      // Staggered project list items
      const listItems = gsap.utils.toArray<HTMLElement>(".showcase-list-item");
      if (listItems.length > 0) {
        gsap.from(listItems, {
          opacity: 0,
          x: -30,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { toggleActions: "play none none none", trigger: ".showcase-project-list", start: "top 85%" }
        });
      }

      // Hero image clip-path reveal
      if (document.querySelector(".showcase-hero-img-wrap")) {
        gsap.from(".showcase-hero-img-wrap", {
          clipPath: "inset(15% 15% 15% 15%)",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { toggleActions: "play none none none", trigger: ".showcase-hero-img-wrap", start: "top 85%" }
        });
      }

      // Thumbnail strip fade-in
      if (document.querySelector(".showcase-thumb-strip")) {
        gsap.from(".showcase-thumb-strip", {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: { toggleActions: "play none none none", trigger: ".showcase-thumb-strip", start: "top 95%" }
        });
      }

      // Description text fade
      if (document.querySelector(".showcase-project-desc-text")) {
        gsap.from(".showcase-project-desc-text", {
          opacity: 0,
          y: 15,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { toggleActions: "play none none none", trigger: ".showcase-project-desc-text", start: "top 95%" }
        });
      }
    }

    // ─── FOOTER: Staggered scroll reveals ────────────────────────
    const footerEl = document.querySelector("#contact-footer");
    if (footerEl) {
      // Brand row
      if (document.querySelector(".footer-brand-left")) {
        gsap.from(".footer-brand-left", {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { toggleActions: "play none none none", trigger: "#contact-footer", start: "top 85%" }
        });
      }
      if (document.querySelector(".footer-brand-right")) {
        gsap.from(".footer-brand-right", {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: { toggleActions: "play none none none", trigger: "#contact-footer", start: "top 85%" }
        });
      }

      // Dividers wipe-in
      const dividers = gsap.utils.toArray<HTMLElement>(".footer-divider");
      dividers.forEach((div) => {
        gsap.from(div, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { toggleActions: "play none none none", trigger: div, start: "top 95%" }
        });
      });

      // Links grid columns stagger
      const linkCols = gsap.utils.toArray<HTMLElement>(".footer-links-col");
      if (linkCols.length > 0) {
        gsap.from(linkCols, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { toggleActions: "play none none none", trigger: ".footer-links-grid", start: "top 90%" }
        });
      }

      // Bottom bar fade
      if (document.querySelector(".footer-bottom")) {
        gsap.from(".footer-bottom", {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { toggleActions: "play none none none", trigger: ".footer-bottom", start: "top 98%" }
        });
      }
    }

  }, [isPreloaded]);

  // ─── CURATED SPACES TAB TRANSITION ANIMATION ─────────────────
  useEffect(() => {
    if (!isPreloaded) return;
    const cards = gsap.utils.toArray(".curated-gallery-masonry .curated-card-wrap");
    if (cards.length > 0) {
      gsap.fromTo(cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: "auto"
        }
      );
    }
  }, [activeCuratedTab, isPreloaded]);

  // ─── SHOWCASE TAB TRANSITION ANIMATION ──────────────────────
  useEffect(() => {
    if (!isPreloaded) return;
    
    const heroWrap = document.querySelector(".showcase-hero-img-wrap");
    const heroImg = document.querySelector(".showcase-hero-img");
    const badge = document.querySelector(".showcase-hero-badge");
    const thumbs = document.querySelectorAll(".showcase-thumb");
    const viewAll = document.querySelector(".showcase-view-all");
    const descText = document.querySelector(".showcase-project-desc-text");
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    if (heroWrap) {
      tl.fromTo(heroWrap, 
        { clipPath: "inset(0% 8% 0% 8%)", opacity: 0.8 },
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 0.6 }
      );
    }
    
    if (heroImg) {
      tl.fromTo(heroImg,
        { scale: 1.12 },
        { scale: 1, duration: 0.8 },
        0
      );
    }

    if (badge) {
      tl.fromTo(badge,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4 },
        0.2
      );
    }
    
    if (thumbs.length > 0) {
      tl.fromTo(thumbs,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
        0.15
      );
    }

    if (viewAll) {
      tl.fromTo(viewAll,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.3
      );
    }
    
    if (descText) {
      tl.fromTo(descText,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.25
      );
    }
  }, [activeProjectTab, isPreloaded]);


  // Pinned ScrollTrigger layout settlement refresh
  useEffect(() => {
    if (!isPreloaded) return;
    const timer1 = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 500);
    const timer2 = setTimeout(() => {
      ScrollTrigger.sort();
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

            <div className="preloader-images">
              <div className="img">
                <img loading="lazy" src="/assets/projects/santhalia_site/image_1.webp" alt="Opening structure 1" style={{ scale: 1.5 }} />
              </div>
              <div className="img">
                <img loading="lazy" src="/assets/projects/site_01/image_1.webp" alt="Opening structure 2" style={{ scale: 1.5 }} />
              </div>
              <div className="img">
                <img loading="lazy" src="/assets/projects/site_02/image_1.webp" alt="Opening structure 3" style={{ scale: 1.5 }} />
              </div>
              <div className="img">
                <img loading="lazy" src="/assets/projects/photos_set1/image_1.webp" alt="Opening structure 4" style={{ scale: 1.5 }} />
              </div>
            </div>

          </div>

          <div ref={preloaderHeaderRef} className="preloader-header" id="preloader-header-container">
            <a href="#" id="preloader-title-link" style={{ whiteSpace: 'nowrap', display: 'flex', justifyContent: 'center' }}>
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
          <img src="/assets/Decorlab final-04.webp" alt="Decor Lab Logo" className="nav-logo-img" />
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
          >Work</a>
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
        <section id="section-hero" className="section hero" style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#000', height: '100vh', minHeight: '600px' }}>
          <video
            className="hero-bg-video"
            src="/assets/videos/living-room.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          />
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
                    DECORLAB
                  </div>
                </div>

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
                  <div className="inner-heading-about _1" style={{ width: '100%', justifyContent: 'center' }}><div className="text-heading-about" style={{ fontSize: 'clamp(1rem, 2vw, 2.5rem)', lineHeight: 1.2, whiteSpace: 'normal', textAlign: 'center' }}>Founded in 1993 by Raja Sinha, </div></div>
                  <div className="inner-heading-about _2" style={{ width: '100%', justifyContent: 'center' }}><div className="text-heading-about" style={{ fontSize: 'clamp(1rem, 2vw, 2.5rem)', lineHeight: 1.2, whiteSpace: 'normal', textAlign: 'center' }}>Decorlab has spent 33 years treating </div></div>
                  <div className="inner-heading-about _3" style={{ width: '100%', justifyContent: 'center' }}><div className="text-heading-about" style={{ fontSize: 'clamp(1rem, 2vw, 2.5rem)', lineHeight: 1.2, whiteSpace: 'normal', textAlign: 'center' }}>architecture, interiors, and landscape as one discipline.</div></div>
                </div>
                <div className="wrapper-tag-section about">
                  <div className="wrapper-tagline-about">
                    <div className="text-tagline-section about">Designing since 1993</div>
                  </div>
                  <div data-w-id="21ec498a-da00-b0a0-20cb-51467f79dc0b" className="wrapper-circle">
                    <div className="circle-section"></div>
                  </div>
                </div>
              </div>
              <div className="outer-descriptions-about">
                <div className="wrapper-descriptions-about">
                  <p className="paragraph-about">
                    What began in a small room at home has grown into a 275-strong team working across 15 cities pan-India, with 1,300+ sites behind it — the same conviction holding steady the whole way. Rajdip Sinha, trained at the Bartlett, UCL, now carries that legacy forward, on a mission to build India's parametric and fluid architecture movement — his core specialty — while keeping the firm's oldest habit alive. That growth shows in our clients too — a large share of them return to us, because a legacy like this only carries on when it's earned twice over.
                  </p>
                </div>
              </div>
              <div className="area-resize">
                <div className="area">
                  <div className="absolute-card in-about">
                    <div className="card-cross-section _0">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/photos_set2/image_1.webp" loading="lazy" alt="Luxurious interior" className="image-path" />
                      </div>
                    </div>
                    <div className="card-cross-section _1">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/photos_set2/image_2.webp" loading="lazy" alt="Elegant design" className="image-path" />
                      </div>
                    </div>
                    <div className="card-cross-section _2">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/site_01/image_1.webp" loading="lazy" alt="Modern interior design" className="image-path" />
                      </div>
                    </div>
                    <div className="card-cross-section _3">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/site_02/image_2.webp" loading="lazy" alt="Contemporary architecture" className="image-path" />
                      </div>
                    </div>
                    <div className="card-cross-section _4">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/santhalia_site/image_3.webp" loading="lazy" alt="Abstract modern architectural artwork" className="image-path" />
                      </div>
                    </div>
                    <div className="card-cross-section _5">
                      <div className="card-cross-section-inner">
                        <img src="/assets/projects/photos_set1/image_4.webp" loading="lazy" alt="Modern curved architecture" className="image-path" />
                      </div>
                    </div>
                    <div className="card-cross-section _6">
                      <div className="card-cross-section-inner">
                        <video 
                          src="/assets/videos/living-room.mp4" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          className="image-path" 
                          style={{ objectFit: "cover" }} 
                        />
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
         * SECTION 2B: REDESIGNED SERVICES
         * ==================================================== */}
        <section id="services" className="rl-section rl-methodology">
          <div className="rl-container">
            <span className="rl-subtitle">02 / Services</span>
            <h2 className="rl-title">Spaces We Create.</h2>
            
            <div className="rl-methodology-grid">
              <div className="rl-methodology-img-wrap">
                <div className="rl-methodology-img-inner">
                  {methodologySteps.map((step, idx) => (
                    <img
                      key={step.num}
                      src={step.img}
                      alt={step.title}
                      className={"rl-methodology-img " + (activeProcessStep === idx ? "active" : "")}
                      loading="lazy"
                    />
                  ))}
                </div>
                {/* Active service caption below sticky image */}
                <div className="rl-methodology-img-caption">
                  <span className="caption-num">
                    {methodologySteps[activeProcessStep]?.num || "01"}
                  </span>
                  <span className="caption-divider">/</span>
                  <span className="caption-title">
                    {methodologySteps[activeProcessStep]?.title || ""}
                  </span>
                </div>
              </div>

              <div className="rl-methodology-list">
                {methodologySteps.map((step, idx) => {
                  const isActive = activeProcessStep === idx;
                  return (
                    <div 
                      key={step.num}
                      className={"rl-methodology-item " + (isActive ? "active" : "")}
                      onMouseEnter={() => setActiveProcessStep(idx)}
                      onClick={() => setActiveProcessStep(idx)}
                    >
                      {/* Active indicator line */}
                      <div className="rl-methodology-indicator" />

                      <div className="rl-methodology-header">
                        <span className="rl-methodology-num">{step.num}</span>
                        <h3 className="rl-methodology-name">{step.title}</h3>
                      </div>
                      <div className="rl-methodology-content">
                        <p className="rl-methodology-desc">{step.desc}</p>
                        
                        {/* Deliverables tags */}
                        {step.deliverables && (
                          <div className="rl-methodology-tags">
                            {step.deliverables.map((deliv, dIdx) => (
                              <span key={dIdx} className="rl-methodology-tag">
                                {deliv}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="rl-methodology-mobile-img">
                          <img src={step.img} alt={step.title} loading="lazy" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Removed Curated Spaces Section */}


        {/* ====================================================
         * SECTION 2D: REDESIGNED RECENT COLLABS
         * ==================================================== */}
        <section id="collabs" className="rl-section rl-collabs">
          <div className="rl-container">
            <div className="rl-collabs-content">
              <div className="rl-collabs-text-block">
                <span className="rl-subtitle">Design Partnerships</span>
                <h2 className="rl-title">Recent Awards</h2>
                <p className="rl-collabs-desc">
                  Collaborating with international pioneers to bring smart hardware, premium fittings, and material innovations into our interior architectures. Seamlessly matching top-tier technology with handcrafted wooden elements.
                </p>
                
                <div className="rl-collabs-stats">
                  <div className="rl-collabs-stat">
                    <span className="rl-stat-num">12+</span>
                    <span className="rl-stat-label">Brand Partners</span>
                  </div>
                  <div className="rl-collabs-stat">
                    <span className="rl-stat-num">48</span>
                    <span className="rl-stat-label">Projects Curated</span>
                  </div>
                  <div className="rl-collabs-stat">
                    <span className="rl-stat-num">6</span>
                    <span className="rl-stat-label">Awards Won</span>
                  </div>
                </div>

                <div style={{ marginTop: "2.5rem" }}>
                  <a href="/awards" style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    color: "#C9A84C",
                    textDecoration: "none",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontSize: "0.85rem",
                    borderBottom: "1px solid rgba(201,168,76,0.3)",
                    paddingBottom: "4px",
                    transition: "all 0.3s ease"
                  }}>
                    View All Awards
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="rl-collabs-images">
                <div className="rl-collabs-img-stack" style={{ aspectRatio: '3/4' }}>
                  <a href="https://www.aninews.in/news/business/business/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-202320230424183435/" target="_blank" rel="noopener noreferrer" className="rl-collabs-img-wrapper secondary" style={{ textDecoration: 'none', display: 'block' }}>
                    <img src="/assets/award_new_1.png" alt="India Design Accolade" loading="lazy" style={{ cursor: 'pointer' }} />
                  </a>
                  <a href="https://www.goodhomes.co.in/home-and-design-trends/dcode/dcode-presents-design-ikon-rajdip-sinha-decor-lab-9205.html" target="_blank" rel="noopener noreferrer" className="rl-collabs-img-wrapper tertiary" style={{ textDecoration: 'none', display: 'block' }}>
                    <img src="/assets/award_new_2.png" alt="Emerging Architect Award" loading="lazy" style={{ cursor: 'pointer' }} />
                  </a>
                </div>
                <div className="rl-collabs-img-stack" style={{ aspectRatio: '3/4' }}>
                  <a href="https://www.business-standard.com/content/press-releases-ani/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-2023-123042400875_1.html" target="_blank" rel="noopener noreferrer" className="rl-collabs-img-wrapper secondary" style={{ textDecoration: 'none', display: 'block' }}>
                    <img src="/assets/award_new_3.png" alt="Best Residential Project Medal" loading="lazy" style={{ cursor: 'pointer' }} />
                  </a>
                  <a href="https://images.forbesindia.com/media/supplement_pdf/Top%2020%20Architecturres%20&%20Interior.pdf" target="_blank" rel="noopener noreferrer" className="rl-collabs-img-wrapper tertiary" style={{ textDecoration: 'none', display: 'block' }}>
                    <img src="/assets/award_new_4.png" alt="Industry Excellence Award" loading="lazy" style={{ cursor: 'pointer' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>



        <Gallery 
          isPreloaded={isPreloaded} 
          projectsData={projectsData}
          onOpenProject={(project) => setLightboxProject({
            siteName: project.title,
            images: project.images,
            activeIndex: 0
          })}
        />

        {/* ====================================================
         * SECTION 2F: REDESIGNED SITE PORTFOLIO
         * ==================================================== */}
        <section id="showcase" className="rl-section light rl-portfolio" style={{ display: 'none' }}>
          <div className="rl-container">
            <span className="rl-subtitle" style={{color: "#050505"}}>Projects</span>
            <h2 className="rl-title" style={{color: "#050505"}}>Project Type</h2>
            <div className="rl-divider"></div>
            
            <div className="rl-portfolio-list">
              {projectsData.map((project, idx) => (
                <div 
                  key={project.id} 
                  className="rl-portfolio-row"
                  onClick={() => setLightboxProject({
                    siteName: project.title,
                    images: project.images,
                    activeIndex: 0
                  })}
                >
                  <span className="rl-portfolio-num">0{idx + 1}</span>
                  <h3 className="rl-portfolio-name">{project.title}</h3>
                  <span className="rl-portfolio-loc">{project.type}</span>
                  <img 
                    src={project.images[0]} 
                    alt={project.title}
                    className="rl-portfolio-hover-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================
         * SECTION 4: REDESIGNED PHILOSOPHY
         * ==================================================== */}
        <section id="capabilities" className="rl-philo-section">
          {/* Top header band */}
          <div className="rl-philo-header">
            <span className="rl-philo-eyebrow">Philosophy</span>
            <h2 className="rl-philo-headline">Our Design Approach</h2>
          </div>

          {/* Three pillars */}
          <div className="rl-philo-pillars">

            {/* Pillar 01 */}
            <div className="rl-philo-pillar">
              <div className="rl-philo-pillar-img-wrap">
                <img src="/assets/approach/functionality-first.jpg" alt="Functionality First" loading="lazy" className="rl-philo-pillar-img" />
              </div>
              <div className="rl-philo-pillar-body">
                <span className="rl-philo-num">01</span>
                <h3 className="rl-philo-pillar-title">Functionality<br/>First</h3>
                <div className="rl-philo-pillar-divider"/>
                <p className="rl-philo-pillar-desc">
                  Every layout is tested for ergonomic usability before decorative styling is introduced. Space must live before it can impress.
                </p>
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="rl-philo-pillar">
              <div className="rl-philo-pillar-img-wrap">
                <img src="/assets/approach/material-innovation.jpg" alt="Material Innovation" loading="lazy" className="rl-philo-pillar-img" />
              </div>
              <div className="rl-philo-pillar-body">
                <span className="rl-philo-num">02</span>
                <h3 className="rl-philo-pillar-title">Material<br/>Innovation</h3>
                <div className="rl-philo-pillar-divider"/>
                <p className="rl-philo-pillar-desc">
                  Raw textures, natural finishes, and innovative pairings that age gracefully. We celebrate material honesty over surface illusion.
                </p>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="rl-philo-pillar">
              <div className="rl-philo-pillar-img-wrap">
                <img src="/assets/approach/fluid-architecture.jpg" alt="Fluid Architecture" loading="lazy" className="rl-philo-pillar-img" />
              </div>
              <div className="rl-philo-pillar-body">
                <span className="rl-philo-num">03</span>
                <h3 className="rl-philo-pillar-title">Fluid<br/>Architecture</h3>
                <div className="rl-philo-pillar-divider"/>
                <p className="rl-philo-pillar-desc">
                  Challenging box-like conventions with organic curves, parametric surfaces, and continuous spatial geometries that breathe.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom quote band */}
          <div className="rl-philo-quote-band">
            <blockquote className="rl-philo-quote">
              "Design is not just what it looks like — design is how it works, how it feels, how it endures."
            </blockquote>
          </div>
        </section>


        {/* ====================================================
         * SECTION 5: INSTAGRAM — Profile + Phone Mockup
         * ==================================================== */}
        <section id="instagram" className="rl-insta-section">

          {/* Left: Profile card */}
          <div className="rl-insta-profile">
            <div className="rl-insta-avatar" style={{
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              padding: '3px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px'
            }}>
              <div style={{ background: '#1a1a1a', width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src={instaProfile.profilePicUrl || "/assets/Decorlab-favicon.png"} alt={instaProfile.username} style={{width: instaProfile.profilePicUrl ? '100%' : '65%', height: instaProfile.profilePicUrl ? '100%' : '65%', objectFit: instaProfile.profilePicUrl ? 'cover' : 'contain'}} />
              </div>
            </div>

            <div className="rl-insta-handle-row">
              <h2 className="rl-insta-handle">{instaProfile.username}</h2>
              <span className="rl-insta-verified" title="Verified">
                <svg viewBox="0 0 24 24" fill="#0095f6" width="18" height="18">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </span>
            </div>

            <div className="rl-insta-stats">
              <div className="rl-insta-stat">
                <span className="rl-insta-stat-num">{instaProfile.posts}</span>
                <span className="rl-insta-stat-label">posts</span>
              </div>
              <div className="rl-insta-stat">
                <span className="rl-insta-stat-num">{instaProfile.followers}</span>
                <span className="rl-insta-stat-label">followers</span>
              </div>
              <div className="rl-insta-stat">
                <span className="rl-insta-stat-num">{instaProfile.following}</span>
                <span className="rl-insta-stat-label">following</span>
              </div>
            </div>

            <div className="rl-insta-bio">
              <span className="rl-insta-bio-name">Decor Lab</span>
              <p>{instaProfile.bio}</p>
            </div>

            <a
              href={`https://www.instagram.com/${instaProfile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rl-insta-follow-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              Follow on Instagram
            </a>

            <div className="rl-phone-dots">
              {displayPosts.map((_, idx) => (
                <button
                  key={idx}
                  className={"rl-phone-dot" + (activeInstaSlide === idx ? " active" : "")}
                  onClick={() => !loadingInsta && setActiveInstaSlide(idx)}
                  aria-label={"Go to slide " + (idx + 1)}
                  disabled={loadingInsta}
                />
              ))}
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="rl-phone-wrap">
            <button className="rl-phone-arrow prev" onClick={handlePrevInsta} aria-label="Previous" disabled={loadingInsta}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <div className="rl-phone-mockup" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
              <div className="rl-phone-island"></div>
              <div className="rl-phone-btn vol-up"></div>
              <div className="rl-phone-btn vol-dn"></div>
              <div className="rl-phone-btn pwr"></div>

              <div className="rl-phone-screen">
                <div className="rl-phone-status">
                  <span className="rl-phone-time">09:41</span>
                  <div className="rl-phone-icons">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M2 22h20V2z"/></svg>
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 21l-12-18h24z"/></svg>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zM21 9h2v6h-2z"/></svg>
                  </div>
                </div>

                <div className="rl-phone-app-header">
                  <div className="rl-phone-app-left">
                    <div className="rl-phone-mini-avatar" style={{
                      background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                      padding: '2px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      marginRight: '8px'
                    }}>
                      <div style={{ background: '#1a1a1a', width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <img src={instaProfile.profilePicUrl || "/assets/Decorlab-favicon.png"} alt={instaProfile.username} style={{width: instaProfile.profilePicUrl ? '100%' : '65%', height: instaProfile.profilePicUrl ? '100%' : '65%', objectFit: instaProfile.profilePicUrl ? 'cover' : 'contain'}} />
                      </div>
                    </div>
                    <div>
                      <div className="rl-phone-app-user">{instaProfile.username}</div>
                      <div className="rl-phone-app-loc">Kolkata, India</div>
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </div>

                {loadingInsta ? (
                  <div className="rl-phone-skeleton">
                    <div className="skeleton-pulse" style={{width:'100%', aspectRatio:'1/1', borderRadius:'12px'}}></div>
                    <div style={{padding:'12px', display:'flex', flexDirection:'column', gap:'6px'}}>
                      <div className="skeleton-pulse" style={{height:'8px', width:'40%', borderRadius:'4px'}}></div>
                      <div className="skeleton-pulse" style={{height:'8px', width:'80%', borderRadius:'4px'}}></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="rl-phone-slider-track-wrap">
                      <div
                        className="rl-phone-slider-track"
                        style={{transform: "translateX(-" + (activeInstaSlide * 100) + "%)"}}>
                        {displayPosts.map((post, idx) => (
                          <div key={idx} className="rl-phone-slide">
                            <div
                              className="rl-phone-post-img"
                              role="button"
                              tabIndex={0}
                              onClick={() => { if (!isSwiping) setSelectedInsta(idx); }}
                              aria-label={"View post " + (idx + 1)}
                            >
                              {post.mediaType === 'VIDEO' && post.videoUrl ? (
                                <video 
                                  autoPlay 
                                  muted 
                                  loop 
                                  playsInline 
                                  src={post.videoUrl} 
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                />
                              ) : post.mediaType === 'CAROUSEL_ALBUM' && post.children && post.children.length > 0 ? (
                                <div 
                                  style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', width: '100%', height: '100%', scrollbarWidth: 'none' }}
                                  onTouchStart={(e) => e.stopPropagation()}
                                  onTouchMove={(e) => e.stopPropagation()}
                                  onTouchEnd={(e) => e.stopPropagation()}
                                >
                                  {post.children.map((child: any, cIdx: number) => (
                                    <img 
                                      key={cIdx} 
                                      loading="lazy" 
                                      src={child.img} 
                                      alt={"Carousel Image " + (cIdx + 1)} 
                                      style={{ width: '100%', height: '100%', objectFit: 'cover', flexShrink: 0, scrollSnapAlign: 'start' }} 
                                    />
                                  ))}
                                </div>
                              ) : (
                                <img loading="lazy" src={post.img} alt={"Post " + (idx + 1)} />
                              )}
                              <div className="rl-phone-post-overlay">
                                <div className="rl-phone-post-stats">
                                  <span>
                                    <svg viewBox="0 0 24 24" fill="white" width="12" height="12"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                    {post.likes}
                                  </span>
                                  <span>
                                    <svg viewBox="0 0 24 24" fill="white" width="12" height="12"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                                    {post.comments}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rl-phone-actions">
                      <div className="rl-phone-actions-left">
                        <svg className="rl-phone-action-icon liked" viewBox="0 0 24 24" fill="#ed4956"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        <svg className="rl-phone-action-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                        <svg className="rl-phone-action-icon" viewBox="0 0 24 24" fill="currentColor" style={{transform:'rotate(-20deg)'}}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                      </div>
                      <svg className="rl-phone-action-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                    </div>

                    <div className="rl-phone-caption">
                      <div className="rl-phone-likes">{displayPosts[activeInstaSlide]?.likes} likes</div>
                      <div className="rl-phone-caption-text">
                        <span className="rl-phone-caption-user">{instaProfile.username} </span>
                        {displayPosts[activeInstaSlide]?.caption}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button className="rl-phone-arrow next" onClick={handleNextInsta} aria-label="Next" disabled={loadingInsta}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
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
        <FooterBanner isPreloaded={isPreloaded} bgColor="bg-white" />

        <RedesignAnimations setActiveProcessStep={setActiveProcessStep} />

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
              {displayPosts[selectedInsta]?.mediaType === 'VIDEO' && displayPosts[selectedInsta]?.videoUrl ? (
                <video 
                  autoPlay 
                  controls
                  loop 
                  playsInline 
                  src={displayPosts[selectedInsta]?.videoUrl} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                />
              ) : displayPosts[selectedInsta]?.mediaType === 'CAROUSEL_ALBUM' && displayPosts[selectedInsta]?.children && displayPosts[selectedInsta]?.children.length > 0 ? (
                <div 
                  style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', width: '100%', height: '100%', scrollbarWidth: 'none' }}
                >
                  {displayPosts[selectedInsta].children.map((child: any, cIdx: number) => (
                    <img 
                      key={cIdx} 
                      loading="lazy" 
                      src={child.img} 
                      alt={"Carousel Image " + (cIdx + 1)} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain', flexShrink: 0, scrollSnapAlign: 'start' }} 
                    />
                  ))}
                </div>
              ) : (
                <img loading="lazy" id="lightbox-img" src={displayPosts[selectedInsta]?.img} alt="Instagram Post Full Size" />
              )}
            </div>

            {/* Detailed Info Column */}
            <div className="lightbox-details-panel">
              {/* Profile Header */}
              <div className="lightbox-profile-header">
                <div className="lightbox-profile-left">
                  <div className="lightbox-avatar" style={{
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    padding: '2px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    marginRight: '12px'
                  }}>
                    <div style={{ background: '#1a1a1a', width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <img src="/assets/Decorlab-favicon.png" alt="decorlab.in" style={{width: '65%', height: '65%', objectFit: 'contain'}} />
                    </div>
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
                        {displayPosts[selectedInsta]?.caption}
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
                    {displayPosts[selectedInsta]?.likes} likes
                  </span>
                  <span style={{ color: "rgba(255, 255, 255, 0.45)", fontSize: "0.8rem" }}>
                    {displayPosts[selectedInsta]?.comments} comments
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
