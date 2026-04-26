import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
export default function Hero() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // GSAP Magnetic Button Effect
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn || window.innerWidth < 768) return; // Disable on mobile

    const xTo = gsap.quickTo(btn, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(btn, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      xTo(x * 0.4); // Magnetic pull strength
      yTo(y * 0.4);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      aria-label="Hero introduction"
      className="relative w-full min-h-screen bg-transparent flex flex-col justify-between pt-32 pb-8 px-6 md:px-12 pointer-events-none"
    >
      <div className="pointer-events-auto">
        {/* Screen-reader accessible name — the 3D text is invisible to screen readers */}
        <h1 className="sr-only">Youssef Abdelhakam — Creative Web Developer</h1>

        {/* Top Info Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-12 md:mt-24 w-full">
          {/* Status & Location widget */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-2 text-xs md:text-sm font-sans tracking-wide text-muted"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Available for projects</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xs text-xs md:text-sm text-white/90 font-sans leading-relaxed relative z-10"
          >
            <div
              className="absolute inset-0 bg-background/40 blur-2xl -z-10 rounded-full"
              aria-hidden="true"
            />
            I build secure, high-conversion e-commerce platforms and immersive
            3D web experiences that drive measurable business impact.
          </motion.div>
        </div>

        {/* 3D Typography Space (Handled in Canvas) */}
        <div
          className="mt-[10vh] md:mt-[15vh] h-[30vh] flex flex-col items-center justify-center relative select-none"
          aria-hidden="true"
        >
          {/* Space reserved for 3D Text rendered from the global Canvas */}
        </div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 md:mt-24 flex items-center justify-center relative z-10"
        >
          <div
            className="absolute w-[200px] h-[40px] bg-white/20 blur-2xl -z-10"
            aria-hidden="true"
          />
          <a
            ref={buttonRef}
            href="#work"
            aria-label="View selected works — scroll to portfolio section"
            className="inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 border-2 border-primary text-white bg-transparent rounded-full text-sm md:text-base font-syne font-bold uppercase tracking-widest hover:bg-primary/10 transition-colors duration-300 shadow-[0_0_40px_rgba(213,53,25,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            View Selected Works
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Bottom Layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex justify-between items-end w-full pointer-events-auto mix-blend-difference text-white pb-4"
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-white/50 overflow-hidden relative">
          <motion.div
            animate={{ y: [0, 48, 48, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/3 bg-white absolute top-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
