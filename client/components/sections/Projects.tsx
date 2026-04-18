import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { projects } from "@/lib/data";

interface ProjectRowProps {
  project: (typeof projects)[0];
}

function ProjectRow({ project }: ProjectRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && project.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 1500);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, project.images.length]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group border-t border-border/10 py-10 transition-colors hover:bg-white/[0.02]"
    >
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block relative z-10">
        <div className="grid grid-cols-12 gap-4 items-start px-4">
          
          {/* Index */}
          <div className="col-span-12 md:col-span-1 text-sm font-sans text-muted mb-4 md:mb-0">
            {project.id}
          </div>

          {/* Title & Tags */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
            <h3 className="text-3xl md:text-5xl font-syne font-bold uppercase tracking-tight text-foreground group-hover:pl-4 transition-all duration-300">
              {project.name}
            </h3>
            <div className="flex flex-wrap gap-2 mt-2 group-hover:pl-4 transition-all duration-300 delay-75">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs uppercase px-2 py-1 bg-white/5 rounded-full border border-white/10 text-muted">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm font-sans text-muted mt-4 max-w-sm group-hover:pl-4 transition-all duration-300 delay-100">
              {project.platform}
            </p>
          </div>

          {/* Metrics Column */}
          <div className="hidden md:block col-span-5 text-right font-sans">
            <div className="text-sm text-muted mb-2 uppercase tracking-wide">Impact</div>
            <div className="text-xl text-foreground font-syne">{project.metrics}</div>
          </div>
        </div>
      </a>

      {/* Floating Preview — Masked Reveal */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(50% 0% 50% 0%)", scale: 0.92 }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
            exit={{ opacity: 0, clipPath: "inset(50% 0% 50% 0%)", scale: 0.92 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 -translate-y-1/2 right-[10%] w-72 md:w-96 aspect-[4/3] rounded-sm overflow-hidden pointer-events-none z-0 border border-white/10 shadow-2xl"
          >
            {project.images.map((img, idx) => (
              <motion.img
                key={img}
                src={img}
                alt={`${project.name} preview`}
                initial={{ scale: 1.15 }}
                animate={{ scale: idx === currentImageIndex ? 1 : 1.15 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  idx === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="relative w-full py-32 bg-transparent pointer-events-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <h2 className="text-4xl md:text-6xl font-syne font-bold uppercase tracking-tighter">
            Selected<br/><span className="text-muted">Works</span>
          </h2>
          <p className="text-sm font-sans text-muted max-w-xs leading-relaxed">
            A collection of robust, visually demanding digital experiences engineered for scale.
          </p>
        </div>

        {/* Projects List */}
        <div className="border-b border-border/10">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
