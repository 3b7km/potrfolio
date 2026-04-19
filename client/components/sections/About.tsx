import { motion } from "framer-motion";

import { experiences, skills } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative w-full py-32 bg-transparent pointer-events-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* Left Column: Photo */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="rounded-lg overflow-hidden aspect-square">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F412054951e8b4d02957cdfe69d9f1d3c%2Fabab53a9ca4d4fcf85e04068b30e2924?format=webp&width=600&height=800"
                alt="Youssef Abdelhakam"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Center Column: Bio */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h2 className="text-sm font-sans tracking-widest text-muted uppercase">
              (About)
            </h2>
            
            <div className="text-2xl md:text-4xl lg:text-5xl font-syne leading-tight text-foreground mix-blend-difference">
              I'm Youssef — an independent web developer bridging the gap between rigorous engineering and high-end digital design. 
            </div>
            
            <div className="text-base md:text-lg font-sans text-muted leading-relaxed max-w-2xl space-y-4">
              <div className="p-4 border border-white/10 rounded bg-white/[0.02]">
                <p className="text-secondary font-sans font-medium mb-2 uppercase text-sm tracking-wide">
                  🔐 Unique Advantage
                </p>
                <p className="text-foreground">
                  My background in <span className="font-semibold">Network & Cyber Security</span> at ElSewedy University of Technology uniquely positions me to build not just beautiful—but secure, robust, and scalable solutions. This translates to enterprise-grade applications that protect your users and data.
                </p>
              </div>

              <p>
                I build bespoke e-commerce platforms, complex web applications, and immersive 3D experiences. I don't just write code; I architect solutions that elevate brand perception, drive measurable business impact, and maintain security-first principles from the ground up.
              </p>
            </div>


          </div>

          {/* Right Column: Experience & Skills */}
          <div className="lg:col-span-3 flex flex-col gap-16">
            
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
