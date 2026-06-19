const fs = require('fs');

const path = 'app/page.tsx';
let lines = fs.readFileSync(path, 'utf8').split('\n');

const chunkFooter = `        <RedesignAnimations />
        {/* ====================================================
         * REDESIGNED FOOTER
         * ==================================================== */}
        <footer id="contact-footer" className="rl-footer">
          <div className="rl-container">
            <div className="rl-footer-top">
              <div className="rl-footer-logo-desc">
                <img src="/assets/Decorlab final-04.webp" alt="Decor Lab" />
                <p>Architecture & Interior Design.<br/>Kolkata-based design powerhouse blending legacy craftsmanship with bold contemporary architecture. Since 1993.</p>
              </div>
              <div className="rl-footer-links">
                <div className="rl-footer-col">
                  <h4>Studio</h4>
                  <ul>
                    <li><a href="#process">Methodology</a></li>
                    <li><a href="#collection">Collection</a></li>
                    <li><a href="#showcase">Portfolio</a></li>
                  </ul>
                </div>
                <div className="rl-footer-col">
                  <h4>Contact</h4>
                  <ul>
                    <li><a href="mailto:info@decorlab.co.in">info@decorlab.co.in</a></li>
                    <li><a href="tel:+913324648000">+91 33 2464 8000</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <h1 className="rl-footer-big-text">DECOR LAB</h1>
            
            <div className="rl-footer-bottom">
              <span>&copy; 2026 Decor Lab Studio. All rights reserved.</span>
              <span>Made with precision in Kolkata, India.</span>
            </div>
          </div>
        </footer>`;

const chunkPhilosophy = `        {/* ====================================================
         * SECTION 4: REDESIGNED PHILOSOPHY
         * ==================================================== */}
        <section id="capabilities" className="rl-section rl-philosophy">
          <div className="rl-container">
            <span className="rl-subtitle" style={{textAlign: "center"}}>Philosophy</span>
            <div className="rl-philosophy-text">
              <span>Functionality first. </span>
              <span>We verify that every layout is highly usable </span>
              <span>before introducing decorative styling. </span>
              <span>We embrace raw textures, natural finishes, </span>
              <span>and fluid architectural curves </span>
              <span>that stand the test of time.</span>
            </div>
          </div>
        </section>`;

const chunkPortfolio = `        {/* ====================================================
         * SECTION 2F: REDESIGNED SITE PORTFOLIO
         * ==================================================== */}
        <section id="showcase" className="rl-section light rl-portfolio">
          <div className="rl-container">
            <span className="rl-subtitle" style={{color: "#050505"}}>Projects</span>
            <h2 className="rl-title" style={{color: "#050505"}}>Site Portfolio</h2>
            <div className="rl-divider"></div>
            
            <div className="rl-portfolio-list">
              {projectsData.map((project, idx) => (
                <div 
                  key={project.id} 
                  className="rl-portfolio-row"
                  onClick={() => setLightboxProject({
                    siteName: project.title,
                    images: project.images,
                    activeIndex: 0
                  })}
                >
                  <span className="rl-portfolio-num">0{idx + 1}</span>
                  <h3 className="rl-portfolio-name">{project.title}</h3>
                  <span className="rl-portfolio-loc">{project.location}</span>
                  <img 
                    src={project.images[0]} 
                    alt={project.title}
                    className="rl-portfolio-hover-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>`;

const chunkCollabs = `        {/* ====================================================
         * SECTION 2D: REDESIGNED RECENT COLLABS
         * ==================================================== */}
        <section id="collabs" className="rl-section rl-collabs">
          <div className="rl-collabs-marquee">
            <div className="rl-marquee-inner">
              <span className="rl-marquee-text">Häfele • Kohler • Flos • Poliform • B&B Italia • Vitra • </span>
              <span className="rl-marquee-text">Häfele • Kohler • Flos • Poliform • B&B Italia • Vitra • </span>
            </div>
          </div>
          <div className="rl-container">
            <div className="rl-collabs-content">
              <div>
                <span className="rl-subtitle">Design Partnerships</span>
                <h2 className="rl-title">Recent Collabs</h2>
              </div>
              <p className="rl-collabs-desc">
                Collaborating with international pioneers to bring smart hardware, premium fittings, and material innovations into our interior architectures. Seamlessly matching top-tier technology with handcrafted wooden elements.
              </p>
            </div>
          </div>
        </section>`;

const chunkCurated = `        {/* ====================================================
         * SECTION 2C: REDESIGNED CURATED SPACES
         * ==================================================== */}
        <section id="collection" className="rl-section light rl-curated">
          <div className="rl-container">
            <span className="rl-subtitle" style={{color: "#050505"}}>Collection</span>
            <h2 className="rl-title" style={{color: "#050505", marginBottom: "0"}}>Curated Spaces</h2>
            
            <div className="rl-curated-gallery">
              {curatedCategories[0]?.cards.slice(0, 3).map((card, idx) => (
                <div key={idx} className="rl-curated-card">
                  <img src={card.img} alt={card.title} loading="lazy" />
                  <div className="rl-curated-overlay">
                    <h4 className="rl-curated-title">{card.title}</h4>
                    <span className="rl-curated-specs">{card.specs}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>`;

const chunkProcess = `        {/* ====================================================
         * SECTION 2B: REDESIGNED METHODOLOGY
         * ==================================================== */}
        <section id="process" className="rl-section rl-methodology">
          <div className="rl-container">
            <span className="rl-subtitle">02 / Methodology</span>
            <h2 className="rl-title">Creating with us is easy.</h2>
            
            <div className="rl-methodology-grid">
              <div className="rl-methodology-list">
                {methodologySteps.map((step, idx) => {
                  const isActive = activeProcessStep === idx;
                  return (
                    <div 
                      key={step.num}
                      className={"rl-methodology-item " + (isActive ? "active" : "")}
                      onMouseEnter={() => setActiveProcessStep(idx)}
                      onClick={() => setActiveProcessStep(idx)}
                    >
                      <div className="rl-methodology-header">
                        <span className="rl-methodology-num">{step.num}</span>
                        <h3 className="rl-methodology-name">{step.title}</h3>
                      </div>
                      <div className="rl-methodology-content">
                        <p className="rl-methodology-desc">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="rl-methodology-img-wrap">
                {methodologySteps.map((step, idx) => (
                  <img
                    key={step.num}
                    src={step.img}
                    alt={step.title}
                    className={"rl-methodology-img " + (activeProcessStep === idx ? "active" : "")}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>`;

// Replace from bottom up to avoid messing up index numbers!
lines.splice(3548, 3644 - 3549 + 1, chunkFooter);
lines.splice(3226, 3271 - 3227 + 1, chunkPhilosophy);
lines.splice(3013, 3225 - 3014 + 1, chunkPortfolio);
lines.splice(2887, 2975 - 2888 + 1, chunkCollabs);
lines.splice(2813, 2885 - 2814 + 1, chunkCurated);
lines.splice(2742, 2812 - 2743 + 1, chunkProcess);

// Handle import
lines[11] = 'import FooterBanner from "../components/urbanland/FooterBanner";\nimport RedesignAnimations from "./RedesignAnimations";';

fs.writeFileSync(path, lines.join('\n'));
console.log("Replaced successfully!");
