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
    document.documentElement.classList.remove("header-hidden");

    const header = document.getElementById("main-header");
    if (!header) {
      document.documentElement.classList.remove("page-loading");
      return;
    }

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
        // Scrolling down: hide header
        if (!isHidden) {
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
      document.documentElement.classList.remove("page-loading", "header-hidden");
    };
  }, [pathname]);

  return (
    <SmoothScroll>
      <CustomCursor />
      {children}
    </SmoothScroll>
  );
}
