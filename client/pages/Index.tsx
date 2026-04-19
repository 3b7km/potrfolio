import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import CanvasLoader from "@/components/3d/CanvasLoader";

export default function Index() {
  const navigate = useNavigate();
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

  const handleNavigate = (section: string) => {
    if (section === "work") {
      navigate("/work");
    } else if (section === "about") {
      navigate("/about");
    } else {
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-transparent overflow-x-hidden relative">

      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <Canvas3D cameraPosition={[0, 0, 8]}>
          <ScrollSceneGeometry />
          <Hero3DText />
        </Canvas3D>
      </div>

      {/* GPU-Aware 3D Preloader */}
      <CanvasLoader />

      {/* Floating Navigation */}
      <AnimatePresence>
        {showNav && <Navigation />}
      </AnimatePresence>

      {/* Sections Overlay */}
      <div className="relative z-10 w-full">
        <Hero onNavigate={handleNavigate} />
        <Marquee />
        <Projects />
        <About />
        <ExperienceContact />
        <Footer />
      </div>
    </div>
  );
}
