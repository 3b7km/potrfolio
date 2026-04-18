import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Canvas3D from "../3d/Canvas3D";
import HeroGeometry from "../3d/HeroGeometry";

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const headlineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate headline lines
    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll(".headline-line");
      lines.forEach((line, index) => {
        gsap.from(line, {
          clipPath: "inset(100% 0 0 0)",
          duration: 1,
          delay: index * 0.2,
          ease: "power2.out",
        });
      });
    }

    // Animate scroll indicator
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 20,
        opacity: 0.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <section className="relative w-full h-screen bg-background overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-50 hidden md:block">
        <Canvas3D cameraPosition={[0, 0, 4]}>
          <HeroGeometry />
        </Canvas3D>
      </div>

      {/* Top Navigation */}
      <nav className="absolute top-8 left-8 right-8 z-20 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-sm font-grotesk font-bold"
        >
          Y.A©
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-12 text-sm"
        >
          <button
            onClick={() => onNavigate("work")}
            className="cursor-hover hover:text-accent transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => onNavigate("about")}
            className="cursor-hover hover:text-accent transition-colors"
          >
            About
          </button>
          <a href="#skills" className="cursor-hover hover:text-accent transition-colors">
            Skills
          </a>
          <a href="#contact" className="cursor-hover hover:text-accent transition-colors">
            Contact
          </a>
        </motion.div>
      </nav>

      {/* Main Content */}
      <div className="relative h-full flex flex-col items-center justify-center z-10 px-4">
        <motion.div
          ref={headlineRef}
          className="text-center max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-5xl md:text-8xl font-grotesk font-bold leading-tight mb-4">
            <div className="headline-line">Web Developer.</div>
            <div className="headline-line">Problem Solver.</div>
            <div className="headline-line">Builder.</div>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-muted text-sm md:text-base mt-8 max-w-2xl"
        >
          Based in Benha, Egypt — Available for projects
        </motion.p>
      </div>

      {/* Bottom Elements */}
      <div className="absolute bottom-8 left-8 right-8 z-20 flex items-end justify-between">
        <motion.a
          href="mailto:youssefabdelhakam99@gmail.com"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-muted cursor-hover hover:text-foreground transition-colors"
        >
          youssefabdelhakam99@gmail.com
        </motion.a>

        <motion.div
          ref={scrollIndicatorRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-6 bg-foreground"></div>
          <div className="w-1 h-1 bg-foreground rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
}
