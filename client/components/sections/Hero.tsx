import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Hero() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Orchestrated Brand Page-Load Sequence
  useGSAP(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(".hero-anim", { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const tl = gsap.timeline({ 
      defaults: { ease: "expo.out", duration: 1.4 } 
    });

    // Staggered reveal with blur for a premium cinematic feel
    tl.fromTo(
      ".hero-anim",
      { y: 40, opacity: 0, filter: "blur(12px)" },
      { 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)", 
        stagger: 0.15, 
        delay: 0.2,
        clearProps: "filter" // cleanup for performance
      }
    );
  }, { scope: containerRef });

  // Vanilla magnetic button effect
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn || window.innerWidth < 768) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);
      btn.style.transform = `translate(${currentX}px, ${currentY}px)`;

      if (Math.abs(currentX - targetX) > 0.1 || Math.abs(currentY - targetY) > 0.1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      targetX = (e.clientX - (rect.left + rect.width / 2)) * 0.4;
      targetY = (e.clientY - (rect.top + rect.height / 2)) * 0.4;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(animate);
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Hero introduction"
      className="relative w-full min-h-screen bg-transparent flex flex-col justify-between pt-32 pb-8 px-6 md:px-12 pointer-events-none"
    >
      <div className="pointer-events-auto">
        {/* Top Info Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-12 md:mt-24 w-full">
          {/* Status & Location widget */}
          <div
            className="hero-anim opacity-0 flex flex-col gap-2 text-xs md:text-sm font-sans tracking-wide text-muted"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Available for projects</span>
            </div>
          </div>

          <div
            className="hero-anim opacity-0 max-w-xs text-xs md:text-sm text-white/90 font-sans leading-relaxed relative z-10"
          >
            <div
              className="absolute inset-0 bg-background/40 blur-2xl -z-10 rounded-full"
              aria-hidden="true"
            />
            I build secure, high-conversion e-commerce platforms and immersive
            3D web experiences that drive measurable business impact.
          </div>
        </div>

        {/* Screen-reader accessible name — invisible to users, read by bots/screen readers */}
        <h1 className="sr-only">Youssef Abdelhakam — Creative Web Developer</h1>

        {/* Space reserved for 3D Text rendered from the global Canvas */}
        <div
          className="mt-[10vh] md:mt-[15vh] h-[30vh] w-full relative pointer-events-none"
          aria-hidden="true"
        />

        {/* Primary CTA */}
        <div
          className="hero-anim opacity-0 mt-16 md:mt-24 flex items-center justify-center relative z-10"
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
        </div>
      </div>

      {/* Bottom Layout */}
      <div
        className="hero-anim opacity-0 flex justify-between items-end w-full pointer-events-auto mix-blend-difference text-white pb-4"
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-white/50 overflow-hidden relative">
          <div
            className="w-full h-1/3 bg-white absolute top-0 animate-[scrollIndicator_2s_ease-in-out_infinite]"
          />
        </div>
      </div>
    </section>
  );
}
