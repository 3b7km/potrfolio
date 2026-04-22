import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { projects } from "@/lib/data";

interface ProjectRowProps {
  project: (typeof projects)[0];
}

function ProjectRow({ project }: ProjectRowProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="relative group border-t border-border/10 py-8 md:py-12 transition-colors hover:bg-white/[0.02]">
      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start px-4">
        
        {/* Project Thumbnails */}
        <div className="w-full md:w-5/12 flex flex-col gap-4 shrink-0">
          <div className="aspect-[4/3] rounded overflow-hidden border border-white/10">
            <img 
              src={project.images[0]} 
              alt={`${project.name} view 1`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="aspect-[4/3] rounded overflow-hidden border border-white/10">
            <img 
              src={project.images[1]} 
              alt={`${project.name} view 2`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col grid-cols-12 gap-6 w-full">
          
          <div className="flex flex-col md:flex-row justify-between w-full gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-sans text-muted mb-2">
                {project.id} — {project.type}
              </span>
              <h3 className="text-3xl md:text-5xl font-syne font-bold uppercase tracking-tight text-foreground transition-all duration-300">
                {project.name}
              </h3>
              <p className="text-sm font-sans text-muted max-w-lg mt-2 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs uppercase px-3 py-1.5 inline-flex items-center bg-white/10 rounded-full border border-white/20 text-white/90 font-sans font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics block */}
            <div className="md:text-right font-sans shrink-0 min-w-[200px] mt-4 md:mt-0 p-4 border border-white/10 rounded bg-white/[0.01]">
              <div className="text-xs text-muted mb-2 uppercase tracking-wide">Key Metric</div>
              <div className="text-xl md:text-2xl text-accent font-syne font-bold">{project.metrics}</div>
              <p className="text-xs text-white/70 mt-2 leading-relaxed">
                {project.metricContext}
              </p>
            </div>
          </div>

          {/* CTA Group */}
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target inline-flex items-center gap-2 text-sm font-sans uppercase tracking-wide text-background bg-white px-5 py-3 rounded hover:bg-white/90 transition-all duration-300 font-bold"
            >
              View Live Site
              <ArrowUpRight size={16} />
            </a>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.type.split("—")[0].trim())))];

  const filteredProjects = projects.filter(p => filter === "All" ? true : p.type.includes(filter));

  return (
    <section id="work" className="relative w-full py-32 bg-transparent pointer-events-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <h2 className="text-fluid-section font-syne font-bold uppercase tracking-tighter">
            Selected<br/><span className="text-muted">Works</span>
          </h2>
          <p className="text-sm font-sans text-muted max-w-xs leading-relaxed">
            A collection of robust, visually demanding digital experiences engineered for scale.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs uppercase px-5 py-2.5 rounded-full border font-sans font-medium transition-all ${
                filter === cat 
                  ? "bg-white text-background border-white" 
                  : "bg-transparent text-white/70 border-white/20 hover:border-white/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="border-b border-border/10">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectRow project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
