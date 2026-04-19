import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects, skills } from "@/lib/data";
import Footer from "@/components/Footer";
import { useLenis } from "@/hooks/useLenis";

export default function Work() {
  useLenis();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden selection:bg-foreground selection:text-background relative">

      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-8 mix-blend-difference pointer-events-auto flex justify-between items-center text-foreground">
        <Link to="/" className="text-sm font-syne font-bold uppercase tracking-widest">
          Y.A ©
        </Link>
        <Link to="/" className="text-sm font-sans tracking-wide opacity-70 hover:opacity-100 transition-opacity">
          Close (X)
        </Link>
      </nav>

      {/* Hero Header */}
      <header className="w-full pt-48 pb-24 px-6 md:px-12 border-b border-border/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-syne font-bold uppercase tracking-tighter"
          >
            Digital <br /> Archives
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm md:text-base font-sans text-muted max-w-md leading-relaxed"
          >
            A comprehensive overview of massive-scale e-commerce architectures, 3D web experiences, and brand platforms currently in production.
          </motion.p>
        </div>
      </header>

      {/* Case Studies */}
      <main className="w-full pb-32">
        {projects.map((project, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <article key={project.id} className="w-full border-b border-border/5 py-24 md:py-40 px-6 md:px-12 group">
              <div className="max-w-7xl mx-auto">

                {/* Top Row: Image + Core Info */}
                <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-24 items-start`}>

                  {/* Image Showcase */}
                  <div className="w-full lg:w-3/5 overflow-hidden relative aspect-[4/3] md:aspect-[16/10] bg-[#111]">
                    <motion.div
                      initial={{ scale: 1.1, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full"
                    >
                      {project.images.length > 0 && (
                        <div className="relative w-full h-full overflow-hidden">
                          <img
                            src={project.images[0]}
                            alt={project.name}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                          />
                          {project.images[1] && (
                            <img
                              src={project.images[1]}
                              alt={`${project.name} secondary`}
                              className="absolute inset-0 object-cover w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            />
                          )}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Project Details */}
                  <div className="w-full lg:w-2/5 flex flex-col justify-start">
                    <div className="text-xs font-sans text-muted uppercase tracking-widest mb-4">
                      Case {project.id} — {project.type}
                    </div>

                    <h2 className="text-4xl md:text-6xl font-syne font-bold uppercase tracking-tight mb-6">
                      {project.name}
                    </h2>

                    <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-border/10">
                      <div>
                        <span className="block text-xs font-sans text-muted uppercase tracking-widest mb-2">Platform</span>
                        <span className="text-sm font-sans">{project.platform}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-sans text-muted uppercase tracking-widest mb-2">Impact</span>
                        <span className="text-sm font-sans">{project.metrics}</span>
                      </div>
                    </div>

                    <p className="text-base font-sans text-muted leading-relaxed mb-8 max-w-md">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-sans uppercase tracking-widest px-3 py-1.5 border border-white/10 rounded-full text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center self-start text-sm font-syne font-bold uppercase tracking-widest border-b border-foreground pb-1 hover:text-muted hover:border-muted transition-colors"
                    >
                      Launch Site →
                    </a>
                  </div>
                </div>

                {/* Bottom Row: Features + Tech Stack + Skills */}
                <div className="mt-16 pt-16 border-t border-border/5 grid grid-cols-1 md:grid-cols-3 gap-12">

                  {/* Key Features */}
                  <div>
                    <h3 className="text-xs font-sans tracking-widest text-muted uppercase mb-6 pb-3 border-b border-border/10">
                      Key Features
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {project.features.map((feature, i) => (
                        <li key={i} className="text-sm font-sans text-muted leading-relaxed flex items-start gap-2">
                          <span className="text-foreground/30 mt-1 text-xs">◆</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-xs font-sans tracking-widest text-muted uppercase mb-6 pb-3 border-b border-border/10">
                      Tech Stack
                    </h3>
                    <div className="flex flex-col gap-5">
                      {Object.entries(project.techStack).map(([category, items]) => (
                        <div key={category}>
                          <span className="block text-xs font-sans text-foreground/50 uppercase tracking-widest mb-2">
                            {category}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {items.map((item) => (
                              <span
                                key={item}
                                className="text-xs font-sans px-2 py-1 bg-white/5 border border-white/5 text-muted"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Demonstrated */}
                  <div>
                    <h3 className="text-xs font-sans tracking-widest text-muted uppercase mb-6 pb-3 border-b border-border/10">
                      Skills Demonstrated
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {project.skills.map((skill, i) => (
                        <li key={i} className="text-sm font-sans text-muted leading-relaxed flex items-start gap-2">
                          <span className="text-foreground/30 mt-1 text-xs">→</span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </main>

      {/* Global Arsenal */}
      <section className="w-full py-32 px-6 md:px-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="md:w-1/3">
            <h2 className="text-3xl md:text-5xl font-syne font-bold uppercase tracking-tight">
              Technical <br /> Arsenal
            </h2>
            <p className="mt-6 text-sm font-sans text-muted max-w-xs">
              The infrastructure utilized to construct and deploy the architectures above.
            </p>
          </div>

          <div className="md:w-2/3 flex flex-wrap gap-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="px-6 py-4 border border-white/5 bg-[#111] text-sm font-sans uppercase tracking-wider text-muted hover:text-foreground hover:border-white/20 transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
