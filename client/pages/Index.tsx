import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import ExperienceContact from "@/components/sections/ExperienceContact";
import Footer from "@/components/Footer";
import { useLenis } from "@/hooks/useLenis";

export default function Index() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
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
    <div className="bg-background text-foreground overflow-x-hidden">

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            onComplete={() => {
              setIsLoading(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating Navigation */}
      <motion.nav
        animate={{
          y: showNav ? 0 : -100,
          opacity: showNav ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-8 right-8 z-20 flex gap-8 text-sm pointer-events-auto"
      >
        <button
          onClick={() => handleNavigate("projects")}
          className="cursor-hover hover:text-accent transition-colors"
        >
          Work
        </button>
        <button onClick={() => handleNavigate("about")} className="cursor-hover hover:text-accent transition-colors">
          About
        </button>
        <a href="#skills" className="cursor-hover hover:text-accent transition-colors">
          Skills
        </a>
        <a href="#contact" className="cursor-hover hover:text-accent transition-colors">
          Contact
        </a>
      </motion.nav>

      {/* Sections */}
      <Hero onNavigate={handleNavigate} />
      <Marquee />
      <Projects />
      <About />
      <Skills />
      <ExperienceContact />
      <Footer />
    </div>
  );
}
