import { experiences, skills } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative w-full py-32 bg-transparent pointer-events-auto border-b border-border/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* Center Column: Bio */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h2 className="text-sm font-sans font-bold tracking-widest text-foreground uppercase">
              (About)
            </h2>
            
            <div className="text-2xl md:text-4xl lg:text-5xl font-syne leading-tight text-white/95">
              I'm Youssef — an independent web developer building secure, high-conversion e-commerce platforms and immersive 3D web experiences that drive actionable business impact.
            </div>
            
            <div className="text-base md:text-lg font-sans text-white/80 leading-relaxed max-w-2xl space-y-4">
              <div className="p-4 border border-white/10 rounded bg-white/[0.02]">
                <p className="font-syne text-foreground font-bold mb-2 uppercase text-sm tracking-wide">
                  Unique Advantage
                </p>
                <p className="text-white/90">
                  My background in <span className="font-semibold text-white">Network & Cyber Security</span> at ElSewedy University of Technology uniquely positions me to build not just beautiful—but secure, robust, and scalable solutions. This translates to enterprise-grade applications that protect your users and data.
                </p>
              </div>
            </div>


          </div>

          {/* Right Column: Experience & Skills */}
          <div className="lg:col-span-3 flex flex-col gap-16">
            
            {/* Experience */}
            <div id="experience">
              <h3 className="text-sm font-sans font-bold tracking-widest text-foreground uppercase mb-8 border-b border-border/10 pb-4">
                Experience
              </h3>
              <div className="flex flex-col gap-6">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <span className="text-xs font-sans text-white/60">{exp.year}</span>
                    <strong className="text-lg font-syne text-foreground font-semibold">{exp.role}</strong>
                    <span className="text-sm font-sans text-white/80">{exp.company}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-8">
              <h3 className="text-sm font-sans font-bold tracking-widest text-foreground uppercase mb-2 border-b border-border/10 pb-4">
                Arsenal
              </h3>
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <p className="text-xs font-syne font-bold uppercase tracking-wide text-muted mb-3">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span 
                        key={skill} 
                        className="text-xs uppercase px-4 py-2.5 min-h-[36px] inline-flex items-center bg-white/10 rounded-full border border-white/20 text-white/90 font-medium hover:border-white/40 hover:bg-white/15 transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
