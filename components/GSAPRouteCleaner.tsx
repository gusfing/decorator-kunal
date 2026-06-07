"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Register ScrollTrigger globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GSAPRouteCleaner() {
  const pathname = usePathname();

  // 1. Pathname change: Clean up old ScrollTriggers and reset scroll position
  useEffect(() => {
    // Kill lingering triggers on page transition
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    // Refresh ScrollTrigger to find new DOM layout
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    // Smooth reset scroll to top
    window.scrollTo(0, 0);
  }, [pathname]);

  // 2. Main Mount: Global Custom Cursor & Lenis Smooth Scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    // ─── INITIALIZE LENIS SMOOTH SCROLL ───
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    } as any);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // ─── INITIALIZE GLOBAL CUSTOM CURSOR ───
    // Create cursor DOM element if it doesn't exist yet
    let cursor = document.querySelector(".custom-cursor") as HTMLDivElement | null;
    if (!cursor) {
      cursor = document.createElement("div");
      cursor.className = "custom-cursor";
      document.body.appendChild(cursor);
    }

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;
    let cursorRafId: number;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      if (cursor) {
        curX = lerp(curX, mouseX, 0.12);
        curY = lerp(curY, mouseY, 0.12);
        cursor.style.left = `${curX}px`;
        cursor.style.top = `${curY}px`;
      }
      cursorRafId = requestAnimationFrame(animateCursor);
    };

    // Event delegation for cursor hover states (handles dynamic elements and path changes)
    const onMouseOver = (e: MouseEvent) => {
      if (!cursor) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hoverable = target.closest(
        "a, button, [role='button'], .inner-button-universall, .instagram-card, " +
        ".reveal-gallery-img, .step-card-new, .project-card, .wrapper-image-icon, " +
        ".showcase-gallery-item, .showcase-tab, .lightbox-close, .project-lightbox-prev, " +
        ".project-lightbox-next"
      );

      if (hoverable) {
        cursor.classList.add("cursor-hover");
      } else {
        cursor.classList.remove("cursor-hover");
      }
    };

    const onMouseLeaveWindow = () => {
      if (cursor) cursor.classList.add("cursor-hidden");
    };

    const onMouseEnterWindow = () => {
      if (cursor) cursor.classList.remove("cursor-hidden");
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);
    cursorRafId = requestAnimationFrame(animateCursor);

    // ─── CLEANUP ───
    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(cursorRafId);
      lenis.destroy();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      if (cursor && cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
    };
  }, []);

  return null;
}
