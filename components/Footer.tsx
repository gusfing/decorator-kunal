"use client";

import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const container = React.useRef<HTMLElement>(null);

  useGSAP(() => {
    // ─── FOOTER — big text reveal ──────────────────────────────────
    const footerText = gsap.utils.toArray(".rl-footer-big-text");
    if (footerText.length > 0) {
      gsap.fromTo(
        footerText,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Footer top items stagger
    const footerCols = gsap.utils.toArray<HTMLElement>(
      ".rl-footer-col, .rl-footer-logo-desc"
    );
    if (footerCols.length > 0) {
      gsap.fromTo(
        footerCols,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, { scope: container });

  return (
    <footer id="contact-footer" className="rl-footer" ref={container}>
      <div className="rl-container">
        <div className="rl-footer-top">
          <div className="rl-footer-logo-desc">
            <img src="/assets/Decorlab-final-05-trans.webp" alt="Decor Lab" />
            <p>
              Architecture & Interior Design.
              <br />
              Kolkata-based design powerhouse blending legacy craftsmanship with
              bold contemporary architecture. Since 1993.
            </p>
          </div>
          <div className="rl-footer-links">
            <div className="rl-footer-col">
              <h4>Studio</h4>
              <ul>
                <li>
                  <a href="/#services">Services</a>
                </li>
                <li>
                  <a href="/#collection">Collection</a>
                </li>
                <li>
                  <a href="/#showcase">Portfolio</a>
                </li>
              </ul>
            </div>
            <div className="rl-footer-col">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="mailto:info@decorlab.co.in">info@decorlab.co.in</a>
                </li>
                <li>
                  <a href="tel:+913324648000">+91 33 2464 8000</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <h1 className="rl-footer-big-text">DECORLAB</h1>

        <div className="rl-footer-bottom">
          <span>&copy; 2026 Decorlab. All rights reserved.</span>
          <span>Made with precision in Kolkata, India.</span>
        </div>
      </div>
    </footer>
  );
}
