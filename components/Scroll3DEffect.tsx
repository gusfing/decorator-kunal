"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Lenis from "@studio-freight/lenis";

interface Project {
  id: string;
  title: string;
  specs: {
    img: string;
  };
}

interface Scroll3DEffectProps {
  projects: Project[];
  onProjectClick?: (index: number) => void;
}

export default function Scroll3DEffect({ projects, onProjectClick }: Scroll3DEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Load images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const totalToLoad = projects.length;

    if (totalToLoad === 0) {
      setImagesLoaded(true);
      return;
    }

    projects.forEach((project, index) => {
      const img = new Image();
      img.onload = () => {
        images[index] = img;
        loadedCount++;
        if (loadedCount === totalToLoad) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        // Fallback for errors
        loadedCount++;
        if (loadedCount === totalToLoad) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      img.src = project.specs.img;
    });
  }, [projects]);

  // Three.js and Lenis initialization
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || projects.length === 0) return;

    const canvas = canvasRef.current;
    
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    } as any);

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      powerPreference: "high-performance",
      alpha: true // Allow background to show through if needed
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1); // Solid black background

    const parentWidth = 20;
    const parentHeight = 75;
    const curvature = 35;
    const segmentsX = 200;
    const segmentsY = 200;

    const parentGeometry = new THREE.PlaneGeometry(
      parentWidth,
      parentHeight,
      segmentsX,
      segmentsY
    );

    const positions = parentGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const y = positions[i + 1];
      const distanceFromCenter = Math.abs(y / (parentHeight / 2));
      positions[i + 2] = Math.pow(distanceFromCenter, 2) * curvature;
    }
    parentGeometry.computeVertexNormals();

    const totalSlides = projects.length;
    const slideHeight = 15;
    const gap = 0.5;
    const cycleHeight = totalSlides * (slideHeight + gap);

    const textureCanvas = document.createElement("canvas");
    const ctx = textureCanvas.getContext("2d", {
      alpha: false,
      willReadFrequently: false,
    });
    
    if (!ctx) return;
    
    textureCanvas.width = 2048;
    textureCanvas.height = 8192;

    const texture = new THREE.CanvasTexture(textureCanvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());

    const parentMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });

    const parentMesh = new THREE.Mesh(parentGeometry, parentMaterial);
    parentMesh.position.set(0, 0, 0);
    parentMesh.rotation.x = THREE.MathUtils.degToRad(-20);
    parentMesh.rotation.y = THREE.MathUtils.degToRad(20);
    scene.add(parentMesh);

    const updateCameraPosition = () => {
      const isMobile = window.innerWidth < 768;
      // On mobile, increase distance so the plane fits in the narrower horizontal FOV
      const distance = isMobile ? 35 : 17.5;
      const heightOffset = 5;
      const offsetX = distance * Math.sin(THREE.MathUtils.degToRad(20));
      const offsetZ = distance * Math.cos(THREE.MathUtils.degToRad(20));

      camera.position.set(offsetX, heightOffset, offsetZ);
      camera.lookAt(0, -2, 0);
      camera.rotation.z = THREE.MathUtils.degToRad(-5);
    };

    updateCameraPosition();

    const slideTitles = projects.map(p => p.title);
    const loadedImgs = imagesRef.current;

    function updateTexture(offset = 0) {
      if (!ctx) return;
      
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

      const fontSize = 180;
      // Using standard serif/sans-serif fallback instead of missing Dahlia font
      ctx.font = `500 ${fontSize}px "Times New Roman", serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const extraSlides = 2;

      for (let i = -extraSlides; i < totalSlides + extraSlides; i++) {
        let slideY = -i * (slideHeight + gap);
        slideY += offset * cycleHeight;

        const textureY = (slideY / cycleHeight) * textureCanvas.height;
        let wrappedY = textureY % textureCanvas.height;
        if (wrappedY < 0) wrappedY += textureCanvas.height;

        let slideIndex = ((-i % totalSlides) + totalSlides) % totalSlides;
        
        const slideRect = {
          x: textureCanvas.width * 0.05,
          y: wrappedY,
          width: textureCanvas.width * 0.9,
          height: (slideHeight / cycleHeight) * textureCanvas.height,
        };

        const img = loadedImgs[slideIndex];
        if (img) {
          const imgAspect = img.width / img.height;
          const rectAspect = slideRect.width / slideRect.height;

          let drawWidth, drawHeight, drawX, drawY;

          if (imgAspect > rectAspect) {
            drawHeight = slideRect.height;
            drawWidth = drawHeight * imgAspect;
            drawX = slideRect.x + (slideRect.width - drawWidth) / 2;
            drawY = slideRect.y;
          } else {
            drawWidth = slideRect.width;
            drawHeight = drawWidth / imgAspect;
            drawX = slideRect.x;
            drawY = slideRect.y + (slideRect.height - drawHeight) / 2;
          }

          ctx.save();
          ctx.beginPath();
          ctx.roundRect(
            slideRect.x,
            slideRect.y,
            slideRect.width,
            slideRect.height,
            [40] // Adding rounded corners for better aesthetics
          );
          ctx.clip();
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
          ctx.restore();

          // Draw dark overlay on image to make text readable
          ctx.save();
          ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
          ctx.beginPath();
          ctx.roundRect(
            slideRect.x,
            slideRect.y,
            slideRect.width,
            slideRect.height,
            [40]
          );
          ctx.fill();
          ctx.restore();

          // Draw Text
          ctx.fillStyle = "white";
          ctx.fillText(
            slideTitles[slideIndex] || "",
            textureCanvas.width / 2,
            wrappedY + slideRect.height / 2
          );
        }
      }

      texture.needsUpdate = true;
    }

    let currentScroll = 0;
    
    const onScroll = ({ scroll, limit }: any) => {
      // Prevent division by zero if limit is 0
      const scrollLimit = limit > 0 ? limit : 1; 
      currentScroll = scroll / scrollLimit;
      updateTexture(-currentScroll);
      renderer.render(scene, camera);
    };
    
    lenis.on("scroll", onScroll);

    let resizeTimeout: NodeJS.Timeout;
    const onResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        updateCameraPosition();
        updateTexture(-currentScroll);
        renderer.render(scene, camera);
      }, 250);
    };
    
    window.addEventListener("resize", onResize);

    // Initial render
    updateTexture(0);
    renderer.render(scene, camera);

    // --- Raycasting for Clicks & Hover ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedSlideIndex = (clientX: number, clientY: number) => {
      mouse.x = (clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(parentMesh);

      if (intersects.length > 0) {
        const uv = intersects[0].uv;
        if (!uv) return null;

        // Map UV to Canvas Coordinates
        const hitX = uv.x * textureCanvas.width;
        // flipY is true by default, so uv.y=1 is top (canvas y=0)
        const hitY = (1.0 - uv.y) * textureCanvas.height;

        const offset = -currentScroll;
        const extraSlides = 2;

        for (let i = -extraSlides; i < totalSlides + extraSlides; i++) {
          let slideY = -i * (slideHeight + gap);
          slideY += offset * cycleHeight;

          const textureY = (slideY / cycleHeight) * textureCanvas.height;
          let wrappedY = textureY % textureCanvas.height;
          if (wrappedY < 0) wrappedY += textureCanvas.height;

          let slideIndex = ((-i % totalSlides) + totalSlides) % totalSlides;
          
          const slideRect = {
            x: textureCanvas.width * 0.05,
            y: wrappedY,
            width: textureCanvas.width * 0.9,
            height: (slideHeight / cycleHeight) * textureCanvas.height,
          };

          if (
            hitX >= slideRect.x &&
            hitX <= slideRect.x + slideRect.width &&
            hitY >= slideRect.y &&
            hitY <= slideRect.y + slideRect.height
          ) {
            return slideIndex;
          }
        }
      }
      return null;
    };

    const onClick = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if (window.TouchEvent && e instanceof TouchEvent) {
        if (e.changedTouches.length > 0) {
          clientX = e.changedTouches[0].clientX;
          clientY = e.changedTouches[0].clientY;
        } else {
          return;
        }
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      
      const idx = getIntersectedSlideIndex(clientX, clientY);
      if (idx !== null && onProjectClick) {
        onProjectClick(idx);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const idx = getIntersectedSlideIndex(e.clientX, e.clientY);
      if (idx !== null) {
        canvas.style.cursor = 'pointer';
      } else {
        canvas.style.cursor = 'grab';
      }
    };

    window.addEventListener('click', onClick);
    window.addEventListener('touchend', onClick);
    window.addEventListener('mousemove', onMouseMove);
    // ------------------------------------

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchend', onClick);
      window.removeEventListener('mousemove', onMouseMove);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      cancelAnimationFrame(animationFrameId);
      
      parentGeometry.dispose();
      parentMaterial.dispose();
      texture.dispose();
      renderer.dispose();
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [imagesLoaded, projects, onProjectClick]);

  return (
    <>
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          zIndex: 0
        }}
      >
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
      </div>

      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "radial-gradient(circle, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.5) 100%)",
          pointerEvents: "none",
          zIndex: 1
        }}
      />
    </>
  );
}
