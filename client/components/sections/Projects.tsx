import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

interface ProjectRowProps {
  project: (typeof projects)[0];
}

function ProjectRow({ project }: ProjectRowProps) {
  return (
    <article className="relative group border-t border-border/10 py-8 md:py-12 transition-colors hover:bg-white/[0.02]">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8 items-start px-4">
        
        {/* 1. Header (Title, Description, Tags) */}
        <div className="flex flex-col gap-2 order-1 md:col-span-7 md:col-start-6 md:row-start-1">
          <span className="text-sm md:text-sm font-sans text-muted mb-2">
            {project.id} — {project.type}
          </span>
          <h3 className="text-4xl sm:text-4xl md:text-5xl font-syne font-bold uppercase tracking-tight text-foreground transition-all duration-300 leading-tight antialiased">
            {project.name}
          </h3>
          <p className="text-base sm:text-base md:text-sm font-sans text-muted max-w-lg mt-2 leading-relaxed antialiased">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4" role="list" aria-label={`Technologies used in ${project.name}`}>
            {project.tags.map((tag) => (
              <span key={tag} role="listitem" className="text-xs sm:text-sm md:text-xs uppercase px-3 py-1.5 inline-flex items-center bg-white/10 rounded-full border border-white/20 text-white/90 font-sans font-medium antialiased">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 2. Photos */}
        <div className="flex flex-col gap-4 order-2 md:col-span-5 md:col-start-1 md:row-start-1 md:row-span-2 w-full">
          <div className="aspect-[4/3] rounded overflow-hidden border border-white/10">
            <img 
              src={project.images[0]} 
              alt={`${project.name} — primary screenshot`}
              width={600}
              height={450}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="aspect-[4/3] rounded overflow-hidden border border-white/10">
            <img 
              src={project.images[1]} 
              alt={`${project.name} — secondary screenshot`}
              width={600}
              height={450}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* 3. Footer (Key Metric, CTA) */}
        <div className="flex flex-col gap-6 order-3 md:col-span-7 md:col-start-6 md:row-start-2 mt-4 md:mt-0">
          <div className="font-sans p-4 border border-white/10 rounded bg-white/[0.01]">
            <div className="text-xs text-muted mb-2 uppercase tracking-wide">Key Metric</div>
            <div className="text-xl md:text-2xl text-accent font-syne font-bold">{project.metrics}</div>
            <p className="text-xs text-white/70 mt-2 leading-relaxed">
              {project.metricContext}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.name} live site (opens in new tab)`}
              className="tap-target inline-flex items-center gap-2 text-sm font-sans uppercase tracking-wide text-background bg-white px-5 py-3 rounded hover:bg-white/90 transition-all duration-300 font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              View Live Site
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.type.split("—")[0].trim())))];

  const filteredProjects = projects.filter(p => filter === "All" ? true : p.type.includes(filter));

  return (
    <section id="work" aria-label="Selected works and portfolio projects" className="relative w-full py-32 bg-transparent pointer-events-auto">
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
        <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter projects by category">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`text-xs uppercase px-5 py-2.5 rounded-full border font-sans font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
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
