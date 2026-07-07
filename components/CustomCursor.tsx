"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState("");
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    // Check if the device has hover capabilities (desktop/laptops).
    // This is more reliable than pointer: fine on hybrid Windows touchscreen devices.
    const media = window.matchMedia("(hover: hover)");
    setHasFinePointer(media.matches);

    if (!media.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const textEl = textRef.current;
    if (!dot || !ring || !textEl) return;

    // Fade in the cursor components on first load
    gsap.to([dot, ring], { opacity: 1, duration: 0.3 });

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    // References to keep track of active interactive/magnetic elements
    let activeInteractive: HTMLElement | null = null;
    let activeMagnetic: HTMLElement | null = null;
    let magneticCenterX = 0;
    let magneticCenterY = 0;

    // GSAP-powered smooth trailing loop for ring
    const updateCursor = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      textEl.style.transform = `translate(${ringX - 40}px, ${ringY - 40}px)`;

      // Apply magnetic translation directly in the animation loop
      if (activeMagnetic) {
        const dx = (mouseX - magneticCenterX) * 0.15;
        const dy = (mouseY - magneticCenterY) * 0.15;
        gsap.to(activeMagnetic, {
          x: dx,
          y: dy,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      requestAnimationFrame(updateCursor);
    };
    const animId = requestAnimationFrame(updateCursor);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Global event delegation for mouse hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest(
        "a, button, [data-cursor], .magnetic-hover, input, textarea, select"
      ) as HTMLElement | null;

      if (interactive && interactive !== activeInteractive) {
        activeInteractive = interactive;
        const closestWithCursor = interactive.closest("[data-cursor]") as HTMLElement | null;
        const label = closestWithCursor?.getAttribute("data-cursor") || "";

        gsap.to(ring, {
          width: label ? 80 : 56,
          height: label ? 80 : 56,
          borderColor: "rgba(255, 255, 255, 0.5)",
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(dot, { scale: 0, duration: 0.3, ease: "power3.out", overwrite: "auto" });

        if (label) {
          setCursorLabel(label);
          gsap.to(textEl, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });
        }

        // Check if the interactive element has magnetic behavior
        const magnetic = interactive.closest("[data-cursor]") as HTMLElement | null;
        if (magnetic) {
          activeMagnetic = magnetic;
          const rect = magnetic.getBoundingClientRect();
          magneticCenterX = rect.left + rect.width / 2;
          magneticCenterY = rect.top + rect.height / 2;
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement | null;

      // Check if we actually left the active interactive container
      if (activeInteractive && (!relatedTarget || !activeInteractive.contains(relatedTarget))) {
        const prevMagnetic = activeMagnetic;
        activeInteractive = null;
        activeMagnetic = null;

        gsap.to(ring, {
          width: 40,
          height: 40,
          borderColor: "rgba(255, 255, 255, 0.3)",
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out", overwrite: "auto" });
        gsap.to(textEl, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
        setCursorLabel("");

        // Smoothly animate the previous magnetic element back to its original spot
        if (prevMagnetic) {
          gsap.to(prevMagnetic, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
            overwrite: "auto",
          });
        }
      }
    };

    const handleMouseDown = () => {
      gsap.to(dot, { scale: 0.5, duration: 0.15, overwrite: "auto" });
      gsap.to(ring, { scale: 0.85, duration: 0.15, overwrite: "auto" });
    };

    const handleMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.3)", overwrite: "auto" });
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.3)", overwrite: "auto" });
    };

    // Listeners for pointer movement and mouse clicks
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Small dot cursor */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          backgroundColor: "#fff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 2147483647,
          mixBlendMode: "difference",
          transform: "translate(-100px, -100px)",
          opacity: 0,
          display: hasFinePointer ? "block" : "none",
        }}
      />
      {/* Ring follower */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(255, 255, 255, 0.3)",
          pointerEvents: "none",
          zIndex: 2147483646,
          mixBlendMode: "difference",
          transform: "translate(-100px, -100px)",
          opacity: 0,
          display: hasFinePointer ? "block" : "none",
        }}
      />
      {/* Text label */}
      <div
        ref={textRef}
        className="cursor-text-label"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 80,
          height: 80,
          borderRadius: "50%",
          display: hasFinePointer ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 2147483645,
          opacity: 0,
          transform: "translate(-100px, -100px) scale(0.8)",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#fff",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {cursorLabel}
      </div>
    </>
  );
}
