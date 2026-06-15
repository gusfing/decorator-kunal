import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './gallery.css';
import { BsFillPlusCircleFill } from "react-icons/bs";

// Project images from Decor Lab
const gbg1 = "/assets/projects/santhalia_site/image_1.webp";
const gbg2 = "/assets/projects/site_01/image_1.webp";
const gbg3 = "/assets/projects/site_02/image_1.webp";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Gallery = ({ isPreloaded = true }) => {
    const pageRef = useRef(null);

    useEffect(() => {
        if (!isPreloaded) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 901px)", () => {
            // Create new timeline
            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".gallery-page4",
                    start: "10% 10%",
                    end: "220% 30%",
                    scrub: 1,
                    pin: true,
                }
            });

            // Add background color animation
            if (document.querySelector(".gallery-page4")) {
                tl4.to(".gallery-page4", {
                    backgroundColor: "#181717",
                }, 'start');
            }

            const topTextTargets = document.querySelectorAll(".gallery-topText h4, .gallery-topText h3, .gallery-bottomText h3");
            if (topTextTargets.length > 0) {
                gsap.set(topTextTargets, {
                    opacity: 1,
                    x: 0
                });
            }

            // Animation sequence
            if (document.querySelector(".gallery-box h3")) {
                tl4.to(".gallery-box h3", {
                    opacity: 0,
                }, 'a');
            }
            if (document.querySelector(".gallery-page4 .gallery-background")) {
                tl4.to(".gallery-page4 .gallery-background", {
                    width: "calc(100vw - 1rem)",
                    height: "calc(100vh - 1rem)",
                    borderRadius: "3.5rem",
                    y: -40,
                }, 'a');
            }
            if (document.querySelector(".gallery-page4 .gallery-background img")) {
                tl4.to(".gallery-page4 .gallery-background img", {
                    transform: "scale(1)",
                }, 'a');
            }
            
            const backgroundTexts = document.querySelectorAll(".gallery-background .gallery-topText h4, .gallery-background .gallery-topText h3, .gallery-background .gallery-bottomText h3");
            if (backgroundTexts.length > 0) {
                tl4.from(backgroundTexts, {
                    opacity: 0,
                    x: 50,
                });
            }
            
            tl4.to({}, { duration: 0.4 }, "+=0");

            if (document.querySelector("#gallery-second")) {
                tl4.to("#gallery-second", {
                    transform: "translate(-50%, -56%)",
                }, 'b');
            }
            if (document.querySelector("#gallery-second img")) {
                tl4.to("#gallery-second img", {
                    transform: "scale(1)",
                }, 'b');
            }
            if (document.querySelector(".gallery-page4 .gallery-background")) {
                tl4.to(".gallery-page4 .gallery-background", {
                    scale: 0.9,
                    opacity: 0,
                    y: -50
                }, 'b');
            }
            
            const secondTexts = document.querySelectorAll("#gallery-second .gallery-topText h4, #gallery-second .gallery-topText h3, #gallery-second .gallery-bottomText h3");
            if (secondTexts.length > 0) {
                tl4.from(secondTexts, {
                    opacity: 0,
                    x: 50,
                });
            }
            
            tl4.to({}, { duration: 0.4 }, "+=0");
            
            if (document.querySelector("#gallery-third")) {
                tl4.to("#gallery-third", {
                    transform: "translate(-50%, -56%)",
                }, 'c');
            }
            if (document.querySelector("#gallery-third img")) {
                tl4.to("#gallery-third img", {
                    transform: "scale(1)",
                }, 'c');
            }
            if (document.querySelector("#gallery-second")) {
                tl4.to("#gallery-second", {
                    scale: 0.9,
                    opacity: 0,
                }, 'c');
            }
            
            const thirdTexts = document.querySelectorAll("#gallery-third .gallery-topText h4, #gallery-third .gallery-topText h3, #gallery-third .gallery-bottomText h3");
            if (thirdTexts.length > 0) {
                tl4.from(thirdTexts, {
                    opacity: 0,
                    x: 50,
                });
            }
            
            tl4.to({}, { duration: 0.4 }, "+=0");
        });

        // Clean up function
        return () => {
            mm.revert();
        };
    }, [isPreloaded]);

    // Generate repeating Decor Lab® elements
    const generateCapsules = (quantity = 6) => {
        const capsules = [];
        for (let i = 1; i <= quantity; i++) {
            capsules.push(
                <h3 key={i} style={{ "--index": i }} className='tracking-tighter'>
                    Decor Lab®
                </h3>
            );
        }
        return capsules;
    };

    return (
        <section className="gallery-page4" ref={pageRef} id="gallery-page4">
            <div className="gallery-slider">
                <div
                    className="gallery-box"
                    style={{ "--time": "40s", "--quantity": 6 }}
                >
                    {generateCapsules(6)}
                </div>
            </div>

            <div className="gallery-background">
                <div className="gallery-card-wrapper">
                    <img loading="lazy" src={gbg1} alt="Santhalia Residence Kolkata" />
                    <BsFillPlusCircleFill className="gallery-mobile-plus" />
                </div>
                <div className="gallery-topText">
                    <h4>Santhalia Residence®</h4>
                    <h3>(Scroll)</h3>
                </div>
                <div className="gallery-bottomText">
                    <div className='w-full flex justify-center items-center gap-0'>
                        <BsFillPlusCircleFill className='gallery-desktop-plus w-8 h-8 text-[#b1a696]' />
                        <h3>Santhalia Residence boasts raw plaster finishes, bespoke curation, and signature <br /> ombre curtains, creating a meditative, warm minimalist retreat.</h3>
                    </div>
                    <div className="relative z-9 w-50 h-[0.1rem] bg-[#4f4b48]">
                        <div className="progress-line absolute z-10 bg-[#f4efe7] w-[33%] h-[0.1rem] top-1/2 -translate-y-1/2 left-0"></div>
                    </div>
                </div>
            </div>

            <div id="gallery-second" className="gallery-background2">
                <div className="gallery-card-wrapper">
                    <img loading="lazy" src={gbg2} alt="Corporate Workspace HQ" />
                    <BsFillPlusCircleFill className="gallery-mobile-plus" />
                </div>
                <div className="gallery-topText">
                    <h4>Corporate HQ®</h4>
                    <h3>(Scroll)</h3>
                </div>
                <div className="gallery-bottomText">
                    <div className='w-full flex justify-center items-center gap-0'>
                        <BsFillPlusCircleFill className='gallery-desktop-plus w-8 h-8 text-[#b1a696]' />
                        <h3>Corporate Workspace balances biophilic planning, custom structural timber <br /> screens, and organic light wells to maximize spatial connectivity.</h3>
                    </div>
                    <div className="relative z-9 w-50 h-[0.1rem] bg-[#4f4b48]">
                        <div className="progress-line absolute z-10 bg-[#f4efe7] w-[67%] h-[0.1rem] top-1/2 -translate-y-1/2 left-0"></div>
                    </div>
                </div>
            </div>

            <div id="gallery-third" className="gallery-background2">
                <div className="gallery-card-wrapper">
                    <img loading="lazy" src={gbg3} alt="Fluid Design Pavilion" />
                    <BsFillPlusCircleFill className="gallery-mobile-plus" />
                </div>
                <div className="gallery-topText">
                    <h4>Fluid Pavilion®</h4>
                    <h3>(Scroll)</h3>
                </div>
                <div className="gallery-bottomText">
                    <div className='w-full flex justify-center items-center gap-0'>
                        <BsFillPlusCircleFill className='gallery-desktop-plus w-8 h-8 text-[#b1a696]' />
                        <h3>Fluid Pavilion experiments with parametric double-curvature structures, <br /> warm lighting grids, and seamless spatial transitions.</h3>
                    </div>
                    <div className="relative z-9 w-50 h-[0.1rem] bg-[#4f4b48]">
                        <div className="progress-line absolute z-10 bg-[#f4efe7] w-[100%] h-[0.1rem] top-1/2 -translate-y-1/2 left-0"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;