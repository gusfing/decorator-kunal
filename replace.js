const fs = require('fs');
const page = fs.readFileSync('app/page.tsx', 'utf8');
const jsx = fs.readFileSync('webflow-sections.jsx', 'utf8');

const startStr = '<section className="hero-section" id="hero"';
const endStr = '<section id="info" className="section-about-dark relative">';

const startIdx = page.indexOf(startStr);
const endIdx = page.indexOf('</section>', page.indexOf(endStr)) + '</section>'.length;

if (startIdx !== -1 && endIdx !== -1) {
  const newPage = page.substring(0, startIdx) + jsx + page.substring(endIdx);
  fs.writeFileSync('app/page.tsx', newPage);
  console.log('Replaced sections successfully!');
} else {
  console.log('Could not find start or end index', startIdx, endIdx);
}
