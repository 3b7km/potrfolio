import { useState, useEffect, useMemo } from "react";

import { AnimatePresence } from "framer-motion";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import ExperienceContact from "@/components/sections/ExperienceContact";
import Footer from "@/components/Footer";
import Canvas3D from "@/components/3d/Canvas3D";
import ScrollSceneGeometry from "@/components/3d/ScrollSceneGeometry";
import { useLenis } from "@/hooks/useLenis";
import { Navigation } from "@/components/Navigation";
import Hero3DText from "@/components/3d/Hero3DText";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { isWebGLSupported } from "@/lib/gpu";

export default function Index() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // WebGL detection — show 3D only if GPU supports it
  const webGLSupported = useMemo(() => isWebGLSupported(), []);

  useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide nav on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="bg-transparent overflow-x-hidden relative">

      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:text-background focus:font-syne focus:font-bold focus:text-sm focus:rounded"
      >
        Skip to main content
      </a>

      {/* Background 3D Scene — behind all content */}
      {webGLSupported && (
        <ErrorBoundary fallback={null}>
          <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas3D cameraPosition={[0, 0, 8]}>
              <ScrollSceneGeometry />
            </Canvas3D>
          </div>
        </ErrorBoundary>
      )}

      {/* Floating Navigation */}
      <AnimatePresence>
        {showNav && <Navigation />}
      </AnimatePresence>

      {/* Sections Overlay */}
      <main id="main-content" className="relative z-10 w-full">
        <Hero />
        <Marquee />
        <Projects />
        <About />
        <div id="experience">
          <ExperienceContact />
        </div>
        <Footer />
      </main>

      {/* Sticky 3D Name — above all scrolling content */}
      {webGLSupported && (
        <ErrorBoundary fallback={null}>
          <div className="fixed inset-0 z-20 pointer-events-none">
            <Canvas3D cameraPosition={[0, 0, 8]}>
              <Hero3DText />
            </Canvas3D>
          </div>
        </ErrorBoundary>
      )}

      <FloatingWhatsApp />
    </div>
  );
}
