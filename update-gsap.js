const fs = require('fs');
let page = fs.readFileSync('app/page.tsx', 'utf8');

const targetGSAP = `      // 1. Hero Pinned Scroll Trigger Animation (Reinette style)
      if (document.querySelector("#section-hero")) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#section-hero",
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          }
        });

        // Fanned cards spreading out from tight deck (9 cards)
        const cards = gsap.utils.toArray(".card-cross-section");
        if (cards.length > 0) {
          const getSpread = () => window.innerWidth * 0.12;

          cards.forEach((card, index) => {
            const offset = index - 4;
            heroTl.to(card, {
              x: () => offset * getSpread(),
              y: 0,
              rotation: 0,
              scale: 1.0,
              ease: "power2.inOut",
            }, 0);
          });
        }
      }`;

const startIdx = page.indexOf('      // 1. Hero Pinned Scroll Trigger Animation');
const endIdx = page.indexOf('      // 2. About Us Section');

if(startIdx !== -1 && endIdx !== -1) {
  page = page.substring(0, startIdx) + targetGSAP + '\n\n' + page.substring(endIdx);
  fs.writeFileSync('app/page.tsx', page);
  console.log('GSAP updated');
} else {
  console.log('Indexes not found', startIdx, endIdx);
}
