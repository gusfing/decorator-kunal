const fs = require('fs');
let page = fs.readFileSync('app/page.tsx', 'utf8');

const targetMobileGSAP = `        // Cards on Mobile - tighter horizontal spread (9 cards)
        const cards = gsap.utils.toArray(".card-cross-section");
        if (cards.length > 0) {
          const getSpread = () => window.innerWidth * 0.10;

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

        // Fade in corners and button on Mobile
`;

const startIdx = page.indexOf('        // Cards on Mobile');
const endIdx = page.indexOf('        // Fade out scroll indicator');

if(startIdx !== -1 && endIdx !== -1) {
  // We don't want to fade out the scroll indicator if we don't have it anymore!
  // Wait, the new HTML might not have a scroll indicator. Let's just find the end string precisely.
  
  // Actually, I'll just use regex to replace everything between "Cards on Mobile" and "Fade in corners"
  const regex = /        \/\/ Cards on Mobile.*?        \/\/ Fade in corners and button on Mobile\n/s;
  if(regex.test(page)) {
    page = page.replace(regex, targetMobileGSAP);
    fs.writeFileSync('app/page.tsx', page);
    console.log('Mobile GSAP updated');
  } else {
    console.log('Regex did not match');
  }
} else {
  console.log('Indexes not found', startIdx, endIdx);
}
