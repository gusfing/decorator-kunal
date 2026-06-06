const fs = require('fs');

const pagePath = 'app/page.tsx';
let page = fs.readFileSync(pagePath, 'utf8');
const jsx = fs.readFileSync('webflow-sections.jsx', 'utf8');

// Regex to match the entire hero section
const heroRegex = /<section className="hero-section" id="hero">[\s\S]*?<\/section>/;
// Regex to match the entire info section
const infoRegex = /<section id="info" className="section-about-dark">[\s\S]*?<\/section>/;

if (heroRegex.test(page) && infoRegex.test(page)) {
  // Replace the hero section with our new JSX
  page = page.replace(heroRegex, jsx);
  
  // Remove the info section entirely
  page = page.replace(infoRegex, '');
  
  fs.writeFileSync(pagePath, page);
  console.log('Successfully replaced sections via Regex!');
} else {
  console.log('Regex did not match.');
  console.log('Hero matched:', heroRegex.test(page));
  console.log('Info matched:', infoRegex.test(page));
}
