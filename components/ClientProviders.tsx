"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Set page-loading class on mount/route change
    document.documentElement.classList.add("page-loading");
    document.documentElement.classList.remove("header-hidden", "mobile-menu-open");
    document.body.style.overflow = "";

    const header = document.getElementById("main-header");
    if (!header) {
      document.documentElement.classList.remove("page-loading");
      return;
    }

    // Central Mobile Menu Injector
    let toggle: HTMLElement | null = null;
    let overlay: HTMLElement | null = null;
    let toggleMenu: ((e: Event) => void) | null = null;

    // Create toggle button
    toggle = document.createElement("div");
    toggle.className = "mobile-menu-toggle glass glass-interactive";
    toggle.setAttribute("role", "button");
    toggle.setAttribute("aria-label", "Toggle Menu");
    toggle.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;
    header.appendChild(toggle);

    // Create overlay
    overlay = document.createElement("div");
    overlay.id = "mobile-nav-overlay";
    overlay.className = "mobile-menu-overlay";
    overlay.innerHTML = `
      <div class="mobile-menu-links">
        <a href="/work" class="mobile-menu-link">Work</a>
        <a href="/about" class="mobile-menu-link">About</a>
        <a href="/awards" class="mobile-menu-link">Awards</a>
        <a href="/contact" class="mobile-menu-link">Contact</a>
      </div>
    `;
    document.body.appendChild(overlay);

    toggleMenu = (e: Event) => {
      e.stopPropagation();
      const isOpen = document.documentElement.classList.toggle("mobile-menu-open");
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    toggle.addEventListener("click", toggleMenu);

    // Close menu on link click
    const links = overlay.querySelectorAll(".mobile-menu-link");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        document.documentElement.classList.remove("mobile-menu-open");
        document.body.style.overflow = "";
      });
    });

    let isHidden = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 150) {
        if (isHidden) {
          document.documentElement.classList.remove("header-hidden");
          isHidden = false;
        }
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down: hide header (unless mobile menu is open)
        const isMenuOpen = document.documentElement.classList.contains("mobile-menu-open");
        if (!isHidden && !isMenuOpen) {
          document.documentElement.classList.add("header-hidden");
          isHidden = true;
        }
      } else {
        // Scrolling up: show header
        if (isHidden) {
          document.documentElement.classList.remove("header-hidden");
          isHidden = false;
        }
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle entry animation on load / route change
    const isHomepage = pathname === "/";

    if (isHomepage && header.style.opacity === "0") {
      // Observe when preloader finishes and reveals the page/header
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "style") {
            if (header.style.opacity === "1") {
              setTimeout(() => {
                document.documentElement.classList.remove("page-loading");
              }, 150);
              observer.disconnect();
            }
          }
        });
      });
      observer.observe(header, { attributes: true });
    } else {
      // Direct load for other pages or if preloader is skipped
      setTimeout(() => {
        document.documentElement.classList.remove("page-loading");
      }, 150);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.classList.remove("page-loading", "header-hidden", "mobile-menu-open");
      document.body.style.overflow = "";
      if (toggle && toggleMenu) {
        toggle.removeEventListener("click", toggleMenu);
        toggle.remove();
      }
      if (overlay) {
        overlay.remove();
      }
    };
  }, [pathname]);

  return (
    <SmoothScroll>
      <CustomCursor />
      {children}
    </SmoothScroll>
  );
}
