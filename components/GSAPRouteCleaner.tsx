"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

export default function GSAPRouteCleaner() {
  const pathname = usePathname();

  useEffect(() => {
    // Kill all ScrollTriggers when pathname changes to prevent lingering animations on page transition
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [pathname]);

  return null;
}
