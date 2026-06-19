const fs = require('fs');
const path = 'app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const startMarker = '        {/* ====================================================\n         * SECTION 5: INSTAGRAM';
const endMarker = '\n\n        {/* ====================================================\n         * SECTION 6: NEWSLETTER';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Markers not found', startIdx, endIdx);
  process.exit(1);
}

const newSection = `        {/* ====================================================
         * SECTION 5: INSTAGRAM — Premium Split Layout
         * ==================================================== */}
        <section id="instagram" className="rl-insta-section">

          {/* Left: Profile card */}
          <div className="rl-insta-profile">
            <div className="rl-insta-avatar">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <circle cx="8" cy="14" r="4.5" />
                <circle cx="16" cy="14" r="4.5" />
                <circle cx="12" cy="8" r="4.5" />
              </svg>
            </div>

            <div className="rl-insta-handle-row">
              <h2 className="rl-insta-handle">decorlab.in</h2>
              <span className="rl-insta-verified" title="Verified">
                <svg viewBox="0 0 24 24" fill="#0095f6" width="18" height="18">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </span>
            </div>

            <div className="rl-insta-stats">
              <div className="rl-insta-stat">
                <span className="rl-insta-stat-num">142</span>
                <span className="rl-insta-stat-label">posts</span>
              </div>
              <div className="rl-insta-stat">
                <span className="rl-insta-stat-num">42.8k</span>
                <span className="rl-insta-stat-label">followers</span>
              </div>
              <div className="rl-insta-stat">
                <span className="rl-insta-stat-num">249</span>
                <span className="rl-insta-stat-label">following</span>
              </div>
            </div>

            <div className="rl-insta-bio">
              <span className="rl-insta-bio-name">Decor Lab</span>
              <p>Curated Architecture &amp; Minimalist Interior Curation. Delivering timeless spaces across India since 1993.</p>
            </div>

            <a
              href="https://www.instagram.com/decorlab.in?igsh=MWluaGo2OXZtbzBsOQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="rl-insta-follow-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              Follow on Instagram
            </a>
          </div>

          {/* Right: Post grid */}
          <div className="rl-insta-grid">
            {loadingInsta ? (
              <>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rl-insta-post rl-insta-post-skeleton skeleton-pulse" />
                ))}
              </>
            ) : (
              displayPosts.slice(0, 6).map((post, idx) => (
                <div
                  key={idx}
                  className="rl-insta-post"
                  onClick={() => setSelectedInsta(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={"View post " + (idx + 1)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedInsta(idx);
                    }
                  }}
                >
                  <img loading="lazy" src={post.img} alt={"Decor Lab post " + (idx + 1)} />
                  <div className="rl-insta-post-overlay">
                    <div className="rl-insta-overlay-stats">
                      <span>
                        <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        {post.likes}
                      </span>
                      <span>
                        <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
                          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                        </svg>
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </section>`;

const before = content.substring(0, startIdx);
const after = content.substring(endIdx);
const newContent = before + newSection + after;
fs.writeFileSync(path, newContent);
console.log('Done! File written.');
