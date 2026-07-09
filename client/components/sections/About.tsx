import { experiences, skills } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      aria-label="About Youssef Abdelhakam"
      className="relative w-full py-16 md:py-24 bg-transparent pointer-events-auto border-b border-border/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-20">
        {/* Tier 1: Bio & Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Center Column: Bio */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h2 className="text-sm font-sans font-bold tracking-widest text-foreground uppercase">
              (About)
            </h2>

            <p className="text-2xl md:text-3xl lg:text-4xl font-syne leading-tight text-white/95">
              I'm Youssef — an independent web developer building secure,
              high-conversion e-commerce platforms and immersive 3D web
              experiences that drive actionable business impact.
            </p>

            <div className="text-base md:text-lg font-sans text-white/80 leading-relaxed max-w-2xl">
              <div className="p-5 border border-white/10 rounded-xl bg-white/[0.02]">
                <p className="font-syne text-foreground font-bold mb-2 uppercase text-xs tracking-wide text-accent">
                  Unique Advantage
                </p>
                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                  My background in{" "}
                  <span className="font-semibold text-white">
                    Network &amp; Cyber Security
                  </span>{" "}
                  at ElSewedy University of Technology uniquely positions me to
                  build not just beautiful—but secure, robust, and scalable
                  solutions. This translates to enterprise-grade applications
                  that protect your users and data.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Experience */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-1 lg:pt-0">
            <div id="experience-list" className="flex flex-col gap-6">
              <h3 className="text-sm font-sans font-bold tracking-widest text-foreground uppercase mb-2 border-b border-border/10 pb-4 flex items-center justify-between">
                <span>Experience</span>
                <span className="text-xs font-mono text-muted lowercase">proven track record</span>
              </h3>
              <div className="flex flex-col gap-6" role="list">
                {experiences.map((exp) => (
                  <div
                    key={`${exp.role}-${exp.year}`}
                    role="listitem"
                    className="flex flex-col gap-1 p-4 rounded-xl border border-white/10 bg-white/[0.01] hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-base md:text-lg font-syne text-foreground font-semibold">
                        {exp.role}
                      </strong>
                      <span className="text-xs font-mono text-accent">
                        {exp.year}
                      </span>
                    </div>
                    <span className="text-sm font-sans text-white/75">
                      {exp.company}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2: Side-by-Side Skills Arsenal */}
        <div className="flex flex-col gap-8 pt-4 border-t border-border/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-sm font-sans font-bold tracking-widest text-foreground uppercase">
              Arsenal / Technical Skills
            </h3>
            <p className="text-xs font-sans text-muted">
              Core technologies powering my full-stack &amp; e-commerce architectures
            </p>
          </div>

          {/* Side-by-Side Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col gap-4 hover:border-white/25 hover:bg-white/[0.03] transition-all h-full justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                    <span className="text-xs font-syne font-bold uppercase tracking-wider text-accent">
                      {category}
                    </span>
                    <span className="text-[10px] font-mono text-muted uppercase bg-white/5 px-2 py-0.5 rounded">
                      {items.length} skills
                    </span>
                  </div>
                  <div
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label={`${category} skills`}
                  >
                    {items.map((skill) => (
                      <span
                        key={skill}
                        role="listitem"
                        className="text-xs uppercase px-3.5 py-2 inline-flex items-center bg-white/10 rounded-full border border-white/15 text-white/90 font-medium hover:border-accent/40 hover:bg-accent/10 hover:text-white transition-all shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
