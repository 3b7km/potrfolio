import { motion } from "framer-motion";

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative w-full min-h-screen bg-transparent flex flex-col justify-between pt-32 pb-8 px-6 md:px-12 pointer-events-none">
      <div className="pointer-events-auto">
        {/* Top Info Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-12 md:mt-24 w-full">
          {/* Status & Location widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col gap-2 text-xs md:text-sm font-sans tracking-wide text-muted"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Available for projects</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-xs text-xs md:text-sm text-secondary font-sans leading-relaxed"
          >
            Full-stack web developer specializing in immersive, high-performance React and Three.js experiences.
          </motion.div>
        </div>

        {/* 3D Typography Space (Handled in Canvas) */}
        <div className="mt-[10vh] md:mt-[15vh] h-[30vh]">
           {/* Space reserved for 3D Text rendered from the global Canvas */}
        </div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 md:mt-16"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 border border-foreground/40 rounded text-sm md:text-base font-sans uppercase tracking-wide text-foreground hover:border-foreground hover:bg-white/5 transition-all duration-300"
          >
            View My Work
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Bottom Layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex justify-between items-end w-full pointer-events-auto mix-blend-difference text-foreground pb-4"
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-foreground/50 overflow-hidden relative">
          <motion.div 
            animate={{ y: [0, 48, 48, 0] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/3 bg-foreground absolute top-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
