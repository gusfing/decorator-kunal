"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GSAPRouteCleaner() {
  const pathname = usePathname();

  useEffect(() => {
    // Refresh ScrollTrigger to find new DOM layout after transition
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    // Smooth reset scroll to top immediately on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
