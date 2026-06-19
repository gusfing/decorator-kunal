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
         * SECTION 5: INSTAGRAM — Profile + Phone Mockup
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

            <div className="rl-phone-dots">
              {displayPosts.map((_, idx) => (
                <button
                  key={idx}
                  className={"rl-phone-dot" + (activeInstaSlide === idx ? " active" : "")}
                  onClick={() => !loadingInsta && setActiveInstaSlide(idx)}
                  aria-label={"Go to slide " + (idx + 1)}
                  disabled={loadingInsta}
                />
              ))}
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="rl-phone-wrap">
            <button className="rl-phone-arrow prev" onClick={handlePrevInsta} aria-label="Previous" disabled={loadingInsta}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <div className="rl-phone-mockup" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
              <div className="rl-phone-island"></div>
              <div className="rl-phone-btn vol-up"></div>
              <div className="rl-phone-btn vol-dn"></div>
              <div className="rl-phone-btn pwr"></div>

              <div className="rl-phone-screen">
                <div className="rl-phone-status">
                  <span className="rl-phone-time">09:41</span>
                  <div className="rl-phone-icons">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M2 22h20V2z"/></svg>
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 21l-12-18h24z"/></svg>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zM21 9h2v6h-2z"/></svg>
                  </div>
                </div>

                <div className="rl-phone-app-header">
                  <div className="rl-phone-app-left">
                    <div className="rl-phone-mini-avatar">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <circle cx="8" cy="14" r="4.5"/><circle cx="16" cy="14" r="4.5"/><circle cx="12" cy="8" r="4.5"/>
                      </svg>
                    </div>
                    <div>
                      <div className="rl-phone-app-user">decorlab.in</div>
                      <div className="rl-phone-app-loc">Kolkata, India</div>
                    </div>
                  </div>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </div>

                {loadingInsta ? (
                  <div className="rl-phone-skeleton">
                    <div className="skeleton-pulse" style={{width:'100%', aspectRatio:'1/1', borderRadius:'12px'}}></div>
                    <div style={{padding:'12px', display:'flex', flexDirection:'column', gap:'6px'}}>
                      <div className="skeleton-pulse" style={{height:'8px', width:'40%', borderRadius:'4px'}}></div>
                      <div className="skeleton-pulse" style={{height:'8px', width:'80%', borderRadius:'4px'}}></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="rl-phone-slider-track-wrap">
                      <div
                        className="rl-phone-slider-track"
                        style={{transform: "translateX(-" + (activeInstaSlide * 100) + "%)"}}>
                        {displayPosts.map((post, idx) => (
                          <div key={idx} className="rl-phone-slide">
                            <div
                              className="rl-phone-post-img"
                              role="button"
                              tabIndex={0}
                              onClick={() => setSelectedInsta(idx)}
                              aria-label={"View post " + (idx + 1)}
                            >
                              <img loading="lazy" src={post.img} alt={"Post " + (idx + 1)} />
                              <div className="rl-phone-post-overlay">
                                <div className="rl-phone-post-stats">
                                  <span>
                                    <svg viewBox="0 0 24 24" fill="white" width="12" height="12"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                    {post.likes}
                                  </span>
                                  <span>
                                    <svg viewBox="0 0 24 24" fill="white" width="12" height="12"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                                    {post.comments}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rl-phone-actions">
                      <div className="rl-phone-actions-left">
                        <svg className="rl-phone-action-icon liked" viewBox="0 0 24 24" fill="#ed4956"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        <svg className="rl-phone-action-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                        <svg className="rl-phone-action-icon" viewBox="0 0 24 24" fill="currentColor" style={{transform:'rotate(-20deg)'}}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                      </div>
                      <svg className="rl-phone-action-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                    </div>

                    <div className="rl-phone-caption">
                      <div className="rl-phone-likes">{displayPosts[activeInstaSlide]?.likes} likes</div>
                      <div className="rl-phone-caption-text">
                        <span className="rl-phone-caption-user">decorlab.in </span>
                        {displayPosts[activeInstaSlide]?.caption}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button className="rl-phone-arrow next" onClick={handleNextInsta} aria-label="Next" disabled={loadingInsta}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

        </section>`;

const before = content.substring(0, startIdx);
const after = content.substring(endIdx);
const newContent = before + newSection + after;
fs.writeFileSync(path, newContent);
console.log('Done!');
