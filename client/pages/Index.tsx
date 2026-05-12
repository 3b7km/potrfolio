import { useState, useEffect, lazy, Suspense } from "react";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Footer from "@/components/Footer";
import { useLenis } from "@/hooks/useLenis";
import { Navigation } from "@/components/Navigation";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

const Projects = lazy(() => import("@/components/sections/Projects"));
const About = lazy(() => import("@/components/sections/About"));
const ExperienceContact = lazy(
  () => import("@/components/sections/ExperienceContact"),
);
const Deferred3DScene = lazy(
  () => import("@/components/3d/Deferred3DScene"),
);

export default function Index() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

      {/* 3D Scene — deferred until after page is interactive */}
      <Suspense fallback={null}>
        <Deferred3DScene />
      </Suspense>

      {/* Floating Navigation — CSS transition for show/hide */}
      <div
        className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showNav
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <Navigation />
      </div>

      {/* Sections Overlay */}
      <main id="main-content" className="relative z-10 w-full">
        <Hero />
        <Marquee />
        <Suspense fallback={<div className="h-screen w-full" />}>
          <Projects />
          <About />
          <div id="experience">
            <ExperienceContact />
          </div>
        </Suspense>
        <Footer />
      </main>

      <FloatingWhatsApp />
    </div>
  );
}
