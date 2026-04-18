import { motion } from "framer-motion";

import { experiences, skills } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative w-full py-32 bg-transparent pointer-events-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Column: Bio */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h2 className="text-sm font-sans tracking-widest text-muted uppercase">
              (About)
            </h2>
            
            <div className="text-2xl md:text-4xl lg:text-5xl font-syne leading-tight text-foreground mix-blend-difference">
              I'm Youssef — an independent web developer bridging the gap between rigorous engineering and high-end digital design. 
            </div>
            
            <div className="text-base md:text-lg font-sans text-muted leading-relaxed max-w-2xl">
              <p className="mb-6">
                Currently pursuing a degree in Network & Cyber Security at ElSewedy University of Technology, my background provides a strict foundation in robust architecture and secure systems.
              </p>
              <p>
                In practice, I build bespoke e-commerce platforms, complex web applications, and immersive 3D experiences. I don't just write code; I architect solutions that elevate brand perception and drive measurable business impact.
              </p>
            </div>

            <div className="mt-8">
              <a 
                href="/resume.pdf" 
                target="_blank"
                className="inline-flex items-center gap-2 pb-2 border-b border-foreground text-sm font-bold font-sans uppercase tracking-widest hover:text-muted hover:border-muted transition-colors"
              >
                Download Résumé
              </a>
            </div>
          </div>

          {/* Right Column: Experience & Skills */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-16">
            
            {/* Experience */}
            <div>
              <h3 className="text-sm font-sans tracking-widest text-muted uppercase mb-8 border-b border-border/10 pb-4">
                Experience
              </h3>
              <div className="flex flex-col gap-6">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <span className="text-xs font-sans text-muted">{exp.year}</span>
                    <strong className="text-lg font-syne text-foreground font-semibold">{exp.role}</strong>
                    <span className="text-sm font-sans text-muted">{exp.company}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-sm font-sans tracking-widest text-muted uppercase mb-8 border-b border-border/10 pb-4">
                Arsenal
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="text-xs uppercase px-3 py-1.5 bg-white/5 rounded-full border border-white/10 text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
