"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function RedesignAnimations({
  setActiveProcessStep,
}: {
  setActiveProcessStep?: (index: number) => void;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ─────────────────────────────────────────
    // Helper: split heading text into char spans
    // ─────────────────────────────────────────
    function splitChars(el: Element) {
      const text = el.textContent || "";
      el.innerHTML = text
        .split("")
        .map((ch) =>
          ch === " "
            ? `<span style="display:inline-block;white-space:pre"> </span>`
            : `<span class="split-char" style="display:inline-block;overflow:hidden"><span style="display:inline-block">${ch}</span></span>`
        )
        .join("");
      return el.querySelectorAll(".split-char > span");
    }

    const ctx = gsap.context(() => {

      // ─── 1. SECTION SUBTITLE eyebrows — fade + slide up ───────────────
      gsap.utils.toArray<HTMLElement>(".rl-subtitle, .rl-philo-eyebrow").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          }
        );
      });

      // ─── 2. BIG SERIF HEADINGS — char-by-char reveal ──────────────────
      gsap.utils.toArray<HTMLElement>(".rl-title, .rl-philo-headline, .showcase-main-title").forEach((heading) => {
        const chars = splitChars(heading);
        gsap.fromTo(chars,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0, opacity: 1,
            stagger: 0.025,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: heading, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });

      // ─── 3. METHODOLOGY items — stagger slide-in from left ────────────
      const methodGroups = gsap.utils.toArray<HTMLElement>(".rl-methodology-item");
      if (methodGroups.length > 0) {
        gsap.fromTo(methodGroups,
          { opacity: 0, x: -60, clipPath: "inset(0 100% 0 0)" },
          {
            opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)",
            duration: 0.9, ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".rl-methodology-list",
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      }

      // Methodology image — parallax scale reveal (applied to inner container to preserve sticky alignment)
      const methodImgInner = document.querySelector(".rl-methodology-img-inner");
      if (methodImgInner) {
        gsap.fromTo(methodImgInner,
          { clipPath: "inset(30% 5% 30% 5%)", scale: 1.1 },
          {
            clipPath: "inset(0% 0% 0% 0%)", scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#services",
              start: "top 80%", end: "center 30%",
              scrub: 1.5,
            },
          }
        );
      }

      // Responsive active step synchronization via ScrollTrigger
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1025px)", () => {
        if (methodGroups.length > 0 && setActiveProcessStep) {
          methodGroups.forEach((item, idx) => {
            ScrollTrigger.create({
              trigger: item,
              start: "top 55%",
              end: "bottom 55%",
              onEnter: () => setActiveProcessStep(idx),
              onEnterBack: () => setActiveProcessStep(idx),
            });
          });
        }
      });

      // ─── 4. CURATED CARDS — stagger + clip-path wipe ─────────────────
      const curatedCards = gsap.utils.toArray<HTMLElement>(".rl-curated-card");
      curatedCards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 30 },
          {
            opacity: 1, clipPath: "inset(0 0 0% 0)", y: 0,
            duration: 1.1, ease: "power3.out", delay: i * 0.12,
            scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });

      // ─── 5. COLLABS — marquee section fade + stat counters ────────────
      const marquee = document.querySelector(".rl-collabs-marquee");
      if (marquee) {
        gsap.fromTo(marquee,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out",
            scrollTrigger: { trigger: marquee, start: "top 90%", toggleActions: "play none none none" } }
        );
      }

      // Stat numbers count up
      gsap.utils.toArray<HTMLElement>(".rl-stat-num").forEach((el) => {
        const endVal = parseFloat(el.textContent?.replace("+", "") || "0");
        const hasPlus = el.textContent?.includes("+");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: endVal,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + (hasPlus ? "+" : "");
          },
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      // Collab images — parallax float in
      const collabImgs = gsap.utils.toArray<HTMLElement>(".rl-collabs-img-wrapper");
      collabImgs.forEach((img, i) => {
        gsap.fromTo(img,
          { opacity: 0, y: 60 + i * 20, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 1.2, ease: "power3.out", delay: i * 0.15,
            scrollTrigger: { trigger: "#collabs", start: "top 75%", toggleActions: "play none none none" },
          }
        );
      });

      // ─── 6. PORTFOLIO ROWS — stagger slide + number reveal ────────────
      const portfolioRows = gsap.utils.toArray<HTMLElement>(".rl-portfolio-row");
      portfolioRows.forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
            duration: 0.8, ease: "power3.out", delay: i * 0.1,
            scrollTrigger: { trigger: "#showcase", start: "top 80%", toggleActions: "play none none none" },
          }
        );
      });

      // ─── 7. PHILOSOPHY PILLARS — reveal with stagger scale ────────────
      const pillars = gsap.utils.toArray<HTMLElement>(".rl-philo-pillar");
      pillars.forEach((pillar, i) => {
        // Image wipe from top
        const img = pillar.querySelector(".rl-philo-pillar-img-wrap");
        if (img) {
          gsap.fromTo(img,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.out", delay: i * 0.18,
              scrollTrigger: { trigger: "#capabilities", start: "top 80%", toggleActions: "play none none none" },
            }
          );
        }
        // Body slide up
        const body = pillar.querySelector(".rl-philo-pillar-body");
        if (body) {
          gsap.fromTo(body,
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: i * 0.18 + 0.25,
              scrollTrigger: { trigger: "#capabilities", start: "top 80%", toggleActions: "play none none none" },
            }
          );
        }
      });

      // Philosophy quote fade
      const quote = document.querySelector(".rl-philo-quote");
      if (quote) {
        gsap.fromTo(quote,
          { opacity: 0, y: 30 },
          {
            opacity: 0.75, y: 0, duration: 1.1, ease: "power2.out",
            scrollTrigger: { trigger: ".rl-philo-quote-band", start: "top 88%", toggleActions: "play none none none" },
          }
        );
      }

      // ─── 8. INSTAGRAM — phone float up + profile items stagger ────────
      const phoneWrap = document.querySelector(".rl-phone-wrap");
      if (phoneWrap) {
        gsap.fromTo(phoneWrap,
          { opacity: 0, y: 80, rotateY: -8 },
          {
            opacity: 1, y: 0, rotateY: 0,
            duration: 1.4, ease: "power3.out",
            scrollTrigger: { trigger: "#instagram", start: "top 80%", toggleActions: "play none none none" },
          }
        );
        // Subtle floating idle animation
        gsap.to(phoneWrap, {
          y: -12,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.5,
        });
      }

      const profileItems = gsap.utils.toArray<HTMLElement>(
        ".rl-insta-avatar, .rl-insta-handle-row, .rl-insta-stats, .rl-insta-bio, .rl-insta-follow-btn, .rl-phone-dots"
      );
      gsap.fromTo(profileItems,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          stagger: 0.08, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: "#instagram", start: "top 80%", toggleActions: "play none none none" },
        }
      );

      // ─── 10. GENERIC SECTION DIVIDERS — draw line ─────────────────────
      gsap.utils.toArray<HTMLElement>(".rl-divider, .rl-philo-pillar-divider").forEach((divider) => {
        gsap.fromTo(divider,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: divider, start: "top 90%", toggleActions: "play none none none" },
          }
        );
      });

    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
